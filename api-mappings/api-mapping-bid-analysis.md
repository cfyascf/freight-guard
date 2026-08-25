# API Mapping — Bid Analysis

### GET `/api/v1/routes/{routeId}/bid-analysis`
- **Consumer:** BidAnalysis
- **Goal:** Return the consolidated route auction context, shipment requirements, compatible fleet options, and itinerary data needed for the bid submission screen.
- **Business Logic Specification:**
  1. Authenticate the caller and verify access to the selected route/auction context.
  2. Resolve the route by identifier and ensure it belongs to the current tenant/organization scope.
  3. Retrieve route-level metadata including identifier, status, target fare, SLA windows, and auction summary.
  4. Retrieve shipment product details such as packaging type, product category, required temperature, and handling constraints.
  5. Retrieve itinerary stops and segment composition included in the route.
  6. Retrieve the fleet inventory for the logged-in carrier and filter only vehicles compatible with the route’s weight, volume, and body type constraints.
  7. Return all values required by the UI in a single read-optimized payload, avoiding client-side mock data usage and extra requests.
  8. If the route is not found, return a 404 response.

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
    "route": {
      "id": "string",
      "name": "string",
      "status": "string",
      "risk": "string",
      "totalWeightKg": "number",
      "totalVolumeM3": "number",
      "totalDistanceKm": "number",
      "targetFare": "number",
      "bodyType": "string",
      "productDetails": {
        "packaging": "string",
        "type": "string",
        "temperature": "string",
        "handling": "string"
      },
      "sla": {
        "firstPickup": "string",
        "lastDelivery": "string"
      },
      "itinerary": [
        {
          "city": "string",
          "action": "string",
          "time": "string"
        }
      ],
      "segments": [
        {
          "id": "string",
          "load": "string",
          "from": "string",
          "to": "string",
          "value": "number"
        }
      ],
      "auctionInfo": {
        "bids": "integer",
        "bestBid": "number",
        "leader": "string"
      }
    },
    "fleet": [
      {
        "id": "string",
        "name": "string",
        "bodyType": "string",
        "maxWeightKg": "number",
        "maxVolumeM3": "number"
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
    "message": "User does not have permission to view this route"
  }
}
```

### POST `/api/v1/routes/{routeId}/bids`
- **Consumer:** BidAnalysis
- **Goal:** Submit a new bid for a route auction using a selected compatible vehicle, while enforcing business rules for budget and compliance.
- **Business Logic Specification:**
  1. Authenticate the caller and verify the user is authorized to place a bid for the selected route.
  2. Validate that the route is still open for bidding and that the selected vehicle belongs to the authenticated carrier’s fleet.
  3. Validate the proposed bid value against route constraints, including the target fare and any minimum bid floor rules.
  4. Ensure the selected vehicle can physically satisfy the route’s weight, volume, and body type requirements.
  5. Require the user to accept the terms declaration before the bid can be submitted.
  6. Persist the bid and mark it as active for the auction.
  7. Return the created bid summary and the updated auction position.

**Input Contract (Request):**
```json
{
  "pathVariables": {
    "routeId": "string (required)"
  },
  "queryParameters": {},
  "body": {
    "vehicleId": "string (required)",
    "proposedValue": "number (required)",
    "termsAccepted": "boolean (required)"
  }
}
```

## **Output Contract (Response):**
```json
{
  "statusCode": 201,
  "body": {
    "bidId": "string",
    "routeId": "string",
    "vehicleId": "string",
    "proposedValue": "number",
    "status": "string",
    "rank": "integer"
  }
}
```

**Error Payloads:**
```json
{
  "statusCode": 400,
  "body": {
    "error": "VALIDATION_ERROR",
    "message": "string",
    "details": [
      {
        "field": "string",
        "message": "string"
      }
    ]
  }
}
```

```json
{
  "statusCode": 409,
  "body": {
    "error": "BID_ALREADY_EXISTS",
    "message": "A bid for this route already exists from this carrier"
  }
}
```
