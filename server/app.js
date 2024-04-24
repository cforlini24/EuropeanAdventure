const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Lineup = require("./Models/Lineup");

const app = express();

app.use(cors());
app.use(express.json({limit: "50mb"}));

app.post("/", async (req, res)=> {
    console.log(req.body);
    const lineup = new Lineup(req.body);
    await lineup.save()
    res.send();
})

app.get("/", async(req, res) => {
    const lineups = await Lineup.find();
    res.send(lineups);
})

const port = 3001;
app.listen(port, async () => {
    await mongoose.connect("mongodb+srv://cforlini24:PL6Ng6LlmdHFdLjS@cluster0.igszgpj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    console.log(`Server is running on port ${port} and connected to mongo!`);
})


// mongodb+srv://cforlini24:PL6Ng6LlmdHFdLjS@cluster0.igszgpj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0