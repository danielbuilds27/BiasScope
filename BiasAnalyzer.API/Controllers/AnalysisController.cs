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
    private readonly UrlScraperService _scraper;

    public AnalysisController(BiasAnalysisOrchestrator orchestrator, IAnalysisRepository repository, UrlScraperService scraper)
    {
        _orchestrator = orchestrator;
        _repository = repository;
        _scraper = scraper;
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

    [HttpPost("url")]
    public async Task<IActionResult> AnalyzeUrl([FromBody] string url)
    {
        var text = await _scraper.ExtractTextAsync(url);
        if (string.IsNullOrWhiteSpace(text)) return BadRequest("Nu s-a putut extrage text din URL.");
        var result = await _orchestrator.AnalyzeAsync(text);
        await _repository.AddAsync(result);
        return Ok(result);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var analysis = await _repository.GetByIdAsync(id);
        if (analysis == null) return NotFound();
        return Ok(analysis);
    }
}


