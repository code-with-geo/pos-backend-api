import express from "express";
import { encrypt, decrypt } from "../utils/cryptoUtils.js";

const router = express.Router();

// Encrypt Route
router.post("/encrypt", (req, res) => {
  const { text, password } = req.body;

  if (!text || !password) {
    return res.status(400).json({ error: "Text and password are required." });
  }

  const result = encrypt(text, password);
  res.json({
    encryptedData: result.encryptedData,
    iv: result.iv,
  });
});

// Decrypt Route
router.post("/decrypt", (req, res) => {
  const { encryptedData, iv, password } = req.body;

  if (!encryptedData || !iv || !password) {
    return res
      .status(400)
      .json({ error: "Encrypted data, IV, and password are required." });
  }

  try {
    const decryptedText = decrypt(encryptedData, iv, password);
    res.json({ decryptedText });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Decryption failed. Please check your password and IV." });
  }
});

export { router as CryptoRouter };
