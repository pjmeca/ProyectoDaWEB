import {useState} from 'react'

export default function PrimerComponente( {titulo} ) {

    //const titulo = props.titulo;

    //let nombre = "Pablo";
    let web = "miweb";

    const [nombre, setNombre] = useState("Pablo");

    let array = [
        "Elem1",
        "Elem2",
        "Elem3",
        "Elem4"
    ];

    const cambiarNombre = (nuevoNombre) => {
        setNombre(nuevoNombre)
    }

  return (
    <div>
        <div>PrimerComponente</div>
        <h1>Hola! Soy el Primer componente llamado desde: {titulo}</h1>
        <p>Mi nombre es: <strong className={nombre.length >= 4 ? 'verde' : 'rojo'}>{nombre}</strong></p>
        <p>Mi web es: {web}</p>

        <input type="text" onChange={ e => cambiarNombre(e.target.value)} placeholder="Cambia el nombre" />
        <button onClick={ e => {
            console.log("El valor guardado en el estado es:", nombre);
        }}>Mostrar valor del estado</button>

        <button onClick={ e=> cambiarNombre("PABLO")}>Cambiar nombre</button>

        <ul>
            {
                array.map((array, indice) => {
                    return (<li key={indice}>
                        { array }
                    </li>)
                })
            }
        </ul>
    </div>
  )
}
