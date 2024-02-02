import express from "express";
import cors from "cors";
import Database from "better-sqlite3";

const PORT = `4242`;
const app = express();
const db = new Database("database.db");
app.use(express.json());
app.use(cors());

app.listen(`${PORT}`, () => {
  console.log(`Server started on PORT: ${PORT}`);
});

//get request, ROOT ROUTE
app.get(`/`, (req, res) => {
  res.send(`OooooOOhh!`);
});

//database request
app.get("/movies", (req, res) => {
  try {
    // find a record by it's id
    if (req.query.id) {
      let movie = db
        .prepare(`SELECT * FROM movies WHERE id = ?`)
        .all(req.query.id);
      //prepare() only gets run when we run .all()
      res.status(200).json(movie);
      return;
    }
    let movies = db.prepare(`SELECT * FROM movies`).all();
    // prepare()optimizes statement for use
    // .all()runs the statement, and return all results
    res.status(200).json(movies);
  } catch (err) {
    res.status(500).json(err);
  }
  if (req.query.one) {
    res.send(`Query one`);
  }
});

// POST route to create new movie entries in our database
app.post("/movies", (req, res) => {
  try {
    const movie = req.body.movie;
    const year = req.body.year;
    const imgURL = req.body.imgURL;
    // run sql statement
    const newMovie = db
      .prepare(`INSERT INTO movies (movie , year , imgURL) VALUES(?,?, ?)`)
      .run(movie, year, imgURL);
    res.status(200).json(newMovie);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

// delete and update next
