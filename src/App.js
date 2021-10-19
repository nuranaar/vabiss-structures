import { useEffect } from 'react';
import LocalStore from 'devextreme/data/local_store';
import { structure_list } from './mock';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import Structure from './components/Structure';

import './App.scss';
import 'devextreme/dist/css/dx.light.css';
import "./icons/style.scss"

export const store = new LocalStore({
  key: "id",
  data: structure_list,
  name: 'structure_list',
})

function App() {
  useEffect(() => {
    return () => {
      store.clear()
    }
  }, [])

  return (
    <Router>
      <Route exact path="/"> <div className="App">
        <header className="App-header">
          <Link to="/structure">Structure</Link>
        </header>
      </div>
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
