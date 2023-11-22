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
    });
});

$("button").hover(function() {
    $(this).css("background-color", "rgb(188, 222, 234)");
},
function() {
    $(this).css("background-color", "#fff");
});