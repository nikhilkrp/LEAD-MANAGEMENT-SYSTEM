import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import LeadForm from "./pages/LeadForm";
import LeadList from "./pages/LeadList";
import Navbar from "./components/Navbar";



function App() {


  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/leads" element={<LeadList />} />
          <Route path="/leads/create" element={<LeadForm />} />
          <Route path="/leads/edit/:id" element={<LeadForm />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
