# API Mapping — Contractor Dashboard

### GET `/api/v1/contractor/dashboard`
- **Consumer:** ContractorDashboard
- **Goal:** Return the contractor (operator) overview used on the dashboard, including KPI counters, auction finance highlights, SLA alerts, and fleet utilization metrics.
- **Business Logic Specification:**
  1. Authenticate the caller and verify the user belongs to an operator/contractor organization.
  2. Resolve organization/tenant-scoped data for KPIs, active auctions, and SLA alerts.
  3. Compute KPI values (trechos avulsos count, active auctions count, in-transit shipments) based on current operational state.
  4. Retrieve a compact list of auction finance entries (recent routes with current vs. target values) and mark deviations.
  5. Retrieve SLA alerts prioritized by criticality and time remaining.
  6. Compute fleet utilization metrics (weight efficiency, volume efficiency, continuous move success rate) aggregated for the contractor’s managed fleet.
  7. Return a payload optimized for dashboard rendering to avoid client-side aggregation.

**Input Contract (Request):**
```json
{
  "pathVariables": {},
  "queryParameters": {
    "period": "string (optional, enum: ['current-month','last-month','custom'])",
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
      { "title": "string", "value": "string", "style": "string" }
    ],
    "auctionFinance": [
      { "id": "string", "auctionId": "string", "label": "string", "current": "number", "target": "number", "status": "string" }
    ],
    "slaAlerts": [
      { "id": "string", "route": "string", "action": "string", "time": "string", "critical": "boolean" }
    ],
    "fleetUtilization": {
      "weightEfficiency": "number",
      "volumeEfficiency": "number",
      "continuousMoveSuccess": "number"
    }
  }
}
```

**Error Payloads:**
```json
{
  "statusCode": 401,
  "body": { "error": "UNAUTHORIZED", "message": "Authentication token missing or invalid" }
}
```

```json
{
  "statusCode": 403,
  "body": { "error": "FORBIDDEN", "message": "User does not have contractor dashboard access" }
}
```
