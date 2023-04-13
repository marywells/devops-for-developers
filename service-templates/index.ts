//@ts-nocheck
import { readFileSync } from 'fs';
import Yargs, { config } from 'yargs';
import { configure, render } from 'nunjucks';

type BuildJSONDockerFile = {
  PreInstallCommands: string[];
};

type BuildJSON = {
  Dockerfile: BuildJSONDockerFile;
  Name: string;
  Service: string;
};

function main() {
  const argv = Yargs(process.argv.slice(2)).argv;
  const buildPath = argv['config'];

  const configuration = readFileSync(buildPath, 'utf8');
  const configurationData = JSON.parse(configuration) as BuildJSON;

  configure('templates', { autoescape: true });

  const file = render('Dockerfile', {
    ServiceName: configurationData.ServiceName,
    ServiceType: configurationData.ServiceType,
  });
  console.log(file);
}

main();
