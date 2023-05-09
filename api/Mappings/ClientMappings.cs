using api.DTOs;
using api.Models;
using AutoMapper;

namespace api.Mappings;

public class ClientMappings : Profile
{
    public ClientMappings()
    {
        // Source -> Target
        CreateMap<Client, ShowClientDto>();
        CreateMap<AddClientDto, Client>();
        CreateMap<Client, ShowClientAndOrdersDto>()
            .ForMember(dest => dest.Orders, opt => opt.MapFrom(src => src.Orders));
    }
}
