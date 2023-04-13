//@ts-nocheck
import { readFileSync } from 'fs';
import Yargs, { config } from 'yargs';

type BuildJSON = {
  Name: string;
  Service: string;
};

function main() {
  const argv = Yargs(process.argv.slice(2)).argv;

  const buildPath = argv['config'];

  const configuration = readFileSync(buildPath, 'utf8');
  const configurationData = JSON.parse(configuration) as BuildJSON;
  console.log(configurationData.Name);
}

main();
