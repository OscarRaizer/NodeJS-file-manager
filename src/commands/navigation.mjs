import { chdir, cwd } from "node:process";
import path from "node:path";
import { access, readdir } from "node:fs/promises";
import * as hash from "./hash.mjs";
import * as files from "./files.mjs";
import * as compress from "./compress.mjs";
import * as os from "./os.mjs";

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

export const ls = async () => {
  try {
    const files = await readdir(cwd(), { withFileTypes: true });

    const sortedFiles = files.sort((a, b) => {
      if (a.isDirectory() === b.isDirectory()) {
        return a.name.localeCompare(b.name);
      }
      return b.isDirectory() - a.isDirectory();
    });

    const tableData = sortedFiles.map((file, index) => ({
      Index: index,
      Name: file.name,
      Type: file.isDirectory() ? "directory" : "file",
    }));

    console.table(tableData);
  } catch (err) {
    throw new Error("Operation failed");
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
      case "ls":
        await ls();
        break;
      case "add":
        await files.add(args[0]);
        break;
      case "rm":
        await files.remove(args[0]);
        break;
      case "hash":
        await hash.calculateHash(args[0]);
        break;
      case "compress":
        await compress.compress(args[0], args[1]);
        break;
      case "decompress":
        await compress.decompress(args[0], args[1]);
        break;
      case "mkdir":
        await files.createdir(args[0]);
        break;
      case "os":
        handleOSCommand(args);
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

const handleOSCommand = (args) => {
  switch (args[0]) {
    case "--EOL":
      os.getEOL();
      break;
    case "--cpus":
      os.getCPUs();
      break;
    case "--homedir":
      os.getHomedir();
      break;
    case "--username":
      os.getUsername();
      break;
    case "--architecture":
      os.getArchitecture();
      break;
    default:
      throw new Error("Invalid input");
  }
};
