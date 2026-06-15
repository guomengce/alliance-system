import { useRoutes } from 'react-router-dom';
import { appRouteObjects } from './routeConfig';

export default function AppRouter() {
  return useRoutes(appRouteObjects);
}