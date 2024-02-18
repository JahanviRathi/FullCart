using FullCart_WebAPI.Data;
using FullCart_WebAPI.Models;
using FullCart_WebAPI.Repositories.Interface;
using Microsoft.EntityFrameworkCore;

namespace FullCart_WebAPI.Repositories
{
    public class BrandRepository: IBrandRepository
    {
        private readonly DataContext _dataContext;

        public BrandRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<List<Brand>> AddBrand(Brand brand)
        {
            _dataContext.Brands.Add(brand);
            await _dataContext.SaveChangesAsync();
            return await _dataContext.Brands.ToListAsync();
        }

        public async Task<List<Brand>> GetAllBrands()
        {
            var brands = await _dataContext.Brands.ToListAsync();
            return brands;
        }

        public async Task<Brand?> GetBrandById(int id)
        {
            var brand = await _dataContext.Brands.FindAsync(id);
            if (brand == null)
                return null;
            return brand;
        }

        public async Task<Brand?> UpdateBrand(Brand oldBrand)
        {
            var newBrand = await _dataContext.Brands.FindAsync(oldBrand.BrandId);
            if (newBrand == null)
                return null;
            newBrand.BrandName = oldBrand.BrandName;
            newBrand.ImageUrl = oldBrand.ImageUrl;
            await _dataContext.SaveChangesAsync();
            return await _dataContext.Brands.FindAsync(oldBrand.BrandId);
        }
    }
}
