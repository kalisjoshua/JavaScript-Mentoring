var fs = require("fs"),
    
    files = fs.readdirSync("./steps"),

    arg = (+process.argv[2] < 0 ? files.length + --process.argv[2] : process.argv[2]),
    file = "./steps/" + (files[arg] || files.pop());

console.log("executing from file: %".replace("%", file));

eval(fs.readFileSync(file, "UTF-8"));

var me = new Customer("My Self");

// var movies = [
//       /* 0 */ new Movie("The Karate Kid", 0),
//       /* 1 */ new Movie("The Karate Kid II", 0),
//       /* 2 */ new Movie("Cujo", 0),
//       /* 3 */ new Movie("Boyz N the Hood", 0),
//       /* 4 */ new Movie("Balls of Fury", 1),
//       /* 5 */ new Movie("Waiting", 1),
//       /* 6 */ new Movie("Bolt", 2),
//       /* 7 */ new Movie("The Adjustment Bureau", 1),
//       /* 8 */ new Movie("She's the Man", 1),
//       /* 9 */ new Movie("Hercules", 2)
//     ];

me.addRental(new Rental(new Movie("The Karate Kid",        0), 1));
me.addRental(new Rental(new Movie("The Karate Kid II",     0), 3));
me.addRental(new Rental(new Movie("Bolt",                  1), 2));
me.addRental(new Rental(new Movie("Hercules",              2), 5));
me.addRental(new Rental(new Movie("The Adjustment Bureau", 1), 1));

console.log(me.statement());