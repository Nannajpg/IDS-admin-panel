import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./cores/homepage/HomePage";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div className="bg-zinc-900 text-white h-full">
      <NavBar />
      <div className="flex items-center justify-center h-full">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
