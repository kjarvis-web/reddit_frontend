import { useSelector } from 'react-redux';
import LoginForm from './components/LoginForm';
import Navbar from './components/Navbar';
import ThreadForm from './components/ThreadForm';
import ThreadList from './components/ThreadList';

function App() {
  const user = useSelector((state) => state.login);

  return (
    <main className="flex min-h-screen flex-col bg-zinc-600 text-zinc-100">
      <Navbar />
      <div className="container mx-auto py-12">
        {!user ? <LoginForm /> : <ThreadForm />}
        <ThreadList />
      </div>
    </main>
  );
}

export default App;
