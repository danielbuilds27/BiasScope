using Anthropic.SDK;
using Anthropic.SDK.Messaging;

namespace BiasAnalyzer.Services;

public class ClaudeAnalysisService
{
    private readonly AnthropicClient _client;

    public ClaudeAnalysisService(string apiKey)
    {
        _client = new AnthropicClient(apiKey);
    }

    public async Task<string> AnalyzeForBiasAsync(string text)
    {
        var messages = new List<Message>
        {
            new Message
            {
                Role = RoleType.User,
                Content = new List<ContentBase>
                {
                    new TextContent
                    {
                        Text = $@"Analyze the following text for gender bias based on Gaucher et al. (2011) research.
Identify masculine-coded and feminine-coded language.
Give a brief summary and suggest neutral alternatives where possible.

Text: {text}"
                    }
                }
            }
        };

        var request = new MessageParameters
        {
            Model = "claude-3-5-sonnet-20241022",
            MaxTokens = 1024,
            Messages = messages
        };
        var response = await _client.Messages.GetClaudeMessageAsync(request);
        return response.Content[0].ToString() ?? string.Empty;
    }
}