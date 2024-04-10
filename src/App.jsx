import Navbar from './components/Navbar';
import ThreadList from './components/ThreadList';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Thread from './components/Thread';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loggedUser } from './reducers/loginReducer';
import User from './components/User';
import SignUpForm from './components/SignUpForm';
import Footer from './components/Footer';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(loggedUser(user));
    }
  }, [dispatch]);
  return (
    <Router>
      <main className="flex min-h-screen flex-col bg-zinc-100 text-zinc-100">
        <Navbar />
        <div className="container mx-auto mt-36">
          <Routes>
            <Route path="/" element={<ThreadList />} />
            <Route path="/posts/:id" element={<Thread />} />
            <Route path="/users/:id" element={<User />} />
            <Route path="/signup" element={<SignUpForm />} />
          </Routes>
        </div>
        <Footer />
      </main>
    </Router>
  );
}

export default App;
