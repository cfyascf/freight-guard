# API Mapping — Route Segment Management

### GET `/api/v1/segments`
- **Consumer:** RouteSegmentManagement
- **Goal:** List available route segments for selection, filtering, search and inline editing.
- **Business Logic Specification:**
  1. Support search by id, productName, origin, destination, bodyType and pagination.
  2. Return risk classification and quick metrics (weight, volume, distance, targetPrice).

**Input Contract (Request):**
```json
{ "query": { "search": "string (optional)", "bodyType": "string (optional)", "page": "integer (optional)", "pageSize": "integer (optional)" } }
```

**Output Contract (Response):**
```json
{ "status": 200, "body": { "items": [ { "id": "string", "productName": "string", "bodyType": "string", "loadType": "string", "origin": "string", "destination": "string", "risk": "string", "pickupWindow": "string", "weightKg": "number", "volumeM3": "number", "distanceKm": "number", "targetPrice": "number" } ], "page": "integer", "pageSize": "integer", "total": "integer" } }
```

---

### POST `/api/v1/segments` (create)
- **Consumer:** RouteSegmentManagement
- **Goal:** Create a new transport segment (Trecho) used by planners.
- **Business Logic Specification:**
  1. Validate required fields and optionally compute `distanceKm` using routing service when coordinates provided.
  2. Mark `status` default to `Available`.

**Input Contract (Request):**
```json
{ "body": { "productName": "string", "bodyType": "string", "loadType": "string", "origin": "string", "destination": "string", "pickupWindow": "string", "weightKg": "number", "volumeM3": "number", "distanceKm": "number (optional)", "targetPrice": "number", "risk": "string" } }
```

**Output Contract (Response):**
```json
{ "status": 201, "body": { "id": "string", "createdAt": "string" } }
```

---

### PUT `/api/v1/segments/{segmentId}` (update)
- **Consumer:** RouteSegmentManagement
- **Goal:** Persist inline edits from the management list.
- **Business Logic Specification:**
  1. Allow partial updates; validate changes; recalc derived metrics if needed.
  2. Record audit trail and return updated resource.

**Input Contract (Request):**
```json
{ "path": { "segmentId": "string" }, "body": { /* editable fields */ } }
```

**Output Contract (Response):**
```json
{ "status": 200, "body": { "id": "string", "updatedAt": "string" } }
```

---

### DELETE `/api/v1/segments/{segmentId}`
- **Consumer:** RouteSegmentManagement
- **Goal:** Remove a segment from the available pool.
- **Business Logic Specification:**
  1. Soft-delete by default; prevent deletion when segment is attached to active auction or route.

**Error Payloads:** 409 SEGMENT_IN_USE

---

**UI Notes:**
- The UI supports multi-select and advancing selected segment IDs to the `create-route-workspace` flow; ensure `POST /api/v1/routes` accepts arrays of `segmentIds`.
- Provide efficient list endpoints to support fast client-side filtering and selection UX.