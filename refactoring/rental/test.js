var fs = require("fs"),
    
    files = fs.readdirSync("./steps"),
    // file = "./steps/" + files[0];
    file = "./steps/" + files.pop();

console.log("executing from file: %".replace("%", file));

eval(fs.readFileSync(file, "UTF-8"));

var me = new Customer("Self");
var other = new Customer("Other");

var movies = [
      /* 0 */ new Movie("The Karate Kid", 0),
      /* 1 */ new Movie("The Karate Kid II", 0),
      /* 2 */ new Movie("Cujo", 0),
      /* 3 */ new Movie("Boyz N the Hood", 0),
      /* 4 */ new Movie("Balls of Fury", 1),
      /* 5 */ new Movie("Waiting", 1),
      /* 6 */ new Movie("Bolt", 2),
      /* 7 */ new Movie("The Adjustment Bureau", 1),
      /* 8 */ new Movie("She's the Man", 1),
      /* 9 */ new Movie("Hercules", 2)
    ];

me.addRental(new Rental(movies[0], 1));
me.addRental(new Rental(movies[1], 1));
me.addRental(new Rental(movies[6], 2));
me.addRental(new Rental(movies[9], 5));
me.addRental(new Rental(movies[7], 1));

console.log(me.statement());