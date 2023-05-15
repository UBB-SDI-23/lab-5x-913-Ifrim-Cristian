using api.DTOs;
using api.Models;
using AutoMapper;

namespace api.Mappings;

public class CigaretteMappings : Profile
{
    public CigaretteMappings()
    {
        // Source -> Target
        CreateMap<AddCigaretteDto, Cigarette>();
        CreateMap<Cigarette, AddCigaretteDto>();
        CreateMap<Cigarette, ShowCigaretteDto>()
            .ForMember(dest => dest.NumberOfOrders, opt => opt.MapFrom(src => src.Orders.Count));
    }
}
