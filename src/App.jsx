import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import JobsPage from './pages/JobsPage';
import JobPage, { jobLoader } from './pages/JobPage';
import AddJobPage from './pages/AddJobPage';
import NotFoundPage from './pages/NotFoundPage';

const App = () => {
  const addJob = async (newJob) => {
    console.log(
      'This is a function that is passed as a prop from the child component to the parent page and then redirects to the jobs page',
    );
    const res = await fetch('/api/jobs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newJob),
    });
    return;
  };

  const deleteJob = async (id) => {
    console.log('delete', id);
    const res = await fetch(`/api/jobs/${id}`, {
      method: 'DELETE',
    });
    return;
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path='/'
        element={<MainLayout />}
      >
        <Route
          index
          element={<HomePage />}
        />
        <Route
          path='/jobs'
          element={<JobsPage />}
        />
        <Route
          path='/add-job'
          element={<AddJobPage addJobSubmit={addJob} />}
        />
        <Route
          path='/jobs/:id'
          element={<JobPage deleteJob={deleteJob} />}
          loader={jobLoader}
        />
        <Route
          path='*'
          element={<NotFoundPage />}
        />
      </Route>,
    ),
  );

  return (
    <main>
      <RouterProvider router={router} />
    </main>
  );
};

export default App;
