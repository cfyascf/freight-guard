using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sigloc.Application.DTOs
{
    public class OperationalSegmentDtos
    {
        public record CreateOperationalSegmentDto(
    Guid ContractorId,
    string OriginAddressText,
    string DestinationAddressText,
    decimal DistanceKm,
    DateTime PickupDeadline,
    DateTime DeliveryDeadline,
    decimal EstimatedTollCost,
    decimal EstimatedTime,
    string OriginAddressCoordinates,
    string DestinationAddressCoordinates,
    decimal? FinancialCap = null,
    Guid? RouteId = null,
    SegmentStatus Status = SegmentStatus.DISPONIVEL
);

        public record UpdateOperationalSegmentDto(
    string OriginAddressText,
    string DestinationAddressText,
    decimal DistanceKm,
    DateTime PickupDeadline,
    DateTime DeliveryDeadline,
    decimal EstimatedTollCost,
    decimal EstimatedTime,
    string OriginAddressCoordinates,
    string DestinationAddressCoordinates,
    decimal? FinancialCap = null,
    Guid? RouteId = null,
    SegmentStatus Status = SegmentStatus.DISPONIVEL
);

        public record OperationalSegmentResponseDto(
    Guid Id,
    Guid ContractorId,
    Guid? RouteId,
    string OriginAddressText,
    string DestinationAddressText,
    decimal DistanceKm,
    decimal? FinancialCap,
    DateTime PickupDeadline,
    DateTime DeliveryDeadline,
    SegmentStatus Status,
    decimal EstimatedTollCost,
    decimal EstimatedTime,
    string OriginAddressCoordinates,
    string DestinationAddressCoordinates
);
    }
}