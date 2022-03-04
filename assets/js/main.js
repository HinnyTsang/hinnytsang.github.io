$(function() {
    $("#nav-placeholder").load("../includes/nav.html");
});

$(function() {
    $("#footer-placeholder").load("../includes/footer.html");
});

function reveal() {

    // reveals = all elements with class = "reveal".
    var reveals = document.querySelectorAll(".reveal");
    // console.log("reveal");
    // update for all elements.
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = windowHeight / 4;
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        } else {
            reveals[i].classList.remove("active");
        }
    }
}

window.addEventListener("scroll", reveal);
// To check the scroll position on page load
reveal();


jQuery('body').css('display', 'none');
jQuery(document).ready(function() {
    jQuery('body').fadeIn(700);
});