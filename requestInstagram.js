import inAppBrowser from 'react-native-inappbrowser-reborn';
import {URLSearchParams} from "whatwg-url";

/*
 * These tokens will not work as this app is unpublished.
 * To generate your app tokens, create an app on
 * https://developers.facebook.com
 * and add yourself/instagram profile as a test user
 */

export const instagramTokens = {
  access_token: '',
  client_id: '550357975864603',
  client_secret: '433f38400b0cdf59e089c5e663632286',
  user_id: 0,
  redirect_uri: 'https://olayenca.github.io/ios-app-webpage',
  scheme: 'appName://',
};

const requests = async (type = 'GET', url = '', data = '') => {
  const response = await fetch(url, {
    method: type,
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: data,
  });

  return await response.json();
};

export default async function requestInstagram(apiUri, scheme) {
  try {
    if (await inAppBrowser.isAvailable()) {
      const {client_secret, client_id, redirect_uri} = instagramTokens;
      const result = await inAppBrowser.openAuth(apiUri);
      const code = new URLSearchParams(result?.url.split('?')[1]).get('code');

      return requests(
        'POST',
        'https://api.instagram.com/oauth/access_token',
        `client_id=${client_id}&client_secret=${client_secret}&grant_type=authorization_code&redirect_uri=${redirect_uri}&code=${code}`,
      ).then(second => {
        if (second.access_token.length > 0) {
          const {user_id, access_token} = second;

          return requests(
            'GET',
            `https://graph.instagram.com/${user_id}?fields=id,username&access_token=${access_token}`,
            '',
          );
        }
      });
    }
  } catch (e) {
    console.error(e);
  }
}
