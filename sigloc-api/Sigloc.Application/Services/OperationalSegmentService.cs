using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sigloc.Application.Services
{
   public class OperationalSegmentService : IOperationalSegmentService
{
    private readonly IOperationalSegmentRepository _repository;

    public OperationalSegmentService(IOperationalSegmentRepository repository)
    {
        _repository = repository;
    }

    public async Task<OperationalSegmentResponseDto> CreateAsync(CreateOperationalSegmentDto dto, CancellationToken cancellationToken = default)
    {
        var segment = new OperationalSegment(
            dto.ContractorId,
            dto.OriginAddressText,
            dto.DestinationAddressText,
            dto.DistanceKm,
            dto.PickupDeadline,
            dto.DeliveryDeadline,
            dto.EstimatedTollCost,
            dto.EstimatedTime,
            dto.OriginAddressCoordinates,
            dto.DestinationAddressCoordinates,
            dto.FinancialCap,
            dto.RouteId,
            dto.Status
        );

        await _repository.AddAsync(segment, cancellationToken);

        return MapToResponseDto(segment);
    }

    public async Task<OperationalSegmentResponseDto> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var segment = await _repository.GetByIdAsync(id, cancellationToken);
        if (segment == null)
        {
            throw new KeyNotFoundException($"OperationalSegment with ID {id} not found.");
        }

        return MapToResponseDto(segment);
    }

    public async Task<IEnumerable<OperationalSegmentResponseDto>> GetAllAsync(CancellationToken cancellationToken = default)
    {
        var segments = await _repository.GetAllAsync(cancellationToken);
        return segments.Select(MapToResponseDto);
    }

    public async Task UpdateAsync(Guid id, UpdateOperationalSegmentDto dto, CancellationToken cancellationToken = default)
    {
        var segment = await _repository.GetByIdAsync(id, cancellationToken);
        if (segment == null)
        {
            throw new KeyNotFoundException($"OperationalSegment with ID {id} not found.");
        }

        // Substituição pelo objeto atualizado mantendo a chave primária
        var updatedSegment = new OperationalSegment(
            segment.ContractorId,
            dto.OriginAddressText,
            dto.DestinationAddressText,
            dto.DistanceKm,
            dto.PickupDeadline,
            dto.DeliveryDeadline,
            dto.EstimatedTollCost,
            dto.EstimatedTime,
            dto.OriginAddressCoordinates,
            dto.DestinationAddressCoordinates,
            dto.FinancialCap,
            dto.RouteId,
            dto.Status
        );

        await _repository.UpdateAsync(updatedSegment, cancellationToken);
    }

    public async Task DeleteAsync(Guid id, CancellationToken cancellationToken = default)
    {
        var segment = await _repository.GetByIdAsync(id, cancellationToken);
        if (segment == null)
        {
            throw new KeyNotFoundException($"OperationalSegment with ID {id} not found.");
        }

        await _repository.DeleteAsync(segment, cancellationToken);
    }

    private static OperationalSegmentResponseDto MapToResponseDto(OperationalSegment segment)
    {
        return new OperationalSegmentResponseDto(
            segment.Id,
            segment.ContractorId,
            segment.RouteId,
            segment.OriginAddressText,
            segment.DestinationAddressText,
            segment.DistanceKm,
            segment.FinancialCap,
            segment.PickupDeadline,
            segment.DeliveryDeadline,
            segment.Status,
            segment.EstimatedTollCost,
            segment.EstimatedTime,
            segment.OriginAddressCoordinates,
            segment.DestinationAddressCoordinates
        );
    }
 }
}