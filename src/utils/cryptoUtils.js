import crypto from "crypto";

// AES-256-CBC Encryption
export function encrypt(text, password) {
  const algorithm = "aes-256-cbc";

  // Derive a 32-byte key from the password using SHA-256
  const key = crypto.createHash("sha256").update(password).digest();

  // Generate a random 16-byte initialization vector
  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  console.log(encrypted);
  return {
    encryptedData: encrypted,
    iv: iv.toString("hex"), // IV must be sent to the client for decryption
  };
}

// AES-256-CBC Decryption
export function decrypt(encryptedData, ivHex, password) {
  const algorithm = "aes-256-cbc";

  // Derive a 32-byte key from the password using SHA-256
  const key = crypto.createHash("sha256").update(password).digest();

  const iv = Buffer.from(ivHex, "hex");

  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encryptedData, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
}
