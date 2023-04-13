import * as pulumi from '@pulumi/pulumi';
import { getStack } from '@pulumi/pulumi';
import * as aws from '@pulumi/aws';
import * as fs from 'fs';

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

    let bucketArgs: aws.s3.BucketArgs = {
      acl: 'private',
      bucket: bucketName,
      tags: {
        Environment: stack,
      },
    };

    if (args.Public) {
      bucketArgs = {
        acl: 'public-read',
        website: {
          indexDocument: 'index.html',
          errorDocument: 'error.html',
          routingRules: `[{
        "Condition": {
            "KeyPrefixEquals": "docs/"
        },
        "Redirect": {
            "ReplaceKeyPrefixWith": "documents/"
        }
    }]
    `,
        },
      };
    }

    const bucket = new aws.s3.Bucket(args.Name, bucketArgs, {
      parent: this,
    });
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
