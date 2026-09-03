using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sigloc.Domain.Entities
{
    public class OperationalSegment : BaseEntity
    {public class OperationalSegment : BaseEntity
    {
        public Guid ContractorId { get; private set; }
        public Guid? RouteId { get; private set; }
        public string OriginAddressText { get; private set; }
        public string DestinationAddressText { get; private set; }
        public decimal DistanceKm { get; private set; }
        public decimal? FinancialCap { get; private set; }
        public DateTime PickupDeadline { get; private set; }
        public DateTime DeliveryDeadline { get; private set; }
        public SegmentStatus Status { get; private set; }
        public decimal EstimatedTollCost { get; private set; }
        public decimal EstimatedTime { get; private set; }
        public string OriginAddressCoordinates { get; private set; }
        public string DestinationAddressCoordinates { get; private set; }

        // Construtor protegido para frameworks de ORM (como Entity Framework)
        protected OperationalSegment() { }

        public OperationalSegment(
            
            Guid contractorId,
            string originAddressText,
            string destinationAddressText,
            decimal distanceKm,
            DateTime pickupDeadline,
            DateTime deliveryDeadline,
            decimal estimatedTollCost,
            decimal estimatedTime,
            string originAddressCoordinates,
            string destinationAddressCoordinates,
            decimal? financialCap = null,
            Guid? routeId = null,
            SegmentStatus status = SegmentStatus.DISPONIVEL)
        {
            if (contractorId == Guid.Empty)
                throw new ArgumentException("O Contratante é obrigatório.");

            if (string.IsNullOrWhiteSpace(originAddressText))
                throw new ArgumentException("O endereço de origem é obrigatório.");

            if (string.IsNullOrWhiteSpace(destinationAddressText))
                throw new ArgumentException("O endereço de destino é obrigatório.");

            if (distanceKm <= 0)
                throw new ArgumentException("A distância deve ser maior que zero.");

            if (estimatedTime <= 0)
                throw new ArgumentException("O tempo estimado deve ser maior que zero.");

            if (estimatedTollCost < 0)
                throw new ArgumentException("O valor de pedágio não pode ser negativo.");

            if (string.IsNullOrWhiteSpace(originAddressCoordinates))
                throw new ArgumentException("As coordenadas da origem são obrigatórias.");

            if (string.IsNullOrWhiteSpace(destinationAddressCoordinates))
                throw new ArgumentException("As coordenadas do destino são obrigatórias.");

            if (deliveryDeadline <= pickupDeadline)
                throw new ArgumentException("A data de entrega deve ser posterior à data de coleta.");

            ContractorId = contractorId;
            OriginAddressText = originAddressText.Trim();
            DestinationAddressText = destinationAddressText.Trim();
            DistanceKm = distanceKm;
            PickupDeadline = pickupDeadline;
            DeliveryDeadline = deliveryDeadline;
            EstimatedTollCost = estimatedTollCost;
            EstimatedTime = estimatedTime;
            OriginAddressCoordinates = originAddressCoordinates.Trim();
            DestinationAddressCoordinates = destinationAddressCoordinates.Trim();
            FinancialCap = financialCap;
            RouteId = routeId;
            Status = status;
        }

        // Métodos de domínio para alterar estado (exemplo)
        public void ConsolidateRoute(Guid routeId)
        {
            if (routeId == Guid.Empty)
                throw new ArgumentException("O ID da rota deve ser válido.");

            RouteId = routeId;
            Status = SegmentStatus.ROTEIRIZADO;
        }

        public void UpdateStatus(SegmentStatus newStatus)
        {
            Status = newStatus;
        }
    }
 }
}