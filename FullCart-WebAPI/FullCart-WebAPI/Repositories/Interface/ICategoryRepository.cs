using FullCart_WebAPI.Models;

namespace FullCart_WebAPI.Repositories.Interface
{
    public interface ICategoryRepository
    {
        Task<List<Category>> GetAllCategories();
        Task<Category?> GetCategoryById(int id);
        Task<List<Category>> AddCategory(Category category);
        Task<Category?> UpdateCategory(Category oldCategory);
    }
}
