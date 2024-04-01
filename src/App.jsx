import Navbar from './components/Navbar';
import ThreadList from './components/ThreadList';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Thread from './components/Thread';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from './reducers/loginReducer';
import User from './components/User';
import threadService from './services/threads';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
      threadService.setToken(user.token);
    }
  }, [dispatch]);
  return (
    <Router>
      <main className="flex min-h-screen flex-col bg-zinc-500 text-zinc-100">
        <Navbar />
        <div className="container mx-auto mt-12">
          <Routes>
            <Route path="/" element={<ThreadList />} />
            <Route path="/posts/:id" element={<Thread />} />
            <Route path="/users/:id" element={<User />} />
          </Routes>
        </div>
      </main>
    </Router>
  );
}

export default App;
