import { chdir, cwd } from "node:process";
import path from "node:path";
import { access } from "node:fs/promises";

export const up = () => {
  const currentDir = cwd();
  const parentDir = path.dirname(currentDir);

  if (currentDir !== parentDir) {
    chdir(parentDir);
  }
};

export const cd = async (targetPath) => {
  try {
    const resolvedPath = path.resolve(cwd(), targetPath);
    await access(resolvedPath);
    chdir(resolvedPath);
  } catch {
    throw new Error("Invalid path");
  }
};

export const handleCommand = async (command) => {
  const [action, ...args] = command.split(" ");

  try {
    switch (action) {
      case "up":
        up();
        break;
      case "cd":
        await cd(args[0]);
        break;
      default:
        throw new Error("Invalid input");
    }

    console.log(`You are currently in ${cwd()}`);
  } catch (error) {
    console.log(
      error.message === "Invalid input" ? "Invalid input" : "Operation failed",
    );
  }
};
