import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes} from "react-router-dom";
import Lineup from "./Components/Lineups";
import PostLineup from "./Components/PostLineup";
import Navbar from "./Components/Navbar";
import Homepage from "./Components/Homepage";

function Main() {
  const [lineups, setLineups] = useState();
  const [mirage,setMirage] = useState();
  const [anubis,setAnubis] = useState();
  const [nuke,setNuke] = useState();
  const [ancient, setAncient] = useState('');
  const [inferno, setInferno] = useState('');
  const [overpass, setOverpass] = useState('');
  const [vertigo, setVertigo] = useState('');


    async function fetchLineups() {
      try {
        const repsonse = await fetch("http://localhost:3001")
        const data = await repsonse.json();
        setLineups(data);
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
        <Route path="/nuke" element={<Lineup lineups={nuke} />}/>
        <Route path="/anubis" element={<Lineup lineups={anubis} />}/>
        <Route path="/mirage" element={<Lineup lineups={mirage} />}/>
        <Route path="/ancient" element={<Lineup lineups={ancient} />}/>
        <Route path="/inferno" element={<Lineup lineups={inferno} />}/>
        <Route path="/overpass" element={<Lineup lineups={overpass} />}/>
        <Route path="/vertigo" element={<Lineup lineups={vertigo} />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default Main;
