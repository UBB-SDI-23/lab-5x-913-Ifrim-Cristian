using api.DTOs;
using api.Models;
using api.Repositories.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ClientController : ControllerBase
    {
        private readonly IClientRepository _repo;
        private readonly IOrderRepository _orderRepo;
        private readonly IMapper _mapper;

        public ClientController(IClientRepository repo, IOrderRepository orderRepository, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
            _orderRepo = orderRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllClients([FromQuery] int page = 1, [FromQuery] int pageSize = 30)
        {
            var clients = await _repo.GetAll(page, pageSize);
            if (clients == null)
            {
                return NotFound();
            }

            return Ok(_mapper.Map<IEnumerable<ShowClientDto>>(clients));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetClientById(int id)
        {
            var client = await _repo.GetById(id);
            if (client == null)
            {
                return NotFound();
            }

            return Ok(_mapper.Map<ShowClientAndOrdersDto>(client));
        }

        [HttpPost]
        public async Task<IActionResult> PostClient([FromBody] AddClientDto clientDto)
        {
            var clientExists = await _repo.ClientExists(clientDto.Email);

            if(clientExists) 
            { 
                return BadRequest();
            }

            var client = _mapper.Map<Client>(clientDto);
            await _repo.Add(client);

            return Created(nameof(GetClientById), client);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateClient(int id, [FromBody] AddClientDto clientDto)
        {
            var client = await _repo.GetById(id);

            if (client == null)
            {
                return NotFound();
            }

            _mapper.Map(clientDto, client);
            await _repo.Update(client);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteClient(int id)
        {
            var client = await _repo.GetById(id);

            if (client == null)
            {
                return NotFound();
            }

            await _repo.Delete(client);
            return Ok();
        }

        [HttpGet("{id}/orders")]
        public async Task<IActionResult> GetClientOrders(int id, [FromQuery] int page = 1, [FromQuery] int pageSize = 30)
        {
            var client = await _repo.GetById(id);

            if (client == null)
            {
                return NotFound();
            }

            var orders = await _orderRepo.GetByClientId(id, page, pageSize);
            return Ok(_mapper.Map<IEnumerable<ShowOrderDto>>(orders));
        }

        [HttpPost("{id}/orders")]
        public async Task<IActionResult> PostClientOrder(int id, [FromBody] ICollection<AddOrderDto> ordersDto)
        {
            var client = await _repo.GetById(id);

            if (client == null)
            {
                return NotFound();
            }
            foreach(var orderDto in ordersDto)
            {
                var order = _mapper.Map<Order>(orderDto);
                order.ClientId = id;
                order.OrderDate = DateTime.Now;
                await _orderRepo.Add(order);
            }

            return Ok();
        }

        [HttpPut("{id}/orders/{orderId}")]
        public async Task<IActionResult> UpdateClientOrder(int id, int orderId, [FromBody] AddOrderDto orderDto)
        {
            var client = await _repo.GetById(id);

            if (client == null)
            {
                return NotFound();
            }

            var order = await _orderRepo.GetById(orderId);

            if (order == null)
            {
                return NotFound();
            }

            _mapper.Map(orderDto, order);
            await _orderRepo.Update(order);
            return Ok();
        }

        [HttpPut("{id}/orders")]
        public async Task<IActionResult> UpdateClientOrders(int id, [FromBody] ICollection<int> orders)
        {
            var client = await _repo.GetById(id);

            if (client == null)
            {
                return NotFound();
            }

            foreach(var orderDto in orders)
            {
                var order = await _orderRepo.GetById(orderDto);

                if (order == null)
                {
                    return NotFound();
                }

                order.ClientId = id;
                order.Client = client;
                
                await _orderRepo.Update(order);
            }

            return Ok();
        }

        [HttpDelete("{id}/orders/{orderId}")]
        public async Task<IActionResult> DeleteClientOrder(int id, int orderId)
        {
            var client = await _repo.GetById(id);

            if (client == null)
            {
                return NotFound();
            }

            var order = await _orderRepo.GetById(orderId);

            if (order == null)
            {
                return NotFound();
            }

            await _orderRepo.Delete(order);
            return Ok();
        }
    }
}