import { useEffect, useState } from "react";


const Lineup = (props) => {
    const { lineups } = props;

    const [CTLineups, setCTLineups] = useState();
    const [TLineups, setTLineups] = useState();

    function filterCTLineups() {
        setCTLineups(lineups.filter((lineup) => lineup.ct === true));
        setTLineups(lineups.filter((lineup) => lineup.ct === false));
    }

    useEffect(() => {
        if (lineups) {
            filterCTLineups();
        }
    }, [lineups])

    return (
        <div className="col">

            {CTLineups ?
                CTLineups.map((lineup) => {
                    return (
                        <div key={lineup._id} className="row mx-auto lineup-container">
                            <h2>{lineup.desc}</h2>
                            <div className="row">
                                <div className="col-6">
                                    <img src={lineup.posImage64} alt="Showing where to stand" className="img-fluid" />

                                </div>
                                <div className="col-6">
                                    <img src={lineup.aimImage64} alt="Showing where to aim" className="img-fluid" />

                                </div>
                            </div>
                            <p>
                                {lineup.ct ? "Counter-Terroist" : "Terroist"}
                            </p>
                        </div>
                    )
                }) : ""
            }
            {TLineups ?
                TLineups.map((lineup) => {
                    return (
                        <div key={lineup._id} className="row mx-auto lineup-container">
                            <h2>{lineup.desc}</h2>
                            <div className="row">
                                <div className="col-6">
                                    <img src={lineup.posImage64} alt="Showing where to stand" className="img-fluid" />

                                </div>
                                <div className="col-6">
                                    <img src={lineup.aimImage64} alt="Showing where to aim" className="img-fluid" />

                                </div>
                            </div>
                            <p>
                                {lineup.ct ? "Counter-Terroist" : "Terroist"}
                            </p>
                        </div>
                    )
                }) : ""
            }
            
        </div>
    )
}

export default Lineup;