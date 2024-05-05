import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes} from "react-router-dom";
import Lineup from "./Components/Lineups";
import PostLineup from "./Components/PostLineup";
import Navbar from "./Components/Navbar";
import Homepage from "./Components/Homepage";
import EditForm from "./Components/EditForm";


function Main() {
  const [lineups, setLineups] = useState();
  const [mirage,setMirage] = useState();
  const [anubis,setAnubis] = useState();
  const [nuke,setNuke] = useState();
  const [ancient, setAncient] = useState('');
  const [inferno, setInferno] = useState('');
  const [overpass, setOverpass] = useState('');
  const [vertigo, setVertigo] = useState('');
  const [ancientLoading, setAncientLoading] = useState(true);
  const [infernoLoading, setInfernoLoading] = useState(true);
  const [overpassLoading, setOverpassLoading] = useState(true);
  const [vertigoLoading, setVertigoLoading] = useState(true);
  const [mirageLoading,setMirageLoading] = useState(true);
  const [nukeLoading, setNukeLoading] = useState(true);
  const [anubisLoading, setAnubisLoading] = useState(true);
  const [editSent, setEditSent] = useState(0);


    async function fetchAll() {
      try {
        const repsonse = await fetch("https://linislineups.onrender.com/")
        const data = await repsonse.json();
        setLineups(data);
      } catch (error) {
        console.log(error)
      }
    }
    async function fetchNuke() {
      try {
        const repsonse = await fetch("https://linislineups.onrender.com/Nuke")
        const data = await repsonse.json();
        setNuke(data);
        setNukeLoading(false);
      } catch (error) {
        console.log(error)
      }
    }
    async function fetchAnubis() {
      try {
        const repsonse = await fetch("https://linislineups.onrender.com/Anubis")
        const data = await repsonse.json();
        setAnubis(data);
        setAnubisLoading(false);
      } catch (error) {
        console.log(error)
      }
    }
    async function fetchMirage() {
      try {
        const repsonse = await fetch("https://linislineups.onrender.com/Mirage")
        const data = await repsonse.json();
        setMirage(data);
        setMirageLoading(false);
      } catch (error) {
        console.log(error)
      }
    }
    async function fetchAncient() {
      try {
        const repsonse = await fetch("https://linislineups.onrender.com/Ancient")
        const data = await repsonse.json();
        setAncient(data);
        setAncientLoading(false);
      } catch (error) {
        console.log(error)
      }
    }
    async function fetchOverpass() {
      try {
        const repsonse = await fetch("https://linislineups.onrender.com/Overpass")
        const data = await repsonse.json();
        setOverpass(data);
        setOverpassLoading(false);
      } catch (error) {
        console.log(error)
      }
    }
    async function fetchInferno() {
      try {
        const repsonse = await fetch("https://linislineups.onrender.com/Inferno")
        const data = await repsonse.json();
        setInferno(data);
        setInfernoLoading(false);
      } catch (error) {
        console.log(error)
      }
    }
    async function fetchVertigo() {
      try {
        const repsonse = await fetch("https://linislineups.onrender.com/Vertigo")
        const data = await repsonse.json();
        setVertigo(data);
        setVertigoLoading(false);
      } catch (error) {
        console.log(error)
      }
    }

    useEffect(()=> {
      fetchNuke();
      fetchOverpass();
      fetchAncient();
      fetchInferno();
      fetchMirage();
      fetchVertigo();
      fetchAnubis();
      fetchAll()
  },[editSent])

  // useEffect(() => {
  //   if(lineups) {
  //     filterLineups()
  //   }
  // }, [lineups])

  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/upload" element={<PostLineup editSent={editSent} setEditSent={setEditSent}/>} />
        <Route path="/nuke" element={<Lineup lineups={nuke} editSent={editSent} setEditSent={setEditSent} loading={nukeLoading} map={"Nuke"}/>}/>
        <Route path="/anubis" element={<Lineup lineups={anubis}  editSent={editSent} setEditSent={setEditSent} loading={anubisLoading} map={"Anubis"}/>}/>
        <Route path="/mirage" element={<Lineup lineups={mirage} editSent={editSent} setEditSent={setEditSent} loading={mirageLoading} map={"Mirage"}/>}/>
        <Route path="/ancient" element={<Lineup lineups={ancient} editSent={editSent} setEditSent={setEditSent} loading={ancientLoading} map={"Ancient"}/>}/>
        <Route path="/inferno" element={<Lineup lineups={inferno} editSent={editSent} setEditSent={setEditSent} loading={infernoLoading} map={"Inferno"}/>}/>
        <Route path="/overpass" element={<Lineup lineups={overpass} editSent={editSent} setEditSent={setEditSent} loading={overpassLoading} map={"Overpass"}/>}/>
        <Route path="/vertigo" element={<Lineup lineups={vertigo} editSent={editSent} setEditSent={setEditSent} loading={vertigoLoading} map={"Vertigo"}/>}/>
        <Route path="/edit/:id" element={<EditForm lineups={lineups} editSent={editSent} setEditSent={setEditSent} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Main;
