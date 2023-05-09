using api.DTOs;
using api.Models;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using api.Repositories.Interfaces;
using api.Errors;

namespace api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CigaretteController : ControllerBase
{
    private readonly ICigaretteRepository _repo;
    private readonly IMapper _mapper;
    public CigaretteController(ICigaretteRepository repo, IMapper mapper)
    {
        _repo = repo;
        _mapper = mapper;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllCigarettes()
    {
        var cigarettes = await _repo.GetAll();

        if (cigarettes == null)
        {
            return NotFound();
        }

        return Ok(_mapper.Map<IEnumerable<AddCigaretteDto>>(cigarettes));
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetCigaretteById(int id)
    {
        var cigarette = await _repo.GetById(id);

        if (cigarette == null)
        {
            throw new CigaretteNotFoundException(id);
        }
        
        return Ok(_mapper.Map<ShowCigaretteDto>(cigarette));
    }

    [HttpGet("filter/{price}")]
    public async Task<IActionResult> GetCigarettesByPrice([FromRoute] float price)
    {
        var cigarettes = await _repo.GetCigarettesByPrice(price);

        if (cigarettes == null)
        {
            throw new ConditionNotMetException();
        }
        return Ok(_mapper.Map<IEnumerable<ShowCigaretteDto>>(cigarettes));
    }

    [HttpPost]
    public async Task<IActionResult> PostCigarette([FromBody] AddCigaretteDto addCigaretteDto)
    {
        var cigaretteExists = await _repo.CigaretteExists(addCigaretteDto.BrandId, addCigaretteDto.Model, addCigaretteDto.Type);

        if (cigaretteExists)
        {
            return BadRequest();
        }

        var newCigarette = _mapper.Map<Cigarette>(addCigaretteDto);

        await _repo.Add(newCigarette);

        return Created(nameof(GetCigaretteById), newCigarette);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateCigarette([FromRoute] int id, [FromBody] AddCigaretteDto addCigaretteDto)
    {
        var updatedCigarette = await _repo.GetById(id);

        if (updatedCigarette == null)
        {
            throw new CigaretteNotFoundException(id);
        }

        updatedCigarette = _mapper.Map<AddCigaretteDto, Cigarette>(addCigaretteDto, updatedCigarette);

        return await _repo.Update(updatedCigarette) ? Ok(updatedCigarette) : BadRequest();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteCigarette(int id)
    {
        var cig = await _repo.GetById(id);

        if (cig == null)
        {
            throw new CigaretteNotFoundException(id);
        }

        await _repo.Delete(cig);

        return Ok();
    }
}
