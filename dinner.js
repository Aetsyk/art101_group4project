/*
 * dinner.js
 * Author: Akira Shemansky, Angela Ambriz, Jiecheng Zhu, Kaya Levin, Raquel Herrera-Bernardino, and shiyen yang
 * Date: Nov. 20, 2023 - Dec. 11, 2023
 * License: Public Domain
 */

// important for the ajax call
const endPoint = "https://api.spoonacular.com/recipes/complexSearch";
const apiKey = "da77cacb407a489a896802b680ad1b4f";
const apiKeyAlt = "d4fe7c33d12e4bc380420f6d4cc1703c";

// variables for questionnaire info to be sent to the API
var intoleranceList = [];
var dietList = [];
var excludeIngredientsList = [];
var calorieLimit = 2000;
var alcoholLimit = 2000;
var temperatureChoice = [];
var challengeList= [];

// this function will run the ajax call and output the data to the page
function getFood(useAltKey = false) {
    var key;
    if (useAltKey == false) {
        key = apiKey;
    } else {
        key = apiKeyAlt;
    }

    if ($("#allergy-egg").val() == "on") {
        intoleranceList.push("Egg");
    }
    if ($("#allergy-dairy").val() == "on") {
        intoleranceList.push("Dairy");
    }
    if ($("#allergy-corn").val() == "on") {
        excludeIngredientsList.push("Corn");
    }
    if ($("#allergy-gluten").val() == "on") {
        intoleranceList.push("Gluten");
    }
    if ($("#allergy-seafood").val() == "on" || $("#in-seafood").val() == "on") {
        intoleranceList.push("Seafood");
    }
    if ($("#allergy-shellfish").val() == "on") {
        intoleranceList.push("Shellfish");
    }

    if ($("#diet-vegetarian").val() == "on") {
        dietList.push("Vegetarian");
    }
    if ($("#diet-vegan").val() == "on") {
        dietList.push("Vegan");
    }
    if ($("#diet-lowcal").val() == "on") {
        calorieLimit = 400;
    }
    if ($("#diet-keto").val() == "on") {
        dietList.push("Ketogenic");
    }
    if ($("#diet-halal").val() == "on") {
        excludeIngredientsList.push("Pork");
        excludeIngredientsList.push("Carrion");
        alcoholLimit = 0;
    }
    if ($("#diet-kosher").val() == "on") {
        excludeIngredientsList.push("Pork");
        excludeIngredientsList.push("Hare");
        excludeIngredientsList.push("Rabbit");
        intoleranceList.push("Shellfish");
    }

    if ($("#in-alcohol").val() == "on") {
        alcoholLimit = 0;
    }
    if ($("#in-soda").val() == "on") {
        excludeIngredientsList.push("Mentos");
    }
    if ($("#in-drugs").val() == "on") {
        excludeIngredientsList.push("Drugs"); // ???
    }

    if ($("#in-warm").val() == "on") {
        temperatureChoice.push("warm");
    }
    if ($("#in-cold").val() == "on") {
        temperatureChoice.push("cold");
    }

    if ($("#in-challenges").val() == "on") {
      challengeList.push("easy");
    }
    if ($("#in-challenges").val() == "on") {
      challengeList.push("medium");
    }
    if ($("#in-challenges").val() == "on") {
      challengeList.push("hard");
    }

    $.ajax({
        url: endPoint,
        data: {
            apiKey: key,
            number: 1,
            sort: "random",
            type: "main course",
            instructionsRequired: true,
            fillIngredients: true,
            addRecipeInformation: true,
            limitLicense: true,
            intolerances: intoleranceList.join(","),
            diet: dietList.join(","),
            excludeIngredients: excludeIngredientsList.join(","),
            maxCalories: calorieLimit,
            maxAlcohol: alcoholLimit
        },
        type: "GET",
        dataType: "json",
        success: function(data) {
            console.log(data);
            if (data.totalResults == 0) {
                $("#results-page").append("<h2>No results found.</h2>");
                return // exits out of success function
            }

            $("#results-page").append("<h3>" + data.results[0].title + "</h3>");

            $("#results-page").append("<img src='" + data.results[0].image + "' alt='" + data.results[0].sourceUrl + "' />");
            $("#results-page").append("<p>" + data.results[0].summary + "</p>");
    
            $("#credits-page").append("<p>Via: " + data.results[0].creditsText + "</p>");
            $("#credits-page").append("<p><a href='" + data.results[0].sourceUrl + "'>Source</a></p>");

            $("#results-page").append("<ul id='ingredients-list'></ul>");
            data.results[0].extendedIngredients.forEach(element => {
                $("#ingredients-list").append("<li>" + element.original + "</li>");
            });

            $("#results-page").append("<ol id='recipe-list'></ol>");
            data.results[0].analyzedInstructions[0].steps.forEach(element => {
                $("#recipe-list").append("<li>" + element.step + "</li>");
            });
            $("#results-page").show();
            $("#loading").hide();
        },
        error: function (jqXHR, textStatus, errorThrown) { 
            if (useAltKey == false) {
                getFood(true)
            } else {
                console.log("Error:", textStatus, errorThrown);
            }
        }
    });
}

$(document).ready(function() {
    $("#options-btn").click(function() {
        $("#title-screen img").hide();
        $(this).hide();
        $("#questionnaire").show();
    });
    $("#submit-btn").click(function() {
        $("#questionnaire").hide();
        $(this).hide();
        $("#results").show(); 
        $("#loading").show();

        getFood();
    });
});

$("button").hover(function() { // changes the buttons' color when you hover over them
    $(this).css("background-color", "#ffcea6");
},
function() {
    $(this).css("background-color", "#fff");
});

$("#questions input").click(function() {
    const val = $(this).val();
    if (val == "off") {
        $(this).val("on");
    } else {
        $(this).val("off");
    }
})