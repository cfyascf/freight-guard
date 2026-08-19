namespace Sigloc.Infrastructure.Authentication;

public class JwtSettings
{
    // A handy constant to keep the appsettings.json section name tied to this class
    public const string SectionName = "Jwt";

    public string SecretKey { get; init; } = string.Empty;
    public string Issuer { get; init; } = string.Empty;
    public string Audience { get; init; } = string.Empty;
    public int ExpiryMinutes { get; init; }
}
