import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import Structure from './components/Structure';

import './App.scss';
import 'devextreme/dist/css/dx.light.css';
import "./icons/style.scss"



function App() {

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
