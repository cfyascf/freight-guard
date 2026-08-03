# API Mapping — Partner Network

### GET `/api/v1/partners`
- **Consumer:** PartnerNetwork
- **Goal:** Return a paged list of partner organizations (carriers or contractors) visible in the partner network with summary fields and connection metadata.
- **Business Logic Specification:**
  1. Authenticate caller and determine view scope based on user role (`carrier` sees carrierPartners, `contractor` sees contractorPartners).
  2. Support optional search and filtering by status.
  3. Return partner summary fields: id, name, logoLetter, status, openOffers, currentLanes, fleetReady, lanesCovered, inviteCode, lastFreight, avgResponseTime, risk indicators.

**Input Contract (Request):**
```json
{ "pathVariables": {}, "queryParameters": { "search": "string (optional)", "status": "string (optional)", "page": "integer (optional)", "pageSize": "integer (optional)" }, "body": {} }
```

**Output Contract (Response):**
```json
{ "statusCode": 200, "body": { "items": [ { "id": "string", "name": "string", "logoLetter": "string", "status": "string", "openOffers": "integer", "currentLanes": "integer", "fleetReady": "integer", "lanesCovered": "integer", "inviteCode": "string|null", "lastFreight": "string|null", "avgResponseTime": "string|null", "risk": "string" } ], "page": "integer", "pageSize": "integer", "total": "integer" } }
```

---

### POST `/api/v1/partners/invite/validate`
- **Consumer:** PartnerNetwork
- **Goal:** Validate an invite URL or code provided by a carrier/contractor before accepting the connection.

**Input Contract (Request):**
```json
{ "pathVariables": {}, "queryParameters": {}, "body": { "inviteUrl": "string (optional)", "inviteCode": "string (optional)" } }
```

**Output Contract (Response):**
```json
{ "statusCode": 200, "body": { "valid": "boolean", "partnerId": "string|null", "message": "string" } }
```

**Error Payloads:**
```json
{ "statusCode": 400, "body": { "error": "INVALID_INVITE", "message": "string" } }
```

---

### POST `/api/v1/partners/invite`
- **Consumer:** PartnerNetwork
- **Goal:** Create a new invite link/code for inviting partners (contractor view).
- **Business Logic Specification:**
  1. Authenticate caller and verify permission to create invites.
  2. Generate a secure invite token and expiry date, persist the invite, and return the shareable link and code.

**Input Contract (Request):**
```json
{ "pathVariables": {}, "queryParameters": {}, "body": { "expiresInHours": "integer (optional, default: 72)", "metadata": { } } }
```

**Output Contract (Response):**
```json
{ "statusCode": 201, "body": { "link": "string", "code": "string", "expiresAt": "string" } }
```
