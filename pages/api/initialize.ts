import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';
import { validateSession } from '../../lib/validateSession';

/**
 * Initializes page data for a new user.
 */
export default async (req: NextApiRequest, res: NextApiResponse) => {
  console.log('api/initialize');
  if (req.method !== 'POST') {
    return res.status(400);
  }
  // TODO(#39): use JWT – more secure?
  // const token = await jwt.getToken({ req, secret });
  const session = await getSession({ req });
  const authError = validateSession(session, null);
  if (authError) {
    return res.status(authError.httpStatus).json(authError);
  }

  const params = JSON.parse(req.body);

  const uploadUrl = params.uploadUrl;
  const data = params.data;
  if (data) {
    return res.status(409).json({
      error: 'Already initialized',
    });
  }

  const payload = {
    email: session.user.email,
    name: session.user.name,
    profile_image: session.user.picture,
    twitter_id: session.user.id,
    twitter_username: session.user.username,
    twitter_description: session.user.description,
  };

  try {
    const response = await fetch(uploadUrl, {
      method: 'PUT',
      body: JSON.stringify(payload, null, 2),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res.status(response.status).json(payload);
  } catch (e) {
    return res.status(500).json({
      error: e.message,
    });
  }
};