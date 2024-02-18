using FullCart_WebAPI.Models;

namespace FullCart_WebAPI.Services.Interface
{
    public interface IItemService
    {
        Task<List<Item>> AddItem(Item item);
        Task<List<Item>> GetItems();
        Task<Item?> UpdateItem(Item oldItem);
        Task<List<Item>?> DeleteItem(int id);
        Task<List<Item>> AddItemsFromExcel(string filePath);
        Task<List<Item>> UpdateItemsFromExcel(string filePath);
    }
}
