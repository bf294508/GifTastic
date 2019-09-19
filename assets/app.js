var topics =["Bugs Bunny","Homer Simpson","Mickey Mouse","Popeye","Spider Man","Luffy","Pikachu","Goku","Totoro","Nami","Sasuke"];

     // Function for displaying characters data
     function renderButtons() {

        $("#topicList").empty();

        // Looping through the array of movies
        for (var i = 0; i < topics.length; i++) {

          // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
          var a = $("<button>");
          // Adding a class
          a.addClass("animatedCharacter");
          // Adding a data-attribute with a value of the movie at index i
          a.attr("data-name", topics[i]);
          // Providing the button's text with a value of the movie at index i
          a.text(topics[i]);
          // Adding the button to the HTML
          $("#topicList").append(a);
        }
        $(".animatedCharacter").on("click",function(){
            $("#images").empty();
            var animationCharacter =$(this).attr("data-name");
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            animationCharacter + "&limit=10"+"&api_key=0vE8kZ5AkUNWhtGbJYYuDhWQXjP6St9v"; 
            $.ajax({
              url: queryURL,
              method: "GET"
            }).then(function(response){
              console.log(queryURL);
              console.log(response);
  
              var results = response.data;
  
              for (var i = 0; i < results.length; i++) {
  
                  // Creating and storing a div tag
                  var characterDiv = $("<div>");
      
                  // Creating a paragraph tag with the result item's rating
                  var p = $("<p>").text("Rating: " + results[i].rating);
      
                  // Creating and storing an image tag
                  var characterImage = $("<img>");
                  // Setting the src attribute of the image to a property pulled off the result item
                  characterImage.attr("src", results[i].images.fixed_height_still.url);
                  characterImage.attr("data-still",results[i].images.fixed_height_still.url);
                  characterImage.attr("data-animate",results[i].images.fixed_height.url);
                  characterImage.attr("data-state","still")

                  // Appending the paragraph and image tag to the animalDiv
                  characterDiv.append(p);
                  characterDiv.append(characterImage);
      
                  // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
                  $("#images").prepend(characterDiv);

                  $("img").on("click", function() {
                    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
                    var state = $(this).attr("data-state");
                    console.log(state);
                    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
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
              }
             });
        });
      }
      $("#submits").on("click",function(event){
          event.preventDefault();
          var addtopics = $("#inputAnimationCharacter").val().trim();
          topics.push(addtopics);
          renderButtons();

      });

      
      renderButtons();
      console.log(topics);
      