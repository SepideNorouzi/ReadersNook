import json

from ..dto import BookCard
from ..ids import to_external_id


def _as_int(value, default=0) -> int:
    try:
        if value is None or value == "":
            return default
        return max(0, int(value))
    except (TypeError, ValueError):
        return default


def _author(doc: dict) -> str:
    names = doc.get("author_names")
    if isinstance(names, list):
        return ", ".join(str(name) for name in names if name)
    if isinstance(names, str) and names:
        return names

    contributors = doc.get("cached_contributors") or doc.get("contributions") or []
    authors = []
    if isinstance(contributors, list):
        for item in contributors:
            if not isinstance(item, dict):
                continue
            author = item.get("author") or item
            name = author.get("name") if isinstance(author, dict) else None
            if name:
                authors.append(name)
    return ", ".join(authors)


def _genres(doc: dict) -> list[str]:
    """First 5 genres, from either a direct list or the cached_tags blob."""
    genres = doc.get("genres")
    if isinstance(genres, list):
        names = [str(genre).strip() for genre in genres if str(genre).strip()]
        return names[:5]

    cached_tags = doc.get("cached_tags") or {}
    if isinstance(cached_tags, str):
        try:
            cached_tags = json.loads(cached_tags)
        except json.JSONDecodeError:
            return []
    if not isinstance(cached_tags, dict):
        return []

    raw = cached_tags.get("Genre") or []
    if not isinstance(raw, list):
        return []

    names = []
    for item in raw:
        if isinstance(item, str) and item.strip():
            names.append(item.strip())
        elif isinstance(item, dict):
            name = item.get("tag") or item.get("name") or ""
            if name:
                names.append(str(name).strip())
    return names[:5]


def _rating(doc: dict) -> float | None:
    value = doc.get("rating")
    if value is None or value == "":
        return None
    try:
        return round(float(value), 2)
    except (TypeError, ValueError):
        return None


def _cover_url(doc: dict) -> str:
    image = doc.get("cached_image") or doc.get("image") or doc.get("cover")
    if isinstance(image, dict):
        url = image.get("url") or ""
    elif isinstance(image, str):
        url = image
    else:
        url = doc.get("cover_url") or ""
    if isinstance(url, str) and url.startswith(("http://", "https://")):
        return url[:500]
    return ""


def document_to_card(hardcover_id, doc: dict) -> BookCard | None:
    """Map one Hardcover document to our BookCard, or None if unusable."""
    if hardcover_id is None:
        hardcover_id = doc.get("id") or doc.get("book_id")
    if hardcover_id is None:
        return None

    title = (doc.get("title") or "").strip()
    if not title:
        return None

    return BookCard(
        external_id=to_external_id(hardcover_id),
        title=title[:255],
        author=_author(doc)[:255] or "Unknown",
        summary=doc.get("description") or doc.get("summary") or "",
        cover_url=_cover_url(doc),
        total_pages=_as_int(doc.get("pages") or doc.get("page_count")),
        genres=_genres(doc),
        rating=_rating(doc),
    )


def parse_search_hits(results, ids=None) -> list[BookCard]:
    """Turn a Hardcover search payload (JSON string or dict) into BookCards."""
    if isinstance(results, str):
        try:
            results = json.loads(results)
        except json.JSONDecodeError:
            return []

    if isinstance(results, dict):
        hits = results.get("hits") or []
    elif isinstance(results, list):
        hits = results
    else:
        hits = []

    ids = list(ids or [])
    cards = []
    for index, hit in enumerate(hits):
        doc = hit.get("document", hit) if isinstance(hit, dict) else {}
        if not isinstance(doc, dict):
            continue
        hardcover_id = ids[index] if index < len(ids) else None
        card = document_to_card(hardcover_id, doc)
        if card:
            cards.append(card)
    return cards
