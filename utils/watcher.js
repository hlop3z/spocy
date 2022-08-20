import fs from "node:fs";
import { spawn } from "node:child_process";

const PATH = "src";

function Command(...args) {
  const cmd = spawn(...args, { shell: true });

  cmd.stderr.on("data", (data) => {
    console.error(data.toString());
  });
}

console.log("src/ is in 'watch' MODE.");

fs.watch(`${PATH}/`, (eventType, filename) => {
  Command("eslint", [`${PATH}/${filename}`, "--fix"]);
  // Logger
  /*
    console.log("\nThe file", filename, "was modified!");
    console.log("The type of change was:", eventType);
  */
});
