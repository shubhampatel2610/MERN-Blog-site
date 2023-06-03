import Header from "./components/header";
import { Routes, Route } from "react-router-dom";
import Blogs from "./pages/blogs";
import Signin from "./pages/signin";
import Signup from "./pages/signup";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Blogs />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
