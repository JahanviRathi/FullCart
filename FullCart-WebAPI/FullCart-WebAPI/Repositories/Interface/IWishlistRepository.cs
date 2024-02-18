using FullCart_WebAPI.Models;

namespace FullCart_WebAPI.Repositories.Interface
{
    public interface IWishlistRepository
    {
        Task<Wishlist?> AddItemsToWishlist(WishlistItem wishlistItem, int CustomerId);
        Task EmptyWishlist(int CustomerId);
        Task<Wishlist?> GetWishlistItems(int CustomerId);
        Task<Wishlist?> RemoveItemsFromWishlist(int itemId, int CustomerId);
    }
}
