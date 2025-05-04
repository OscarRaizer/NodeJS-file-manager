import { writeFile } from "node:fs/promises";
import { cwd } from "node:process";
import path from "node:path";
import { pipeline } from "node:stream/promises";

export const add = async (fileName) => {
  try {
    const fullPath = path.join(cwd(), fileName);
    await writeFile(fullPath, "", { flag: "wx" });
  } catch {
    throw new Error("Operation failed");
  }
};
