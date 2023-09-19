export function encodeToBase64(inputString) {
  const encodedBuffer = Buffer.from(inputString, "utf-8");
  return encodedBuffer.toString("base64");
}

export function decodeFromBase64(encodedString) {
  const decodedBuffer = Buffer.from(encodedString, "base64");
  return decodedBuffer.toString("utf-8");
}
