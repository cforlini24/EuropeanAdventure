import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Lineup from "./Components/Lineups";
import PostLineup from "./Components/PostLineup";
import Navbar from "./Components/Navbar";
import Homepage from "./Components/Homepage";
import EditForm from "./Components/EditForm";
import moment from "moment";


function Main() {
  const [posts, setPosts] = useState();


  async function fetchAll() {
    try {
      const repsonse = await fetch("https://europeanadventure.onrender.com")
      const data = await repsonse.json();
      console.log(data)
      data.sort((a, b) => -1)
      setPosts(data);
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    fetchAll()
  }, [])



  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage posts={posts} />} />
        <Route path="/upload" element={<PostLineup />} />
        <Route path="/edit/:id" element={<EditForm posts={posts} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Main;
