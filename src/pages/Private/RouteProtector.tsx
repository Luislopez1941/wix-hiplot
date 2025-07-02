
import { Route} from 'react-router-dom'
import RoutesWithNotFonud from '../../utils/routes-with-not-found'
import { PrivateRoutes } from '../../models/routes'
import WebNavigation from './webNavigation/WebNavigation'

const RouteProtector = () => {
  return (
    <RoutesWithNotFonud>
      <Route path={PrivateRoutes.WEBPAGE} element={<WebNavigation />} />
    </RoutesWithNotFonud>
  )
}

export default RouteProtector
