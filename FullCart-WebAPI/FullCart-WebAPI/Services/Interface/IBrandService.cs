using FullCart_WebAPI.Models;

namespace FullCart_WebAPI.Services.Interface
{
    public interface IBrandService
    {
        Task<List<Brand>> GetAllBrands();
        Task<Brand?> GetBrandById(int id);
        Task<List<Brand>> AddBrand(Brand brand);
        Task<Brand?> UpdateBrand(Brand oldBrand);
    }
}
