// user enters a value into search bar
// ajax request to get data from giphy api
// prevent default on form to pull search value and create a button with that value
//append button to the top
//create image and div tags from response data

$(document).ready(function () {
    console.log("ready!");

    //-----------------------function to append search buttons to buttons-view-----------------//

    // Initial array of directors
    var gameOfThrones = ["white walkers", "ned stark", "winter is coming", "toromund", "king in the north", "mother of dragons", "westeros", "the lanisters", "red wedding"];

    // Function for rendering game of thrones buttons
    function renderButtons() {
        // Delete the content inside the buttons-view div prior to adding new movies
        $("#buttons-view").empty();
        // Loop through the array of directors, then generate buttons for each game of thrones element in the array 
        for (var i = 0; i < gameOfThrones.length; i++) {
            var newBTN = $("<button>").text(gameOfThrones[i]);
            newBTN.addClass("gotSearch");
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
        var queryURL = 'http://api.giphy.com/v1/gifs/search?q=' + giffySearch + '&api_key=L43wJBtUPD4uQ2Z9X9UvTIQ1OIo2KwLZ&limit=10';

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);

        })
    });
    
    //click on a button from button view that has beed added from search

    $(".")
    
    
    
    
    
    // Calling the renderButtons function to display the initial list of game of thrones
    renderButtons();


    //on click function to animate and still gif
    // $(document).on("click", ".gotSearch", FUNCTION_NAME_HERE_FOR_RENDERING_GIF_RESPONSE);
});