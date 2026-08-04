using System.ComponentModel.DataAnnotations.Schema;

namespace Sigloc.Domain.Entities;

[Table("Product")]
public class Product : BaseEntity
{
    public required string Sku { get; set; }
    public string? PackageType { get; set; }
    public string? Temperature { get; set; }
    public string? HandlingRestrictions { get; set; } 
}
