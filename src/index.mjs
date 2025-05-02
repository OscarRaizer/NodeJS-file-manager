import { cwd } from "node:process";
import { stdin as input, stdout as output } from "node:process";
import * as readline from "node:readline/promises";
import { up, cd, handleCommand } from "./commands/navigation.mjs";
import { parseArgs } from "./parseArgs.mjs";

const init = async () => {
  const username = parseArgs();
  console.log(
    `Welcome to the File Manager, ${username}!\nYou are currently in ${cwd()}`,
  );

  const rl = readline.createInterface({ input, output, prompt: "> " });
  rl.on("line", async (input) => {
    const command = input.trim();

    if (command === ".exit") {
      rl.close();
      return;
    }

    await handleCommand(command);
    rl.prompt();
  });

  rl.on("close", () => {
    console.log(`\nThank you for using File Manager, ${username}, goodbye!`);
  });
};

init();
