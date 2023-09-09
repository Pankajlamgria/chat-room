import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from "./components/Home";
import io from "socket.io-client";
const socket=io.connect("http://localhost:3001");

function App() {
  return (
    <Router>
     <Switch>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
