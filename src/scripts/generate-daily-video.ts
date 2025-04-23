import { exec } from 'child_process';
import { renderVideo } from './render-video';

function run(): Promise<void> {
  console.log('Building Remotion project...');

  return new Promise<void>((resolve, reject) => {
    exec(
      "npx ts-node src/scripts/fetch-price-changes.ts",
      (error, stdout, stderr) => {
        if (error) {
          console.error(`Error fetching data: ${stderr}`);
          reject(error);
          return;
        }
        console.log(stdout);
        resolve();
      },
    );
  })
    .then(() => {
      console.log("Fetching price changes...");
      return new Promise<void>((resolve, reject) => {
        exec("npm run build", (error, stdout, stderr) => {
          if (error) {
            console.error(`Error building project: ${stderr}`);
            reject(error);
            return;
          }
          console.log(stdout);
          resolve();
        });
      });
    })
    .then(() => {
      console.log("Rendering video...");
      return renderVideo();
    })
    .then(() => {
      console.log("Video rendered successfully.");
    })
    .catch((err) => {
      console.error("Failed to generate daily video:", err);
    });
}

run();
