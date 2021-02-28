$(() => {
init();
})

const init = () => {
    viewEvents();
    burgerInit();
}

const viewEvents = () => {
    $("#id_button").on("click", function() {

    $("#id_result").fadeIn(600);
})
    $("#id_button2").on("click", function() {

    $("#id_result2").fadeIn(600);
})
    $("#id_button3").on("click", function() {

    $("#id_result3").fadeIn(600);
})
    $("#id_button4").on("click", function() {

    $("#id_result4").fadeIn(600);
})
    $("#id_button5").on("click", function() {

    $("#id_result5").fadeIn(600);
})
    $("#id_button6").on("click", function() {

    $("#id_result6").fadeIn(600);
})
    $("#id_button7").on("click", function() {

    $("#id_result7").fadeIn(600);
})
    $("#id_button8").on("click", function() {

    $("#id_result8").fadeIn(600);
})
    $("#id_button9").on("click", function() {

    $("#id_result9").fadeIn(600);
})
    $("#id_button10").on("click", function() {

    $("#id_result10").fadeIn(600);
})
    $("#id_button11").on("click", function() {

    $("#id_result11").fadeIn(600);
})
}

const burgerInit = () => {
    $(document).ready(function() {
        $("#id_burger").on("click", () => {
            $("#id_nav_burger").slideToggle();
        })
    })
}