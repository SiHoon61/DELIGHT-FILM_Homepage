const { randomBytes, scrypt, timingSafeEqual } = require("node:crypto");
const { promisify } = require("node:util");

const deriveKey = promisify(scrypt);
const options = { N: 131072, r: 8, p: 1, maxmem: 256 * 1024 * 1024 };
const HASH_PATTERN = /^scrypt\$131072\$8\$1\$([a-f0-9]{32})\$([a-f0-9]{128})$/;

const isPasswordHash = (value) => typeof value === "string" && HASH_PATTERN.test(value);

const hashPassword = async (password) => {
  const salt = randomBytes(16).toString("hex");
  const key = await deriveKey(password, salt, 64, options);
  return `scrypt$131072$8$1$${salt}$${key.toString("hex")}`;
};

const verifyPassword = async (password, encoded) => {
  const match = typeof encoded === "string" && encoded.match(HASH_PATTERN);
  if (!match || typeof password !== "string" || password.length > 512) return false;
  const key = await deriveKey(password, match[1], 64, options);
  return timingSafeEqual(key, Buffer.from(match[2], "hex"));
};

module.exports = { hashPassword, isPasswordHash, verifyPassword };
