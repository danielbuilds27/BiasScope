using BiasAnalyzer.Core.Enums;

namespace BiasAnalyzer.Core.Models;

public class GaucherWord
{
    public int Id {get; set; }
    public string Word {get; set; } = string.Empty;
    public GenderBiasType BiasType {get; set; }

}