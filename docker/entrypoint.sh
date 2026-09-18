#!/bin/sh
set -e

# Wait for Postgres to accept connections before running migrations.
if [ -n "$POSTGRES_HOST" ]; then
    echo "Waiting for postgres at ${POSTGRES_HOST}:${POSTGRES_PORT:-5432} ..."
    until python -c "
import os, socket, sys
sock = socket.socket()
sock.settimeout(2)
try:
    sock.connect((os.environ['POSTGRES_HOST'], int(os.environ.get('POSTGRES_PORT', 5432))))
except OSError:
    sys.exit(1)
finally:
    sock.close()
"; do
        sleep 1
    done
fi

python manage.py migrate --noinput

exec "$@"
