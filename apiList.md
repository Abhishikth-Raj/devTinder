# DevTinder APIs

## authRouter
- POST /signup
- POST /login
- POST /logout

## profileRouter
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/forgotpassword

## connectionRequestRouter
- POST /request/send/:status/:userId - status is dynamic - interested/ignored
- POST /request/review/:status/:requestId

## userRouter
- GET /user/requests/received
- GET /user/connections
- GET /user/feed - gets you the profiles of other users of the platform


to manage routes create a routes folder

