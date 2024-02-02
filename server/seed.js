import Database from "better-sqlite3";
//hook up our database.db to get methods
const db = new Database("database.db")
//.exec executes some sql query 
//have to use backticks 
db.exec(`CREATE TABLE  IF NOT EXISTS movies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    movie TEXT,
    year INTEGER ,
    imgURL TEXT)`)

    db.exec(`
    INSERT into movies (movie, year, imgURL)
    VALUES
    ('Black Narcissus' , 1947, 'https://posters.movieposterdb.com/07_11/1947/39192/l_39192_20b67beb.jpg'),
    ('Ran' , 1985 , 'https://posters.movieposterdb.com/23_04/1985/89881/l_ran-movie-poster_0c1ca44d.jpg'),
    ('Day of Wrath' , 1943, 'https://posters.movieposterdb.com/21_09/1943/36506/l_36506_d9d2b6c8.jpg' )
     `)
    
 

