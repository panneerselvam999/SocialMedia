// import { Route, Routes, Link } from "react-router-dom";
// import "./App.css";
// import { About } from "./Components/About";
// import { Footer } from "./Components/Footer";
// import { Header } from "./Components/Header";
// import { Home } from "./Components/Home";
// import { Missing } from "./Components/Missing";
// import { Nav } from "./Components/Nav";
// import { NewPost } from "./Components/NewPost";
// import { PostPage } from "./Components/PostPage";
// import { Post } from "./Components/Post";

// function App() {
//   return (
//     <>
//       {/* <nav>
//         <ul>
//           <li>
//             <Link to={"/"}>Home</Link>
//           </li>
//           <li>
//             <Link to={"/about"}>About</Link>
//           </li>
//           <li>
//             <Link to={"/newpost"}>NewPost</Link>
//           </li>
//           <li>
//             <Link to={"/postpage"}>PostPage</Link>
//           </li>
//         </ul>
//       </nav>

//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/newpost" element={<NewPost />} />
//         <Route path="/postpage" element={<PostPage />} />
//         <Route path="/postpage/:getId" element={<Post />} />

//       </Routes> */}
//       <Header title={"Header"}/>
//       <Nav />
//       <Home />
//       <NewPost />
//       <PostPage />
//       <About />
//       <Missing />
//       <Footer />
//     </>
//   );
// }

// export default App;

//------------------------------------------------------------------------------------------------------------------------
import { Route, Routes, Link, Navigate, useNavigate } from "react-router-dom";
import "./App.css";
import { About } from "./Components/About";
import { Footer } from "./Components/Footer";
import { Header } from "./Components/Header";
import { Home } from "./Components/Home";
import { Missing } from "./Components/Missing";
import { Nav } from "./Components/Nav";
import { NewPost } from "./Components/NewPost";
import { PostPage } from "./Components/PostPage";
import { Post } from "./Components/Post";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import api from "./api/post.js";
import axios from "axios";
import { EditPost } from "./Components/EditPost.jsx";

import { useWindowSize } from "./hooks/useWindowSize.jsx";

// import { useAxiosFetch } from "./hooks/useAxiosFetchHook.jsx";
import { useAxiosFetch } from "./hooks/useAxiosFetchHook.jsx";

function App() {
  const [posts, setPosts] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [search, setSearch] = useState("");

  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");

  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");

  const navigate = useNavigate();

  const { width } = useWindowSize();

  const { data, fetchError, isLoading } = useAxiosFetch(
    "http://localhost:8080/data"
  );

  useEffect(() => {
    setPosts(data);
  }, [data]);
  // useEffect(() => { //normal data fetch
  //   const fetchData = async () => {
  //     try {
  //       const response = await api.get("/data");
  //       setPosts(response.data);
  //     } catch (err) {
  //       console.error(err.message);
  //     }
  //   };
  //   fetchData();
  // }, []);

  // search function - start
  useEffect(() => {
    const filteredResults = posts.filter(
      (post) =>
        post.body.toLowerCase().includes(search.toLowerCase()) ||
        post.title.toLowerCase().includes(search.toLowerCase())
    );

    setSearchResult(filteredResults.reverse());
  }, [posts, search]);
  // search function - end

  // new post - start
  const handleSubmit = async (e) => {
    e.preventDefault();

    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), "MMM dd, yyyy pp");
    const newPost = {
      id,
      title: postTitle,
      datetime,
      body: postBody,
    };

    try {
      const postData = await api.post("/data", newPost);

      const allPosts = [...posts, postData.data];
      setPosts(allPosts);
      setPostTitle("");
      setPostBody("");
      navigate("/");
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleEdit = async (id) => {
    const datetime = format(new Date(), "MMM dd, yyyy pp");
    const editPost = {
      id,
      title: editTitle,
      datetime,
      body: editBody,
    };

    try {
      const res = await api.put(`/data/${id}`, editPost);
      setPosts(posts.map((post) => (post.id === id ? { ...res.data } : post)));
      setEditTitle("");
      setEditBody("");
      navigate("/");
    } catch (error) {
      console.error(error.message);
    }
  };

  // new post - end

  // const handleDelete = async (id) => {
  //   try {
  //     await api.delete(`/data/${id}`)
  //     const updatedPosts = posts.filter((post) => post.id !== id);
  //     setPosts(updatedPosts);
  //     navigate("/");
  //   } catch (error) {
  //     console.error(error.message);
  //   }
  // };
  const handleDelete = async (id) => {
    try {
      await api.delete(`/data/${id}`);
      const updatedPosts = posts.filter((post) => post.id !== id);
      setPosts(updatedPosts);
      navigate("/");
    } catch (error) {
      console.error(error.message);
    }
  };

  return ( 
    <div className="App">
      <Header title={"Header"} width={width} />
      <Nav search={search} setSeach={setSearch} />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              posts={searchResult}
              isLoading={isLoading}
              fetchError={fetchError}
            />
          }
        />
        <Route path="/post">
          <Route
            index
            element={
              <NewPost
                handleSubmit={handleSubmit}
                postTitle={postTitle}
                setPostTitle={setPostTitle}
                postBody={postBody}
                setPostBody={setPostBody}
              />
            }
          />
          <Route
            path=":id"
            element={<PostPage posts={posts} handleDelete={handleDelete} />}
          />
        </Route>
        <Route
          path="/edit/:id"
          element={
            <EditPost
              posts={posts}
              handleEdit={handleEdit}
              editBody={editBody}
              setEditBody={setEditBody}
              editTitle={editTitle}
              setEditTitle={setEditTitle}
            />
          }
        />

        <Route path="/about" element={<About />} />
        <Route path="*" exact element={<Missing />} />
      </Routes>
      <Footer />
    </div>
  );

  // return (
  //   <div className="App">
  //     <Header title={"Header"} />
  //     <Nav search={search} setSeach={setSearch} />
  //     {/* <Home posts={posts} /> */}
  //     <Routes>
  //       <Route path="/" element={<Home posts={searchResult} />} />
  //       <Route path="/newpost" element={<NewPost handleSubmit={handleSubmit} postTitle={postTitle} setPostTitle={setPostTitle} postBody={postBody} setPostBody={setPostBody} />} />
  //       <Route path="/postpage" element={<PostPage posts={posts} handleDelete={handleDelete} />} />
  //       <Route path="/about" element={<About />} />
  //       <Route path="/missing" exact element={<Missing />} />
  //     </Routes>
  //     <Footer />
  //     <Route path="*" component={Missing} />
  //   </div>
  // );
}

export default App;
