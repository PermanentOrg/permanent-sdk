# How to log in

See [the SFTP
service](https://github.com/PermanentOrg/sftp-service/blob/main/src/classes/AuthenticationSession.ts#L58)
for an example of logging in to FusionAuth. Log in requests go
directly to our identity provider (FusionAuth) and do not use this
SDK. We expect clients to use the FusionAuth [login
API](https://fusionauth.io/docs/apis/login#request-1).

By default, logging in returns a JWT which can be used to authenticate
for all calls to this SDK.

Clients need a FusionAuth host, application id, secret, and API key to
use this method. Contact Permanent for help setting that up.

The API key must have the `/api/login`, `/api/two-factor/send`,
`/api/user` and `/api/user/registration` endpoints enabled. It should
be limited to the relevant tenant. Clients will send this key in the
authorization header of certain requests, including login.

Example curl:

```
curl --location 'https://<FUSIONAUTH HOST>/api/login' \
--header 'Authorization: <API KEY>' \
--header 'Content-Type: application/json' \
--data-raw '{
    "applicationId": "<APPLICATION ID>",
    "loginId": "<PERMANENT USERNAME>",
    "password": "<PERMANENT PASSWORD>"
}
'
```

This will respond with a 202 if the user is authenticated but not
registered to the application, which will mostly be the case for
us. The response will include a `token`, which can be used as the
JWT. The user must be registered to the application to get a refresh
token.

