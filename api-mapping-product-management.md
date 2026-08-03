# API Mapping — Product Management

### GET `/api/v1/products`
- **Consumer:** ProductManagement
- **Goal:** List SKUs with search, filtering and pagination for the product catalog.
- **Business Logic Specification:**
  1. Authenticate caller and apply tenant/organization scoping.
  2. Support `search` (by name or sku), optional `type` filter, and pagination (`page`, `pageSize`).
  3. Return read-optimized summary fields used in the list UI.

**Input Contract (Request):**
```json
{ "query": { "search": "string (optional)", "type": "string (optional)", "page": "integer (optional, default=1)", "pageSize": "integer (optional, default=25)" } }
```

**Output Contract (Response):**
```json
{ "status": 200, "body": { "items": [ { "id": "string", "sku": "string", "nome": "string", "tipo": "string", "pesoPadrao": "number", "volumePadrao": "number", "temperatura": "string", "fragil": "boolean", "empilhavel": "boolean", "maxCamadas": "integer|null", "tipoHu": "string", "perigosa": "boolean" } ], "page": "integer", "pageSize": "integer", "total": "integer" } }
```

**Errors:** 401 Unauthorized, 403 Forbidden, 400 Bad Request

---

### GET `/api/v1/products/{productId}`
- **Consumer:** ProductManagement
- **Goal:** Retrieve full product details for display and editing in the right-hand panel.
- **Business Logic Specification:**
  1. Apply tenant/role access checks.
  2. Expand fields relevant for editing: UN/ONU data, temperature range, descriptions, handling rules.

**Input Contract (Request):**
```json
{ "path": { "productId": "string" } }
```

**Output Contract (Response):**
```json
{ "status": 200, "body": { "id": "string", "sku": "string", "nome": "string", "tipo": "string", "pesoPadrao": "number", "volumePadrao": "number", "tipoHu": "string", "temperatura": "string", "tempMin": "number|null", "tempMax": "number|null", "fragil": "boolean", "empilhavel": "boolean", "maxCamadas": "integer|null", "perigosa": "boolean", "onu": "string|null", "classeRisco": "string|null", "descricao": "string" } }
```

**Errors:** 404 Not Found (product does not exist), 403 Forbidden

---

### POST `/api/v1/products`
- **Consumer:** ProductManagement (via `RegisterProduct` flow)
- **Goal:** Create a new SKU in the catalog.
- **Business Logic Specification:**
  1. Validate required attributes (`sku`, `nome`, `tipo`, `pesoPadrao`, `volumePadrao`).
  2. If `perigosa` is true, require `onu` and `classeRisco` and validate formats.
  3. If `empilhavel` is false, `maxCamadas` must be `null` or `1`.
  4. Enforce unique `sku` within tenant.

**Input Contract (Request):**
```json
{ "body": { "sku": "string", "nome": "string", "tipo": "string", "pesoPadrao": "number", "volumePadrao": "number", "tipoHu": "string", "temperatura": "string", "tempMin": "number|null", "tempMax": "number|null", "fragil": "boolean", "empilhavel": "boolean", "maxCamadas": "integer|null", "perigosa": "boolean", "onu": "string|null", "classeRisco": "string|null", "descricao": "string" } }
```

**Output Contract (Response):**
```json
{ "status": 201, "body": { "id": "string", "createdAt": "string" } }
```

**Error Payloads:**
```json
{ "status": 400, "body": { "error": "VALIDATION_ERROR", "details": { "field": "message" } } }
{ "status": 409, "body": { "error": "SKU_ALREADY_EXISTS", "message": "string" } }
```

---

### PUT `/api/v1/products/{productId}`
- **Consumer:** ProductManagement
- **Goal:** Persist edits made in the product detail panel.
- **Business Logic Specification:**
  1. Validate same rules as create.
  2. Partial updates are allowed but semantic rules (hazmat, empilhavel/maxCamadas) must still hold.
  3. Record audit trail (who edited, timestamp).

**Input Contract (Request):**
```json
{ "path": { "productId": "string" }, "body": { /* same shape as POST, fields optional for partial */ } }
```

**Output Contract (Response):**
```json
{ "status": 200, "body": { "id": "string", "updatedAt": "string" } }
```

**Error Payloads:** 400 Validation errors, 404 Not Found, 403 Forbidden

---

### DELETE `/api/v1/products/{productId}`
- **Consumer:** ProductManagement
- **Goal:** Remove an SKU from the catalog.
- **Business Logic Specification:**
  1. Soft-delete recommended (mark archived) unless caller has elevated permission to hard-delete.
  2. Prevent delete if product is referenced by active loads/auctions; return informative error.

**Input Contract (Request):**
```json
{ "path": { "productId": "string" }, "query": { "hard": "boolean (optional, default=false)" } }
```

**Output Contract (Response):**
```json
{ "status": 200, "body": { "id": "string", "deleted": "boolean" } }
```

**Error Payloads:**
```json
{ "status": 409, "body": { "error": "PRODUCT_IN_USE", "message": "Referenced by active loads or auctions" } }
```

---

**Notes / UI Considerations:**
- The UI performs client-side filtering/search; backend should still support server-side search for large catalogs.
- Ensure fast read endpoints optimized for list render (avoid heavy joins).
- Enforce tenant scoping and audit logging on create/update/delete operations.
