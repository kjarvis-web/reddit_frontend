import { useSelector } from 'react-redux';
import Navbar from './components/Navbar';
import ThreadForm from './components/ThreadForm';
import ThreadList from './components/ThreadList';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Thread from './components/Thread';

function App() {
  const user = useSelector((state) => state.login.user);

  return (
    <Router>
      <main className="flex min-h-screen flex-col bg-zinc-600 text-zinc-100">
        <Navbar />
        <div className="container mx-auto mt-24">
          {user && <ThreadForm />}
          <Routes>
            <Route path="/" element={<ThreadList />} />
            <Route path="/posts/:id" element={<Thread />} />
          </Routes>
        </div>
      </main>
    </Router>
  );
}

export default App;
