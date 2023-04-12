import * as pulumi from '@pulumi/pulumi';
import { getStack } from '@pulumi/pulumi';
import * as aws from '@pulumi/aws';

type FmBucketArgs = {
  Name: string;
  Product: string;
  Public?: boolean;
};

export class FmBucket extends pulumi.ComponentResource {
  constructor(args: FmBucketArgs, opts?: pulumi.CustomResourceOptions) {
    const resourceName = `${args.Product}-${args.Name}`;

    super('pkg:index:FmBucket', resourceName, {}, opts);

    const stack = getStack();

    const bucketName = `${resourceName}-${stack}`;

    const bucket = new aws.s3.Bucket(
      args.Name,
      {
        acl: 'private',
        bucket: bucketName,
        tags: {
          Environment: stack,
        },
      },
      {
        parent: this,
      }
    );
    if (!args.Public) {
      new aws.s3.BucketPublicAccessBlock(
        args.Name,
        {
          // adding public access block to all buckets by default
          bucket: bucket.id,
          blockPublicAcls: true,
          blockPublicPolicy: true,
          ignorePublicAcls: true,
          restrictPublicBuckets: true,
        },
        {
          parent: this,
        }
      );
    }
  }
}
