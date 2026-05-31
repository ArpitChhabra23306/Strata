import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { APITester } from "./APITester";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import Auth from "./pages/Auth";
import logo from "./logo.svg";
import reactLogo from "./react.svg";


export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
