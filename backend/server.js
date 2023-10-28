const express = require("express");
const notes = require("./data/notes.js");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes.js");
const { notFound, errorHandler } = require("./middleware/errorMiddleware.js");

const app = express();
dotenv.config();
app.use(express.json());
const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send(`api running ${PORT} `);
});
app.get("/api/notes", (req, res) => {
  res.json(notes);
});
app.use("/api/users", userRoutes);
app.use(notFound); 
app.use(errorHandler);

app.get("/api/notes/:id", (req, res) => {
  const note = notes.find((note) => note._id === req.params.id);
  res.send(note);
});

// MONGOOSE SETUP

mongoose
  .connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    app.listen(PORT, () =>
      console.log(`server running on and db connected ${PORT}`)
    );
  })
  .catch((error) => console.log(`${error} did not connect`));
