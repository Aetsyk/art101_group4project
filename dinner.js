/*
 * dinner.js
 * Author: Akira Shemansky, Angela Ambriz, Jiecheng Zhu, Kaya Levin, Raquel Herrera-Bernardino, and shiyen yang
 * Date: Nov. 20, 2023
 * License: Public Domain
 */

// Functions
$(document).ready(function() {
    $("#options").click(function() {
        $("#title-screen h1").hide();
        $(this).hide();
        $("#questions").show();
    });
    $("#submit").click(function() {
        $("#title-screen p1").hide();
        $(this).hide();
        $("#results").show();
    });
});
