import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ResumeBuilder from "./pages/ResumeBuilder";
import Review from "./pages/Review";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/build" element={<ResumeBuilder />} />
      <Route path="/review" element={<Review />} />
    </Routes>
  );
}
