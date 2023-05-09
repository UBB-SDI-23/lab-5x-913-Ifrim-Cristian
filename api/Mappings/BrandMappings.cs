using api.DTOs;
using api.Models;
using AutoMapper;

namespace api.Mappings
{
    public class BrandMappings : Profile
    {
        public BrandMappings()
        {
            // Source -> Target
            CreateMap<AddBrandDto, Brand>();
            CreateMap<Brand, AddBrandDto>()
                .ForMember(dest => dest.BrandId, opt => opt.MapFrom(src => src.Id));
            CreateMap<Brand, ShowBrandDto>();
            CreateMap<Brand, BrandStatisticDto>()
                .ForMember(dest => dest.AverageNicotine, opt => opt.MapFrom(src => (src.Cigarettes == null || src.Cigarettes.Count() == 0)? 0 : src.Cigarettes.Average(c => c.NicotineQuantity)));
            CreateMap<Brand, BrandPriceStatisticDto>()
                .ForMember(dest => dest.AveragePrice, opt => opt.MapFrom(src => (src.Cigarettes == null || src.Cigarettes.Count() == 0)? 0 : src.Cigarettes.Average(c => c.Price)));
        }
    }

}