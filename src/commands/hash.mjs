import { createHash } from "node:crypto";
import { createReadStream } from "node:fs";
import { pipeline } from "node:stream/promises";

export const calculateHash = async (filePath) => {
  try {
    const hash = createHash("sha256");
    const stream = createReadStream(filePath);
    stream.pipe(hash);

    let result = "";
    for await (const chunk of hash) {
      result += chunk.toString("hex");
    }
    console.log(result);
  } catch {
    throw new Error("Operation failed");
  }
};
