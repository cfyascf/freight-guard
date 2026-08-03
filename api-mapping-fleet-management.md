# API Mapping — Fleet Management

### GET `/api/v1/fleet/vehicles`
- **Consumer:** FleetManagement
- **Goal:** Return a searchable, filterable list of vehicles with summary fields and support quick dashboard stats.
- **Business Logic Specification:**
  1. Authenticate caller and restrict results to the tenant/carrier scope.
  2. Support filtering by `status` (enum: AVAILABLE, LOCKED, IN_TRANSIT, MAINTENANCE), free-text `search` across `plate`, `model`, `driver`, and `location`, and pagination.
  3. Return lightweight vehicle descriptors used by the UI vehicle cards.

**Input Contract (Request):**
```json
{
  "pathVariables": {},
  "queryParameters": {
    "search": "string (optional)",
    "status": "string (optional)",
    "page": "integer (optional)",
    "pageSize": "integer (optional)"
  },
  "body": {}
}
```

**Output Contract (Response):**
```json
{
  "statusCode": 200,
  "body": {
    "items": [
      {
        "id": "string",
        "plate": "string",
        "type": "string",
        "driver": "string",
        "driverPhone": "string",
        "capacity": "string",
        "volumeM3": "number",
        "currentLocation": "string",
        "status": "string",
        "features": ["string"],
        "lockedPeriodsCount": "integer"
      }
    ],
    "page": "integer",
    "pageSize": "integer",
    "total": "integer"
  }
}
```

---

### GET `/api/v1/fleet/vehicles/{vehicleId}`
- **Consumer:** FleetManagement
- **Goal:** Return the full vehicle detail required for the expanded card view.

**Input Contract (Request):**
```json
{ "pathVariables": { "vehicleId": "string (required)" }, "queryParameters": {}, "body": {} }
```

**Output Contract (Response):**
```json
{
  "statusCode": 200,
  "body": {
    "id": "string",
    "plate": "string",
    "type": "string",
    "driver": "string",
    "driverPhone": "string",
    "capacity": "string",
    "volumeM3": "number",
    "currentLocation": "string",
    "status": "string",
    "features": ["string"],
    "lockedPeriods": [
      { "bidId": "string", "routeId": "string", "routeName": "string", "startDate": "string", "endDate": "string" }
    ],
    "maintenanceReason": "string (optional)",
    "lastMaintenance": "string",
    "nextMaintenance": "string"
  }
}
```

---

### PUT `/api/v1/fleet/vehicles/{vehicleId}`
- **Consumer:** FleetManagement
- **Goal:** Update vehicle operational attributes from the inline edit form.
- **Business Logic Specification:**
  1. Authenticate caller and verify update permission.
  2. Validate payload and ensure vehicle belongs to tenant scope.
  3. Apply updates to driver, driverPhone, location, status, capacity, volumeM3, and features.

**Input Contract (Request):**
```json
{
  "pathVariables": { "vehicleId": "string (required)" },
  "body": {
    "plate": "string (optional)",
    "type": "string (optional)",
    "driver": "string (optional)",
    "driverPhone": "string (optional)",
    "capacity": "string (optional)",
    "volumeM3": "number (optional)",
    "currentLocation": "string (optional)",
    "status": "string (optional, enum: ['AVAILABLE','LOCKED','IN_TRANSIT','MAINTENANCE'])",
    "features": ["string"]
  }
}
```

**Output Contract (Response):**
```json
{ "statusCode": 200, "body": { "vehicle": { /* updated vehicle object */ } } }
```

---

### DELETE `/api/v1/fleet/vehicles/{vehicleId}`
- **Consumer:** FleetManagement
- **Goal:** Remove a vehicle from the fleet after confirmation.
- **Business Logic Specification:**
  1. Authenticate caller and verify delete permission.
  2. Reject deletion if vehicle is currently assigned to an active transport or has locked periods overlapping now.

**Input Contract (Request):**
```json
{ "pathVariables": { "vehicleId": "string (required)" }, "queryParameters": {}, "body": {} }
```

**Output Contract (Response):**
```json
{ "statusCode": 200, "body": { "vehicleId": "string", "status": "deleted" } }
```

**Error Payload (409):**
```json
{ "statusCode": 409, "body": { "error": "VEHICLE_IN_USE", "message": "Vehicle cannot be deleted while assigned to an active transport" } }
```

---

### GET `/api/v1/fleet/stats`
- **Consumer:** FleetManagement
- **Goal:** Return the quick KPI counters used in the top stat cards (total, available, locked, inTransit, maintenance).

**Output Contract (Response):**
```json
{ "statusCode": 200, "body": { "total": "integer", "available": "integer", "locked": "integer", "inTransit": "integer", "maintenance": "integer" } }
```
