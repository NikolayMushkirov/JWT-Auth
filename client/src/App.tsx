import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import NavigationBar from "./components/NavigationBar";
import Demo from "./pages/Demo";
import { SnackbarProvider } from "notistack";

import { AuthContext } from "./contexts/AuthContext";
import { useContext } from "react";

function App() {
  const { isUserLogged } = useContext(AuthContext) as AuthContext;
  return (
    <main className="h-dvh py-8 flex flex-col items-center">
      <SnackbarProvider />
      <BrowserRouter>
        <NavigationBar isUserLogged={isUserLogged} />
        <Routes>
          {isUserLogged ? (
            <Route path="demo" element={<Demo />} />
          ) : (
            <>
              <Route path="sign-in" element={<SignIn />} />
              <Route path="sign-up" element={<SignUp />} />
            </>
          )}
          <Route
            path="*"
            element={<Navigate to={isUserLogged ? "demo" : "sign-in"} />}
          />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
