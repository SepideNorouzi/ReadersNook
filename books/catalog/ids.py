PREFIX = "hc:"


def to_external_id(hardcover_id) -> str:
    """Build our external id for a Hardcover book id."""
    return f"{PREFIX}{hardcover_id}"


def parse_hardcover_id(external_id: str) -> int | None:
    """Extract the Hardcover id from an external id, or None if not one."""
    value = (external_id or "").strip()
    value = value.removeprefix(PREFIX)
    return int(value) if value.isdigit() else None
