//import logo from './logo.svg';
import MyNavbar from "./components/MyNavbar";
import Home from "./components/views/Home";
import CreateInstance from "./components/views/CreateInstance";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const App = () => {
  return (
    <div className="App">
      <MyNavbar />
      <Router>
        <Switch>
          <Route path="/CreateInstance" component={CreateInstance} />
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
