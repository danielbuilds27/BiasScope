using BiasAnalyzer.Core.Enums;
using BiasAnalyzer.Core.Models;

namespace BiasAnalyzer.Services;

public class GaucherAnalysisService
{
    private readonly List<GaucherWord> _gaucherWords;

    public GaucherAnalysisService(List<GaucherWord> gaucherWords)
    {
        _gaucherWords = gaucherWords;
    }

    public List<WordOccurence> AnalyzeText(string text)
    {
        var words = text.ToLower().Split(' ',System.StringSplitOptions.RemoveEmptyEntries);
        var results = new List<WordOccurence>();

        foreach (var word in words)
        {
            var match = _gaucherWords.FirstOrDefault(g=> g.Word == word);
            if (match != null)
            {
                results.Add(new WordOccurence
                {
                    Word = word,
                    BiasType = match.BiasType

                });
            }

        }
    
        return results;
    }
    public double CalculateScore(List<WordOccurence> occurences , GenderBiasType type)
    {
        if (occurences.Count == 0) return 0;
        return (double)occurences.Count(o => o.BiasType == type) / occurences.Count * 100;
    }
}
