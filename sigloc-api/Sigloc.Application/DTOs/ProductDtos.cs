namespace Sigloc.Application.DTOs;

public record CreateProductDto(string Sku, string? PackageType, string? Temperature, string? HandlingRestrictions);
public record UpdateProductDto(string? PackageType, string? Temperature, string? HandlingRestrictions);
public record ProductResponseDto(Guid Id, string Sku, string? PackageType, string? Temperature, string? HandlingRestrictions);
