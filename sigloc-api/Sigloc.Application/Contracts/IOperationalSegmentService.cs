using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sigloc.Application.Contracts
{
    public class IOperationalSegmentService
    {
    Task<OperationalSegmentResponseDto> CreateAsync(CreateOperationalSegmentDto dto, CancellationToken cancellationToken = default);
    Task<OperationalSegmentResponseDto> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);
    Task<IEnumerable<OperationalSegmentResponseDto>> GetAllAsync(CancellationToken cancellationToken = default);
    Task UpdateAsync(Guid id, UpdateOperationalSegmentDto dto, CancellationToken cancellationToken = default);
    Task DeleteAsync(Guid id, CancellationToken cancellationToken = default);
    }
}