export const setCookie = (
    name: string,
    value: string,
    maxAge: number
  ): void => {
    const expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() + maxAge * 60 * 1000);
    const expires = `expires=${expirationDate.toUTCString()}`;
    document.cookie = `${name}=${value}; ${expires}; path=/`;
  };
  
  export const getCookie = (name: string): string => {
    const cookieName = `${name}=`;
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookies = decodedCookie.split(";");
  
    for (const cookie of cookies) {
      const trimmedCookie = cookie.trim();
      if (trimmedCookie.indexOf(cookieName) === 0) {
        return trimmedCookie.substring(cookieName.length);
      }
    }
    return "";
  };
  
  export const removeCookie = (name: string): void => {
    const expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() - 1);
  
    const expires = `expires=${expirationDate.toUTCString()}`;
    document.cookie = `${name}=; ${expires}; path=/`;
  };