export function encodeToBase64(inputString) {
  const encodedBuffer = Buffer.from(inputString, "utf-8");
  return encodedBuffer.toString("base64");
}

export function decodeFromBase64(encodedString) {
  const decodedBuffer = Buffer.from(encodedString, "base64");
  return decodedBuffer.toString("utf-8");
}

export function saveToLocalStorage(payload, key) {
  if (typeof window === "undefined") return;

  localStorage.setItem(key, JSON.stringify(payload));

  return true;
}

export function retreiveFromLocalStorage(key) {
  if (typeof window === "undefined") return;
  try {
    const data = localStorage.getItem(key);
    const payload = JSON.parse(data);

    return payload;
  } catch (err) {
    console.log(" retrieveFromLocalStorage : ", err);
    return;
  }
}

export function clearLocalStorage(key) {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(key);
  } catch (err) {
    console.log(" clearLocalStorage : ", err);
  }
}
