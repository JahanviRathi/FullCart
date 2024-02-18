using FullCart_WebAPI.Models;
using FullCart_WebAPI.Repositories;
using FullCart_WebAPI.Repositories.Interface;
using FullCart_WebAPI.Services.Interface;
using OfficeOpenXml;

namespace FullCart_WebAPI.Services
{
    public class BrandService : IBrandService
    {
        private readonly IBrandRepository _brandRepository;

        public BrandService(IBrandRepository brandRepository)
        {
            _brandRepository = brandRepository;
        }

        public async Task<List<Brand>> AddBrand(Brand brand)
        {
            var brands = await _brandRepository.AddBrand(brand);
            return brands;
        }

        public async Task<List<Brand>> GetAllBrands()
        {
            var brands = await _brandRepository.GetAllBrands();
            return brands;
        }

        public async Task<Brand?> GetBrandById(int id)
        {
            var brand = await _brandRepository.GetBrandById(id);
            return brand;
        }

        public async Task<Brand?> UpdateBrand(Brand oldBrand)
        {
            var newBrand = await _brandRepository.UpdateBrand(oldBrand);
            return newBrand;
        }
    }
}
