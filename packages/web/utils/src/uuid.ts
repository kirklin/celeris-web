let shortUUIDCounter = 0;

export function buildUUID(): string {
  const buffer = new Uint8Array(16);
  crypto.getRandomValues(buffer);

  buffer[6] = (buffer[6] & 0x0F) | 0x40;
  buffer[8] = (buffer[8] & 0x3F) | 0x80;

  return Array.from(buffer, byte => byte.toString(16).padStart(2, "0")).join("");
}

export function buildShortUUID(prefix = ""): string {
  const time = Date.now();
  const random = Math.floor(Math.random() * 1000000000);
  shortUUIDCounter++;

  return `${prefix}_${time}${shortUUIDCounter}${random}`;
}
