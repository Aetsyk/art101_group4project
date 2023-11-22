/*
 * dinner.js
 * Author: Akira Shemansky, Angela Ambriz, Jiecheng Zhu, Kaya Levin, Raquel Herrera-Bernardino, and shiyen yang
 * Date: Nov. 20-22, 2023
 * License: Public Domain
 */

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
        const optionsInorder = $("#options-inorder").val();
        if (optionsInorder >= "aaaa" && optionsInorder < "bbbb") {
            $("#results").append("Dishes recommended for you: (dish 1)");
        }
        else if (optionsInorder >= "bbbb" && optionsInorder < "cccc"){
            $("#results").append("Dishes recommended for you: (dish 2)");
        }
        else if (optionsInorder >= "cccc" && optionsInorder < "dddd"){
            $("#results").append("Dishes recommended for you: (dish 3)");
        }
        else if (optionsInorder >= "dddd" && optionsInorder < "eeee"){
            $("#results").append("Dishes recommended for you: (dish 4)");
        }
        else if (optionsInorder == "eeee"){
            $("#results").append("Dishes recommended for you: (dish 5)");
        }
        else{
            document.write("Input error, please refresh the page and try again.");
        }
    });
});

$("button").hover(function() {
    $(this).css("background-color", "rgb(188, 222, 234)");
},
function() {
    $(this).css("background-color", "#fff");
});
