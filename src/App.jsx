import { Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Chat from "./Pages/Chat/Chat";
import Login from "./Pages/User/Login";
import SignUp from "./Pages/User/SignUp";

function App() {
  return (
    <>
      <div id="App" className="bg-cover h-screen w-full">
        <Routes>
          <Route
            exact
            path="/"
            element={
                <Chat />
            }
          />

          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signUp" element={<SignUp />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
