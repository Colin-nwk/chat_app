import Login from "./pages/Login";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import { Toaster } from "react-hot-toast";

import { Route, Routes } from "react-router-dom";

/**
 * Description placeholder
 *
 * @returns {*}
 */
function App() {
  return (
    <>
      <section className="flex items-center justify-center w-full h-screen p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
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
