using BiasAnalyzer.Core.Interfaces;
using BiasAnalyzer.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace BiasAnalyzer.Data.Repositories;

public class AnalysisRepository : IAnalysisRepository
{
    private readonly AppDbContext _context;

    public AnalysisRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<TextAnalysis> GetByIdAsync(int id)
    {
        return await _context.Analyses.FindAsync(id);
    }

    public async Task<IEnumerable<TextAnalysis>> GetAllAsync()
    {
        return await _context.Analyses.ToListAsync();
    }
    public async Task AddAsync(TextAnalysis analysis)
    {
        await _context.Analyses.AddAsync(analysis);
        await _context.SaveChangesAsync();
    }
}