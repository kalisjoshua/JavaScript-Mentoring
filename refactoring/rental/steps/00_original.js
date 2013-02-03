/* Movie Object
    @param title - the title of a movie will never change
    @param priceCode - the priceCode will change over time

    Represents a single movie in a catalog of movies.
  */
function Movie (title, priceCode) {
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
  this.getDaysRented = function () {
    return daysRented;
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
        format,
        frequentRenterPoints = 0,
        result = "Rental Record for %\n".replace("%", name),
        spacing,
        thisAmount,
        totalAmount = 0;

    for (var item in rentals) {
      thisAmount = 0;
      each = rentals[item];

      switch (each.getMovie().getPriceCode()) {
        case Movie.priceCodes.REGULAR:
          thisAmount += 2;
          if (each.getDaysRented() > 2) {
            thisAmount += (each.getDaysRented() - 2) * 1.5;
          }
          break;
        case Movie.priceCodes.NEW_RELEASE:
          thisAmount += each.getDaysRented() * 3;
          break;
        case Movie.priceCodes.CHILDRENS:
          thisAmount += 1.5;
          if (each.getDaysRented() > 3) {
            thisAmount += (each.getDaysRented() - 3) * 1.5;
          }
          break;
      }

      // add frequent renter points
      frequentRenterPoints++;
      // add bonus for a two day new release rental
      if ((each.getMovie().getPriceCode() === Movie.NEW_RELEASE) && each.getDaysRented() > 1) {
        frequentRenterPoints++;
      }

      // NOTE! added lines for formatting
      spacing = Array.apply(null, Array(30 - each.getMovie().getTitle().length)).join(" ");
      format = "  + {title}" + spacing + "${price}\n";

      // show figures for this rental
      result += format
        .replace("{title}", each.getMovie().getTitle())
        .replace("{price}", thisAmount.toFixed(2));
        
      totalAmount += thisAmount;
    }

    // add footer lines
    result += "Amount owed is $" + totalAmount.toFixed(2) + "\n";
    result += "You earned " + frequentRenterPoints + " frequent renter points";

    return result;
  };
}
