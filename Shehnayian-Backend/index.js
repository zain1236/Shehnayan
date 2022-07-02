import express from "express";

import cors from "cors";

// connection to database
import connectToDatabase from "./config/db.js";

// modules
import user from "./routes/api/controllers/user.js";
import ad from "./routes/api/controllers/ad.js";
import donation from "./routes/api/controllers/donation.js";

const app = express();
// app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());

//connection to DB
connectToDatabase();
//In it middleware
app.use(express.json({ limit: "100mb" })); // this allows us to take request.body data

// Defining Routes
app.use("/api/v1/user", user);
app.use("/api/v1/ad", ad);
app.use("/api/v1/donation", donation);

app.get("/", (req, res) => res.send("API Running"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port no ${PORT}`));

export default app;
