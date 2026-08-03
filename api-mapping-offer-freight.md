# API Mapping — Offer Freight (Route Workspace / Create Auction)

### POST `/api/v1/route-workspace/preview`
- **Consumer:** OfferFreight
- **Goal:** Accept a list of selected segment IDs and return a consolidated preview (timeline nodes, totalDistance, maxWeight, maxVolume, minimumFreightValue, estimatedTolls, costPerKm, estimatedHours, requirements, restrictiveRequirement) used to populate the workspace before creating the auction.
- **Business Logic Specification:**
  1. Authenticate caller and resolve tenant scope.
  2. Validate all `segmentIds` exist and belong to the tenant.
  3. Aggregate selected segments into a unified timeline, compute totals (distance, weight, volume), compute commercial intelligence values (minimumFreightValue, estimatedTolls, costPerKm, estimatedHours), and produce the requirement set and restrictive equipment suggestion.
  4. Return a lightweight preview object; do not create persistent state yet.

**Input Contract (Request):**
```json
{ "pathVariables": {}, "queryParameters": {}, "body": { "segmentIds": ["string" ] } }
```

**Output Contract (Response):**
```json
{ "statusCode": 200, "body": { "timeline": [ { "city": "string", "type": "string", "actions": ["string"] } ], "totalDistance": "number", "maxWeight": "number", "maxVolume": "number", "minimumFreightValue": "number", "estimatedTolls": "number", "costPerKm": "number", "estimatedHours": "number", "requirements": ["string"], "restrictiveRequirement": "string" } }
```

---

### POST `/api/v1/auctions`
- **Consumer:** OfferFreight
- **Goal:** Create a new auction (route consolidation) from the workspace data (selected segments, auctionDeadline, autoAward flag, budget parameters).
- **Business Logic Specification:**
  1. Authenticate caller and verify permission to create auctions.
  2. Validate workspace segments, deadlines, and budgetCeiling.
  3. Persist the auction and linked consolidated route, compute initial auction metadata (totalWeight, totalVolume, targetValue), and return the created auction id.
  4. Optionally trigger notifications to carriers or place the auction in open state based on `autoAward` rules.

**Input Contract (Request):**
```json
{ "pathVariables": {}, "queryParameters": {}, "body": { "segmentIds": ["string"], "auctionDeadline": "string (ISO-8601)", "autoAward": "boolean", "targetValue": "number (required)", "notes": "string (optional)" } }
```

**Output Contract (Response):**
```json
{ "statusCode": 201, "body": { "auctionId": "string", "routeId": "string", "status": "string", "message": "string" } }
```

**Error Payloads:**
```json
{ "statusCode": 400, "body": { "error": "VALIDATION_ERROR", "message": "string", "details": [{"field":"string","message":"string"}] } }
```

```json
{ "statusCode": 409, "body": { "error": "SEGMENT_CONFLICT", "message": "One or more selected segments are locked or in active auctions" } }
```
