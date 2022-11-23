import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateForm from "./cores/ads/CreateForm";
import EditForm from "./cores/ads/EditForm";
import AdsList from "./cores/ads/AdsList";


function App() {
  return (
    <div className="bg-zinc-900 text-white h-full">
      <div className="flex items-center justify-center h-full">
        <BrowserRouter>
          <Routes>
            <Route path="/ads" element={<AdsList />} />
            <Route path="/newAd" element={<CreateForm />} />
            <Route path="/editAd/:id" element={<EditForm />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
