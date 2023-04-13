import {
  ComponentResource,
  CustomResourceOptions,
  getStack,
} from '@pulumi/pulumi';
import { FmBucket } from '../resources/bucket';
import { FmDockerRepo } from '../resources/ecr-repository';

type FmBackendArgs = {
  Name: string;
  Product: string;
};

export class FmBackend extends ComponentResource {
  constructor(args: FmBackendArgs, opts?: CustomResourceOptions) {
    const resourceName = `${args.Product}-${args.Name}`;

    super('pkg:index:FmBackend', resourceName, {}, opts);

    new FmDockerRepo(
      { Name: args.Name, Product: args.Product },
      { parent: this }
    );
  }
}
