import json
import urllib.error
import urllib.request

from django.conf import settings

from ..exceptions import (
    CatalogConfigError,
    CatalogError,
    CatalogRateLimitError,
    CatalogTimeoutError,
)


class HardcoverClient:
    """Thin GraphQL client for the Hardcover API. Token stays server-side."""

    def execute(self, query: str, variables: dict | None = None) -> dict:
        token = settings.HARDCOVER_API_TOKEN
        if not token:
            raise CatalogConfigError("HARDCOVER_API_TOKEN is not set.")

        payload = json.dumps(
            {"query": query, "variables": variables or {}}
        ).encode("utf-8")
        request = urllib.request.Request(
            settings.HARDCOVER_API_URL,
            data=payload,
            method="POST",
            headers={
                "Authorization": f"Bearer {token}",
                "Content-Type": "application/json",
                "User-Agent": settings.HARDCOVER_USER_AGENT,
            },
        )

        try:
            with urllib.request.urlopen(request, timeout=20) as response:
                body = json.loads(response.read().decode("utf-8"))
        except urllib.error.HTTPError as exc:
            retry_after = exc.headers.get("Retry-After") if exc.headers else None
            if exc.code == 429:
                raise CatalogRateLimitError(retry_after=retry_after) from exc
            if exc.code in (401, 403):
                raise CatalogConfigError("Hardcover rejected the API token.") from exc
            raise CatalogError(f"Hardcover HTTP {exc.code}.") from exc
        except TimeoutError as exc:
            # A read/TLS timeout is raised directly, not wrapped in URLError.
            raise CatalogTimeoutError() from exc
        except urllib.error.URLError as exc:
            if isinstance(exc.reason, TimeoutError):
                raise CatalogTimeoutError() from exc
            raise CatalogError("Could not reach Hardcover.") from exc

        if body.get("errors"):
            raise CatalogError(body["errors"][0].get("message", "GraphQL error."))

        data = body.get("data")
        if not isinstance(data, dict):
            raise CatalogError("Hardcover returned an empty payload.")
        return data
