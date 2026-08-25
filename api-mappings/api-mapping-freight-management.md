# API Mapping — Freight Management

### GET `/api/v1/fleet/vehicles`
- **Consumer:** FreightManagement
- **Goal:** Return the list of vehicles available for fleet management, including operational status, capacity, assigned driver, and current location.
- **Business Logic Specification:**
  1. Authenticate the caller and verify access to fleet management data.
  2. Retrieve vehicles belonging to the current organization or carrier scope.
  3. Support search across plate, model, body type, driver, location, and status.
  4. Return capacity fields in a shape directly usable by the UI without client-side formatting.
  5. Expose vehicle status so the UI can render the appropriate badge and visual state.

**Input Contract (Request):**
```json
{
  "pathVariables": {},
  "queryParameters": {
    "search": "string (optional)"
  },
  "body": {}
}
```

## **Output Contract (Response):**
```json
{
  "statusCode": 200,
  "body": {
    "vehicles": [
      {
        "id": "string",
        "plate": "string",
        "model": "string",
        "bodyType": "string",
        "driver": "string",
        "location": "string",
        "status": "string",
        "weightKg": "number",
        "volumeM3": "number"
      }
    ]
  }
}
```

**Error Payloads:**
```json
{
  "statusCode": 401,
  "body": {
    "error": "UNAUTHORIZED",
    "message": "Authentication token is missing or invalid"
  }
}
```

```json
{
  "statusCode": 403,
  "body": {
    "error": "FORBIDDEN",
    "message": "User does not have permission to manage fleet"
  }
}
```

### PUT `/api/v1/fleet/vehicles/{vehicleId}`
- **Consumer:** FreightManagement
- **Goal:** Update an existing vehicle’s operational and capacity attributes directly from the inline edit form.
- **Business Logic Specification:**
  1. Authenticate the caller and verify access to fleet modification.
  2. Validate that the vehicle exists and belongs to the current organization.
  3. Apply updates to plate, model, driver, body type, location, status, weight capacity, and volume capacity.
  4. Reject invalid status values or inconsistent capacity values.
  5. Return the updated vehicle record and confirmation metadata.

**Input Contract (Request):**
```json
{
  "pathVariables": {
    "vehicleId": "string (required)"
  },
  "queryParameters": {},
  "body": {
    "plate": "string (required)",
    "model": "string (required)",
    "bodyType": "string (required)",
    "driver": "string (required)",
    "location": "string (required)",
    "status": "string (required, enum: ['Livre', 'Em Trânsito', 'Manutenção'])",
    "weightKg": "number (required)",
    "volumeM3": "number (required)"
  }
}
```

## **Output Contract (Response):**
```json
{
  "statusCode": 200,
  "body": {
    "vehicle": {
      "id": "string",
      "plate": "string",
      "model": "string",
      "bodyType": "string",
      "driver": "string",
      "location": "string",
      "status": "string",
      "weightKg": "number",
      "volumeM3": "number"
    }
  }
}
```

**Error Payloads:**
```json
{
  "statusCode": 400,
  "body": {
    "error": "VALIDATION_ERROR",
    "message": "string",
    "details": [
      {
        "field": "string",
        "message": "string"
      }
    ]
  }
}
```

```json
{
  "statusCode": 404,
  "body": {
    "error": "VEHICLE_NOT_FOUND",
    "message": "Vehicle not found"
  }
}
```

### DELETE `/api/v1/fleet/vehicles/{vehicleId}`
- **Consumer:** FreightManagement
- **Goal:** Remove a vehicle from the fleet after user confirmation.
- **Business Logic Specification:**
  1. Authenticate the caller and verify access to fleet deletion.
  2. Validate that the vehicle exists and is not currently assigned to an active transport.
  3. Remove the vehicle from the fleet inventory.
  4. Return a success confirmation once the deletion is complete.

**Input Contract (Request):**
```json
{
  "pathVariables": {
    "vehicleId": "string (required)"
  },
  "queryParameters": {},
  "body": {}
}
```

## **Output Contract (Response):**
```json
{
  "statusCode": 200,
  "body": {
    "vehicleId": "string",
    "status": "string",
    "message": "string"
  }
}
```

**Error Payloads:**
```json
{
  "statusCode": 409,
  "body": {
    "error": "VEHICLE_IN_USE",
    "message": "Vehicle cannot be deleted while assigned to an active transport"
  }
}
```
