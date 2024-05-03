import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Lightbox from "yet-another-react-lightbox";
import { Captions, Thumbnails, Zoom } from "yet-another-react-lightbox/plugins";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";


const Lineup = (props) => {
    const { lineups, setEditSent, editSent,  map, loading } = props;
    console.log(lineups)


    const [filteredLineups, setFilteredLineups] = useState(lineups);
    const [CTLineups, setCTLineups] = useState([]);
    const [TLineups, setTLineups] = useState([]);
    const [CTSelected, setCTSelected] = useState(true);
    const [grenadeFilter, setGrenadeFilter] = useState("all")
    const [open, setOpen] = useState(false);
    const [lightBoxSrc, setLightBoxSrc] = useState();
    const [hitchLoading, setHitchLoading] = useState(true);

    function filterCTLineups() {
        if (filteredLineups) {
            setCTLineups(filteredLineups.filter((lineup) => lineup.ct === true));
            setTLineups(filteredLineups.filter((lineup) => lineup.ct === false));
        } else {
            setCTLineups([]);
            setTLineups([]);
        }
    }

    function filterTypes() {
        if (grenadeFilter == "all") {
            setFilteredLineups(lineups);
        } else {
            setFilteredLineups(lineups.filter((lineup) => lineup.type == grenadeFilter))
        }
    }


    async function deleteLineup(id) {
        const reponse = await fetch(`http://localhost:8080/${id}`, {
            method: "DELETE"
        })
        setEditSent(editSent + 1);
    }


    useEffect(() => {
        filterCTLineups();
    }, [filteredLineups])

    useEffect(() => {
        if (lineups) {
            filterTypes()
        }
    }, [grenadeFilter, lineups]);

    useEffect(()=> {
        setHitchLoading(true);
        setTimeout(()=> {
            setHitchLoading(false)
        },500)
    },[props])

    




    return (
        <div className="col">
            <div className="row sticky-top bg-dark-subtle p-1 mx-auto rounded m-2 container" data-aos="zoom-in" style={{ top: 64 }} data-bs-theme="dark">
                <div className="col-5">
                    <button className={CTSelected ? "btn btn-warning active me-2" : "btn btn-secondary-outline me-2"} id="CT" onClick={() => setCTSelected(true)}>Counter-Terroist</button>
                    <button className={CTSelected ? "btn btn-secondary-outline me-2" : "btn btn-warning active me-2"} id="T" onClick={() => setCTSelected(false)}>Terroist</button>
                </div>
                <div className="col-2 text-center" >
                    <h3 className="mb-0" >{map}</h3>
                </div>
                <div className="col-5 d-flex justify-content-end ">
                    <button className={grenadeFilter == "all" ? "btn btn-warning active me-2" : "btn btn-secondary-outline me-2"} onClick={() => setGrenadeFilter("all")}>All</button>
                    <button className={grenadeFilter == "HE" ? "btn btn-warning active me-2" : "btn btn-secondary-outline me-2"} onClick={() => setGrenadeFilter("HE")}>High-Explosive</button>
                    <button className={grenadeFilter == "Smoke" ? "btn btn-warning active me-2" : "btn btn-secondary-outline me-2"} onClick={() => setGrenadeFilter("Smoke")}>Smoke</button>
                    <button className={grenadeFilter == "Molotov" ? "btn btn-warning active me-2" : "btn btn-secondary-outline me-2"} onClick={() => setGrenadeFilter("Molotov")}>Molotov</button>
                    <button className={grenadeFilter == "Flash" ? "btn btn-warning active" : "btn btn-secondary-outline"} onClick={() => setGrenadeFilter("Flash")}>Flash</button>
                </div>
            </div>
            {
                loading || hitchLoading ?
                    <div className="d-flex justify-content-center mt-5">
                        <div class="spinner-border" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div>
                    : CTSelected ? CTLineups.length ?
                        CTLineups.map((lineup, i) => {
                            return (
                                <div key={lineup._id} className="row mx-auto lineup-container mb-3 border-bottom border-5 border-dark  " >
                                    <div className="d-flex justify-content-between ">
                                        <h2>{lineup.type == "HE" ? "High-Explosive" : lineup.type }: {lineup.title}</h2>
                                        <div>
                                            <Link to={`/edit/${lineup._id}`} >
                                                <button className="btn btn-secondary mx-2">Edit</button>
                                            </Link>
                                            <button className="btn btn-danger me-5" onClick={() => deleteLineup(lineup._id)}>Delete</button>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-6">
                                            <img src={lineup.posImage64} alt="Showing where to stand" className="img-fluid img lineup-image" style={{ cursor: "pointer" }} onClick={() => {
                                                setOpen(true);
                                                setLightBoxSrc([{ src: lineup.posImage64, description: lineup.desc },
                                                { src: lineup.aimImage64, description: lineup.desc }])
                                            }} />
                                        </div>
                                        <div className="col-6 mb-1">
                                            <img src={lineup.aimImage64} alt="Showing where to aim" className="img-fluid img  lineup-image" style={{ cursor: "pointer" }} onClick={() => {
                                                setOpen(true);
                                                setLightBoxSrc([{ src: lineup.aimImage64, description: lineup.desc },
                                                { src: lineup.posImage64, description: lineup.desc }])
                                            }} />
                                        </div>
                                        <h5>{lineup.desc}</h5>
                                    </div>
                                </div>
                            )
                        }) :
                        <div className="d-flex justify-content-center mt-5">
                            <p>No lineups found</p>
                        </div>
                        : TLineups.length?
                            TLineups.map((lineup, i) => {
                                return (
                                    <div key={lineup._id} className="row mx-auto lineup-container mb-3 border-bottom border-5 border-dark  " >
                                        <div className="d-flex justify-content-between ">
                                        <h2>{lineup.type == "HE" ? "High-Explosive" : lineup.type }: {lineup.title}</h2>
                                            <div>
                                                <Link to={`/edit/${lineup._id}`} >
                                                    <button className="btn btn-secondary mx-2">Edit</button>
                                                </Link>
                                                <button className="btn btn-danger me-5" onClick={() => deleteLineup(lineup._id)}>Delete</button>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-6">
                                                <img src={lineup.posImage64} alt="Showing where to stand" className="img-fluid img  lineup-image" style={{ cursor: "pointer" }} onClick={() => {
                                                    setOpen(true);
                                                    setLightBoxSrc([{ src: lineup.posImage64, description: lineup.desc },
                                                    { src: lineup.aimImage64, description: lineup.desc }])
                                                }} />
                                            </div>
                                            <div className="col-6 mb-1">
                                                <img src={lineup.aimImage64} alt="Showing where to aim" className="img-fluid img  lineup-image" style={{ cursor: "pointer" }} onClick={() => {
                                                    setOpen(true);
                                                    setLightBoxSrc([{ src: lineup.aimImage64, description: lineup.desc },
                                                    { src: lineup.posImage64, description: lineup.desc }])
                                                }} />
                                            </div>
                                            <h5>{lineup.desc}</h5>
                                        </div>
                                    </div>
                                )
                            }) : <div className="d-flex justify-content-center mt-5">
                                <p>No lineups found</p>
                            </div>
            }
            <Lightbox
                open={open}
                close={() => setOpen(false)}
                slides={lightBoxSrc}
                plugins={[Zoom, Captions]} />
        </div>
    )
}

export default Lineup;