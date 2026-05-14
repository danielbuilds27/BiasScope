using BiasAnalyzer.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace BiasAnalyzer.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options ) : base(options) { }
    public DbSet<TextAnalysis> Analyses {get; set; }
    public DbSet<GaucherWord> GaucherWords {get; set; }
    public DbSet<WordOccurence> WordOccurences {get; set;}
}