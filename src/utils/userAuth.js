import { fetchAuthSession } from 'aws-amplify/auth';


async function getIdToken() {
  try {
    const session = await fetchAuthSession();
    //return session.tokens.idToken.jwtToken;
    return session.tokens.accessToken;
  } catch (err) {
    return err;
  }
}

async function getIdTokenPayload() {
  try {
    const session = await fetchAuthSession();
    return session.tokens.idToken;
  } catch (err) {
    return err;
  }
}

async function getUserId() {
    const session = await fetchAuthSession();

  return session.tokens.idToken.payload.sub;
}

export {
  getIdToken,
  getIdTokenPayload,
  getUserId,
};
