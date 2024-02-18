using FullCart_WebAPI.Models;
using FullCart_WebAPI.Repositories.Interface;
using FullCart_WebAPI.Services.Interface;

namespace FullCart_WebAPI.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly ICategoryRepository _categoryRepository;

        public CategoryService(ICategoryRepository categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }

        public async Task<List<Category>> AddCategory(Category category)
        {
            var categories = await _categoryRepository.AddCategory(category);
            return categories;
        }

        public async Task<List<Category>> GetAllCategories()
        {
            var categories = await _categoryRepository.GetAllCategories();
            return categories;
        }

        public async Task<Category?> GetCategoryById(int id)
        {
            var category = await _categoryRepository.GetCategoryById(id);
            return category;
        }

        public async Task<Category?> UpdateCategory(Category oldCategory)
        {
            var newCategory = await _categoryRepository.UpdateCategory(oldCategory);
            return newCategory;
        }
    }
}
