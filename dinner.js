/*
 * dinner.js
 * Author: Akira Shemansky, Angela Ambriz, Jiecheng Zhu, Kaya Levin, Raquel Herrera-Bernardino, and shiyen yang
 * Date: Nov. 20, 2023 - Dec. 10, 2023
 * License: Public Domain
 */

// important for the ajax call
const endPoint = "https://api.spoonacular.com/recipes/complexSearch";
const apiKey = "da77cacb407a489a896802b680ad1b4f";

// variables for questionnaire info to be sent to the API
var intoleranceList = [];
var dietList = [];
var excludeIngredientsList = [];
var calorieLimit = 2000;
var alcoholLimit = 2000;

// this function will run the ajax call and output the data to the page
function getFood() {
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

    $.ajax({
        url: endPoint,
        data: {
            apiKey: apiKey,
            number: 1,
            sort: "random",
            type: "main course",
            instructionsRequired: true,
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
            $("#results-page").append("<h2>" + data.results[0].title + "</h2>");
            $("#results-page").append("<img src='" + data.results[0].image + "' alt='" + data.results[0].sourceUrl + "' />");
            $("#results-page").append("<p>" + data.results[0].summary + "</p>");
    
            $("#credits-page").append("<p>Via: " + data.results[0].creditsText + "</p>");
            $("#credits-page").append("<p><a href='" + data.results[0].sourceUrl + "'>Source</a></p>");
        },
        error: function (jqXHR, textStatus, errorThrown) { 
            console.log("Error:", textStatus, errorThrown);
        }
    });
}

$(document).ready(function() {
    // let foodList = $("<ul></ul>"); // food listing
    $("#options-btn").click(function() {
        $("#title-screen img").hide();
        $(this).hide();
        $("#questionnaire").show();
    });
    $("#submit-btn").click(function() {
        $("#questionnaire").hide();
        $(this).hide();
        $("#results").show(); 

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
});
