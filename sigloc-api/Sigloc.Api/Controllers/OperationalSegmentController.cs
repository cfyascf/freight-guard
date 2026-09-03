using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Sigloc.Application.Contracts;
using Sigloc.Application.DTOs;
using Sigloc.Domain.Constants;
using System;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;

namespace Sigloc.Api.Controllers;

[ApiController]
[Route("api/operational-segments")]
[Authorize]
public class OperationalSegmentController : ControllerBase
{
    private readonly IOperationalSegmentService _operationalSegmentService;

    public OperationalSegmentController(IOperationalSegmentService operationalSegmentService)
    {
        _operationalSegmentService = operationalSegmentService;
    }

    private Guid GetUserIdFromToken()
    {
        var claim = User.FindFirst(ClaimTypes.NameIdentifier);
        return claim != null ? Guid.Parse(claim.Value) : Guid.Empty;
    }

    [HttpPost]
    [Authorize(Policy = Policies.RequireShipperAccess)]
    public async Task<IActionResult> Create([FromBody] CreateOperationalSegmentDto dto, CancellationToken cancellationToken)
    {
        var userId = GetUserIdFromToken();
        var result = await _operationalSegmentService.CreateAsync(dto, cancellationToken);
        return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
    }

    [HttpGet("{id}")]
    [Authorize(Policy = Policies.RequireShipperAccess)]
    public async Task<IActionResult> GetById(Guid id, CancellationToken cancellationToken)
    {
        var result = await _operationalSegmentService.GetByIdAsync(id, cancellationToken);
        return Ok(result);
    }

    [HttpGet]
    [Authorize(Policy = Policies.RequireShipperAccess)]
    public async Task<IActionResult> GetAll(CancellationToken cancellationToken)
    {
        var userId = GetUserIdFromToken();
        var result = await _operationalSegmentService.GetAllAsync(cancellationToken);
        return Ok(result);
    }

    [HttpPut("{id}")]
    [Authorize(Roles = "Carrier")]
    [Authorize(Policy = Policies.RequireShipperAccess)]
    public async Task<IActionResult> Update(Guid id, [FromBody] UpdateOperationalSegmentDto dto, CancellationToken cancellationToken)
    {
        await _operationalSegmentService.UpdateAsync(id, dto, cancellationToken);
        return NoContent();
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Carrier")]
    [Authorize(Policy = Policies.RequireShipperAccess)]
    public async Task<IActionResult> Delete(Guid id, CancellationToken cancellationToken)
    {
        await _operationalSegmentService.DeleteAsync(id, cancellationToken);
        return NoContent();
    }
}