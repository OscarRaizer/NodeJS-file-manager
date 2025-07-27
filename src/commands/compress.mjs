import { createReadStream, createWriteStream } from "node:fs";
import { createBrotliCompress, createBrotliDecompress } from "node:zlib";
import { pipeline } from "node:stream/promises";

export const compress = async (input, output) => {
  try {
    const compressStream = createBrotliCompress();
    await pipeline(
      createReadStream(input),
      compressStream,
      createWriteStream(output),
    );
  } catch {
    throw new Error("Operation failed");
  }
};

export const decompress = async (input, output) => {
  try {
    const decompressStream = createBrotliDecompress();
    await pipeline(
      createReadStream(input),
      decompressStream,
      createWriteStream(output),
    );
  } catch {
    throw new Error("Operation failed");
  }
};
