
# Url-Shortner

This is a  URL shortener project built using the MERN stack (MongoDB, Express.js,  and Node.js). The project allows users to shorten long URLs into more manageable and shareable links. 



Backend: Node.js, Express.js, MongoDB


# Setup

Clone the repository to your local machine.

Install the required dependencies for backend.
Set up your MongoDB database and configure the connection in the backend.

Remove the .env.sample with .env and Start the development servers  and backend.



## API Reference
### Create a short link
```http
POST http://localhost:8001/url
```
#### Parameters
| Name          | Type     | Description                                |
|---------------|----------|--------------------------------------------|
| `url`        | `string` | **Required**. The URL to shorten.          |
| `customShortCode`    | `string` | **Optional**. user custom url.    |
| `expirationDays` | `string` | **Optional**. expiration day. |

#### Response
```json
{
  "status": 200,
    "id": "ZDyn0UlKt"
}
```

### Get a short link
```http
GET http://localhost:8001/:shortId
```


#### Response
```json
redirect to the original url

```


### Get analytics
```http
GET http://localhost:8001/url/analytics/:shortId
```

#### Response
```json
{
    "totalClicks": 2,
    "analytics": [
        {
            "timestamp": 1719378520874,
            "_id": "667ba258c74c3b3d03ea7fc2"
        },
        {
            "timestamp": 1719378532429,
            "_id": "667ba264c74c3b3d03ea7fc5"
        }
    ],
    "visits": [
        {
            "userAgent": "PostmanRuntime/7.39.1",
            "ipAddress": "::1",
            "_id": "667ba258c74c3b3d03ea7fc1"
        },
        {
            "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
            "ipAddress": "::1",
            "_id": "667ba264c74c3b3d03ea7fc4"
        }
    ]
}
```
