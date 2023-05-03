const { hostname, protocol } = window.location;

export default function RedirectTo({puerto, ruta}) {
    window.location.href = `${protocol}//${hostname}:${puerto}/${ruta}`;

    return <></>
}