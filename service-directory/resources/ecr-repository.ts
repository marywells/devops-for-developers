import * as pulumi from '@pulumi/pulumi';
import { getStack } from '@pulumi/pulumi';
import * as aws from '@pulumi/aws';

type FmDockerRepoArgs = {
  Name: string;
  Product: string;
  Immutable?: boolean;
};

export class FmDockerRepo extends pulumi.ComponentResource {
  constructor(args: FmDockerRepoArgs, opts?: pulumi.CustomResourceOptions) {
    const resourceName = `${args.Product}-${args.Name}`;

    super('pkg:index:FmDockerRepo', resourceName, {}, opts);

    new aws.ecr.Repository(
      args.Name,
      {
        name: resourceName,
        imageScanningConfiguration: { scanOnPush: false },
        imageTagMutability: 'MUTABLE',
      },
      { parent: this }
    );
  }
}
