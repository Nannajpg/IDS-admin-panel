import { BrowserRouter, Routes, Route } from "react-router-dom";
import TeamsList from "./cores/teams/TeamsList";
import CreateFormTeam from "./cores/teams/CreateFormTeam";
import EditFormTeam from "./cores/teams/EditFormTeam";

function App() {
  return (
    <div className="bg-zinc-900 text-white h-full">
      <div className="flex items-center justify-center h-full">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<h1>menu uwu</h1>} />
            <Route path="/teams" element={<TeamsList />} />
            <Route path="/newTeam" element={<CreateFormTeam />} />
            <Route path="/editTeam/:id" element={<EditFormTeam />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
