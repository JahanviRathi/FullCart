using FullCart_WebAPI.Models;

namespace FullCart_WebAPI.Services.Interface
{
    public interface IWishlistService
    {
        Task<Wishlist?> GetWishListItems(int CustomerId);
        Task<Wishlist?> AddItemsToWishList(WishlistItem wishListItem, int CustomerId);
        Task<Wishlist?> RemoveItemsFromWishList(int itemId, int CustomerId);
        Task EmptyWishList(int CustomerId);
    }
}
