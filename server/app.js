const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Post = require("./Models/Post");
const cloudinary = require('cloudinary').v2;
const moment = require("moment")

const app = express();


cloudinary.config({
    cloud_name: 'dr1panccs',
    api_key: '144351373829783',
    api_secret: 'Awte3We2EciinE6Hwccq56cWbY0'
});

app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.post("/", async (req, res) => {
    try {
        const photos = req.body.photos;
        const promises = photos.map((photo) => cloudinary.uploader.upload(photo));
        const uploads = await Promise.all(promises)

        const links = uploads.map((upload) => upload.url)

        const post = new Post({
            title: req.body.title,
            body: req.body.message,
            photos: links,
            date: moment()
        })


        await post.save();

        res.status(200).send()


        // const posResponse = (await cloudinary.uploader.upload(req.body.posImage64)).url
        // const aimResponse = (await cloudinary.uploader.upload(req.body.aimImage64)).url
        // console.log(aimResponse, posResponse)
        // const lineup = new Lineup({
        //     map: req.body.map,
        //     ct: req.body.ct,
        //     aimImage64: aimResponse,
        //     posImage64: posResponse,
        //     desc: req.body.desc,
        //     type: req.body.type,
        //     title: req.body.title
        // });
        // const response = await lineup.save()
        // console.log(response)
        // res.status(200).send();
    } catch (error) {
        console.log(error);
        res.send(error)
    }
})

app.get("/", async (req, res) => {
    console.log("Getting all posts")
    const posts = await Post.find()
    res.send(posts)
})

app.get("/:map", async (req, res) => {
    const map = req.params.map
    const lineups = await Lineup.find({ map })
    res.send(lineups)
})


app.patch("/:id", async (req, res) => {
    const { id } = req.params;
    const posResponse = (await cloudinary.uploader.upload(req.body.posImage64)).url
    const aimResponse = (await cloudinary.uploader.upload(req.body.aimImage64)).url
    console.log(aimResponse, posResponse)
    const newLineup = new Lineup({
        map: req.body.map,
        ct: req.body.ct,
        aimImage64: aimResponse,
        posImage64: posResponse,
        desc: req.body.desc,
        type: req.body.type,
        title: req.body.title
    });
    const lineup = await Lineup.findById(id);
    lineup.overwrite(newLineup);
    await lineup.save();
    res.send(lineup);
})

app.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const response = await Lineup.deleteOne({ _id: id });
    if (response.acknowledged == true) {
        res.status(200).send("success");
    } else {
        res.status(500);
    }
})


const port = 8080;
const MONGO_URI = "mongodb+srv://cforlini24:rLWNc0onoOi5ei2Z@posts.6owfb.mongodb.net/?retryWrites=true&w=majority&appName=Posts"
//rLWNc0onoOi5ei2Z

mongoose.connect(MONGO_URI).then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port} and connected to mongo!`);
    })
})
