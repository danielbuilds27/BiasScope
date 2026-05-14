using BiasAnalyzer.Core.Models;

namespace BiasAnalyzer.Core.Interfaces;

public interface IAnalysisRepository
{
    Task<TextAnalysis> GetByIdAsync (int id);
    Task<IEnumerable<TextAnalysis>> GetAllAsync();
    Task AddAsync(TextAnalysis analysis);
    
}