# Mirror of the official python:3.11-slim image (Docker Hub is unreachable on
# some networks). Swap back to python:3.11-slim if your registry access allows.
FROM public.ecr.aws/docker/library/python:3.11-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1

WORKDIR /app

COPY requirements.txt .
RUN pip install --upgrade pip && pip install -r requirements.txt

COPY . .

RUN chmod +x /app/docker/entrypoint.sh

EXPOSE 8000

ENTRYPOINT ["/app/docker/entrypoint.sh"]
CMD ["gunicorn", "readers_nook.wsgi:application", "--bind", "0.0.0.0:8000", "--workers", "3"]
