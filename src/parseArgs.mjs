import process from "node:process";
import os from "node:os";

export const parseArgs = () => {
  return (
    process.argv.find((arg) => arg.startsWith("--username="))?.split("=")[1] ||
    os.userInfo().username
  );
};
