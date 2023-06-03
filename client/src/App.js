import Header from "./components/header";
import { Routes, Route } from "react-router-dom";
import Blogs from "./pages/blogs";
import Signin from "./pages/signin";
import Signup from "./pages/signup";
import UserBlogs from "./pages/userBlogs";
import CreateBlog from "./pages/createBlog";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Blogs />} />
        <Route path="/all-blogs" element={<Blogs />} />
        <Route path="/my-blogs" element={<UserBlogs />} />
        <Route path="/create-blog" element={<CreateBlog />} />
        <Route path="/login" element={<Signin />} />
        <Route path="/register" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
