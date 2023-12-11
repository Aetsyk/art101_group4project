/*
 * dinner.js
 * Author: Akira Shemansky, Angela Ambriz, Jiecheng Zhu, Kaya Levin, Raquel Herrera-Bernardino, and shiyen yang
 * Date: Nov. 20, 2023 - Dec. 10, 2023
 * License: Public Domain
 */

// important for the ajax call
const endPoint = "https://api.spoonacular.com/recipes/complexSearch";
const apiKey = "da77cacb407a489a896802b680ad1b4f";

// this object will be passed in an ajax call
const ajaxParams = {
    url: endPoint,
    data: {
        apiKey: apiKey,
        number: 1,
        sort: "random",
        type: "main course",
        instructionsRequired: true,
        addRecipeInformation: true,
        limitLicense: true
    },
    type: "GET",
    dataType: "json",
    success: function(data) {
        console.log(data);
        $("#results-page").append("<h2>" + data.results[0].title + "</h2>");
        $("#results-page").append("<img src='" + data.results[0].image + "' />");
        $("#results-page").append("<p>" + data.results[0].summary + "</p>");
    },
    error: function (jqXHR, textStatus, errorThrown) { 
        console.log("Error:", textStatus, errorThrown);
    }
};

/*const imgs = [ 
    'url("https://beautyandthebrit.com/wp-content/uploads/2015/07/Eggplant-Involtini1.jpg")', 
    'url("https://www.twopurplefigs.com/wp-content/uploads/2015/11/Best-Herb-Roast-Potatoes-15-e1447983355187.jpg")', 
    'url("https://www.thespruceeats.com/thmb/rDaFx15hSseKR-naIUSfDuJ5aMo=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/no-fuss-gluten-free-meatloaf-1451043_14-5b1fed743418c600363b3d58.jpg")', 
    'url("https://www.thedinnerbite.com/wp-content/uploads/2021/02/one-pan-chicken-rice-img.jpg")' 
];*/

// store a reference to the original body content
//const originalBodyContent = document.body.innerHTML;

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

        // foodList = $("<ul></ul>"); 

        $.ajax(ajaxParams);
        // this if-else statement was only temporary and has been commented out; only use this as a fall back
        // conflicting options, add more if needed
        /* if ($("#diet-keto").val() == "on") {
            if ($("#diet-vegetarian").val() == "on" || $("#diet-vegan").val() == "on"){
                $("#results-page").hide();
                document.body.append("Ketogenic diet, vegetarian or vegan, cannot exist at the same time. Please refresh the page and make the selection again.");
            }
        } else { // different combinations of options show different results
            if ($("#diet-vegan").val() == "on") {
                $("#results-page").append("Dishes recommended for you: Best Herb Roast Potatoes");
                
                const img = new Image(600, 900);
                img.src = "https://www.twopurplefigs.com/wp-content/uploads/2015/11/Best-Herb-Roast-Potatoes-15-e1447983355187.jpg";
                document.body.appendChild(img);
                foodList.append("<li>Small potatoes or big one is fine</li>");
                foodList.append("<li>salt</li>");
                foodList.append("<li>pepper</li>");
                foodList.append("<li>Rosemary herbs</li>");
                foodList.append("<li>Thyme herbs</li>");
                foodList.append("<li>minced garlic</li>");
                $("#results-page").append("<h2>What is needed:</h2>");
                $("#results-page").append(foodList);  

            } else if ($("#diet-vegetarian").val() == "on") {
                $("#results-page").append("Dishes recommended for you: Eggplant Involtini");
                const img = new Image(600, 600);
                img.src = "https://beautyandthebrit.com/wp-content/uploads/2015/07/Eggplant-Involtini1.jpg";
                document.body.appendChild(img);
                foodList.append("<li>Eggplant</li>"); 
                foodList.append("<li>Tomatoes sauces</li>"); 
                foodList.append("<li>basil</li>"); 
                foodList.append("<li>mozzaerlla</li>"); 
                foodList.append("<li>Parmesan</li>"); 
                foodList.append("<li>Ricotta</li>"); 
                foodList.append("<li>Egg</li>"); 
                foodList.append("<li>rice flour</li>"); 
                foodList.append("<li>Garlic</li>"); 
                foodList.append("<li>salt</li>"); 
                foodList.append("<li>pepper</li>"); 
                foodList.append("<li>sugar</li>"); 
                $("#results-page").append("<h2>What is needed:</h2>");
                $("#results-page").append(foodList); 
                
            } else if ($("#allergy-gluten").val() == "on") {
                $("#results-page").append("Dishes recommended for you: Gluten-Free Meatloaf");
                const img = new Image(600, 400);
                img.src = "https://www.thespruceeats.com/thmb/rDaFx15hSseKR-naIUSfDuJ5aMo=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/no-fuss-gluten-free-meatloaf-1451043_14-5b1fed743418c600363b3d58.jpg";
                document.body.appendChild(img);
                foodList.append("<li> Onion</li>");
                foodList.append("<li>onion</li>");
                foodList.append("<li>ground beef</li>"); 
                foodList.append("<li>Eggs</li>"); 
                foodList.append("<li>bredcrumbs- gluten free</li>"); 
                foodList.append("<li> Ketchup</li>"); 
                foodList.append("<li>salt</li>"); 
                foodList.append("<li>black pepper</li>"); 
                $("#results-page").append("<h2>What is needed:</h2>");
                $("#results-page").append(foodList); 
                
            } else if ($("#diet-lowcal").val() == "on" || $("#diet-keto").val() == "on") {
                $("#results-page").append("Dishes recommended for you: One-pot chicken & rice");
                const img = new Image(600, 900);
                img.src = "https://www.thedinnerbite.com/wp-content/uploads/2021/02/one-pan-chicken-rice-img.jpg";
                document.body.appendChild(img);
                foodList.append("<li>any kind of rice</li>"); 
                foodList.append("<li>Chicken thighs</li>"); 
                foodList.append("<li>Italian seasoning</li>"); 
                foodList.append("<li>paprika</li>"); 
                foodList.append("<li>Salt and Black Pepper</li>"); 
                $("#results-page").append("<h2>What is needed:</h2>");
                $("#results-page").append(foodList); 
                
            } else {
                $("#results-page").append("All you can eat!");
                const img1 = new Image(600, 900);
                img1.src = "https://www.twopurplefigs.com/wp-content/uploads/2015/11/Best-Herb-Roast-Potatoes-15-e1447983355187.jpg";
                document.body.appendChild(img1);
                const img2 = new Image(600, 600);
                img2.src = "https://beautyandthebrit.com/wp-content/uploads/2015/07/Eggplant-Involtini1.jpg";
                document.body.appendChild(img2);
                const img3 = new Image(600, 400);
                img3.src = "https://www.thespruceeats.com/thmb/rDaFx15hSseKR-naIUSfDuJ5aMo=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/no-fuss-gluten-free-meatloaf-1451043_14-5b1fed743418c600363b3d58.jpg";
                document.body.appendChild(img3);
                const img4 = new Image(600, 900);
                img4.src = "https://www.thedinnerbite.com/wp-content/uploads/2021/02/one-pan-chicken-rice-img.jpg";
                document.body.appendChild(img4);
            }
        } */
    });

    /*$("#more-btn").click(function() {
        document.body.innerHTML = originalBodyContent;
        $("#title-screen img").hide();
        $("#options-btn").hide();
        $("#showMore").show();
        const img1 = new Image(624, 462);
        img1.src = "https://spoonacular.com/recipeImages/715415-312x231.jpg";
        document.body.appendChild(img1);
        const img2 = new Image(624, 462);
        img2.src = "https://spoonacular.com/recipeImages/715497-312x231.jpg";
        document.body.appendChild(img2);
        const img3 = new Image(624, 462);
        img3.src = "https://spoonacular.com/recipeImages/782585-312x231.jpg";
        document.body.appendChild(img3);
        const img4 = new Image(624, 462);
        img4.src = "https://spoonacular.com/recipeImages/716426-312x231.jpg";
        document.body.appendChild(img4);
    });*/
    
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
