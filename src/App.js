import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StickerForm from './cores/stickers/StickerForm';
import StickersList from './cores/stickers/StickersList';

function App() {
  return (
    <div className='h-screen bg-slate-200'>
      <div className="bg-slate-200">
        <div className="flex justify-center h-full">
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<StickersList />} />
              <Route path='/create-sticker' element={<StickerForm />} />
              <Route path='/edit-sticker/:id' element={<StickerForm />} />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </div>
  );
}

export default App;
