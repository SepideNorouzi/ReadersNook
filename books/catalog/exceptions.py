class CatalogError(Exception):
    status_code = 502
    default_detail = "Upstream catalog error."

    def __init__(self, detail=None):
        self.detail = detail or self.default_detail
        super().__init__(self.detail)


class CatalogConfigError(CatalogError):
    status_code = 503
    default_detail = "Book catalog is not configured."


class CatalogRateLimitError(CatalogError):
    status_code = 429
    default_detail = "Upstream catalog rate limit reached."

    def __init__(self, detail=None, retry_after=None):
        super().__init__(detail)
        self.retry_after = retry_after


class CatalogNotFoundError(CatalogError):
    status_code = 404
    default_detail = "Book not found."
