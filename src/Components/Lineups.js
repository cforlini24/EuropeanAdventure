

const Lineup = (props) => {
    const {lineups} = props;

    return(
        <div>
            
            {lineups ? 
                lineups.map((lineup) => {
                    return(
                        <div key={lineup._id}>
                            <img src={lineup.aimImage64} />
                            <img src={lineup.posImage64} />
                            <p>{lineup.map}</p>
                            {lineup.ct ? "Counter-Terroist": "Terroist"}
                        </div>
                    )
                }) : ""
            }
        </div>
    )
}

export default Lineup;