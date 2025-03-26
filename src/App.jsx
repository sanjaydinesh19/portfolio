import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import AssignmentHome from "./pages/Assignment/AssignmentHome";
import Assignment1 from "./pages/Assignment/Assignment1";
import Assignment2 from "./pages/Assignment/Assignment2";
import Assignment3 from "./pages/Assignment/Assignment3";
import Assignment4 from "./pages/Assignment/Assignment4";
import Assignment5 from "./pages/Assignment/Assignment5";
import Assignment6 from "./pages/Assignment/Assignment6";
import Assignment6_Part2 from "./pages/Assignment/Assignment6_Part2";
import ProjectHome from "./pages/Project/ProjectHome";
import Project1 from "./pages/Project/Project1";
import Project2 from "./pages/Project/Project2";
import Project3 from "./pages/Project/Project3";
import Project4 from "./pages/Project/Project4";
import Project5 from "./pages/Project/Project5";
import Contact from "./Contact"; 
import Home from "./Home";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/assignments" element={<AssignmentHome />} />
        <Route path="/assignment1" element={<Assignment1 />} />
        <Route path="/assignment2" element={<Assignment2 />} />
        <Route path="/assignment3" element={<Assignment3 />} />
        <Route path="/assignment4" element={<Assignment4 />} />
        <Route path="/assignment5" element={<Assignment5 />} />
        <Route path="/assignment6" element={<Assignment6 />} />
        <Route path="/assignment6_part2" element={<Assignment6_Part2 />} />
        <Route path="/projects" element={<ProjectHome />} />
        <Route path="/project1" element={<Project1 />} />
        <Route path="/project2" element={<Project2 />} />
        <Route path="/project3" element={<Project3 />} />
        <Route path="/project4" element={<Project4 />} />
        <Route path="/project5" element={<Project5 />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;