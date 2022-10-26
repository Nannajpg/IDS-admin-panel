import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StickerForm from './components/StickerForm';
import StickersList from './components/StickersList';

function App() {
  return (
    <div className="bg-slate-200 h-screen">
      <div className="flex items-center justify-center h-full">
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<StickersList />} />
            <Route path='/create-sticker' element={<StickerForm />} />
            <Route path='/edit-sticker/:id' element={<StickerForm />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
