using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FullCart_WebAPI.Models
{
    public class Item
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string ImageUrl {  get; set; } = string.Empty;
        public int Price {  get; set; }
        public int Quantity { get; set; }
        public int BrandId {  get; set; }

        [ForeignKey("BrandId")]
        public Brand? Brand { get; set; }

        public int CategoryId { get; set; }

        [ForeignKey("CategoryId")]
        public Category? Category { get; set; }
    }
}
