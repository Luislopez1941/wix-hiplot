import './App.css'
import { BrowserRouter as Router, Route, Navigate } from 'react-router-dom';
import RoutesWithNotFonud from './utils/routes-with-not-found';
import { PublicRoutes } from './models/routes';
import { PrivateRoutes } from './models/routes';
import RouteProtector from './pages/Private/RouteProtector';
import AuthGuard from './guards/auth.guard';


function App() {
  return (
    <Router>
      <RoutesWithNotFonud>
        <Route path="/" element={<Navigate to={PrivateRoutes.PRIVATE} />} />
        {/* <Route path={PublicRoutes.LOGIN} element={<Login />} /> */}
        <Route element={<AuthGuard privateValidation={true} />}>
          <Route path={`${PrivateRoutes.PRIVATE}/*`} element={<RouteProtector />} />
        </Route>
      </RoutesWithNotFonud>
    </Router>
  )
}

export default App
