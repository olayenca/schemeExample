import inAppBrowser from 'react-native-inappbrowser-reborn';

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
export const instagramTokens = {
  access_token: '',
  client_id: '550357975864603',
  client_secret: '433f38400b0cdf59e089c5e663632286',
  user_id: 0,
  redirect_uri: 'https://olayenca.github.io/iosCallbacks',
};

export default async function requestInstagram(apiUri, scheme) {
  try {
    if (await inAppBrowser.isAvailable()) {
      const result = await inAppBrowser.openAuth(apiUri);
      const {client_secret, client_id, redirect_uri} = instagramTokens;
      let qr = {};
      result.url
        .substring(scheme?.length + 1)
        .split('&')
        .forEach(p => {
          qr[p.split('=')[0]] = p.split('=')[1];
        });

      return requests(
        'POST',
        'https://api.instagram.com/oauth/access_token',
        `client_id=${client_id}&client_secret=${client_secret}&grant_type=authorization_code&redirect_uri=${redirect_uri}&code=${
          qr.code
        }`,
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
