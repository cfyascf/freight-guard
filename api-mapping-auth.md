# API Mapping — Authentication

### POST `/api/v1/auth/login`
- **Consumer:** Auth
- **Goal:** Authenticate a user with corporate credentials and return the session context needed to access the application.
- **Business Logic Specification:**
  1. Validate that the email and password fields are present and well-formed.
  2. Look up the user by corporate email and verify the password hash.
  3. Determine the user role and map it to the appropriate application access scope.
  4. Create a signed authentication session or access token with the user identity and role claims.
  5. Return the token, user profile, and a redirect target based on the role.
  6. If authentication fails, return a generic invalid-credentials error without exposing whether the email or password is wrong.

**Input Contract (Request):**
```json
{
  "pathVariables": {},
  "queryParameters": {},
  "body": {
    "email": "string (required)",
    "password": "string (required)"
  }
}
```

## **Output Contract (Response):**
```json
{
  "statusCode": 200,
  "body": {
    "accessToken": "string",
    "refreshToken": "string",
    "user": {
      "id": "string",
      "email": "string",
      "role": "string"
    },
    "defaultRoute": "string"
  }
}
```

**Error Payloads:**
```json
{
  "statusCode": 401,
  "body": {
    "error": "INVALID_CREDENTIALS",
    "message": "Invalid email or password"
  }
}
```

### POST `/api/v1/auth/register`
- **Consumer:** Auth
- **Goal:** Create a new user account for either a logistics operator or a carrier and initialize the default workspace context.
- **Business Logic Specification:**
  1. Validate the required registration fields, including company name, email, password, and selected role.
  2. Ensure the corporate email is unique and not already associated with an active account.
  3. Hash the password and create the user record with the selected role.
  4. Create the organization/company profile and assign the user as the initial administrator or owner.
  5. Return the authenticated session and the default route for the newly created role.
  6. If validation fails, return a 400 response with field-level errors.

**Input Contract (Request):**
```json
{
  "pathVariables": {},
  "queryParameters": {},
  "body": {
    "companyName": "string (required)",
    "email": "string (required)",
    "password": "string (required)",
    "role": "string (required, enum: ['contractor', 'carrier'])"
  }
}
```

## **Output Contract (Response):**
```json
{
  "statusCode": 201,
  "body": {
    "accessToken": "string",
    "refreshToken": "string",
    "user": {
      "id": "string",
      "email": "string",
      "role": "string",
      "companyName": "string"
    },
    "defaultRoute": "string"
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
    "error": "EMAIL_ALREADY_EXISTS",
    "message": "A user with this email already exists"
  }
}
```
