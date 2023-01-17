"use strict";


//IIFE - Immediately Invoked Function Expression
(function(){
    function Start()
    {
        console.log("App Started")
    }
    window.addEventListener("load", Start)
    if (document.title === "Home") { DisplayPage(); }
})();

//Function that listens for the click of the About Us button on the index.html page
function DisplayPage(){
    
    let ContactUsBtn = document.getElementById("ContactUsBtn");
    let ServicesBtn = document.getElementById("ServicesBtn");
    let ProductsBtn = document.getElementById("ProductsBtn");
    let AboutUsButton = document.getElementById("AboutUsBtn");
    document.getElementById("AboutUsBtn").addEventListener("click", function(){
        location.href = "about.html";
    });
    ProductsBtn.addEventListener("click", function(){
        location.href = "products.html";
    });
    ServicesBtn.addEventListener("click", function(){
        location.href = "services.html";
    });
    ContactUsBtn.addEventListener("click", function(){
        location.href = "contact.html";
    });
}