export function deleteEDSAuthCookies() {
  const commonParams = 'expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/;';

  document.cookie = `am-auth-jwt=;${commonParams}`;
  document.cookie = `amlbcookie=;domain=*****.gov.tr;${commonParams}`;

  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i += 1) {
    const cookieName = ca[i].split('=')[0].trim();
    if (cookieName.indexOf('iPlanetDirectory') >= 0) {
      document.cookie = `${cookieName}=;domain=*****.gov.tr;${commonParams}`;
    }
  }
  window.location.reload();
}
