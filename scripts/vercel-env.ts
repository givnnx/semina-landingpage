import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { execSync } from "child_process";

const envPath = path.resolve(__dirname, "../.env");

if (!fs.existsSync(envPath)) {
  console.error(".env file not found");
  process.exit(1);
}

const envConfig = dotenv.config({ path: envPath });

if (envConfig.error) {
  console.error("Error loading environment variables:", envConfig.error);
  process.exit(1);
}

const environment = ["production", "development", "preview"];

for (const items in envConfig.parsed) {
  environment.forEach((env) => {
    try {
      console.log(`(+) Adding ${items} to ${env}`);

      execSync(`vercel env add ${items} ${env}`, {
        input: envConfig.parsed?.[items],
        stdio: "pipe",
      });
    } catch (error: any) {
      const errorMessage =
        error.message?.toString() ||
        error.stderr?.toString() ||
        error.stdout?.toString() ||
        "";

      if (errorMessage.includes("already been added")) {
        console.log(`(!) ${items} already added to ${env}. Updating...`);

        // Remove existing variable
        execSync(`vercel env rm ${items} ${env} -y`, {
          stdio: "pipe",
        });

        // Add variable again with new value
        execSync(`vercel env add ${items} ${env}`, {
          input: envConfig.parsed?.[items],
          stdio: "pipe",
        });

        console.log(`(✓) Updated ${items} in ${env}`);
      } else {
        console.error(`Error adding ${items} to ${env}:`, errorMessage);
      }
    }
  });

  console.log(items, " + ", envConfig.parsed[items]);
}

export default envConfig.parsed;
