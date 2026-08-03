# API Mapping — Active Route Tracking

### GET `/api/v1/routes/active/{routeId}`
- **Consumer:** ActiveRouteTracking
- **Goal:** Return the full monitoring snapshot for a single active route so the detail screen can render KPIs, route history, event logs, and driver/contact information.
- **Business Logic Specification:**
  1. Authenticate the caller and verify access to route monitoring for the requested route.
  2. Resolve the route by identifier and ensure it belongs to the current tenant/organization scope.
  3. Ensure the route is currently active or in progress; otherwise return a not found or invalid state error.
  4. Retrieve the latest route progress, ETA, SLA compliance, utilization, and last ping information from the operational data source.
  5. Retrieve the route stop history in chronological order, including origin, current stop, and planned future stops.
  6. Retrieve the latest event log entries associated with the route, sorted by timestamp descending.
  7. Retrieve the assigned carrier, vehicle, driver, and contact details linked to the route.
  8. Return only the fields required by the UI to avoid over-fetching and client-side recomputation.
  9. If the route is not found, return a structured 404 response.

**Input Contract (Request):**
```json
{
  "pathVariables": {
    "routeId": "string (required)"
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
    "routeId": "string",
    "routeName": "string",
    "status": "string",
    "progress": {
      "currentKm": "number",
      "totalKm": "number"
    },
    "slaCompliance": "number",
    "loadUtilization": "number",
    "eta": "string",
    "lastPing": "string",
    "currentStatus": {
      "label": "string",
      "type": "string",
      "time": "string"
    },
    "stops": [
      {
        "id": "string",
        "name": "string",
        "state": "string",
        "type": "string",
        "arrivedAt": "string (optional)",
        "expectedAt": "string (optional)",
        "sequence": "integer"
      }
    ],
    "events": [
      {
        "id": "string",
        "timestamp": "string",
        "eventType": "string",
        "message": "string"
      }
    ],
    "carrier": {
      "id": "string",
      "name": "string",
      "plate": "string"
    },
    "driver": {
      "id": "string",
      "name": "string",
      "phone": "string"
    },
    "geographicContext": {
      "currentKmMarker": "number",
      "routePath": "array"
    }
  }
}
```

**Error Payloads:**
```json
{
  "statusCode": 404,
  "body": {
    "error": "ROUTE_NOT_FOUND",
    "message": "Route not found"
  }
}
```

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
    "message": "User does not have permission to view this route"
  }
}
```

### POST `/api/v1/routes/active/{routeId}/ping`
- **Consumer:** ActiveRouteTracking
- **Goal:** Record a new driver location ping and refresh the tracking snapshot data used by the UI.
- **Business Logic Specification:**
  1. Authenticate the caller and verify the user has permission to trigger a location refresh for the route.
  2. Validate that the route exists and is currently active.
  3. Record the ping event with the current timestamp and the latest known GPS coordinates or device metadata.
  4. Update the route’s last ping timestamp and recompute any relevant SLA or progress values if required by business rules.
  5. Return the refreshed tracking summary so the client can update the UI immediately without reloading the page.
  6. If the request is malformed or the route is not active, return a validation error.

**Input Contract (Request):**
```json
{
  "pathVariables": {
    "routeId": "string (required)"
  },
  "queryParameters": {},
  "body": {
    "latitude": "number (optional)",
    "longitude": "number (optional)",
    "source": "string (optional, enum: ['device', 'manual'])"
  }
}
```

## **Output Contract (Response):**
```json
{
  "statusCode": 200,
  "body": {
    "routeId": "string",
    "lastPing": "string",
    "slaCompliance": "number",
    "currentStatus": {
      "label": "string",
      "type": "string",
      "time": "string"
    }
  }
}
```

**Error Payloads:**
```json
{
  "statusCode": 400,
  "body": {
    "error": "INVALID_PING",
    "message": "Ping payload is invalid"
  }
}
```

```json
{
  "statusCode": 404,
  "body": {
    "error": "ROUTE_NOT_FOUND",
    "message": "Route not found"
  }
}
```
