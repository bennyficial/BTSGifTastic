// On page load, run the following...
$(document).ready(function()
{

// Array of topics for the buttons
var topics = ["Goku","Vegeta","Gohan","Trunks", "Goten", "Frieza"];

	
	function displayGif() {
		// Empties the stage
      	$('#gifStage').empty();
      	// Create var to stor the data-name of the button you click
        var topics = $(this).attr("data-name");
        // Call the search depending on the name of the topic button clicked
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + topics + "&api_key=dc6zaTOxFJmzC&limit=10";
        // Make ajax call
		$.ajax({
          url: queryURL,
          method: "GET"
     }).done(function(response) {
     		// Store the response.data in a var
     		var results = response.data;
     		// Call the following gifPlay function
     		gifPlay();
     		// When clicking the topic button, run gifPlay function
     		$(".topicButton").on("click". gifPlay);

     		function gifPlay() {
     			// Empties the stage
     			$("#gifStage").empty();

     			for (var i = 0; i <results.length; i++) {
     				// Use var to store the new div created with class
     				var topicDiv = $('<div class="topicDivCSS">');
     				// Use another var to store a new div with bootstrap class
     				var subDiv = $("<div class ='col-md-4'>");
 					// Store the still gif URL in a var
     				var stillURL = results[i].images.fixed_height_still.url;
 					// Store the animated gif URL in another var
     				var animatedURL = results[i].images.fixed_height.url;
     				// Use a var to store the creation of a new image with the still and animated URL as src attributes with the tochangestate set to stillstring first
					var image = $("<img src>").attr({"src": stillURL,
					 	"data-changetostill": stillURL,
					 	"data-changetoanimate": animatedURL,
					 	"data-tochangestate": "stillstring"
					 							});
					// Give the image a class of gif
					image.addClass("gif");
					// Add the image to the subDiv
					subDiv.append(image);
					// Use a var to store the rantings
					var gifRating = results[i].rating;

					// Use another var to create a p tag to show the ratings
					var gifRatingText = $("<p>").text("Ratings: " + gifRating);
					// Add the ratings textg to the subDiv
					subDiv.append(gifRatingText);
					// Add the subDiv to the topicDiv
					topicDiv.append(subDiv);
					// Add the topicDiv to the stage
					$("#gifStage").append(topicDiv);
     			}
     		}

     		})
 }
		
	function swapGif() {
				// Use a var to store the tochangestate of button clicked
				var varState = $(this).attr("data-tochangestate");
				// if the tochangestate is stillstring, then do the following...
				if (varState === "stillstring"){
					
					var gifMove = $(this).attr("data-changetoanimate");
					// Change the src to the animated URL
					$(this).attr("src", gifMove);
					// Change the tochangestate to animated
					$(this).attr("data-tochangestate", "animated");	
					} else {
					
					var gifStill = $(this).attr("data-changetostill");
					// Change the src to the still URL
					$(this).attr("src", gifStill);
					// Change the tochangestate to stillstring
					$(this).attr("data-tochangestate", "stillstring");
					};	
		}



	function renderButtons(){
		// Empties the topcisView div
		$("#topicsView").empty();

		for (var j = 0; j<topics.length; j++){
		// Use a var to store a newly created button
		var b = $("<button>");
		// Add class,attribute and text to the button
		b.addClass("topicButton btn btn-primary");
		b.attr("data-name",topics[j]);
		b.text(topics[j]);
		// Add the button to the topicsView Div
		$("#topicsView").append(b);
		}	
	}
	// When clicking on the addTopic div, do the following...
	$("#addTopic").on("click", function(event){
		// Don't use the default action for submit
		event.preventDefault();
		// Use a var to store the user input
		var newGif = $("#topicInput").val().trim();
		// Push the user input into topics array
		topics.push(newGif);
		// run the renderButtons function
		renderButtons();
	})
// Run the renderButtons function
renderButtons();
// When clicking the topicButton, run the displayGif function
$(document).on("click", ".topicButton", displayGif);
// When clicking an img with class gif, run the swapGif function
$(document).on('click', '.gif', swapGif);
});
