let URL = "https://api.jcdecaux.com/vls/v1/stations?contract=nantes&apiKey=096983f1e05f95e3c792a500e2499e840cf58f2d"
var jqxhr = $.getJSON( URL, function() {
    console.log( "success" );
  })
    .done(function() {
      console.log( "second success" );
    })
    .fail(function() {
      console.log( "error" );
    })
    .always(function() {
      console.log( "complete" );
    });
   
  // Perform other work here ...
   
  // Set another completion function for the request above
  jqxhr.always(function() {
    console.log( jqxhr.responseJSON );
  });