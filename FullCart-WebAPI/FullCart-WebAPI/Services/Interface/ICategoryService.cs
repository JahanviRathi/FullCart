using FullCart_WebAPI.Models;

namespace FullCart_WebAPI.Services.Interface
{
    public interface ICategoryService
    {
        Task<List<Category>> GetAllCategories();
        Task<Category?> GetCategoryById(int id);
        Task<List<Category>> AddCategory(Category category);
        Task<Category?> UpdateCategory(Category oldCategory);
    }
}
