# API Mapping — Carrier Dashboard

### GET `/api/v1/carrier/dashboard`
- **Consumer:** CarrierDashboard
- **Goal:** Return the carrier operations overview used by the dashboard, including KPI counters, fleet performance, active bid tracking, and operational alerts.
- **Business Logic Specification:**
  1. Authenticate the caller and verify the user belongs to a carrier organization.
  2. Resolve the carrier context from the authenticated user and restrict all data to that carrier’s fleet and auctions.
  3. Compute KPI values for available vehicles, active bids, and in-transit shipments based on the current operational state.
  4. Compute carrier performance metrics such as fleet activity percentage, capacity utilization, and auction win rate for the current month.
  5. Retrieve the active bid tracker entries for the carrier, including route identifiers, current bid, best bid, and status.
  6. Retrieve operational alerts requiring attention, such as collection delays, upcoming pickups, SLA deadlines, and end-of-shift events.
  7. Return the response in a format optimized for dashboard rendering without requiring client-side aggregation.

**Input Contract (Request):**
```json
{
  "pathVariables": {},
  "queryParameters": {
    "period": "string (optional, enum: ['current-month', 'last-month', 'custom'])",
    "fromDate": "string (optional, format: yyyy-MM-dd)",
    "toDate": "string (optional, format: yyyy-MM-dd)"
  },
  "body": {}
}
```

## **Output Contract (Response):**
```json
{
  "statusCode": 200,
  "body": {
    "kpis": [
      {
        "title": "string",
        "value": "string",
        "style": "string"
      }
    ],
    "carrierPerformance": {
      "fleetActive": "number",
      "capacityUtilization": "number",
      "winRate": "number"
    },
    "activeBids": [
      {
        "id": "string",
        "auctionId": "string",
        "label": "string",
        "myBid": "number",
        "bestBid": "number",
        "status": "string"
      }
    ],
    "operationAlerts": [
      {
        "id": "string",
        "truck": "string",
        "action": "string",
        "time": "string",
        "critical": "boolean"
      }
    ]
  }
}
```

**Error Payloads:**
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
    "message": "User does not have permission to access carrier dashboard"
  }
}
```
