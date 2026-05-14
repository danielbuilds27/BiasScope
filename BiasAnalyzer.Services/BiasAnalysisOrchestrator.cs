using BiasAnalyzer.Core.Enums;
using BiasAnalyzer.Core.Models;

namespace BiasAnalyzer.Services;

public class BiasAnalysisOrchestrator
{
    private readonly GaucherAnalysisService _gaucherService;
    private readonly ClaudeAnalysisService _claudeService;

    public BiasAnalysisOrchestrator(GaucherAnalysisService gaucherAnalysisService,ClaudeAnalysisService claudeService)
    {
        _gaucherService = gaucherAnalysisService;
        _claudeService = claudeService;
    }

    public async Task<TextAnalysis> AnalyzeAsync(string text)
    {
        var occurences = _gaucherService.AnalyzeText(text);
        var masculineScore = _gaucherService.CalculateScore(occurences, GenderBiasType.Masculine);
        var feminineScore = _gaucherService.CalculateScore(occurences, GenderBiasType.Feminine);
        string? claudeSummary = null;
        try { claudeSummary = await _claudeService.AnalyzeForBiasAsync(text); } catch { }

        return new TextAnalysis
        {
            Content = text,
            AnalyzedAt = DateTime.UtcNow,
            MasculineScore = masculineScore,
            FeminineScore = feminineScore,
            ClaudeSummary = claudeSummary
        };
    }
}