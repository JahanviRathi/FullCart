using FullCart_WebAPI.Models;
using FullCart_WebAPI.Services;
using FullCart_WebAPI.Services.Interface;
using Microsoft.AspNetCore.Mvc;

namespace FullCart_WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly IOrderService _orderService;
        private readonly ICartService _cartService;
        private readonly IWishlistService _wishlistService;

        public CustomerController(IOrderService orderService, ICartService cartService, IWishlistService wishlistService)
        {
            _orderService = orderService;
            _cartService = cartService;
            _wishlistService = wishlistService;
        }

        [HttpPost("orders")]
        public async Task<ActionResult<Order>> CreateOrder(OrderPlaceRequest request)
        {
            var orders = await _orderService.SetOrderDetails(request);
            return Ok(orders);
        }

        [HttpPatch("orders/{OrderId}/{Status}")]
        public async Task<ActionResult<Order>> ChangeOrderStatus(int OrderId, int Status)
        {
            var order = await _orderService.ChangeOrderStatus(OrderId, Status);
            if (order == null)
                return NotFound("No such order is placed");
            return Ok(order);
        }


        [HttpPost("cart/{CustomerId}")]
        public async Task<ActionResult<Cart>> AddItemsToCart([FromBody] CartItem cartItem, int CustomerId)
        {
            var cartItems = await _cartService.AddItemsToCart(cartItem, CustomerId);
            return Ok(cartItems);
        }

        [HttpDelete("cart/{itemId}/{CustomerId}")]
        public async Task<ActionResult<Cart>> RemoveItemsFromCart(int itemId, int CustomerId)
        {
            var cartItems = await _cartService.RemoveItemsFromCart(itemId, CustomerId);
            if (cartItems == null)
                return NotFound("No such item found");
            return Ok(cartItems);
        }

        [HttpDelete("cart/{CustomerId}")]
        public async Task<ActionResult> ClearCart(int CustomerId)
        {
            await _cartService.EmptyCart(CustomerId);
            return Ok();
        }
        
        [HttpPost("wishlist/{CustomerId}")]
        public async Task<ActionResult<WishlistItem>> AddItemsToWishList([FromBody] WishlistItem wishlistItem, int CustomerId)
        {
            var wishlistItems = await _wishlistService.AddItemsToWishList(wishlistItem, CustomerId);
            return Ok(wishlistItems);
        }

        [HttpDelete("wishlist/{itemId}/{CustomerId}")]
        public async Task<ActionResult<WishlistItem>> RemoveItemsFromWishlist(int itemId, int CustomerId)
        {
            var wishlistItems = await _wishlistService.RemoveItemsFromWishList(itemId, CustomerId);
            if (wishlistItems == null)
                return NotFound("No such item found");
            return Ok(wishlistItems);
        }

        [HttpDelete("wishlist/{CustomerId}")]
        public async Task<ActionResult<WishlistItem>> ClearWishlist(int CustomerId)
        {
            await _wishlistService.EmptyWishList(CustomerId);
            return Ok();
        }
    }
}
