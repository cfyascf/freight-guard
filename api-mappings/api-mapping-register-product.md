# API Mapping — Register Product

### POST `/api/v1/products`
- **Consumer:** RegisterProduct
- **Goal:** Create a new SKU in the tenant catalog from the product registration form.
- **Business Logic Specification:**
  1. Authenticate caller and enforce tenant scoping and permissions.
  2. Validate required fields: `sku`, `nome`, `tipo`, `pesoPadrao`, `volumePadrao`, `tipoHu`.
  3. If `perigosa` is true, require `onu` and `classeRisco` with format checks.
  4. If `empilhavel` is false then `maxCamadas` must be null or 1; if true, require `maxCamadas` ≥ 1.
  5. Optionally save as a reusable template when `isTemplate` is true.
  6. Enforce unique SKU within tenant; return 409 when duplicate.

**Input Contract (Request):**
```json
{
  "body": {
    "sku": "string",         // required, unique in tenant
    "nome": "string",        // required
    "tipo": "string",        // required (category)
    "pesoPadrao": "number",  // required (kg)
    "volumePadrao": "number",// required (m3)
    "tipoHu": "string",      // required (paletizado|caixas|granel|isotermico)
    "temperatura": "string", // Ambient|Refrigerado|Congelado
    "tempMin": "number|null",
    "tempMax": "number|null",
    "perigosa": "boolean",
    "onu": "string|null",
    "classeRisco": "string|null",
    "fragil": "boolean",
    "empilhavel": "boolean",
    "maxCamadas": "integer|null",
    "descricao": "string|null",
    "isTemplate": "boolean (optional)"
  }
}
```

**Output Contract (Response):**
```json
{ "status": 201, "body": { "id": "string", "sku": "string", "createdAt": "string" } }
```

**Error Payloads:**
```json
{ "status": 400, "body": { "error": "VALIDATION_ERROR", "details": { "field": "message" } } }
{ "status": 409, "body": { "error": "SKU_ALREADY_EXISTS", "message": "string" } }
{ "status": 403, "body": { "error": "FORBIDDEN", "message": "string" } }
```

---

### GET `/api/v1/products/validate-sku?sku={sku}`
- **Consumer:** RegisterProduct
- **Goal:** Quick SKU uniqueness check used by the form to provide immediate feedback.

**Input Contract (Request):**
```json
{ "query": { "sku": "string" } }
```

**Output Contract (Response):**
```json
{ "status": 200, "body": { "available": "boolean" } }
```

**Errors:** 400 Bad Request (missing sku)

---

### GET `/api/v1/product-templates`
- **Consumer:** RegisterProduct
- **Goal:** Return a list of saved product templates to pre-fill the registration form when `Salvar como Modelo` is available.

**Input Contract (Request):**
```json
{ "query": { "search": "string (optional)", "page": "integer (optional)", "pageSize": "integer (optional)" } }
```

**Output Contract (Response):**
```json
{ "status": 200, "body": { "items": [ { "id": "string", "name": "string", "defaults": { /* template payload */ } } ], "page": "integer", "pageSize": "integer", "total": "integer" } }
```

---

**UI & Validation Notes:**
- Client toggles control conditional fields: temperature min/max show only when `temperatura` != `Ambiente`; `onu`/`classeRisco` required only if `perigosa` is true.
- The UI should call the SKU validation endpoint while the user types or on blur to avoid conflicts on submit.
- Provide helpful error messages for rule conflicts (e.g., `maxCamadas` vs `empilhavel`).
- Persist `isTemplate` separately as a template resource if requested by the user.
