# API Mapping — Control Tower

### GET `/api/v1/control-tower/routes`
- **Consumer:** ControlTower
- **Goal:** Return the list of active and adjudicated routes that need monitoring, together with their execution progress and itinerary state.
- **Business Logic Specification:**
  1. Authenticate the caller and verify access to operational monitoring.
  2. Retrieve routes belonging to the current tenant/organization scope that are currently active, adjudicated, or in execution.
  3. Compute progress percentage using completed stops versus total stops.
  4. Include route-level metadata such as carrier, status, closing value, and itinerary summary.
  5. Return the list in a shape optimized for the left-hand route selection panel and progress cards.

**Input Contract (Request):**
```json
{
  "pathVariables": {},
  "queryParameters": {
    "status": "string (optional, enum: ['active', 'adjudicated', 'all'])"
  },
  "body": {}
}
```

## **Output Contract (Response):**
```json
{
  "statusCode": 200,
  "body": {
    "routes": [
      {
        "id": "string",
        "carrier": "string",
        "status": "string",
        "closingValue": "number",
        "itinerary": "string",
        "completedStops": "integer",
        "totalStops": "integer",
        "progress": "integer"
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
    "message": "User does not have permission to view control tower data"
  }
}
```

### GET `/api/v1/control-tower/routes/{routeId}`
- **Consumer:** ControlTower
- **Goal:** Return the full execution timeline and route context for a selected active route.
- **Business Logic Specification:**
  1. Authenticate the caller and verify access to monitor the requested route.
  2. Resolve the route by identifier and ensure it belongs to the current scope.
  3. Retrieve the execution timeline events in order, each tagged with its current state: done, active, or future.
  4. Include route-level metadata such as carrier, route identifier, and closing value.
  5. Return the timeline in a format ready for rendering without client-side mapping.

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
    "id": "string",
    "carrier": "string",
    "status": "string",
    "closingValue": "number",
    "timeline": [
      {
        "id": "string",
        "label": "string",
        "state": "string"
      }
    ]
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

### POST `/api/v1/control-tower/routes/{routeId}/pod-upload`
- **Consumer:** ControlTower
- **Goal:** Accept a proof-of-delivery document upload and finalize the route timeline for the selected route.
- **Business Logic Specification:**
  1. Authenticate the caller and verify permission to submit delivery evidence.
  2. Validate that the route exists and is currently active or adjudicated.
  3. Store the uploaded document securely and associate it with the route.
  4. Mark the route as finalized and update all timeline events to a completed state.
  5. Return the updated route status and proof-of-delivery reference.

**Input Contract (Request):**
```json
{
  "pathVariables": {
    "routeId": "string (required)"
  },
  "queryParameters": {},
  "body": {
    "file": "object (required)",
    "fileName": "string (required)",
    "contentType": "string (required)"
  }
}
```

## **Output Contract (Response):**
```json
{
  "statusCode": 200,
  "body": {
    "routeId": "string",
    "status": "string",
    "podReference": "string"
  }
}
```

**Error Payloads:**
```json
{
  "statusCode": 400,
  "body": {
    "error": "INVALID_UPLOAD",
    "message": "Proof of delivery upload is invalid"
  }
}
```
