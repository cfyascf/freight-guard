namespace Sigloc.Application.Contracts;

public interface IJwtProvider
{
    string Generate(Guid userId, string email, string role);
}
