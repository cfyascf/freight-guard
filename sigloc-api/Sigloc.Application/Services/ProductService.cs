using Sigloc.Application.Contracts;
using Sigloc.Application.DTOs;
using Sigloc.Domain.Entities;
using Sigloc.Domain.Repositories;

namespace Sigloc.Application.Services;

public class ProductService : IProductService
{
    private readonly IProductRepository _repository;

    public ProductService(IProductRepository repository)
    {
        _repository = repository;
    }

    public async Task<ProductResponseDto> CreateAsync(CreateProductDto dto, CancellationToken cancellationToken = default)
    {
        var product = new Product
        {
            Sku = dto.Sku,
            PackageType = dto.PackageType,
            Temperature = dto.Temperature,
            HandlingRestrictions = dto.HandlingRestrictions
        };

        await _repository.AddAsync(product, cancellationToken);

        return new ProductResponseDto(product.Id, product.Sku, product.PackageType, product.Temperature, product.HandlingRestrictions);
    }

    public async Task<ProductResponseDto> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var product = await _repository.GetByIdAsync(id, cancellationToken);
        if (product == null)
        {
            throw new KeyNotFoundException($"Product with ID {id} not found.");
        }

        return new ProductResponseDto(product.Id, product.Sku, product.PackageType, product.Temperature, product.HandlingRestrictions);
    }

    public async Task<IEnumerable<ProductResponseDto>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        var products = await _repository.GetAllAsync(cancellationToken);
        return products.Select(p => new ProductResponseDto(p.Id, p.Sku, p.PackageType, p.Temperature, p.HandlingRestrictions));
    }

    public async Task UpdateAsync(Guid id, UpdateProductDto dto, CancellationToken cancellationToken = default)
    {
        var product = await _repository.GetByIdAsync(id, cancellationToken);
        if (product == null)
        {
            throw new KeyNotFoundException($"Product with ID {id} not found.");
        }

        product.PackageType = dto.PackageType;
        product.Temperature = dto.Temperature;
        product.HandlingRestrictions = dto.HandlingRestrictions;

        await _repository.UpdateAsync(product, cancellationToken);
    }

    public async Task DeleteAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var product = await _repository.GetByIdAsync(id, cancellationToken);
        if (product == null)
        {
            throw new KeyNotFoundException($"Product with ID {id} not found.");
        }

        await _repository.DeleteAsync(product, cancellationToken);
    }
}