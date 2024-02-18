using FullCart_WebAPI.Models;
using FullCart_WebAPI.Services;
using FullCart_WebAPI.Services.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FullCart_WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SharedController : ControllerBase
    {
        private readonly IItemService _itemService;
        private readonly IOrderService _orderService;
        private readonly IBrandService _brandService;
        private readonly ICategoryService _categoryService;
        private readonly ICartService _cartService;
        private readonly IWishlistService _wishlistService;

        public SharedController(
            IItemService itemService,
            IOrderService orderService,
            IBrandService brandService,
            ICategoryService categoryService,
            ICartService cartService,
            IWishlistService wishlistService
        )
        {
            _itemService = itemService;
            _orderService = orderService;
            _brandService = brandService;
            _categoryService = categoryService;
            _cartService = cartService;
            _wishlistService = wishlistService;
        }

        [HttpGet("items")]
        public async Task<ActionResult<List<Item>>> GetItems()
        {
            var items = await _itemService.GetItems();
            return Ok(items);
        }

        [HttpGet("brands")]
        public async Task<ActionResult<List<Brand>>> GetBrands()
        {
            var brands = await _brandService.GetAllBrands();
            return Ok(brands);
        }

        [HttpGet("categories")]
        public async Task<ActionResult<List<Category>>> GetCategories()
        {
            var categories = await _categoryService.GetAllCategories();
            return Ok(categories);
        }

        [HttpGet("orders/{CustomerId}")]
        public async Task<ActionResult<List<Order>>> GetOrdersByCustomerId(int CustomerId)
        {
            var orderList = await _orderService.GetOrdersByCustomerId(CustomerId);
            return Ok(orderList);
        }

        [HttpGet("orders/{OrderId}/details")]
        public async Task<ActionResult<Order>> GetOrderById(int OrderId)
        {
            var order = await _orderService.GetOrderDetails(OrderId);
            if (order == null)
                return NotFound("No such order is placed");
            return Ok(order);
        }

        [HttpGet("cart/{CustomerId}")]
        public async Task<ActionResult<Cart>> GetCartItems(int CustomerId)
        {
            var cartItems = await _cartService.GetCartItems(CustomerId);
            return Ok(cartItems);
        }

        [HttpGet("wishlist/{CustomerId}")]
        public async Task<ActionResult<WishlistItem>> GetWishlistItems(int CustomerId)
        {
            var wishlistItems = await _wishlistService.GetWishListItems(CustomerId);
            return Ok(wishlistItems);
        }
    }
}
