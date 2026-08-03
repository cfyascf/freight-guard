# API Mapping — Active Routes Dashboard

### GET `/api/v1/routes/active`
- **Consumer:** ActiveRoutes
- **Goal:** Return a lightweight, paginated list of routes currently in execution so the screen can render the active-route cards without client-side transformation.
- **Business Logic Specification:**
  1. Authenticate the caller and require access to route monitoring permissions.
  2. Resolve the tenant/organization scope from the authenticated user and restrict results to routes belonging to that scope.
  3. Select only routes whose lifecycle state is active or in progress, excluding completed, cancelled, or archived routes.
  4. Apply optional search across route identifier, carrier name, and vehicle plate.
  5. Apply optional filters for route status, carrier, and vehicle plate.
  6. Compute derived presentation values for each route: progress percentage, ETA display string, and last ping timestamp formatted for display.
  7. Sort results by urgency, with delayed routes first and the earliest ETA next.
  8. Return only the fields required by the UI to minimize payload size and avoid client-side joins.
  9. If the query is paged, include pagination metadata and return an empty list when no records match.

**Input Contract (Request):**
```json
{
  "pathVariables": {},
  "queryParameters": {
    "search": "string (optional, max: 100)",
    "status": "string (optional, enum: ['all', 'Em curso', 'Atrasado'])",
    "carrierId": "string (optional)",
    "plate": "string (optional)",
    "page": "integer (optional, default: 1, minimum: 1)",
    "pageSize": "integer (optional, default: 20, minimum: 1, maximum: 100)"
  },
  "body": {}
}
```

## **Output Contract (Response):**
```json
{
  "statusCode": 200,
  "body": {
    "items": [
      {
        "id": "string",
        "transportadora": "string",
        "placa": "string",
        "status": "string",
        "progresso": "integer",
        "eta": "string",
        "lastPing": "string"
      }
    ],
    "page": "integer",
    "pageSize": "integer",
    "total": "integer",
    "hasMore": "boolean"
  }
}
```

**Error Payloads:**
```json
{
  "statusCode": 400,
  "body": {
    "error": "INVALID_QUERY",
    "message": "string"
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
    "message": "User does not have permission to view active routes"
  }
}
```
