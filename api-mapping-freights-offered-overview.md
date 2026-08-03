# API Mapping — Freights Offered Overview (Auction Board)

### GET `/api/v1/auctions`
- **Consumer:** FreightsOfferedOverview
- **Goal:** Return a paged list of auctioned freights (segment plans) filtered and searchable for the dashboard cards.
- **Business Logic Specification:**
  1. Authenticate caller and resolve tenant scope.
  2. Support search by auction ID or name, filtering by status (exclude 'Em montagem' by default), and paging.
  3. Provide aggregated fields used by cards: bestBid, totalBids, stops, bidDeadline, risk.

**Input Contract (Request):**
```json
{ "pathVariables": {}, "queryParameters": { "search": "string (optional)", "status": "string (optional)", "page": "integer (optional)", "pageSize": "integer (optional)" }, "body": {} }
```

**Output Contract (Response):**
```json
{ "statusCode": 200, "body": { "items": [ { "id": "string", "name": "string", "stops": ["string"], "bestBid": "number|null", "totalBids": "integer", "bidDeadline": "string", "risk": "string" } ], "page": "integer", "pageSize": "integer", "total": "integer" } }
```

---

### GET `/api/v1/auctions/{auctionId}`
- **Consumer:** FreightsOfferedOverview / AuctionBids
- **Goal:** Return full auction context and minimal route plan details when opening details or analysis.

**Input Contract (Request):**
```json
{ "pathVariables": { "auctionId": "string (required)" }, "queryParameters": {}, "body": {} }
```

**Output Contract (Response):**
```json
{ "statusCode": 200, "body": { "id": "string", "name": "string", "stops": ["string"], "bestBid": "number|null", "totalBids": "integer", "bidDeadline": "string", "risk": "string", "segments": [ { "id": "string", "load": "string", "value": "number" } ] } }
```

---

### PUT `/api/v1/auctions/{auctionId}`
- **Consumer:** FreightsOfferedOverview (card inline edit)
- **Goal:** Update editable auction metadata (name, bidDeadline) used by the inline editing flow.

**Input Contract (Request):**
```json
{ "pathVariables": { "auctionId": "string" }, "body": { "name": "string (optional)", "bidDeadline": "string (optional, ISO-8601)" } }
```

**Output Contract (Response):**
```json
{ "statusCode": 200, "body": { "id": "string", "name": "string", "bidDeadline": "string" } }
```

---

### DELETE `/api/v1/auctions/{auctionId}`
- **Consumer:** FreightsOfferedOverview
- **Goal:** Delete an auction after confirmation. Soft delete preferred.

**Input Contract (Request):**
```json
{ "pathVariables": { "auctionId": "string" }, "body": {} }
```

**Output Contract (Response):**
```json
{ "statusCode": 200, "body": { "auctionId": "string", "status": "deleted" } }
```

**Error Payload (404):**
```json
{ "statusCode": 404, "body": { "error": "AUCTION_NOT_FOUND", "message": "Auction not found" } }
```
