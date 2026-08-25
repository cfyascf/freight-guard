using Sigloc.Application.DTOs;

namespace Sigloc.Application.Contracts;

public interface IProductService    
{
    Task<ProductResponseDto> CreateAsync(CreateProductDto dto, CancellationToken cancellationToken = default);
    Task<ProductResponseDto> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);
    Task<IEnumerable<ProductResponseDto>> GetAllAsync(CancellationToken cancellationToken = default);
    Task UpdateAsync(Guid id, UpdateProductDto dto, CancellationToken cancellationToken = default);
    Task DeleteAsync(Guid id, CancellationToken cancellationToken = default);
}