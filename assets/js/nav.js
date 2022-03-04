function remove_bar() {
    // console.log("calling function remove_bar()");
    var ul = document.getElementById("navigation");
    // console.log(ul.style);
    ul.style.left = "-120%";
}

function change_bar() {
    // console.log("calling function change_bar()");
    var ul = document.getElementById("navigation");

    if (ul.style.left == "-120%") {
        ul.style.left = "0%";
    } else {
        ul.style.left = "-120%";
    }
}