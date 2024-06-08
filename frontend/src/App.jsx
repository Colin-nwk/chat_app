import Login from "./pages/Login";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import { Toaster } from "react-hot-toast";

import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthContext } from "./context/AuthContext";

/**
 * Description placeholder
 *
 * @returns {*}
 */
function App() {
  const { authUser } = useAuthContext();
  return (
    <>
      <section className="flex items-center justify-center w-full h-screen p-4">
        <Routes>
          <Route
            path="/"
            element={!authUser ? <Navigate to="/login" /> : <Home />}
          />
          <Route
            path="/login"
            element={authUser ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/signup"
            element={authUser ? <Navigate to="/" /> : <Signup />}
          />
          {/* <Login /> */}
          {/* <Signup /> */}
        </Routes>
        <Toaster
          toastOptions={{
            style: {
              background: "indigo",
              color: "white",
            },
          }}
        />
      </section>
    </>
  );
}

export default App;
