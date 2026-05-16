using HtmlAgilityPack;

namespace BiasAnalyzer.Services;

public class UrlScraperService
{
    private readonly HttpClient _httpClient;

    public UrlScraperService(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public async Task<string> ExtractTextAsync(string url)
    {
        _httpClient.DefaultRequestHeaders.UserAgent.ParseAdd("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36");
        var html = await _httpClient.GetStringAsync(url);

        var doc = new HtmlDocument();
        doc.LoadHtml(html);

        var nodes = doc.DocumentNode.SelectNodes("//p | //h1 | //h2 | //h3");
        if (nodes == null) return string.Empty;

        var text = string.Join(" ", nodes.Select(n => n.InnerText.Trim()));
        return HtmlEntity.DeEntitize(text);
    }

}