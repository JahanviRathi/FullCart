using FullCart_WebAPI.Models;
using FullCart_WebAPI.Repositories.Interface;
using FullCart_WebAPI.Services.Interface;
using OfficeOpenXml;

namespace FullCart_WebAPI.Services
{
    public class ItemService : IItemService
    {
        private readonly IItemRepository _itemRepository;

        public ItemService(IItemRepository itemRepository)
        {
            _itemRepository = itemRepository;
        }

        public async Task<List<Item>> AddItem(Item item)
        {
            var items = await _itemRepository.AddItem(item);
            return items;
        }

        public async Task<List<Item>> AddItemsFromExcel(string filePath)
        {
            var itemsToAdd = new List<Item>();
            FileInfo fileInfo = new FileInfo(filePath);
            using (ExcelPackage package = new ExcelPackage(fileInfo))
            {
                ExcelWorksheet worksheet = package.Workbook.Worksheets[0];
                int rowCount = worksheet.Dimension.Rows;

                for (int row = 2; row <= rowCount; row++)
                {
                    var item = new Item
                    {
                        Name = worksheet.Cells[row, 1].Value?.ToString(),
                        Description = worksheet.Cells[row, 2].Value?.ToString(),
                        ImageUrl = worksheet.Cells[row, 3].Value?.ToString(),
                        Price = Convert.ToInt32(worksheet.Cells[row, 4].Value),
                        Quantity = Convert.ToInt32(worksheet.Cells[row, 5].Value),
                        BrandId = Convert.ToInt32(worksheet.Cells[row, 6].Value),
                        CategoryId = Convert.ToInt32(worksheet.Cells[row, 7].Value)
                    };
                    itemsToAdd.Add(item);
                }
            }
            var allItems = await _itemRepository.AddItemsFromExcel(itemsToAdd);
            return allItems;
        }

        public async Task<List<Item>?> DeleteItem(int id)
        {
            var items = await _itemRepository.DeleteItem(id);
            return items;
        }

        public async Task<List<Item>> GetItems()
        {
            return await _itemRepository.GetItems();
        }

        public async Task<Item?> UpdateItem(Item oldItem)
        {
            var newItem = await _itemRepository.UpdateItem(oldItem);
            return newItem;
        }

        public async Task<List<Item>> UpdateItemsFromExcel(string filePath)
        {
            var itemsToUpdate = new List<Item>();
            FileInfo fileInfo = new FileInfo(filePath);
            using (ExcelPackage package = new ExcelPackage(fileInfo))
            {
                ExcelWorksheet worksheet = package.Workbook.Worksheets[0];
                int rowCount = worksheet.Dimension.Rows;

                for (int row = 2; row <= rowCount; row++)
                {
                    var newItem = new Item();
                    newItem.Id = Convert.ToInt32(worksheet.Cells[row, 1].Value);
                    newItem.Name = worksheet.Cells[row, 2].Value?.ToString();
                    newItem.Description = worksheet.Cells[row, 3].Value?.ToString();
                    newItem.ImageUrl = worksheet.Cells[row, 4].Value?.ToString();
                    newItem.Price = Convert.ToInt32(worksheet.Cells[row, 5].Value);
                    newItem.Quantity = Convert.ToInt32(worksheet.Cells[row, 6].Value);
                    newItem.BrandId = Convert.ToInt32(worksheet.Cells[row, 7].Value);
                    newItem.CategoryId = Convert.ToInt32(worksheet.Cells[row, 8].Value);
                    itemsToUpdate.Add(newItem);
                }
            }
            var updatedItems = await _itemRepository.UpdateItemsFromExcel(itemsToUpdate);
            return updatedItems;
        }
    }
}
