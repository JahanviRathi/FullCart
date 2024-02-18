using System.ComponentModel.DataAnnotations;

namespace FullCart_WebAPI.Models
{
    public class ShippingDetail
    {
        [Key]
        public int ShippingDetailId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
        public string PhoneNumber {  get; set; } = string.Empty;
    }
}
