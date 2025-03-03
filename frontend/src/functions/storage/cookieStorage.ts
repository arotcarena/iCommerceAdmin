export const setCookie = (
    name: string,
    value: any,
    expire: number, //seconds
    path: string = '/',
    domain: string = '',
    security: boolean = true
): void => {

    const expirationDate = new Date(Date.now() + (expire * 1000));

    document.cookie = name + ' = ' + JSON.stringify(value) + '  ' +
              ((expire === undefined) ? '' : ('; expires = ' + expirationDate.toUTCString())) +
              ((path === undefined) ? '' : ('; path = ' + path)) +
              ((domain === undefined) ? '' : ('; domain = ' + domain)) +
              ((security === true) ? '; secure' : '');
}


export const getCookie = (
    name: string
) => {
    if(document.cookie.length === 0) {
        return null;
    }

    const regSepCookie = new RegExp('(; )', 'g');
    const cookies = document.cookie.split(regSepCookie);

    for(let i = 0; i < cookies.length; i++){
      const regInfo = new RegExp('=', 'g');
      const infos = cookies[i].split(regInfo);
      if(infos[0] === name){
        return JSON.parse(infos[1]);
      }
    }
    return null;
}

