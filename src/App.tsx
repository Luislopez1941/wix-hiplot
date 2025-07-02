import './App.css'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import RoutesWithNotFonud from './utils/routes-with-not-found';

import AuthGuard from './guards/auth.guard';
import { Login } from './pages/public/Login/Login';
import RootHome from './pages/Private/Home/RootPage';
import { PrivateRoutes, PublicRoutes } from './models/routes';
import WebNavigation from './pages/Private/webNavigation/WebNavigation';

function App() {
  return (
    <Router>
      <RoutesWithNotFonud>
        <Route path={`/${PublicRoutes.LOGIN}`} element={<Login />} />
        <Route path='/' element={<RootHome />} />
        <Route element={<AuthGuard privateValidation={true} />}>
          <Route path={`/${PrivateRoutes.CRM}`} element={<WebNavigation />} />
        </Route>
      </RoutesWithNotFonud>
    </Router>
  )
}

export default App
