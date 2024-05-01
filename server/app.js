const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Lineup = require("./Models/Lineup");

const app = express();

app.use(cors());
app.use(express.json({limit: "50mb"}));

app.post("/", async (req, res)=> {
    const lineup = new Lineup(req.body);
    await lineup.save()
    res.send();
})

app.get("/", async(req, res) => {
    const lineups = await Lineup.find();
    res.send(lineups);
})

app.get("/anubis", async (req, res) => {
    const lineups = await Lineup.find({map: "Anubis"})
    res.send(lineups)
})
app.get("/nuke", async (req, res) => {
    const lineups = await Lineup.find({map: "Nuke"}).allowDiskUse(true)
    res.send(lineups)
})
app.get("/Overpass", async (req, res) => {
    const lineups = await Lineup.find({map: "Overpass"})
    res.send(lineups)
})
app.get("/Mirage", async (req, res) => {
    const lineups = await Lineup.find({map: "Mirage"})
    res.send(lineups)
})
app.get("/Vertigo", async (req, res) => {
    const lineups = await Lineup.find({map: "Vertigo"})
    res.send(lineups)
})
app.get("/Inferno", async (req, res) => {
    const lineups = await Lineup.find({map: "Inferno"})
    res.send(lineups)
})
app.get("/Ancient", async (req, res) => {
    const lineups = await Lineup.find({map: "Ancient"})
    res.send(lineups)
})

app.patch("/:id", async (req, res) => {
    const {id} = req.params;
    const lineup = await Lineup.findById(id);
    lineup.overwrite(req.body);
    await lineup.save();
    res.send(lineup);
})

app.delete("/:id", async (req,res) => {
    const {id} = req.params;
    const response = await Lineup.deleteOne({_id: id});
    if(response.acknowledged == true) {
        res.status(200).send("success");
    }else {
        res.status(500);
    }
})

const port = 3001;
const MONGO_URI = "mongodb+srv://cforlini24:PL6Ng6LlmdHFdLjS@cluster0.igszgpj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(MONGO_URI).then(() => {app.listen(port, () => {
    console.log(`Server is running on port ${port} and connected to mongo!`);
})})
