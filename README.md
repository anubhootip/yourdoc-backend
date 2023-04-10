# Overview

This is the project in hospital domain.<br/>
Here patients can

- Search available verified doctors in by their name, email or address
- Book appointments with the doctor as per their availability
- Manage their appointments with doctor
- Can upload and view uploaded prescriptions by doctors

Doctors can:-

- Set their available timings for the week
- Setup their profile
- Remove already created appointment

Admin can:-

- Approve/Reject valid/invalid doctors

# Getting Started

Frontend (React)
Backend (API) (Express JS)

Both needs to be started

## Development mode

### Start Backend

```sh
cd yourdoc_backend
npm i
npm start
```

### Start Frontend

```sh
cd yourdoc_frontend
npm i
npm start
```

## Production

Set All environment variables

```
REACT_APP_API_BASE_URL
REACT_APP_UPLOAD_ACCOUNT_ID
REACT_APP_UPLOAD_API_KEY
NETLIFY_API_URL
NETLIFY_AUTH_TOKEN

ACCESS_TOKEN_SECRET
SENDGRID_API_KEY
MY_EMAIL

DB_HOST
DB_USER
DB_PASSWORD
DB_DATABASE
```

Frontend at : [Netlify Link](https://yourdoc.netlify.app/) <br />
Backend at : [API Healthcheck Link](https://yourdocbe.netlify.app/.netlify/functions/api/healthcheck)
