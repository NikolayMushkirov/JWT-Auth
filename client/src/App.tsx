import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import NavigationBar from "./components/NavigationBar";
import Demo from "./pages/Demo";
import { SnackbarProvider } from "notistack";

function App() {
  return (
    <main className="h-dvh py-8 flex flex-col">
      <SnackbarProvider/>
      <BrowserRouter>
        <NavigationBar />
        <Routes>
          <Route path="sign-in" element={<SignIn />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="demo" element={<Demo />} />
          <Route path="*" element={<Navigate to={"sign-in"} />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
