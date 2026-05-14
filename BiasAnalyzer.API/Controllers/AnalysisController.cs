using BiasAnalyzer.Core.Interfaces;
using BiasAnalyzer.Services;
using Microsoft.AspNetCore.Mvc;

namespace BiasAnalyzer.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AnalysisController : ControllerBase
{
    private readonly BiasAnalysisOrchestrator _orchestrator;
    private readonly IAnalysisRepository _repository;

    public AnalysisController(BiasAnalysisOrchestrator orchestrator, IAnalysisRepository repository)
    {
        _orchestrator = orchestrator;
        _repository = repository;
    }

    [HttpPost]
    public async Task<IActionResult> Analyze([FromBody] string text)
    {
        var result = await _orchestrator.AnalyzeAsync(text);
        await _repository.AddAsync(result);
        return Ok(result);
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var analyses = await _repository.GetAllAsync();
        return Ok(analyses);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var analysis = await _repository.GetByIdAsync(id);
        if (analysis == null) return NotFound();
        return Ok(analysis);
    }
}


