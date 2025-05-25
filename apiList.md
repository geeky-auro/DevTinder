# DevTinder APIs
## authRouter
- POST /signup
- POST /login
- POST /logout

## ProfileRouter
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

## connectionRequestRouter
- POST /request/send/intrested/:userId
- POST /request/send/ignored/:userId
- POST /request/review/accepted/:requestId
- POST /request/review/rejected/:requestId

## userRouter
- GET /connections
- GET /requests/received
- GET /feed - Gets you the profiles of the other users in the Application

* express.router will handle all this routes ;)

Status : ignore, intrested, accepted, rejected