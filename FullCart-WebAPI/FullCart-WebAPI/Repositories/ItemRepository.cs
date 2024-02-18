using FullCart_WebAPI.Data;
using FullCart_WebAPI.Models;
using FullCart_WebAPI.Repositories.Interface;
using Microsoft.EntityFrameworkCore;

namespace FullCart_WebAPI.Repositories
{
    public class ItemRepository : IItemRepository
    {
        private readonly DataContext _dataContext;

        public ItemRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<List<Item>> AddItem(Item item)
        {
            await LoadAndSetBrand(item);
            await LoadAndSetCategory(item);

            _dataContext.Items.Add(item);
            await _dataContext.SaveChangesAsync();
            return await _dataContext.Items.ToListAsync();
        }

        public async Task<List<Item>> AddItemsFromExcel(List<Item> items)
        {
            foreach (var item in items)
            {
                await LoadAndSetBrand(item);
                await LoadAndSetCategory(item);
                _dataContext.Items.Add(item);
            }
            await _dataContext.SaveChangesAsync();
            return await _dataContext.Items.ToListAsync();
        }

        public async Task<List<Item>?> DeleteItem(int id)
        {
            var item = await _dataContext.Items.FindAsync(id);
            if (item is null)
                return null;

            _dataContext.Items.Remove(item);
            await _dataContext.SaveChangesAsync();

            return await _dataContext.Items.ToListAsync();
        }

        public async Task<List<Item>> GetItems()
        {
            var items = await _dataContext.Items
                .Include(item => item.Brand)
                .Include(item => item.Category).ToListAsync();
            return items;
        }
        public async Task<Item?> UpdateItem(Item oldItem)
        {
            var newItem = await _dataContext.Items.FindAsync(oldItem.Id);
            if (newItem is null)
                return null;
            newItem.Name = oldItem.Name;
            newItem.Description = oldItem.Description;
            newItem.ImageUrl = oldItem.ImageUrl;
            newItem.Price = oldItem.Price;
            newItem.Quantity = oldItem.Quantity;
            newItem.CategoryId = oldItem.CategoryId;
            newItem.BrandId = oldItem.BrandId;

            await LoadAndSetBrand(newItem);
            await LoadAndSetCategory(newItem);

            await _dataContext.SaveChangesAsync();

            return await _dataContext.Items.FindAsync(oldItem.Id);
        }

        public async Task<List<Item>> UpdateItemsFromExcel(List<Item> itemsToUpdate)
        {
            foreach (var item in itemsToUpdate)
            {
                var updatedItem = await _dataContext.Items.FindAsync(item.Id);
                if (updatedItem is null) continue;
                updatedItem.Name = item.Name;
                updatedItem.Description = item.Description;
                updatedItem.ImageUrl = item.ImageUrl;
                updatedItem.Price = item.Price;
                updatedItem.Quantity = item.Quantity;
                updatedItem.BrandId = item.BrandId;
                updatedItem.CategoryId = item.CategoryId;

                await LoadAndSetBrand(updatedItem);
                await LoadAndSetCategory(updatedItem);
            }
            await _dataContext.SaveChangesAsync();
            return await _dataContext.Items.ToListAsync();
        }

        private async Task LoadAndSetBrand(Item item)
        {
            if (item.BrandId != 0)
            {
                var existingBrand = await _dataContext.Brands.FindAsync(item.BrandId);
                if (existingBrand != null)
                {
                    item.Brand = existingBrand;
                }
            }
        }

        private async Task LoadAndSetCategory(Item item)
        {
            if (item.CategoryId != 0)
            {
                var existingCategory = await _dataContext.Categories.FindAsync(item.CategoryId);
                if (existingCategory != null)
                {
                    item.Category = existingCategory;
                }
            }
        }
    }
}