/* Open when someone clicks on the span element */
function openOverlay(input) {
    document.getElementById(input).style.height = "100%";
}

/* Close when someone clicks on the "x" symbol inside the overlay */
function closeOverlay(input) {
    document.getElementById(input).style.height = "0%";
}
