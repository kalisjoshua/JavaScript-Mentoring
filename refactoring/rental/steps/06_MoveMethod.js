/* Movie Object
    @param title - the title of a movie will never change
    @param priceCode - the priceCode will change over time

    Represents a single movie in a catalog of movies.
  */
function Movie (title, priceCode) {
  this.getCharge = function (daysRented) {
    var result = 0;

    switch (this.getPriceCode()) {
      case Movie.priceCodes.REGULAR:
        result += 2;
        if (daysRented > 2) {
          result += (daysRented - 2) * 1.5;
        }
        break;
      case Movie.priceCodes.NEW_RELEASE:
        result += daysRented * 3;
        break;
      case Movie.priceCodes.CHILDRENS:
        result += 1.5;
        if (daysRented > 3) {
          result += (daysRented - 3) * 1.5;
        }
        break;
    }

    return result;
  };

  this.getFreqRenterPoints = function (dayRented) {
    // add bonus for a two day new release rental
    if ((this.getPriceCode() === Movie.NEW_RELEASE) && daysRented > 1) {
      return 2;
    } else {
      return 1;
    }
  };

  this.getPriceCode = function () {
    return priceCode;
  };

  this.setPriceCode = function (nPriceCode) {
    priceCode = nPriceCode;
  };

  this.getTitle = function () {
    return title;
  };
}

/* Public Static Movie Properties
  */
Movie.priceCodes = {
  CHILDRENS   : 2,
  REGULAR     : 0,
  NEW_RELEASE : 1
};

/* Rental Object
    @param movie - reference to instance of Movie "class"
    @param daysRented - number of days rented to determine cost of rental

    Represents a single rental of a single movie; multiple movie rentals will be
    individual instances of Rental "class".
  */
function Rental (movie, daysRented) {
  this.getCharge= function () {
    return this.getMovie().getCharge(this.getDaysRented());
  };

  this.getDaysRented = function () {
    return daysRented;
  };

  this.getFreqRenterPoints = function () {
    return this.getMovie().getFreqRenterPoints();
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
