import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Home';
import SignUp from './SignUp';
import Login from './Login';
import UserDashboard from './UserDashboard';
import Layout from './Layout';
import ErrorPage from './ErrorPage';
import AdminPanel from './AdminDashboard';
import CourierForm from './forms/CourierForm';
import CourierList from './forms/CourierList';
import AboutUs from './AboutUs';
import Contact from './Contact';
import Services from './Services';
import Quotation from './quotation';
import TrackCourier from './TrackCourier';

function App() {

  const allRoutes = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: '/',
          element: <Home />
        },
        {
          path: '/quotation',
          element: <Quotation />
        },
        {
          path: '/about',
          element: <AboutUs />
        },
        {
          path: '/contact',
          element: <Contact />
        },
        {
          path: '/services',
          element: <Services />
        },
        {
          path: '/sign-up',
          element: <SignUp />
        },
        {
          path: '/login',
          element: <Login />
        },
        {
          path: '/userDashboard',
          element: <UserDashboard />
        },
        {
          path: '/adminDashboard',
          element: <AdminPanel />
        },
        {
          path: '/userDashboard/add-courier',
          element: <CourierForm />
        },
        {
          path: "/couriers",
          element: <CourierList />
        },
        {
          path: '/track',
          element: <TrackCourier />
        }
      ]
    }
  ]);

  return <RouterProvider router={allRoutes} />;
}

export default App;
