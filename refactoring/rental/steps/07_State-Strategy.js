/* Movie Object
    @param title - the title of a movie will never change
    @param priceCode - the priceCode will change over time

    Represents a single movie in a catalog of movies.
  */
function Movie (title, priceCode) {
  var price;

  this.getCharge = function (daysRented) {
    return price.getCharge(daysRented);
  };

  this.getFreqRenterPoints = function (daysRented) {
    return price.getFreqRenterPoints();
  };

  this.setPriceCode = function (priceCode) {
    switch (priceCode) {
      case Movie.priceCodes.CHILDRENS:
        price = new ChildrensPrice();
        break;
      case Movie.priceCodes.NEW_RELEASE:
        price = new NewReleasePrice();
        break;
      case Movie.priceCodes.REGULAR:
        price = new RegularPrice();
        break;
      default:
        throw new Error("Illegal Argument: Price Code [" + priceCode + "]");
    }
  };

  this.getTitle = function () {
    return title;
  };

  this.setPriceCode(priceCode);
}

/* Public Static Movie Properties
  */
Movie.priceCodes = {
  CHILDRENS   : 2,
  REGULAR     : 0,
  NEW_RELEASE : 1
};

function ChildrensPrice () {
  this.getCharge = function (daysRented) {
    var result = 1.5;

    if (daysRented > 3) {
      result += (daysRented - 3) * 1.5;
    }

    return result;
  };

  this.getFreqRenterPoints = function (daysRented) {
    return 1;
  };
}

function NewReleasePrice () {
  this.getCharge = function (daysRented) {
    return daysRented * 3;
  };

  this.getFreqRenterPoints = function (daysRented) {
    return (daysRented > 1) ? 2 : 1;
  };
}

function RegularPrice () {
  this.getCharge = function (daysRented) {
    var result = 2;

    if (daysRented > 2) {
      result += (daysRented - 2) * 1.5;
    }

    return result;
  };

  this.getFreqRenterPoints = function (daysRented) {
    return 1;
  };
}

/* Rental Object
    @param movie - reference to instance of Movie "class"
    @param daysRented - number of days rented to determine cost of rental

    Represents a single rental of a single movie; multiple movie rentals will be
    individual instances of Rental "class".
  */
function Rental (movie, daysRented) {
  this.getCharge= function () {
    return movie.getCharge(this.getDaysRented());
  };

  this.getDaysRented = function () {
    return daysRented;
  };

  this.getFreqRenterPoints = function () {
    return movie.getFreqRenterPoints();
  };

  this.getMovie = function () {
    return movie;
  };
}

/* Customer Object
    @param name - the nam eof the client

    Representing an account for a customer.
  */
function Customer (name) {
  var rentals = [];

  this.addRental = function (rental) {
    rentals.push(rental);
  };

  this.getName = function () {
    return name;
  };

  this.statement = function () {
    var each,
        result = "Rental Record for %\n".replace("%", name),
        spacing;

    for (var item in rentals) {
      each = rentals[item];

      // NOTE! added line for formatting
      spacing = Array.apply(null, Array(30 - each.getMovie().getTitle().length)).join(" ");

      // show figures for this rental
      result += ("  + {title}" + spacing + "${price}\n")
        .replace("{title}", each.getMovie().getTitle())
        .replace("{price}", each.getCharge().toFixed(2));
    }

    // add footer lines
    result += "Amount owed is $" + getTotalCharge().toFixed(2) + "\n";
    result += "You earned " + getFreqRenterPoints() + " frequent renter points";

    return result;
  };

  function getFreqRenterPoints () {
    var result = 0;

    for (var item in rentals) {
      result += rentals[item].getFreqRenterPoints();
    }

    return result;
  }

  function getTotalCharge () {
    var result = 0;

    for (var item in rentals) {
      result += rentals[item].getCharge();
    }

    return result;
  }
}
