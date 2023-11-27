/*
 * dinner.js
 * Author: Akira Shemansky, Angela Ambriz, Jiecheng Zhu, Kaya Levin, Raquel Herrera-Bernardino, and shiyen yang
 * Date: Nov. 20-22, 2023
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
    $("#options-btn").click(function() {
        $("#title-screen h1").hide();
        $(this).hide();
        $("#questionaire").show();
    });
    $("#submit-btn").click(function() {
        $("#questionaire").hide();
        $(this).hide();
        $("#results").show();

        // this if-else statement is only temporary; a better system will be implemented in the final version
        if ($("#diet-vegan").val() == "on") {
            $("#results-page").append("Dishes recommended for you: Best Herb Roast Potatoes");
            const img = new Image(600, 900);
            img.src = "https://www.twopurplefigs.com/wp-content/uploads/2015/11/Best-Herb-Roast-Potatoes-15-e1447983355187.jpg";
            document.body.appendChild(img);
        } else if ($("#diet-vegetarian").val() == "on") {
            $("#results-page").append("Dishes recommended for you: Eggplant Involtini");
            const img = new Image(600, 600);
            img.src = "https://beautyandthebrit.com/wp-content/uploads/2015/07/Eggplant-Involtini1.jpg";
            document.body.appendChild(img);
        } else if ($("#allergy-gluten").val() == "on") {
            $("#results-page").append("Dishes recommended for you: Gluten-Free Meatloaf");
            const img = new Image(600, 400);
            img.src = "https://www.thespruceeats.com/thmb/rDaFx15hSseKR-naIUSfDuJ5aMo=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/no-fuss-gluten-free-meatloaf-1451043_14-5b1fed743418c600363b3d58.jpg";
            document.body.appendChild(img);
        } else if ($("#diet-lowcal").val() == "on" || $("#diet-keto").val() == "on") {
            $("#results-page").append("Dishes recommended for you: One-pot chicken & rice");
            const img = new Image(600, 900);
            img.src = "https://www.thedinnerbite.com/wp-content/uploads/2021/02/one-pan-chicken-rice-img.jpg";
            document.body.appendChild(img);
        } else {
            $("#results-page").append("Dishes recommended for you: Any Dishes");
            const img = document.querySelector('body'); 
            setInterval(function() { // displays a random image on the page
                var a = Math.floor(Math.random() * imgs.length); 
                var showImg = imgs[a]; 
                img.style.backgroundImage = showImg;
            }, 1000); 
        }
    });
});

$("button").hover(function() {
    $(this).css("background-color", "rgb(188, 222, 234)");
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