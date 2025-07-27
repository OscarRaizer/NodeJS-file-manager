import { writeFile, mkdir, rm } from "node:fs/promises";
import { cwd } from "node:process";
import path from "node:path";
import constants from "node:constants";
import { access } from "node:fs/promises";
import { createReadStream } from "node:fs";
import { join } from "node:path";

export const add = async (fileName) => {
  try {
    const fullPath = path.join(cwd(), fileName);
    await writeFile(fullPath, "", { flag: "wx" });
  } catch {
    throw new Error("Operation failed");
  }
};

export const createdir = async (dirName) => {
  try {
    const fullPath = path.join(cwd(), dirName);
    await mkdir(fullPath, { recursive: true });
  } catch {
    throw new Error("Operation failed");
  }
};

export const remove = async (filePath) => {
  try {
    await rm(path.resolve(cwd(), filePath), { recursive: true, force: false });
  } catch {
    throw new Error("Operation failed");
  }
};

export const readFile = async (filePath) => {
  const fullPath = join(cwd(), filePath);

  try {
    await access(fullPath, constants.R_OK);

    const readStream = createReadStream(fullPath, { encoding: "utf-8" });
    readStream.on("data", (chunk) => {
      process.stdout.write(chunk);
    });
    readStream.on("error", () => {
      console.error("Operation failed");
    });
  } catch {
    console.error("Operation failed");
  }
};
