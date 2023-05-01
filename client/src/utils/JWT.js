import Cookies from 'js-cookie';

export function GetJWT() {
    
    let jwt = Cookies.get('jwt')
    console.log("JWT: " + jwt + " tipo: " + typeof(jwt))

    return jwt;
}

export function logout() {
    Cookies.remove("jwt")

    return null
}

export function isLogin() {
    return Cookies.get("jwt")!= undefined;
}