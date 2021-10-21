import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import Structure from './components/Structure';
import { useEffect } from "react";

import './App.scss';
import 'devextreme/dist/css/dx.light.css';
import "./icons/style.scss"

import { structure_list } from "./mock";
import LocalStore from "devextreme/data/local_store";

export const store = new LocalStore({
  key: "id",
  data: structure_list,
  name: "structure_list",
});

function App() {

  useEffect(() => {
    return () => {
      store.clear();
    };
  }, []);

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Link className="link" to="/structure">Structure</Link>
          <Link className="link" to="/">Home</Link>
        </header>
      </div>
      <Route exact path="/">
      </Route>
      <Switch>
        <Route exact path="/structure">
          <Structure />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
