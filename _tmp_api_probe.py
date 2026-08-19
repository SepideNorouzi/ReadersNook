import json
import urllib.error
import urllib.parse
import urllib.request

API = "http://localhost:8000/api"
OL = "https://openlibrary.org/search.json"


def req(method, url, body=None, token=None):
    data = None if body is None else json.dumps(body).encode()
    headers = {"Content-Type": "application/json"}
    if token:
        headers["Authorization"] = f"Bearer {token}"
    request = urllib.request.Request(url, data=data, headers=headers, method=method)
    try:
        with urllib.request.urlopen(request, timeout=20) as res:
            raw = res.read().decode()
            return res.status, json.loads(raw) if raw else None
    except urllib.error.HTTPError as e:
        raw = e.read().decode()
        try:
            parsed = json.loads(raw) if raw else None
        except json.JSONDecodeError:
            parsed = raw
        return e.code, parsed


print("=== LOGIN attempts ===")
for user in ("sugarbyte", "Sugarbyte"):
    status, body = req(
        "POST",
        f"{API}/auth/token/",
        {"username": user, "password": "11111111"},
    )
    print(user, status, body if status != 200 else {k: (v[:24] + "...") for k, v in body.items()})

status, body = req(
    "POST",
    f"{API}/auth/token/",
    {"username": "Sugarbyte", "password": "11111111"},
)
token = body.get("access") if isinstance(body, dict) else None
print("token obtained:", bool(token))

if token:
    print("=== ME ===")
    print(req("GET", f"{API}/auth/me/", token=token))

    print("=== LIST BOOKS ===")
    print(req("GET", f"{API}/books/", token=token))

    print("=== CREATE BOOK ===")
    payload = {
        "title": "Flow Probe Book",
        "author": "Probe Author",
        "summary": "Created by wiring probe.",
        "cover_url": "https://covers.openlibrary.org/b/id/10521270-M.jpg",
        "current_page": 0,
        "total_pages": 200,
        "status": "tbr",
        "rating": 0,
    }
    create_status, created = req("POST", f"{API}/books/create/", payload, token=token)
    print(create_status, created)

    if create_status in (200, 201) and isinstance(created, dict):
        book_id = created["id"]
        print("=== PATCH STATUS ===")
        print(req("PATCH", f"{API}/books/{book_id}/update/", {"status": "current"}, token=token))
        print("=== PATCH PAGE ===")
        print(req("PATCH", f"{API}/books/{book_id}/update/", {"current_page": 12}, token=token))
        print("=== DELETE ===")
        print(req("DELETE", f"{API}/books/{book_id}/delete/", token=token))

print("=== OPEN LIBRARY SEARCH ===")
params = urllib.parse.urlencode(
    {
        "q": "the hobbit",
        "fields": "key,title,author_name,cover_i,first_publish_year,number_of_pages_median,ratings_average,first_sentence",
        "limit": 2,
    }
)
ol_status, ol_body = req("GET", f"{OL}?{params}")
print("status", ol_status)
if isinstance(ol_body, dict):
    docs = ol_body.get("docs", [])
    print("numFound", ol_body.get("numFound"), "returned", len(docs))
    for doc in docs:
        print({k: doc.get(k) for k in ("key", "title", "author_name", "cover_i")})
        work_id = (doc.get("key") or "").split("/")[-1]
        if work_id:
            w_status, w_body = req("GET", f"https://openlibrary.org/works/{work_id}.json")
            desc = w_body.get("description") if isinstance(w_body, dict) else None
            if isinstance(desc, dict):
                desc = desc.get("value")
            subjects = w_body.get("subjects") if isinstance(w_body, dict) else None
            print("  details", w_status, "desc_len", len(desc or ""), "subjects", (subjects or [])[:4])
