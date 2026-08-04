namespace Sigloc.Domain.Constants;

public static class Roles
{
    public const string Admin = "Admin";
    public const string Shipper = "Shipper"; // Contratante
    public const string Carrier = "Carrier"; // Transportador
}

public static class Policies
{
    public const string RequireShipperAccess = "RequireShipperAccess";
    public const string RequireCarrierAccess = "RequireCarrierAccess";
    public const string RequireAdminAccess = "RequireAdminAccess";
}
