PREFIX = "hc:"


def to_external_id(hardcover_id) -> str:
    return f"{PREFIX}{hardcover_id}"


def parse_hardcover_id(external_id: str) -> int | None:
    value = external_id.strip()
    if value.startswith(PREFIX):
        value = value[len(PREFIX) :]
    if value.isdigit():
        return int(value)
    return None
