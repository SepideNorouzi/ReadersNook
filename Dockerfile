# Mirror of the official python:3.11-slim image (Docker Hub is unreachable on
# some networks). Swap back to python:3.11-slim if your registry access allows.
FROM public.ecr.aws/docker/library/python:3.11-slim

# PyPI is slow/unreliable on some networks, so the index is configurable and
# defaults to a fast mirror. Override with --build-arg PIP_INDEX_URL=... .
ARG PIP_INDEX_URL=https://pypi.tuna.tsinghua.edu.cn/simple

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_INDEX_URL=${PIP_INDEX_URL} \
    PIP_DEFAULT_TIMEOUT=120 \
    PIP_RETRIES=10

WORKDIR /app

COPY requirements.txt .
RUN --mount=type=cache,target=/root/.cache/pip \
    pip install --upgrade pip && pip install -r requirements.txt

COPY . .

RUN chmod +x /app/docker/entrypoint.sh

EXPOSE 8000

ENTRYPOINT ["/app/docker/entrypoint.sh"]
CMD ["gunicorn", "readers_nook.wsgi:application", "--bind", "0.0.0.0:8000", "--workers", "3"]
