import * as pulumi from '@pulumi/pulumi';
import * as aws from '@pulumi/aws';
import { FmBucket } from './resources/bucket';
import { FmFrontend } from './services/frontend';

function main() {
  new FmFrontend({
    Name: 'example-mary',
    Product: 'devops-course',
  });
}

main();
