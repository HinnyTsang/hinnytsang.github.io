$(function() {
    $("#nav-placeholder").load("../includes/nav.html");
});

$(function() {
    $("#footer-placeholder").load("../includes/footer.html");
});



// To check the scroll position on page load
function reveal() {
    // reveals = all elements with class = "reveal".
    var reveals = document.querySelectorAll(".reveal");
    // update for all elements.
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = windowHeight / 10;
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


// fade in when the page load.
jQuery('body').css('display', 'none');
jQuery(document).ready(function() {
    jQuery('body').fadeIn(700);
});



// get ip of the client's 
// see https://www.abstractapi.com/
let apiKey = '5f3960b5491a49b7b612a8295fd6f988';
let abstract_api = 'https://ipgeolocation.abstractapi.com/v1/?api_key=';
$.getJSON(abstract_api + apiKey, function(data) {
    // console.log(JSON.stringify(data, null, 2));
    // console.log(data.country);
    // print out the ip adress of the client.
    let target = document.getElementById("hello");
    target.innerText = "Welcome my " + data.country + " friends";

});