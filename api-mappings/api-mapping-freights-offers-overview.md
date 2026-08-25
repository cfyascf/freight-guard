# API Mapping — Freights Offers Overview (Opportunity Board)

### GET `/api/v1/freight-offers`
- **Consumer:** FreightsOffersOverview
- **Goal:** Return a paged list of freight opportunities visible on the opportunity board with summary fields used by the cards.
- **Business Logic Specification:**
  1. Authenticate caller and resolve tenant/partner scope if applicable.
  2. Support search by contractor, partner, or route label via a `search` query parameter and optional filters for risk, expiration, and bid status.
  3. Return aggregated fields: targetValue, totalBids, pickupLabel, etaLabel, totalWeight, totalVolume, requirements, isExpiringSoon, hoursLeft, segmentId.

**Input Contract (Request):**
```json
{ "pathVariables": {}, "queryParameters": { "search": "string (optional)", "risk": "string (optional)", "status": "string (optional)", "page": "integer (optional)", "pageSize": "integer (optional)" }, "body": {} }
```

**Output Contract (Response):**
```json
{ "statusCode": 200, "body": { "items": [ { "id": "string", "contractor": "string", "routeLabel": "string", "targetValue": "number", "totalBids": "integer", "pickupLabel": "string", "etaLabel": "string", "totalWeight": "string", "totalVolume": "string", "requirements": ["string"], "isExpiringSoon": "boolean", "hoursLeft": "number", "segmentId": "string", "risk": "string", "bidStatus": "string|null" } ], "page": "integer", "pageSize": "integer", "total": "integer" } }
```

---

### GET `/api/v1/freight-offers/{offerId}`
- **Consumer:** FreightsOffersOverview
- **Goal:** Return full details for a single freight offer when the user opens it, including requirements and bidding context.

**Input Contract (Request):**
```json
{ "pathVariables": { "offerId": "string (required)" }, "queryParameters": {}, "body": {} }
```

**Output Contract (Response):**
```json
{ "statusCode": 200, "body": { "id": "string", "segmentId": "string", "contractor": "string", "routeLabel": "string", "stops": ["string"], "targetValue": "number", "totalBids": "integer", "requirements": ["string"], "details": "string" } }
```

**Error Payloads:**
```json
{ "statusCode": 404, "body": { "error": "OFFER_NOT_FOUND", "message": "Offer not found" } }
```
