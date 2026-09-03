let authTransportVersion = 0;
const listeners = new Set<() => void>();

export function getAuthTransportVersion() {
  return authTransportVersion;
}

export function onAuthTransportInvalidate(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function invalidateAuthTransport() {
  authTransportVersion += 1;
  listeners.forEach((listener) => listener());
}
