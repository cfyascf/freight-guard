# API Mapping — Create Route Segment

### GET `/api/v1/products`
- **Consumer:** CreateRouteSegment
- **Goal:** Provide searchable product catalog entries used by the product selector on the create-segment form.
- **Business Logic Specification:**
  1. Authenticate caller and restrict product catalog by tenant scope when applicable.
  2. Support free-text `search` matching on SKU, name, and details.
  3. Support paging and a reasonable default page size for select dropdowns.
  4. Return lightweight product descriptors used by the UI select component.

**Input Contract (Request):**
```json
{
  "pathVariables": {},
  "queryParameters": {
    "search": "string (optional)",
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
      { "id": "string", "value": "string", "sku": "string", "name": "string", "details": "string" }
    ],
    "page": "integer",
    "pageSize": "integer",
    "total": "integer"
  }
}
```

---

### POST `/api/v1/route-segments`
- **Consumer:** CreateRouteSegment
- **Goal:** Create a new operational route segment using the form data (product, itinerary, dimensions, SLA, and financial guide).
- **Business Logic Specification:**
  1. Authenticate the caller and verify permission to create route segments.
  2. Validate required fields (product / sku or productId, origin, destination, weight, volume, required equipment, deadlines, budget ceiling).
  3. Compute derived values where applicable (ANTT floor calculation can be deferred to a separate endpoint but must not block creation).
  4. Persist the route segment in the tenant scope and return the created resource identifier.
  5. Enforce business rules: weight/volume positive, deadlines are chronological, equipment restriction enumerations are valid.

**Input Contract (Request):**
```json
{
  "pathVariables": {},
  "queryParameters": {},
  "body": {
    "productId": "string (optional if sku provided)",
    "sku": "string (optional if productId provided)",
    "productName": "string (optional)",
    "origin": "string (required)",
    "destination": "string (required)",
    "weightKg": "number (required)",
    "volumeM3": "number (required)",
    "equipmentRestriction": "string (required, enum: ['nenhuma','seca','sider','frigorifico','prancha'])",
    "pickupDeadline": "string (optional, format: ISO-8601)",
    "deliveryDeadline": "string (optional, format: ISO-8601)",
    "budgetCeiling": "number (required)",
    "notes": "string (optional)"
  }
}
```

**Output Contract (Response):**
```json
{
  "statusCode": 201,
  "body": {
    "id": "string",
    "status": "string",
    "message": "string",
    "segment": {
      "id": "string",
      "productId": "string",
      "origin": "string",
      "destination": "string",
      "weightKg": "number",
      "volumeM3": "number",
      "equipmentRestriction": "string",
      "pickupDeadline": "string",
      "deliveryDeadline": "string",
      "budgetCeiling": "number"
    }
  }
}
```

**Error Payloads:**
```json
{
  "statusCode": 400,
  "body": { "error": "VALIDATION_ERROR", "message": "string", "details": [{"field":"string","message":"string"}] }
}
```

```json
{
  "statusCode": 401,
  "body": { "error": "UNAUTHORIZED", "message": "Authentication token missing or invalid" }
}
```

```json
{
  "statusCode": 403,
  "body": { "error": "FORBIDDEN", "message": "User does not have permission to create route segments" }
}
```
