# Readers Nook API

## Authentication setup

1. Create and activate a virtual environment.
2. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```

3. Create a local `.env` file from `.env.example`:

   ```powershell
   Copy-Item .env.example .env
   ```

   Replace `DJANGO_SECRET_KEY` in `.env` with a long random value. The application
   loads this file automatically, so PowerShell environment commands are not
   required.

4. Install dependencies and apply database migrations:

   ```powershell
   python -m pip install -r requirements.txt
   python manage.py makemigrations
   python manage.py migrate
   ```

5. Start the development server:

   ```powershell
   python manage.py runserver
   ```

Open `http://127.0.0.1:8000/api/docs/` for Swagger UI.

## Authentication endpoints

- `POST /api/auth/register/` creates a user.
- `POST /api/auth/token/` accepts `username` and `password`.
- `POST /api/auth/token/refresh/` accepts a refresh token.
- `GET /api/auth/me/` returns the current user and requires a Bearer access token.
- `GET /api/schema/` returns the OpenAPI schema.
- `GET /api/docs/` opens Swagger UI.

To call a protected endpoint in Swagger, obtain an access token, click
**Authorize**, and paste the access token. Swagger supplies the `Bearer` prefix.
