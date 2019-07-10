// user enters a value into search bar
// ajax request to get data from giphy api
// prevent default on form to pull search value and create a button with that value
//append button to the top
//create image and div tags from response data

$(document).ready(function () {
    console.log("ready!");

    //-----------------------function to append search buttons to buttons-view-----------------//

    // Initial array of game of thrones
    var gameOfThrones = ["white walkers", "ned stark", "winter is coming", "toromund", "king in the north", "mother of dragons", "westeros", "the lanisters", "red wedding"];

    // Function for rendering game of thrones buttons
    function renderButtons() {
        // Delete the content inside the buttons-view div prior to adding new movies
        $("#buttons-view").empty();
        // Loop through the array of directors, then generate buttons for each game of thrones element in the array 
        for (var i = 0; i < gameOfThrones.length; i++) {
            var newBTN = $("<button>").text(gameOfThrones[i]);
            newBTN.addClass("gotSearch btn btn-light btn-lg");
            newBTN.attr("data-name", gameOfThrones[i]);
            $("#buttons-view").append(newBTN);
        }
    };

    // ----------------------FUNCTIONS TO HANDLE CLICKS----------------------------//

    //click on searh button function
    $("#add-giffy").on("click", function (event) {
        event.preventDefault();
        var giffySearch = $("#giffy-input").val().trim();
        gameOfThrones.push(giffySearch);
        // The renderButtons function is called, rendering the list of game of thrones buttons
        renderButtons();

    });
    // click on button with search val, trigger an ajax call to API to retreive gifs from Giffy
    $(document).on("click", ".gotSearch", function (event) {
        var giffySearch = $(this).attr("data-name");
        console.log(giffySearch);
        var queryURL = 'http://api.giphy.com/v1/gifs/search?q=' + giffySearch + '&api_key=L43wJBtUPD4uQ2Z9X9UvTIQ1OIo2KwLZ&limit=10';

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);

        var result = response.data;
        console.log(result);
        for(var i=0;i < result.length; i++ ) {
            var img = $("<img>");
            var ratingSpan = $("<span>");
            var ratingP = $("<p>").text("Rating: " + result[i].rating);
            img.attr("src", result[i].images.fixed_height_still.url)
            img.attr("data-animate", result[i].images.fixed_height.url);
            img.attr("data-still", result[i].images.fixed_height_still.url);
            img.attr("data-state", "still");
            img.addClass("gif img-thumbnail");
            ratingSpan.append(img);
            ratingSpan.append(ratingP);
            $("#gifs-appear-here").append(ratingSpan);
        }
        })
    })

    $(document).on("click", ".gif", function() {
        $("#gifs-appear-here").empty();
        // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
        var state = $(this).attr("data-state");
        // If the clicked image's state is still, update its src attribute to its data-animate value is.
        // Then, set the image's data-state to animate
        // Else set src to the data-still value
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      });
  
    // Calling the renderButtons function to display the initial list of game of thrones
    renderButtons();
});