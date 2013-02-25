#!/usr/bin/env node

var fs = require("fs"),
    
    files = fs.readdirSync("./steps"),

    arg = (+process.argv[2] < 0 ? files.length + --process.argv[2] : process.argv[2]),
    file = "./steps/" + (files[arg] || files.pop());

console.log("executing from file: %".replace("%", file));

eval(fs.readFileSync(file, "UTF-8"));

var me = new Customer("My Self");

me.addRental(new Rental(new Movie("The Karate Kid",        0), 1));
me.addRental(new Rental(new Movie("The Karate Kid II",     0), 3));
me.addRental(new Rental(new Movie("Bolt",                  2), 5));
me.addRental(new Rental(new Movie("Tangled",               1), 2));
me.addRental(new Rental(new Movie("The Adjustment Bureau", 1), 1));

console.log(me.statement());