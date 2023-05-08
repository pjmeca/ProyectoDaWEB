import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Crear from "./paginas/Crear";
import Restaurante from "./paginas/Restaurante";
import Opinion from "./paginas/Opinion";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Navegacion from "./components/Plantilla/Navegacion";
import Footer from "./components/Plantilla/Footer";
import AbsoluteRedirect from "./utils/AbsoluteRedirect";
import RedirectTo from "./utils/RedirectTo";
import { IsLogin } from "./utils/JWT";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Error404 from "./components/Error404";
import Modificar from "./paginas/Modificar";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <Navegacion />

    <BrowserRouter>
      {!IsLogin() ? (
        <Switch>
          <Route exact path="/" component={App}></Route>
          <Route
            exact
            path="/login"
            render={() => <RedirectTo puerto="8090" ruta="restaurantes" />}
          ></Route>

          <Route path="/" render={() => <Redirect to="/" />}></Route>
        </Switch>
      ) : (
        <Switch>
          <Route exact path="/" component={App}></Route>
          <Route exact path="/restaurantes" component={App}></Route>
          <Route exact path="/crear" component={Crear}></Route>
          <Route
            exact
            path="/restaurantes/:id"
            render={(props) => <Restaurante id={props.match.params.id} />}
          ></Route>
          <Route
            exact
            path="/restaurantes/:id/modificar"
            render={(props) => <Modificar id={props.match.params.id} />}
          ></Route>
          <Route
            exact
            path="/opiniones/:id"
            render={(props) => <Opinion id={props.match.params.id} />}
          ></Route>
          <Route exact path="/login" render={() => <Redirect to="/" />}></Route>
          <Route path="/" component={Error404}></Route>
        </Switch>
      )}
    </BrowserRouter>

    <Footer />
  </>
);
