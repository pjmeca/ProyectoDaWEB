import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';

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

export function GetCorreo() {
    const decoded = jwt_decode(GetJWT()); 
 	return decoded.usuario
}

export function GetRol() {
    const decoded = jwt_decode(GetJWT()); 
 	return decoded.rol
}

export function IsGestor() {
    return isLogin() && GetRol() === "GESTOR"
}

export function IsAllowed(idGestor) {
    console.log(GetCorreo())
    console.log(idGestor)
    return IsLogin() && IsGestor() && (GetCorreo() == idGestor)
}