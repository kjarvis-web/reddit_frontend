import Navbar from './components/Navbar';
import ThreadForm from './components/ThreadForm';
import ThreadList from './components/ThreadList';

function App() {
  return (
    <main className="flex min-h-screen flex-col bg-zinc-600 text-zinc-100">
      <Navbar />
      <div className="container mx-auto py-12">
        <ThreadForm />
        <ThreadList />
      </div>
    </main>
  );
}

export default App;
