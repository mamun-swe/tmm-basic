import './App.scss'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Register from './pages/auth/Register'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Register} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
