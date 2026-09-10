from dataclasses import asdict, dataclass, field


@dataclass
class BookCard:
    external_id: str
    title: str
    author: str
    summary: str = ""
    cover_url: str = ""
    total_pages: int = 0
    genres: list[str] = field(default_factory=list)
    rating: float | None = None
    in_library: bool = False

    def to_dict(self):
        return asdict(self)


@dataclass
class SearchPage:
    query: str
    page: int
    per_page: int
    results: list[BookCard] = field(default_factory=list)

    def to_dict(self):
        return {
            "query": self.query,
            "page": self.page,
            "per_page": self.per_page,
            "results": [card.to_dict() for card in self.results],
        }
