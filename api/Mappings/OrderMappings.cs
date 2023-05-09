using api.DTOs;
using api.Models;
using AutoMapper;

namespace api.Mappings
{
    public class OrderMappings : Profile
    {
        public OrderMappings()
        {
            // Source -> Target
            CreateMap<AddOrderDto, Order>();
            CreateMap<Order, ShowOrderDto>();
        }
    }
}