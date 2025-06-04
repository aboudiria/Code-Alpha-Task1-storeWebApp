import { BrowserRouter, Route,  Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Register from "./components/Register";
import Login from "./components/Login";
import AdminDashbordPage from "./pages/AdminDashbordPage";


function App() {

  return (
    <BrowserRouter>
    
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin-dashboard" element={<AdminDashbordPage />} />
      </Routes>
   
     </BrowserRouter>
    
  )
}

export default App
