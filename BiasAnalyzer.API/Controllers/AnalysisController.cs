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

    [HttpPost("corpus")]
    public async Task<IActionResult> AnalyzeCorpus([FromBody] List<string> urls)
    {
        var results = new List<object>();

        foreach (var url in urls)
        {
            try
            {
                var text = await _scraper.ExtractTextAsync(url);
                if (string.IsNullOrWhiteSpace(text)) continue;
                var result = await _orchestrator.AnalyzeAsync(text);
                await _repository.AddAsync(result);
                results.Add(new
                {
                    url,
                    result.MasculineScore,
                    result.FeminineScore,
                    result.AnalyzedAt,
                    WordCount = result.WordOccurences.Count,
                    Words = result.WordOccurences.Select(w => new { w.Word, w.BiasType })

                });
            }
            catch { }
        }
        return Ok(new
        {
            TotalAnalyzed = results.Count,
            AverageMasculineScore = results.Average(r => (double)r.GetType().GetProperty("MasculineScore")!.GetValue(r)!),
            AverageFeminineScore = results.Average(r => (double)r.GetType().GetProperty("FeminineScore")!.GetValue(r)!),
            Results = results
        });
    }


    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var analysis = await _repository.GetByIdAsync(id);
        if (analysis == null) return NotFound();
        return Ok(analysis);
    }
}


