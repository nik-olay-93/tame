# TaMe

Simplistic task manager

## Installation

### 1. Install dependencies

```bash
yarn install
```

### 2. Setup database

- Create postgres database
- In `.env` file set `DATABASE_URL`

  ```env
  DATABASE_URL="posgresql://username:password@localhost:5432/db?schema=public"
  ```

- Create migrations

  ```bash
  yarn prisma migrate dev --name init

  yarn prisma migrate production
  ```

### 3. Setup GitGub authentication

- Create Github OAuth application
- In `.env` set `GITHUB_ID` and `GITHUB_SECRET`
- In `.env` set `NEXTAUTH_URL` (url to your app, e.g. `http://localhost:3000`)
- In `.env` set `NEXTAUTH_SECRET` (random base64 string)

### 4. Setup Email authentication

- Setup your SMTP server or use external service
- Add following to .env

  ```env
  EMAIL_SERVER_USER=username
  EMAIL_SERVER_PASSWORD=password
  EMAIL_SERVER_HOST=smtp.example.com
  EMAIL_SERVER_PORT=587
  EMAIL_FROM=noreply@example.com
  ```

### 5. Run the app

- In `dev` mode

  ```bash
  yarn dev
  ```

- In `production` mode

  ```bash
  yarn build
  yarn start
  ```

