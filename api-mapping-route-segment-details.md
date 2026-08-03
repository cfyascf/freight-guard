# API Mapping — Route Segment Details

### GET `/api/v1/routes/{routeId}`
- **Consumer:** RouteSegmentDetails
- **Goal:** Retrieve a consolidated route (multiple segments) with itinerary, aggregated weight/volume, and auction context.
- **Business Logic Specification:**
  1. Authenticate and apply tenant scoping and authorization to view the route.
  2. Expand `segments` with minimal segment summary (id, load, from, to, value) used by the UI.
  3. Include `auctionInfo` when route is in auction state: bids, bestBid, leader.
  4. Compute derived fields: `totalWeightKg`, `totalVolumeM3`, `totalDistanceKm`, `targetFare`, `anttFloor`.

**Input Contract (Request):**
```json
{ "path": { "routeId": "string" }, "query": {} }
```

**Output Contract (Response):**
```json
{ "status": 200, "body": { "id": "string", "name": "string", "status": "string", "risk": "string", "totalWeightKg": "number", "totalVolumeM3": "number", "totalDistanceKm": "number", "targetFare": "number", "bodyType": "string", "itinerary": [ { "city": "string", "action": "string", "time": "string" } ], "segments": [ { "id": "string", "load": "string", "from": "string", "to": "string", "value": "number" } ], "auctionInfo": { "bids": "integer", "bestBid": "number", "leader": "string" } } }
```

**Errors:** 404 Not Found, 403 Forbidden

---

### GET `/api/v1/routes/{routeId}/map` (optional)
- **Consumer:** RouteSegmentDetails
- **Goal:** Return geojson or map-ready coordinates for visual route plotting.

**Output Contract (Response):**
```json
{ "status": 200, "body": { "geoJson": { /* GeoJSON FeatureCollection */ } } }
```

---

**UI Notes:**
- The UI uses read-optimized payloads; avoid embedding heavy historical telemetry in this endpoint.
- `anttFloor` can be computed client-side but including it server-side ensures consistent business rules.
