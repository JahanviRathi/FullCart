using FullCart_WebAPI.Data;
using FullCart_WebAPI.Models;
using FullCart_WebAPI.Repositories.Interface;
using Microsoft.EntityFrameworkCore;

namespace FullCart_WebAPI.Repositories
{
    public class CategoryRepository: ICategoryRepository
    {
        private readonly DataContext _dataContext;

        public CategoryRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<List<Category>> AddCategory(Category category)
        {
            _dataContext.Categories.Add(category);
            await _dataContext.SaveChangesAsync();
            return await _dataContext.Categories.ToListAsync();
        }

        public async Task<List<Category>> GetAllCategories()
        {
            var categories = await _dataContext.Categories.ToListAsync();
            return categories;
        }

        public async Task<Category?> GetCategoryById(int id)
        {
            var category = await _dataContext.Categories.FindAsync(id);
            if (category == null)
                return null;
            return category;
        }

        public async Task<Category?> UpdateCategory(Category oldCategory)
        {
            var newCategory = await _dataContext.Categories.FindAsync(oldCategory.CategoryId);
            if (newCategory == null)
                return null;
            newCategory.CategoryName = oldCategory.CategoryName;
            newCategory.ImageUrl = oldCategory.ImageUrl;

            await _dataContext.SaveChangesAsync();
            return await _dataContext.Categories.FindAsync(oldCategory.CategoryId);
        }
    }
}
