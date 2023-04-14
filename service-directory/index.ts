import { FmFrontend } from './services/frontend';
import { FmBackend } from './services/backend';

function main() {
  new FmBackend({ Name: 'backend', Product: 'devops-resource' });

  new FmFrontend({
    Name: 'frontend',
    Product: 'devops-resource',
  });
}

main();
