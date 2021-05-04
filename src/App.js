import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { Header } from './components/Header/Header';
import { Routes } from './components/Routes/Routes';

export const App = () => {

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <main>
          <Routes />
        </main>
      </BrowserRouter>
    </div>
  );
}
