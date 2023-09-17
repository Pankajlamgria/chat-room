import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from "./components/Home";
import Chatstate from "./context/Chatstate";
import Chat from "./components/Chat";
document.title="ChatVerse";
function App() {

  return (
    <Chatstate>
    <Router>
     <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/chat">
            <Chat />
          </Route>
        </Switch>
    </Router>
    </Chatstate>
  );
}

export default App;
