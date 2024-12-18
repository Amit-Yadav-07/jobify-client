import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import {
  HomeLayout,
  DashboardLayout,
  Landing,
  Register,
  Login,
  Error,
  AddJob,
  Stats,
  AllJobs,
  Profile,
  Admin,
  EditJob
} from './pages'


import { action as registerAction } from './pages/Register';
import { action as loginAction } from './pages/Login';
import { action as addJobAction } from './pages/AddJob';
import { loader as dashboardLoader } from './pages/DashboardLayout';
import { loader as allJobsLoader } from './pages/AllJobs';


// dark N light theme func
export const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem('darkTheme') === 'true'
  document.body.classList.toggle('dark-theme', isDarkTheme);
  return isDarkTheme;
}

checkDefaultTheme();

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <HomeLayout />,
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: <Landing />
        },
        {
          path: 'register',
          element: <Register />,
          action: registerAction
        },
        {
          path: 'login',
          element: <Login />,
          action: loginAction
        },
        {
          path: 'dashboard',
          loader: dashboardLoader,
          element: <DashboardLayout />,
          children: [
            {
              index: true,
              element: <AddJob />,
              action: addJobAction
            },
            {
              path: 'stats',
              element: <Stats />
            },
            {
              path: 'all-jobs',
              element: <AllJobs />,
              loader: allJobsLoader
            },
            {
              path: 'profile',
              element: <Profile />
            },
            {
              path: 'admin',
              element: <Admin />
            },
            {
              path: 'edit-job',
              element: <EditJob />
            }
          ]

        }
      ]
    },
  ])

  return (
    <RouterProvider router={router} />
  )

}

export default App
