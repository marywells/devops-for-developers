import pulumi from '@pulumi/pulumi';
import aws from '@pulumi/aws';

type FmBucketArgs = {
  Name: string;
  Product: string;
};

class FMBucket extends pulumi.ComponentResource {
  constructor(args: FmBucketArgs, opts: pulumi.CustomResourceOptions) {
    const resourceName = `${args.Product}-${args.Name}`;

    super('pkg:index:FmBucket', resourceName, {}, opts);

    const bucket = new aws.s3.Bucket(args.Name, {
      acl: 'private',
      bucket: resourceName,
      tags: {
        Environment: 'Dev',
        Name: 'My bucket',
      },
    });
  }
}
