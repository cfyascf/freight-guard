using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Sigloc.Domain.Enums;

namespace Sigloc.Domain.Entities
{
    public class Vehicle : BaseEntity
    {
        public string Plate { get; private set; }
        public string Model { get; private set; }
        public decimal Weight { get; private set; }
        public decimal Volume { get; private set; }

        public VehicleBodyType BodyType { get; private set; }
        public string Status { get; private set; }
        
        //adicionado depois
        public string Driver { get; private set; }
        public string Current_loc { get; private set; }

        // O construtor garante que a entidade nasça válida e formatada
        public Vehicle(string plate, string model, decimal weight, decimal volume, VehicleBodyType bodyType, string status = "Livre", string driver, string current_loc)
        {
            // Validações básicas (você pode usar uma biblioteca como FluentValidation depois na Application)
            if (string.IsNullOrWhiteSpace(plate)) throw new ArgumentException("Placa é obrigatória");
            
            // Normalização da placa (Critério de Aceite)
            Plate = plate.Replace(" ", "").Replace("-", "").ToUpper();
            
            Model = model;
            Weight = weight;
            Volume = volume;
            BodyType = bodyType;
            Driver = driver;
            Current_loc = current_loc;
            
            // Status padrão (Critério de Aceite)
            Status = string.IsNullOrWhiteSpace(status) ? "Livre" : status;
        }
    }
}