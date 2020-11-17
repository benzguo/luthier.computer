import { NextApiRequest, NextApiResponse } from 'next';
import { getCustomer } from '../../lib/ops';
import { AWS_ENDPOINT, AWS_REGION, AWS_BUCKET } from '../../lib/const';
import { ErrorResponse } from '../../lib/typedefs';
import { parseTrayUrl } from '../../lib/utils';
import Stripe from 'stripe';
import { getSession } from 'next-auth/client';
import { validateSession } from '../../lib/validateSession';

/**
 * Returns a new signed upload URL.
 * If this is a child page, also returns an upload URL for the parent page.
 */
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    return res.status(400);
  }
  // TODO(#39): use JWT – more secure?
  // const token = await jwt.getToken({ req, secret });
  const session = await getSession({ req });
  const authError = validateSession(session, req);
  let error = null;
  if (authError) {
    return res.status(authError.httpStatus).json(authError);
  }
  let s3 = null;

  try {
    const AWS = require('aws-sdk');
    s3 = new AWS.S3({
      accessKeyId: process.env.S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.S3_SECRET,
      region: AWS_REGION,
    });
    // AWS.config.update(config);
    // console.log('region', AWS.config.region);
  } catch (e) {
    const message = 'Error initializing AWS SDK: ' + e.message;
    console.error(message);
    error = message;
  }

  const [username, pageId] = parseTrayUrl(req.headers.referer);

  if (pageId === 'pay') {
    return res.status(500).json({ error: { message: 'unimplemented' } });
  }

  let uploadUrl = null;
  let parentUploadUrl = null;
  let stripeAccount = null;

  let stripeKey = process.env.STRIPE_SECRET_KEY;
  const stripe = require('stripe')(stripeKey);

  // get stripe account id
  const customerRes = await getCustomer(username);
  if (customerRes.errored) {
    const error = customerRes.data as ErrorResponse;
    return res.status(error.httpStatus).json(error);
  }
  const customer = customerRes.data as Stripe.Customer;
  const stripeAccountId = customer.metadata['stripe_account_id'];
  if (stripeAccountId) {
    try {
      stripeAccount = await stripe.accounts.retrieve(stripeAccountId);
    } catch (e) {
      const message = `Error retrieving Stripe account <${stripeAccountId}>: ` + e.message;
      console.error(message);
      error = message;
    }
  }

  let objectKey = `@${username}`;
  let parentObjectKey = null;
  try {
    if (pageId) {
      parentObjectKey = objectKey;
      objectKey = `@${username}/${pageId}`;
    }

    uploadUrl = await s3.getSignedUrlPromise('putObject', {
      Bucket: AWS_BUCKET,
      Key: objectKey,
      ContentType: 'application/json',
    });
    // the S3 SDK has weird caching behavior.
    // i've seen it swap us-west-2 for us-west-1.
    // simply replacing seems to work, but this is a brittle workaround
    if (parentObjectKey) {
      parentUploadUrl = await s3.getSignedUrlPromise('putObject', {
        Bucket: AWS_BUCKET,
        Key: parentObjectKey,
        ContentType: 'application/json',
      });
    }
  } catch (e) {
    const message = `Error creating upload URL(s) <${objectKey}>, <${parentObjectKey}>: ` + e.message;
    error = message;
  }
  return res
    .status(200)
    .json({ error: error, uploadUrl: uploadUrl, parentUploadUrl: parentUploadUrl, stripeAccount: stripeAccount });
};