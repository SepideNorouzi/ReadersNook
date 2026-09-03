let authTransportVersion = 0;

export function getAuthTransportVersion() {
  return authTransportVersion;
}

export function invalidateAuthTransport() {
  authTransportVersion += 1;
}