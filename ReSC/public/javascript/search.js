function changeContentActivitati() {
    const activitati = document.querySelectorAll(".information-section-activitati");
    const hoteluri = document.querySelectorAll(".information-section-hoteluri");
    const transport = document.querySelectorAll(".information-section-transporturi");

    activitati[0].style.display = "flex";
    hoteluri[0].style.display = "none";
    transport[0].style.display = "none";
    

    console.log("Shown panel of activitati" + activitati.length);
}

function changeContentHoteluri() {
    const activitati = document.querySelectorAll(".information-section-activitati");
    const hoteluri = document.querySelectorAll(".information-section-hoteluri");
    const transport = document.querySelectorAll(".information-section-transporturi");

    activitati[0].style.display = "none";
    hoteluri[0].style.display = "flex";
    transport[0].style.display = "none";

    console.log("Shown panel of hoteluri" + activitati.length);

}

function changeContentTransport() {
    const activitati = document.querySelectorAll(".information-section-activitati");
    const hoteluri = document.querySelectorAll(".information-section-hoteluri");
    const transport = document.querySelectorAll(".information-section-transporturi");

    activitati[0].style.display = "none";
    hoteluri[0].style.display = "none";
    transport[0].style.display = "flex";

    console.log("Shown panel of transport" + activitati.length);
}