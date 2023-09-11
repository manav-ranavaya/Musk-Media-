import { Route, Routes } from "react-router-dom";
import Signup from "../Components/Form/Signup";
import Login from "../Components/Form/Login";
import Games from "./Games";
import ProtectedRoute from "../ProtectedRoute";
import GameDevelopers from "./GameDevelopers";
import Tournaments from "./Tournaments";
import AddGameDev from "./AddGameDev";

function App() {
  const auth = localStorage.getItem("auth") === "true";

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/games"
          element={<ProtectedRoute Component={Games} auth={auth} />}
        />
        <Route
          path="/gamedevelopers"
          element={<ProtectedRoute Component={GameDevelopers} auth={auth} />}
        />
        <Route
          path="/tournaments"
          element={<ProtectedRoute Component={Tournaments} auth={auth} />}
        />
        <Route
          path="/gamedevelopers/new"
          element={<ProtectedRoute Component={AddGameDev} auth={auth} />}
        />
        <Route
          path="/gamedevelopers/:id"
          element={<ProtectedRoute Component={AddGameDev} auth={auth} />}
        />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
