import process from "node:process";
export const parseArgs = () => {
  return (
    process.argv.find((arg) => arg.startsWith("--username="))?.split("=")[1] ||
    process.env.USER
  );
};
