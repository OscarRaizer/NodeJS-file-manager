import { cwd } from "node:process";
import { stdin as input, stdout as output, chdir } from "node:process";
import { createInterface } from "node:readline/promises";
import { handleCommand } from "./commands/navigation.mjs";
import { parseArgs } from "./parseArgs.mjs";
import { homedir } from "node:os";

const init = async () => {
  chdir(homedir());
  const username = parseArgs();
  console.log(
    `Welcome to the File Manager, ${username}!\nYou are currently in ${cwd()}`,
  );

  const rl = createInterface({ input, output, prompt: "> " });
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
