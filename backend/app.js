const express=require("express");
const cors=require("cors");
const app=express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

const videoRoutes = require("./routes/video.routes");
app.use("/videos", videoRoutes);

const seriesRoutes = require("./routes/series.routes");
app.use("/series", seriesRoutes);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).send("MemoryFlix API is running!!!!!!!!!!!!!!");
});

// require("./config/google");
const authRoutes=require("./routes/auth.routes.js");
app.use("/auth", authRoutes);



const progressRoutes = require("./routes/progress.routes");
app.use("/progress", progressRoutes);


module.exports=app;