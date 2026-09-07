import json
import urllib.error
import urllib.request

BASE = "http://localhost:8000"


def request(method, path, body=None, token=None):
    data = None if body is None else json.dumps(body).encode()
    headers = {"Content-Type": "application/json"}
    if token:
        headers["Authorization"] = f"Bearer {token}"
    req = urllib.request.Request(BASE + path, data=data, headers=headers, method=method)
    try:
        with urllib.request.urlopen(req) as res:
            raw = res.read().decode()
            return res.status, json.loads(raw) if raw else None
    except urllib.error.HTTPError as e:
        raw = e.read().decode()
        try:
            parsed = json.loads(raw) if raw else None
        except json.JSONDecodeError:
            parsed = raw
        return e.code, parsed


username = "probe_add_book_01"
password = "ProbePass123!"

status, body = request(
    "POST",
    "/auth/register/",
    {
        "first_name": "Probe",
        "last_name": "User",
        "username": username,
        "password": password,
        "password2": password,
    },
)
print("REGISTER", status, json.dumps(body, indent=2)[:800])

status, tokens = request(
    "POST",
    "/auth/token/",
    {"username": username, "password": password},
)
print("TOKEN", status, json.dumps(tokens)[:400])
access = tokens.get("access") if isinstance(tokens, dict) else None

print("GET /books/", request("GET", "/books/", token=access)[0], request("GET", "/books/", token=access)[1])
print("GET /library/", *request("GET", "/library/", token=access))

payload_missing = {
    "title": "Piranesi",
    "author": "Susanna Clarke",
    "summary": "A man lives in a house of infinite rooms.",
    "cover_url": "https://covers.openlibrary.org/b/id/10523365-M.jpg",
    "current_page": 0,
    "total_pages": 245,
    "status": "tbr",
    "rating": 0,
}
print("ADD missing external_id", *request("POST", "/books/add/", payload_missing, access))

payload_ok = {
    "external_id": "/works/OL17860844W",
    "title": "Piranesi",
    "author": "Susanna Clarke",
    "summary": "A man lives in a house of infinite rooms.",
    "cover_url": "https://covers.openlibrary.org/b/id/10523365-M.jpg",
    "current_page": 0,
    "total_pages": 245,
    "status": "tbr",
    "rating": 0,
}
print("ADD ok", *request("POST", "/books/add/", payload_ok, access))

print("GET /library/ after", *request("GET", "/library/", token=access))
