import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Crear from './paginas/Crear';
import Restaurante from './paginas/Restaurante';
import Opinion from './paginas/Opinion';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import Navegacion from './components/Plantilla/Navegacion';
import Footer from './components/Plantilla/Footer';
import AbsoluteRedirect from './utils/AbsoluteRedirect';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <>
        <Navegacion />

        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={App}></Route>
                <Route exact path="/restaurantes" component={App}></Route>
                <Route exact path='/crear' component={Crear}></Route>
                <Route exact path='/restaurantes/:id' render={(props) => <Restaurante id={props.match.params.id} />}></Route>
                <Route exact path='/opiniones/:id' render={(props) => <Opinion id={props.match.params.id} />}></Route>
                <Route exact path='/login' render={() => <AbsoluteRedirect to={"http://localhost:8090/restaurantes"} />}></Route>
            </Switch>
        </BrowserRouter>

        <Footer />
    </>
);