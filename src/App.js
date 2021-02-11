import './App.scss'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import PrivateRoute from './components/privateRoute/Index'
import ScrollToTop from './components/scrollToTop/Index'

import LoginPage from './pages/auth/Login'
import AdminMaster from './pages/admin/master/Index'
import FourOfour from './pages/fourOfour/Index'

function App() {
  return (
    <div className="App">
      <Router>
        <ScrollToTop>
          <Switch>
            <Route exact path="/" component={LoginPage} />

            {/* <Route path="/dashboard" component={AdminMaster} /> */}

            {/* Admin master page */}
            <PrivateRoute path="/dashboard" role="super_admin">
              <AdminMaster />
            </PrivateRoute>

            <Route path="*" component={FourOfour} />
          </Switch>
        </ScrollToTop>
      </Router>
    </div>
  );
}

export default App;
