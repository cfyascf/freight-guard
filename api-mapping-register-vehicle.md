# API Mapping — Register Vehicle

### POST `/api/v1/vehicles`
- **Consumer:** RegisterVehicle
- **Goal:** Register a new vehicle into the tenant's fleet.
- **Business Logic Specification:**
  1. Authenticate caller and enforce tenant scoping and permissions to add fleet assets.
  2. Validate required fields: `plate` (unique), `model`, `weightKg`, `volumeM3`, `bodyType`.
  3. Normalize plate (uppercase, remove whitespace) and enforce uniqueness; return 409 if duplicate.
  4. Default `status` to `Livre` when omitted.
  5. Record createdBy and createdAt metadata; integrate with operation center for immediate listing when `status` is `Livre`.

**Input Contract (Request):**
```json
{ "body": { "plate": "string", "model": "string", "driver": "string|null", "location": "string|null", "weightKg": "number", "volumeM3": "number", "bodyType": "string", "status": "string (optional)" } }
```

**Output Contract (Response):**
```json
{ "status": 201, "body": { "id": "string", "plate": "string", "createdAt": "string" } }
```

**Errors:** 400 Validation errors, 409 Plate already exists, 403 Forbidden

---

### GET `/api/v1/vehicles/validate-plate?plate={plate}`
- **Consumer:** RegisterVehicle
- **Goal:** Quick check for plate uniqueness used by the form.

**Request:**
```json
{ "query": { "plate": "string" } }
```

**Response:**
```json
{ "status": 200, "body": { "available": "boolean" } }
```

---

### GET `/api/v1/vehicle-body-types`
- **Consumer:** RegisterVehicle
- **Goal:** Provide allowed `bodyType` options to populate the select list.

**Response:**
```json
{ "status": 200, "body": { "items": [ { "id": "string", "label": "string", "description": "string" } ] } }
```

---

**UI Notes:**
- The form normalizes plate and uses it as the unique identifier.
- `status` controls whether the vehicle is immediately eligible for assignment; default semantics documented in the business logic.
- Validation should ensure numeric fields (`weightKg`, `volumeM3`) are positive and within reasonable bounds for vehicle classes.
