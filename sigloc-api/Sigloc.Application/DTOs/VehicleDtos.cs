using System;
using Sigloc.Domain.Enums;

namespace Sigloc.Application.DTOs
{
    public record CreateVehicleDto(
        string Plate, 
        string Model, 
        decimal Weight, 
        decimal Volume, 
        VehicleBodyType BodyType
    );

    public record UpdateVehicleDto(
        string? Model, 
        decimal? Weight, 
        decimal? Volume, 
        VehicleBodyType? BodyType
    );

    public record VehicleResponseDto(
        Guid Id, 
        string Plate, 
        string Model, 
        decimal Weight, 
        decimal Volume, 
        VehicleBodyType BodyType, 
        string Status
    );
}                   