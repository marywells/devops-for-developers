import { FmFrontend } from './services/frontend';
import { FmBackend } from './services/backend';

function main() {
  new FmBackend({ Name: 'example-mary', Product: 'devops-course' });

  new FmFrontend({
    Name: 'example-mary',
    Product: 'devops-course',
  });
}

main();
