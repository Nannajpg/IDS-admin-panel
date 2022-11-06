import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateForm from "./cores/ads/CreateForm";
import EditForm from "./cores/ads/EditForm";
import AdsList from "./cores/ads/AdsList";
import HomePage from "./cores/homepage/HomePage";
import NavBar from "./components/NavBar";
import TeamsList from "./cores/teams/TeamsList";
import CreateFormTeam from "./cores/teams/CreateFormTeam";
import EditFormTeam from "./cores/teams/EditFormTeam";

function App() {
  return (
    <div className="bg-zinc-900 text-white h-full">
      <NavBar />
      <div className="flex items-center justify-center h-full">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/teamList" element={<TeamsList />} />
            <Route path="/newTeam" element={<CreateFormTeam />} />
            <Route path="/editTeam/:id" element={<EditFormTeam />} />
            <Route path="/adList" element={<AdsList />} />
            <Route path="/newAd" element={<CreateForm />} />
            <Route path="/editAd/:id" element={<EditForm />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
