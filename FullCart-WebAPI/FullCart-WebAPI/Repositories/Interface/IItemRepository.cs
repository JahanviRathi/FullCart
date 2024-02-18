using FullCart_WebAPI.Models;

namespace FullCart_WebAPI.Repositories.Interface
{
    public interface IItemRepository
    {
        Task<List<Item>> GetItems();
        Task<List<Item>> AddItem(Item item);
        Task<List<Item>> AddItemsFromExcel(List<Item> items);
        Task<List<Item>?> DeleteItem(int id);
        Task<Item?> UpdateItem(Item oldItem);
        Task<List<Item>> UpdateItemsFromExcel(List<Item> itemsToUpdate);
    }
}
