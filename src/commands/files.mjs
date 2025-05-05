import { writeFile, mkdir, unlink } from "node:fs/promises";
import { cwd } from "node:process";
import path from "node:path";

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
    await mkdir(fullPath);
  } catch {
    throw new Error("Operation failed");
  }
};

export const rm = async (filePath) => {
  try {
    await unlink(path.resolve(cwd(), filePath));
  } catch {
    throw new Error("Operation failed");
  }
};
