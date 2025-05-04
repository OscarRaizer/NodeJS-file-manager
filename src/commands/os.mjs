import os from "node:os";

export const getEOL = () => {
  console.log(JSON.stringify(os.EOL));
};

export const getCPUs = () => {
  const cpus = os.cpus();

  const tableData = cpus.map((cpu, index) => ({
    Core: index + 1,
    Model: cpu.model,
    "Speed (GHz)": cpu.speed / 1000,
  }));
  console.log(`Total CPU cores: ${cpus.length}`);
  console.table(tableData);
};
