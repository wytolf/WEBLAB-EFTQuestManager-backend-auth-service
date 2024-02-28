# Auth API Documentation
## Endpoints



## POST /api/register

To register a new user, make a POST request to the `POST /api/register` endpoint.

```
POST /api/register
```

### Request Body

| Parameter | Type   | Description          |
| --------- | ------ | -------------------- |
| email     | string | Email of the user    |
| password  | string | Password of the user |
| username  | string | Username             |

### Responses

#### Success Response

- **Status Code**: 200 OK
- **Content**: "Auth Service: POST /api/register -> User registered: {username}"

#### Error Responses

- **Status Code**: 500 Internal Server Error
- **Content**: "Auth Service: POST /api/register -> Error registering user: {errorMessage}"

### Example

```http
POST /api/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "username": "user1"
}
```

#### Response

- **Success**: 
```HTTP/1.1 200 OK
Content-Type: text/plain

Auth Service: POST /api/register -> User registered: user1
```
- **Failure**: 
```
HTTP/1.1 500 Internal Server Error
Content-Type: text/plain

Auth Service: POST /api/register -> Error registering user: {errorMessage}

 ```

### Error Handling

- If there is an error while retrieving the user, the API will respond with a status code of `500` and an error message.