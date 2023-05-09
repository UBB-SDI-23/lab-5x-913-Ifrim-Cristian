using api.DTOs;
using api.Errors;
using api.Models;
using api.Repositories.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BrandController : ControllerBase
    {
        private readonly IBrandRepository _repo;
        private readonly IMapper _mapper;
        public BrandController(IBrandRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllBrands()
        {
            var brands = await _repo.GetAll();
            
            if (brands == null)
            {
                return NotFound();
            }

            return Ok(_mapper.Map<ICollection<AddBrandDto>>(brands));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetBrandById(int id)
        {
            var brand = await _repo.GetById(id);

            if (brand == null)
            {
                throw new BrandNotFoundException(id);
            }
            
            return Ok(_mapper.Map<ShowBrandDto>(brand));
        }

        [HttpPost]
        public async Task<IActionResult> PostBrand([FromBody] AddBrandDto addBrandDto)
        {
            var brandExists = await _repo.BrandExists(addBrandDto.Name);

            if (brandExists) return BadRequest();

            var newBrand = _mapper.Map<Brand>(addBrandDto);

            await _repo.Add(newBrand);

            return Created(nameof(GetBrandById), newBrand);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBrand([FromRoute] int id, [FromBody] AddBrandDto addBrandDto)
        {
            var updatedBrand = await _repo.GetById(id);

            if (updatedBrand == null)
            {
                throw new BrandNotFoundException(id);
            }

            updatedBrand = _mapper.Map<AddBrandDto, Brand>(addBrandDto, updatedBrand);

            return await _repo.Update(updatedBrand) ? Ok(updatedBrand) : BadRequest();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBrand(int id)
        {
            var brand = await _repo.GetById(id);

            if (brand == null)
            {
                throw new BrandNotFoundException(id);
            }

            await _repo.Delete(brand);

            return Ok();
        }

        [HttpGet("statistics")]
        public async Task<IActionResult> GetStatistics()
        {
            var brands = await _repo.GetAll();

            if(brands == null)
            {
                return NotFound();
            }
            
            return Ok(_mapper.Map<IEnumerable<BrandStatisticDto>>(brands).OrderByDescending(x => x.AverageNicotine));
        }

        [HttpGet("price-statistics")]
        public async Task<IActionResult> GetPriceStatistics()
        {
            var brands = await _repo.GetAll();

            if(brands == null)
            {
                return NotFound();
            }
            
            return Ok(_mapper.Map<IEnumerable<BrandPriceStatisticDto>>(brands).OrderByDescending(x => x.AveragePrice));
        }
    }
}