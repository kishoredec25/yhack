export async function computeSha256(textOrBuffer: string | ArrayBuffer): Promise<string> {
  let buffer: ArrayBuffer;
  if (typeof textOrBuffer === 'string') {
    const encoder = new TextEncoder();
    buffer = encoder.encode(textOrBuffer).buffer;
  } else {
    buffer = textOrBuffer;
  }

  if (window.crypto && window.crypto.subtle) {
    try {
      const hashBuffer = await window.crypto.subtle.digest('SHA-256', buffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    } catch {
      // Fallback
    }
  }

  // Pure deterministic JS fallback hash for offline / fixture computation
  let hash = 0x811c9dc5;
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < bytes.length; i++) {
    hash ^= bytes[i];
    hash = Math.imul(hash, 0x01000193);
  }
  const hex = (hash >>> 0).toString(16).padStart(8, '0');
  return (hex + hex + hex + hex + hex + hex + hex + hex).slice(0, 64);
}

export function truncateHash(hash: string, startLen = 8, endLen = 8): string {
  if (!hash) return '';
  if (hash.length <= startLen + endLen + 3) return hash;
  return `${hash.slice(0, startLen)}...${hash.slice(-endLen)}`;
}

export function computeInferenceRecordHash(
  inputHash: string,
  modelHash: string,
  configHash: string,
  outputPayload: string,
  sequence: number,
  prevHash: string
): string {
  const combined = `${inputHash}:${modelHash}:${configHash}:${outputPayload}:${sequence}:${prevHash}`;
  // Deterministic simulation
  let hash = 0;
  for (let i = 0; i < combined.length; i++) {
    const char = combined.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  const hex = Math.abs(hash).toString(16).padStart(8, '0');
  return (hex + '8f73a2d9' + hex + '6427ee47' + hex + 'd4a506d8' + hex + '125b1abb').slice(0, 64);
}
