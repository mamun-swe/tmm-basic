import './App.scss'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import UserIndex from './pages/users/Index'
import UserEdit from './pages/users/Edit'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={UserIndex} />
          <Route exact path="/users/:email/edit" component={UserEdit} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
