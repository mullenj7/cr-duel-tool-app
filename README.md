# Clash Royale Duel Tool App

This Repo contains the code for the Clash Royale Duel Tool app found at www.test.com.

Clash Royale Duel Tool is a tool for Clash Royale players to help 

## How To Run

After cloning the repository, the app can be installed and run locally using:

### `npm i`

`and`

### `npm start`

The app will run normally out of the box. However, in order to use the login functionality, you will need to create a `.env.development` file in the project root,
and have an AWS Cognito pool for the required credentials.

This file would need to take the format of:

```
REACT_APP_STAGE=dev
REACT_APP_API_STAGE=dev
REACT_APP_REGION={your AWS region}
REACT_APP_USERPOOL_ID={your user pool id}
REACT_APP_CLIENT_ID={your app client id}
REACT_APP_MAIN_APP=http://localhost:8000
```

