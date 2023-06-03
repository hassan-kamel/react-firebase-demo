import { useEffect, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';

function App() {
  const [token, setToken] = useState<string | null>(null);
  useEffect(() => {
    if (localStorage.getItem('token')) setToken(localStorage.getItem('token'));
  }, []);

  return (
    <div className='min-h-screen text-xl text-gray-600 bg-white max-w-screen dark:bg-gray-800 dark:text-white sm:text-2xl'>
      <Navigation />
      <Routes>
        <Route
          path='/'
          Component={() => (token ? <Home /> : <Navigate to='/login' />)}
        />
        <Route
          path='/login'
          Component={() => (token ? <Navigate to='/' /> : <LogIn />)}
        />
        <Route
          path='/signup'
          Component={() => (token ? <Navigate to='/' /> : <SignUp />)}
        />
      </Routes>
    </div>
  );
}

export default App;
