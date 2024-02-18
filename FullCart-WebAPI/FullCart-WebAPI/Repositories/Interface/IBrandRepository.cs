using FullCart_WebAPI.Models;

namespace FullCart_WebAPI.Repositories.Interface
{
    public interface IBrandRepository
    {
        Task<List<Brand>> GetAllBrands();
        Task<Brand?> GetBrandById(int id);
        Task<List<Brand>> AddBrand(Brand brand);
        Task<Brand?> UpdateBrand(Brand oldBrand);
    }
}
