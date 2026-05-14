using BiasAnalyzer.Core.Enums;

namespace BiasAnalyzer.Core.Models;

public class TextAnalysis
{
    public int Id {get; set; }
    public string Content {get; set; } = string.Empty;
    public DateTime AnalyzedAt {get; set; } 
    public double MasculineScore {get; set; }
    public double FeminineScore {get; set; }
    public string? ClaudeSummary {get; set; } 
}