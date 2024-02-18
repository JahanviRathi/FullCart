using System.ComponentModel.DataAnnotations;

namespace FullCart_WebAPI.Models
{
    public class Brand
    {
        [Key]
        public int BrandId { get; set; }
        public string BrandName { get; set; } = string.Empty;
        public string ImageUrl { get; set; } = string.Empty;
    }
}
