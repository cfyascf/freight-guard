using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sigloc.Domain.Repositories
{
    public interface IOperationalSegmentRepository
    {
    Task<OperationalSegment?> GetByIdAsync(Guid id, CancellationToken cancellationToken = default);
     Task<IEnumerable<OperationalSegment>> GetAllAsync(CancellationToken cancellationToken = default);
     Task AddAsync(OperationalSegment operationalSegment, CancellationToken cancellationToken = default);
    Task UpdateAsync(OperationalSegment operationalSegment, CancellationToken cancellationToken = default);
    Task DeleteAsync(OperationalSegment operationalSegment, CancellationToken cancellationToken = default);
    }
}