using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Sigloc.Domain.Enums;

namespace Sigloc.Domain.Entities
{
    public class Vehicle : BaseEntity
    {
        public Guid TransportadoraId { get; private set; } // FK
        public string Plate { get; private set; }
        public string Model { get; private set; }
        public decimal CapacityWeight { get; private set; }
        public decimal CapacityVolume { get; private set; }
        public int AxleCount { get; private set; }   // qtd de eixos
        public bool HasCargoSecuring { get; private set; } // possui Fixacao de Carga  
        public VehicleBodyType BodyType { get; private set; }
        public RefrigerationLevel RefrigerationLevel { get; private set; }
        public OperationalStatus Status { get; private set; }
        public bool HasMopp { get; private set; }
        public string Driver { get; private set; }
        public string Current_loc { get; private set; }

        // O construtor garante que a entidade nasça válida e formatada
        public Vehicle(
        Guid transportadoraId,
        string plate,
        string model,
        int axleCount,
        decimal capacityWeightKg,
        decimal capacityVolumeM3,
        VehicleBodyType bodyType,
        RefrigerationLevel refrigerationLevel,
        bool hasMopp,
        bool hasCargoSecuring,
        string driver,
        string currentLocation,
        OperationalStatus status = OperationalStatus.LIVRE)
    {
        // Validações de domínio
        if (transportadoraId == Guid.Empty) throw new ArgumentException("TransportadoraId é obrigatório");
        if (string.IsNullOrWhiteSpace(plate)) throw new ArgumentException("Placa é obrigatória");
        if (axleCount <= 0) throw new ArgumentException("A quantidade de eixos deve ser maior que zero (Cálculo ANTT/Pedágio).");
        if (capacityWeightKg <= 0) throw new ArgumentException("A capacidade de peso deve ser maior que zero.");
        if (capacityVolumeM3 <= 0) throw new ArgumentException("A capacidade de volume deve ser maior que zero.");

        TransportadoraId = transportadoraId;
        Plate = plate.Replace(" ", "").Replace("-", "").ToUpper();
        Model = model;
        AxleCount = axleCount;
        CapacityWeightKg = capacityWeightKg;
        CapacityVolumeM3 = capacityVolumeM3;
        BodyType = bodyType;
        RefrigerationLevel = refrigerationLevel;
        HasMopp = hasMopp;
        HasCargoSecuring = hasCargoSecuring;
        Driver = driver;
        CurrentLocation = currentLocation;
        Status = status;
         }
    }
}