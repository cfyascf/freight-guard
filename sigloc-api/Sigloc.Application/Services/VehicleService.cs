using Sigloc.Application.Contracts;
using Sigloc.Application.DTOs;
using Sigloc.Domain.Entities;
using Sigloc.Domain.Repositories;

namespace Sigloc.Application.Services;

    public class VehicleService : IVehicleService
    {
        private readonly IVehicleRepository _repository;

        public VehicleService(IVehicleRepository repository)
        {
            _repository = repository;
        }

        public async Task<VehicleResponseDto> CreateAsync(CreateVehicleDto dto, CancellationToken cancellationToken = default)
        {
            // 1. Normalizar a placa (maiúsculas, sem espaços ou hifens)
            var normalizedPlate = dto.Plate?.Replace(" ", "").Replace("-", "").ToUpper();

            // 2. Garantir unicidade
            if (await _repository.ExistsByPlateAsync(normalizedPlate, cancellationToken))
            {
                throw new InvalidOperationException($"Já existe um veículo cadastrado com a placa {normalizedPlate}.");
            }

            var normalizedPlate = dto.Plate?.Replace(" ", "").Replace("-", "").ToUpper();

            // Regex que aceita tanto o padrão Mercosul (ex: ABC1D23) quanto o antigo (ex: ABC1234)
            if (!System.Text.RegularExpressions.Regex.IsMatch(normalizedPlate, @"^[A-Z]{3}[0-9][A-Z0-9][0-9]{2}$"))
            {
                throw new ArgumentException("A placa informada não segue o padrão brasileiro válido.");
            }

            // 3. Criação da Entidade (O status "Livre" é atribuído no construtor por padrão)
            var vehicle = new Vehicle(
                normalizedPlate,
                dto.Model,
                dto.Weight,
                dto.Volume,
                dto.BodyType
            );

            await _repository.AddAsync(vehicle, cancellationToken);

            return new VehicleResponseDto(vehicle.Id, vehicle.Plate, vehicle.Model, vehicle.Weight, vehicle.Volume, vehicle.BodyType, vehicle.Status);
        }

        public async Task<VehicleResponseDto> GetByIdAsync(Guid id, CancellationToken cancellationToken = default)
        {
            var vehicle = await _repository.GetByIdAsync(id, cancellationToken);
            if (vehicle == null)
            {
                throw new KeyNotFoundException($"Vehicle with ID {id} not found.");
            }

            return new VehicleResponseDto(vehicle.Id, vehicle.Plate, vehicle.Model, vehicle.Weight, vehicle.Volume, vehicle.BodyType, vehicle.Status);
        }

        public async Task<IEnumerable<VehicleResponseDto>> GetAllAsync(CancellationToken cancellationToken = default)
        {
            var vehicles = await _repository.GetAllAsync(cancellationToken);
            return vehicles.Select(v => new VehicleResponseDto(v.Id, v.Plate, v.Model, v.Weight, v.Volume, v.BodyType, v.Status));
        }

        public async Task UpdateAsync(Guid id, UpdateVehicleDto dto, CancellationToken cancellationToken = default)
        {
            var vehicle = await _repository.GetByIdAsync(id, cancellationToken);
            if (vehicle == null)
            {
                throw new KeyNotFoundException($"Vehicle with ID {id} not found.");
            }

            // Atualização parcial validando os campos opcionais do UpdateVehicleDto
            if (!string.IsNullOrWhiteSpace(dto.Model)) vehicle.Model = dto.Model;
            if (dto.Weight.HasValue) vehicle.Weight = dto.Weight.Value;
            if (dto.Volume.HasValue) vehicle.Volume = dto.Volume.Value;
            if (dto.BodyType.HasValue) vehicle.BodyType = dto.BodyType.Value;

            await _repository.UpdateAsync(vehicle, cancellationToken);
        }

        public async Task DeleteAsync(Guid id, CancellationToken cancellationToken = default)
        {
            var vehicle = await _repository.GetByIdAsync(id, cancellationToken);
            if (vehicle == null)
            {
                throw new KeyNotFoundException($"Vehicle with ID {id} not found.");
            }

            await _repository.DeleteAsync(vehicle, cancellationToken);
        }

        // Método para atender o Critério de Aceite: "existir endpoint de validação rápida"
        public async Task<bool> IsPlateAvailableAsync(string plate, CancellationToken cancellationToken = default)
        {
            if (string.IsNullOrWhiteSpace(plate)) return false;
            
            var normalizedPlate = plate.Replace(" ", "").Replace("-", "").ToUpper();
            var exists = await _repository.ExistsByPlateAsync(normalizedPlate, cancellationToken);
            
            return !exists;
        }
    }
