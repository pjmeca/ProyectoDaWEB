import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Crear from './paginas/Crear';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Navegacion from './components/Plantilla/Navegacion';
import Footer from './components/Plantilla/Footer';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <>
        <Navegacion />

        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={App}></Route>
                <Route exact path="/restaurantes" component={App}></Route>
                <Route path='/crear' component={Crear}></Route>
            </Switch>
        </BrowserRouter>

        <Footer />
    </> 
);