import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes} from "react-router-dom";
import Lineup from "./Components/Lineups";
import PostLineup from "./Components/PostLineup";
import Navbar from "./Components/Navbar";
import Homepage from "./Components/Homepage";
import EditForm from "./Components/EditForm";
import Styling from "./Components/Styling";

function Main() {
  const [lineups, setLineups] = useState();
  const [mirage,setMirage] = useState();
  const [anubis,setAnubis] = useState();
  const [nuke,setNuke] = useState();
  const [ancient, setAncient] = useState('');
  const [inferno, setInferno] = useState('');
  const [overpass, setOverpass] = useState('');
  const [vertigo, setVertigo] = useState('');
  const [loading, setLoading] = useState(true);


    async function fetchLineups() {
      try {
        const repsonse = await fetch("http://localhost:3001")
        const data = await repsonse.json();
        setLineups(data);
        setLoading(false);
      } catch (error) {
        console.log(error)
      }
    }

    function filterLineups() {
      setMirage(lineups.filter((lineup) => lineup.map == "Mirage"));
      setAnubis(lineups.filter((lineup) => lineup.map == "Anubis"));
      setNuke(lineups.filter((lineup) => lineup.map == "Nuke"));
      setAncient(lineups.filter((lineup) => lineup.map == "Ancient"));
      setInferno(lineups.filter((lineup) => lineup.map == "Inferno"));
      setOverpass(lineups.filter((lineup) => lineup.map == "Overpass"));
      setVertigo(lineups.filter((lineup) => lineup.map == "Vertigo"));
    }

    useEffect(()=> {
      fetchLineups();
  },[])

  useEffect(() => {
    if(lineups) {
      filterLineups()
    }
  }, [lineups])

  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/upload" element={<PostLineup fetchLineups={fetchLineups}/>} />
        <Route path="/nuke" element={<Lineup lineups={nuke} setLineups={setLineups} loading={loading} map={"Nuke"}/>}/>
        <Route path="/anubis" element={<Lineup lineups={anubis}  setLineups={setLineups} loading={loading} map={"Anubis"}/>}/>
        <Route path="/mirage" element={<Lineup lineups={mirage} setLineups={setLineups} loading={loading} map={"Mirage"}/>}/>
        <Route path="/ancient" element={<Lineup lineups={ancient} setLineups={setLineups} loading={loading} map={"Ancient"}/>}/>
        <Route path="/inferno" element={<Lineup lineups={inferno} setLineups={setLineups} loading={loading} map={"Inferno"}/>}/>
        <Route path="/overpass" element={<Lineup lineups={overpass} setLineups={setLineups} loading={loading} map={"Overpass"}/>}/>
        <Route path="/vertigo" element={<Lineup lineups={vertigo} setLineups={setLineups} loading={loading} map={"Vertigo"}/>}/>
        <Route path="/edit/:id" element={<EditForm lineups={lineups} fetchLineups={fetchLineups} />} />
        <Route path="/style" element={<Styling />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default Main;
