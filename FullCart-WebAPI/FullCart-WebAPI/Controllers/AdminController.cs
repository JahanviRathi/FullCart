using FullCart_WebAPI.Models;
using FullCart_WebAPI.Services.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FullCart_WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin")]
    public class AdminController : ControllerBase
    {
        private readonly IItemService _itemService;
        private readonly IBrandService _brandService;
        private readonly ICategoryService _categoryService;
        private readonly IOrderService _orderService;

        public AdminController(
            IItemService itemService,
            IBrandService brandService,
            ICategoryService categoryService,
            IOrderService orderService
        )
        {
            _itemService = itemService;
            _brandService = brandService;
            _categoryService = categoryService;
            _orderService = orderService;
        }

        [HttpPost("items")]
        public async Task<ActionResult<List<Item>>> AddItem(Item item)
        {
            var items = await _itemService.AddItem(item);
            return Ok(items);
        }

        [HttpPost("items/excel")]
        public async Task<ActionResult<List<Item>>> AddItemsFromExcel([FromQuery] string filePath)
        {
            var items = await _itemService.AddItemsFromExcel(filePath);
            return Ok(items);
        }
        
        [HttpPut("items")]
        public async Task<ActionResult<Item>> UpdateItem(Item oldItem)
        {
            var updatedItem = await _itemService.UpdateItem(oldItem);
            if (updatedItem == null)
                return NotFound("No such Item is present in inventory");
            return Ok(updatedItem);
        }

        [HttpPut("items/excel")]
        public async Task<ActionResult<Item>> UpdateItemsFromExcel([FromQuery] string filePath)
        {
            var updatedItems = await _itemService.UpdateItemsFromExcel(filePath);
            return Ok(updatedItems);
        }

        [HttpDelete("items/{id}")]
        public async Task<ActionResult<List<Item>>> DeleteItem(int id)
        {
            var resultedItems = await _itemService.DeleteItem(id);
            if (resultedItems == null)
                return NotFound("No such Item is present in inventory");
            return Ok(resultedItems);
        }

        [HttpPost("brands")]
        public async Task<ActionResult<List<Brand>>> AddBrand(Brand brand)
        {
            var brands = await _brandService.AddBrand(brand);
            return Ok(brands);
        }

        [HttpGet("brands/{id}")]
        public async Task<ActionResult<List<Brand>>> GetBrandById(int id)
        {
            var brand = await _brandService.GetBrandById(id);
            if (brand == null) return NotFound("No such brand is present in inventory");
            return Ok(brand);
        }

        [HttpPut("brands")]
        public async Task<ActionResult<Brand>> UpdateBrand(Brand oldBrand)
        {
            var updatedBrand = await _brandService.UpdateBrand(oldBrand);
            if (updatedBrand == null)
                return NotFound("No such brand is present in inventory");
            return Ok(updatedBrand);
        }

        [HttpPost("categories")]
        public async Task<ActionResult<List<Category>>> AddCategory(Category category)
        {
            var categories = await _categoryService.AddCategory(category);
            return Ok(categories);
        }

        [HttpGet("categories/{id}")]
        public async Task<ActionResult<List<Category>>> GetCategoryById(int id)
        {
            var category = await _categoryService.GetCategoryById(id);
            if (category == null)
                return NotFound("No such category is present in inventory");
            return Ok(category);
        }

        [HttpPut("categories")]
        public async Task<ActionResult<Category>> UpdateCategory(Category oldCategory)
        {
            var updatedCategory = await _categoryService.UpdateCategory(oldCategory);
            if (updatedCategory == null)
                return NotFound("No such category is present in inventory");
            return Ok(updatedCategory);
        }

        [HttpGet("orders")]
        public async Task<ActionResult<List<Order>>> GetAllOrders()
        {
            var orders = await _orderService.GetAllOrders();
            return Ok(orders);
        }
    }
}
