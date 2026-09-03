using Sigloc.Domain.Constants;

namespace Sigloc.Domain.Entities;

class ConsolidatedShipmentRoute: BaseEntity
{
    public required Guid ContratanteId { get; set; } //TODO: Trocar para contratante
    public required EnumRotaConsolidada Status { get; set; }
    public required double DistanciaTotalKm { get; set; }
    public required double TempoEstimadoHoras { get; set; }
    public required double TetoConsolidado { get; set; }
    public required double PisoAnttEstimado { get; set; }
    public required double PesoTotalKg { get; set; }
    public required double VolumeTotalM3 { get; set; }
}