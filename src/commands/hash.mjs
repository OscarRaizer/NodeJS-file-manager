import { createHash } from "node:crypto";
import { createReadStream } from "node:fs";
import { pipeline } from "node:stream/promises";

export const calculateHash = async (filePath) => {
  try {
    const hash = createHash("sha256");
    const stream = createReadStream(filePath);

    await pipeline(stream, hash);
    console.log(hash.digest("hex"));
  } catch {
    throw new Error("Operation failed");
  }
};
