using FullCart_WebAPI.Data;
using FullCart_WebAPI.Models;
using FullCart_WebAPI.Repositories.Interface;
using Microsoft.EntityFrameworkCore;

namespace FullCart_WebAPI.Repositories
{
    public class WishlistRepository : IWishlistRepository
    {
        private readonly DataContext _dataContext;

        public WishlistRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<Wishlist?> AddItemsToWishlist(WishlistItem wishlistItem, int CustomerId)
        {
            var wishlist = await GetWishlistItems(CustomerId);

            if (wishlist == null)
            {
                wishlistItem.Item = await _dataContext.Items.FindAsync(wishlistItem.ItemId);
                wishlist = new Wishlist
                {
                    CustomerId = CustomerId,
                    WishlistItems = new List<WishlistItem> { wishlistItem }
                };
                _dataContext.Wishlist.Add(wishlist);
            }
            else
            {
                var existingItem = wishlist.WishlistItems.FirstOrDefault(existintWishlistItem => existintWishlistItem.ItemId == wishlistItem.ItemId);

                if (existingItem == null)
                {
                    wishlist.WishlistItems.Add(wishlistItem);
                }
                else return null;
            }

            await _dataContext.SaveChangesAsync();
            return await GetWishlistItems(CustomerId);
        }

        public async Task EmptyWishlist(int CustomerId)
        {
            var wishlist = await _dataContext.Wishlist.FirstOrDefaultAsync(wishlist => wishlist.CustomerId == CustomerId);
            if (wishlist != null)
            {
                _dataContext.Wishlist.Remove(wishlist);
                await _dataContext.SaveChangesAsync();
            }
        }

        public async Task<Wishlist?> GetWishlistItems(int CustomerId)
        {
            var wishlistWithCustomerId = await _dataContext.Wishlist
                .Include(wishlist => wishlist.User)
                .FirstOrDefaultAsync(wishlist => wishlist.CustomerId == CustomerId);

            if (wishlistWithCustomerId != null)
            {
                await GetWishlistWithItems(wishlistWithCustomerId);
            }

            return wishlistWithCustomerId;
        }

        public async Task<Wishlist?> RemoveItemsFromWishlist(int itemId, int CustomerId)
        {
            var wishlist = await _dataContext.Wishlist
                .Include(wishlist => wishlist.WishlistItems)
                .ThenInclude(wishlistItem => wishlistItem.Item)
                .FirstOrDefaultAsync(wishlist => wishlist.CustomerId == CustomerId);

            if (wishlist == null)
                return null;

            var wishlistItem = await _dataContext.WishlistItems
                .FirstOrDefaultAsync(wishlistItem => wishlistItem.ItemId == itemId && wishlist.CustomerId == CustomerId);
            if (wishlistItem == null)
                return null;

            wishlist.WishlistItems = wishlist.WishlistItems.Where((item) =>
            item.ItemId != wishlistItem.ItemId).ToList();

            await _dataContext.SaveChangesAsync();
            return await GetWishlistItems(CustomerId);
        }

        private async Task GetWishlistWithItems(Wishlist wishlist)
        {
            var wishlistItems = await _dataContext.WishlistItems
                .Include(wishlistItem => wishlistItem.Item)
                .Where(wishlistItem => wishlistItem.WishlistId == wishlist.WishlistId)
                .Select(wishlistItem => new WishlistItem
                {
                    WishlistId = wishlistItem.WishlistId,
                    WishlistItemId = wishlistItem.WishlistItemId,
                    ItemId = wishlistItem.ItemId,
                    Item = wishlistItem.Item
                }).ToListAsync();

            wishlist.WishlistItems = wishlistItems;
        }
    }
}