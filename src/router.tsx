import { createBrowserRouter } from 'react-router-dom';
import Onboarding from './screens/Onboarding';
import Home from './screens/Home';
import Settings from './screens/Settings';
import Loading from './screens/Loading';
import Result from './screens/Result';
import NoCredits from './screens/NoCredits';
import Pricing from './screens/Pricing';

export const router = createBrowserRouter([
  { path: '/', element: <Onboarding /> },
  { path: '/home', element: <Home /> },
  { path: '/settings', element: <Settings /> },
  { path: '/loading', element: <Loading /> },
  { path: '/result', element: <Result /> },
  { path: '/no-credits', element: <NoCredits /> },
  { path: '/pricing', element: <Pricing /> },
]);
