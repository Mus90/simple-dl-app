//import logo from './logo.svg';
import MyNavbar from "./components/MyNavbar";
import Home from "./components/views/Home";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <div className="App">
      <MyNavbar />
      <Home />
    </div>
  );
};

export default App;
