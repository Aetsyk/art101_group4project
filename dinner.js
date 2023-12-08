/*
 * dinner.js
 * Author: Akira Shemansky, Angela Ambriz, Jiecheng Zhu, Kaya Levin, Raquel Herrera-Bernardino, and shiyen yang
 * Date: Nov. 20, 2023 - Dec. 7, 2023
 * License: Public Domain
 */

const imgs = [ 
    'url("https://beautyandthebrit.com/wp-content/uploads/2015/07/Eggplant-Involtini1.jpg")', 
    'url("https://www.twopurplefigs.com/wp-content/uploads/2015/11/Best-Herb-Roast-Potatoes-15-e1447983355187.jpg")', 
    'url("https://www.thespruceeats.com/thmb/rDaFx15hSseKR-naIUSfDuJ5aMo=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/no-fuss-gluten-free-meatloaf-1451043_14-5b1fed743418c600363b3d58.jpg")', 
    'url("https://www.thedinnerbite.com/wp-content/uploads/2021/02/one-pan-chicken-rice-img.jpg")' 
]; 

// Functions
$(document).ready(function() {
    let foodList = $("<ul></ul>"); // food listing
    $("#options-btn").click(function() {
        $("#title-screen img").hide();
        $(this).hide();
        $("#questionnaire").show();
    });
    $("#submit-btn").click(function() {
        $("#questionnaire").hide();
        $(this).hide();
        $("#results").show();

        foodList = $("<ul></ul>"); 

        // this if-else statement is only temporary; a better system will be implemented in the final version
        // conflicting options, add more if needed
        if ($("#diet-keto").val() == "on") {
            if ($("#diet-vegetarian").val() == "on" || $("#diet-vegan").val() == "on"){
                $("#results-page").hide();
                document.body.append("The ketogenic diet, vegetarian or vegan, cannot exist at the same time. Please refresh the page and make the selection again.");
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
                
            } else {
                $("#results-page").append("Dishes recommended for you: Any Dishes");
                const img = document.querySelector('body'); 
                setInterval(function() { // displays a random image on the page
                    var a = Math.floor(Math.random() * imgs.length); 
                    var showImg = imgs[a]; 
                    img.style.backgroundImage = showImg;
                }, 1000); 
            }
        }

        $("#results-page").append("<h2>What is needed:</h2>");
        $("#results-page").append(foodList); 
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
