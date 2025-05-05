import { writeFile, mkdir, rm } from "node:fs/promises";
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
    await mkdir(fullPath), { recursive: true };
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
