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

    let MainContent = document.getElementsByTagName("main")[0];
    let MainParagraph = document.createElement("p");
    let FirstString = "This is";
    let SecondString = `${FirstString} the no fun dynamic zone. CSS animations sold separately`;
    MainParagraph.setAttribute("id", "MainParagraph");
    MainParagraph.setAttribute("class", "mt-3");
    MainParagraph.textContent = SecondString;
    MainContent.appendChild(MainParagraph);


    let Article = document.createElement("article");
    let ArticleParagraph = `<p id="ArticleParagraph" class="mt-3">This is my article paragraph</p>`;
    Article.setAttribute("class", "container");
    Article.innerHTML = ArticleParagraph;
    document.body.appendChild(Article);

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