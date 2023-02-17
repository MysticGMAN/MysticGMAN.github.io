"use strict";

//IIFE - Immediately Invoked Function Expression
(function(){
    function Start()
    {
        console.log("App Started")

        AjaxRequest("GET", "header.html", LoadHeader);

        switch(document.title){
            case "Home":
                DisplayHomePage();
                break;
            case "About Us":
                DisplayAboutPage();
                break;
            case "Contact Us":
                DisplayContactPage();
                break;
            case "ContactList":
                DisplayContactListPage();
                break;
            case "Products":
                DisplayProductsPage();
                break;
            case "Services":
                DisplayServicesPage();
                break;
            case "Edit Contact":
                DisplayEditContact();
                break;
            case "Login":
                DisplayLoginPage();
                break;
            case "Register":
                DisplayRegisterPage();
                break;

        }
    }
    window.addEventListener("load", Start);
    //if(document.title === "Contact"){DisplayContactPage();}
    //window.addEventListener("load", Debugging);
})();

function AjaxRequest(method, url, callback){

    let xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", () => {

        if (xhr.readyState === 4 && xhr.status === 200){

            if (typeof callback === "function") {
                callback(xhr.responseText);
                console.log(xhr.responseText);
            }else{
                console.error("Error: callback is not a valid function");
            }
        }
    });

    xhr.open(method, url);
    xhr.send();
}

function LoadHeader(html_data){

    $("header").html(html_data);
    $(`li>a:contains(${document.title})`).addClass("active");
    //$("a.navbar-brand").()
}

function AddContact(fullName, contactNumber, emailAddress){
    let contactInfo = new core.Contact(fullName.value, contactNumber.value, emailAddress.value);
    console.log(contactInfo);

    if(contactInfo.serialize()){
        let key = contactInfo.FullName.substring(0,1) + Date.now();
        localStorage.setItem(key, contactInfo.serialize());
    }
}
//Function that listens for the click of the About Us button on the index.html page
function DisplayHomePage(){

    console.log("Home page loaded");

    $("main").append(`<p id="MainParagraph" class="mt-3">
    This is the no fun dynamic zone. CSS animations sold separately</p>`);

    let MainParagraph =  document.getElementById("MainParagraph");

    MainParagraph.addEventListener("mouseover", function(){
        MainParagraph.classList.add("fa-spin");
        MainParagraph.style.color = "lime";
        MainParagraph.addEventListener("mouseout", function (){
            MainParagraph.classList.remove("fa-spin");
            MainParagraph.style.color = "black"
        });
   });

    $("body").append(`<article class="container"><p id="ArticleParagraph" class="mt-3">
        This is my article paragraph
        </p></article>`);

    let ContactUsBtn = document.getElementById("ContactUsBtn");
    let ServicesBtn = document.getElementById("ServicesBtn");
    let ProductsBtn = document.getElementById("ProductsBtn");
    let AboutUsButton = document.getElementById("AboutUsBtn");

    $("#AboutUsBtn").on("click", () => {
       location.href = "about.html";
    });

    AboutUsButton.addEventListener("mouseover", function(){
        document.getElementById("AboutUsBtn").innerHTML = "<i class=\"fa-solid fa-circle-user\"></i> Aboot Us";
        AboutUsButton.addEventListener("mouseout", function (){
           AboutUsButton.innerHTML = "<i class=\"fa-solid fa-circle-user\"></i> About Us";
        });
    });
    // Deprecated
    // AboutUsButton.addEventListener("click", function(){
    //     location.href = "about.html";
    // });
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

// function Debugging (){
//
//     if (document.title === "About") {
//         console.log("About Us page Loaded");
//     } else if (document.title === "Contact") {
//         console.log("Contact Us page Loaded");
//     } else if (document.title === "Contact List") {
//         console.log("Contact List Page Loaded");
//     } else if (document.title === "Home") {
//         console.log("Index/Home Page Loaded");
//     } else if (document.title === "Products") {
//         console.log("Products page Loaded");
//     } else if (document.title === "Services") {
//         console.log("Services page Loaded");
//     }else if (document.title === "Edit Contact") {
//         console.log("Edit page Loaded");
//     }
//
// }

function DisplayContactListPage() {

    if(localStorage.length > 0){
        let contactList = document.getElementById("contactList");
        let data = "";

        let keys = Object.keys(localStorage);
        //console.log(keys);
        let index = 1;
        for(const key of keys){
            //console.log(key);
            let contactData = localStorage.getItem(key);
            //console.log(contactData);
            let contact = new core.Contact();
            //console.log(contact);
            contact.deserialize(contactData);
            data += `<tr><th scope="row" class="text-center">${index}</th>
                    <td class="text-center">${contact.FullName}</td>
                    <td class="text-center">${contact.ContactNumber}</td>
                    <td class="text-center">${contact.EmailAddress}</td>
                    
                    <td class="text-center"><button value="${key}" id="btnEditContact" class="btn btn-primary btn-sm mb-1 btn-outline-warning btn-dark text-muted edit">
                        <i class="fa-solid fa-pen-to-square "></i> Edit
                        </button>
                    </td>
                    
                    <td class="text-center"><button value="${key}" id="btnDeleteContact" class="btn btn-primary btn-sm mb-1 btn-outline-danger btn-dark text-muted delete">
                        <i class="fa-solid fa-delete-left "></i> Delete
                        </button>
                    </td>
                    </tr>`;
            index++;
        }
        contactList.innerHTML = data;

        $("#btnAdd").on("click", () => {
            location.href = "edit.html#add";
        });

        $("button.delete").on("click", function() {
           if(confirm("Delete contact, are you sure?")){
               localStorage.removeItem($(this).val());
           }
           location.href = "contact-list.html";
        });

        $("button.edit").on("click", function(){
           location.href = "edit.html#" + $(this).val();
        });


    }

}

// function TestName() {
//     console.log("Test Name Function");
//
//     let messageArea = $("#messageArea");
//
//     let nameRegex = /^+([A-Z][a-z]{1,3}\.?\s)?([A-Z][a-z]+)+([\s, -]([A-Z][a-z]+))*$/;
//
//     $("#name").on("blur", function(){
//
//         let name = $(this).val();
//         if(!nameRegex.test(name)){
//             //fail validation
//             $(this).trigger("focus"); //return user back to name input box
//             $(this).trigger("select"); //highlight all the text in the text box
//             messageArea.addClass("alert alert-danger");
//             messageArea.text("Please enter a valid First and Last name (FirstName [MiddleName] LastName)");
//             messageArea.show();
//         }else {
//             //pass validation
//             // messageArea.removeClass("alert-danger").addClass("alert-success").text(
//             //     "Succes");
//             messageArea.removeClass("alert-danger");
//            
//             messageArea.hide();
//            
//         }
//     });
// }

/**
 * A function to validate the text on the form that is a part of the contact.html page
 * @param {string} input_field_id Takes in the html element id
 * @param {RegExp} reg_expr Takes in a Regex Expression
 * @param {string} err_msg An error message to be displayed
 * @constructor 
 */
function ValidateField(input_field_id, reg_expr, err_msg) {
    console.log("Test Name Function");

    let messageArea = $("#messageArea");

    //let nameRegex = /^+([A-Z][a-z]{1,3}\.?\s)?([A-Z][a-z]+)+([\s, -]([A-Z][a-z]+))*$/;

    $(input_field_id).on("blur", function(){

        let name = $(this).val();
        if(!reg_expr.test(name)){
            //fail validation
            $(this).trigger("focus").trigger("select"); 
            messageArea.addClass("alert alert-danger").text(err_msg).show();
        }else {
            //pass validation
            // messageArea.removeClass("alert-danger").addClass("alert-success").text(
            //     "Succes");
            messageArea.removeAttr("class").hide();

        }
    });
}

function ValidateContactForm(){
    new ValidateField("#Name",
        /^([A-Z][a-z]{1,3}\.?\s)?([A-Z][a-z]+)+([\s,-]([A-z][a-z]+))*$/,
        "Please enter a valid name (Firstname Lastname)");
    new ValidateField("#emailAdrress",
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,10}$/,
        "Please enter a valid Email Address");
    new ValidateField("#phoneNum",
        /^(\+\d{1,3}[\s-.])?\(?\d{3}\)?[\s-.]?\d{3}[\s-.]\d{4}$/,
        "Please enter a valid Phone number (000-000-0000)");
}

function DisplayContactPage() {
    console.log("i am in DisplayContactPage function");

    ValidateContactForm();


    let sendButton = document.getElementById("btnSend");
    let subscribeCheckBox = document.getElementById("subscribeCheckbox");
    let fullName = document.getElementById("Name");
    let contactNumber = document.getElementById("phoneNum");
    let emailAddress = document.getElementById("emailAddress");



    sendButton.addEventListener("click", function(event){
       if(subscribeCheckBox.checked){
           console.log("Checkbox Checked");


           let contactInfo = new core.Contact(fullName.value, contactNumber.value, emailAddress.value);
           //console.log(contactInfo);
           //setTimeout(() => {  console.log("Im Free!"); }, 5000);
           if(contactInfo.serialize()){
               let key = contactInfo.FullName.substring(0,1) + Date.now();
               localStorage.setItem(key, contactInfo.serialize());
           }
       }
    });
}

function DisplayAboutPage() {

}

function DisplayProductsPage() {

}

function DisplayServicesPage() {

}

function DisplayLoginPage() {
    console.log("login page loaded");

    let messageArea = $("#messageArea");
    messageArea.hide();

    $("#loginButton").on("click", function(){
        let success = false;
        let newUser = new core.User();

        $.get("../data/user.json", function(data){

            for(const u of data.user){
                if(username.value === u.Username && password.value === u.Password){
                    newUser.fromJSON(user);
                    break;
                }
            }

            if(success){

                sessionStorage.setItem("user", newUser.serialize());
                messageArea.removeAttr("class").hide();

            }else{
                $("#username").trigger("focus").trigger("select");
                messageArea.addClass("alert alert-danger")
                    .text("Error: Invalid Credentials");
            }
        });

        $("#cancelButton").on("click", function() {

            document.forms[0].reset();
            location.href = "index.html";

        });

    });
}

function CheckLogin() {

    if(sessionStorage.getItem("user")){
        $("#login").html(`<a id="logout" class="nav-link" href="#"><i class="fas fa-sign-out-alt"></i> Logout</a>`)
    }

    $("#logout").on("click", function(){
        sessionStorage.clear();
        location.href = "login.html";
    })
}

function DisplayRegisterPage() {

}

function DisplayEditContact() {

    console.log("Edit page function accessed");

    ValidateContactForm();

    let page = location.hash.substring(1);
    switch(page){
        case "add":
            $("main>h3").text("Add Contact");
            $("form>h5").html("<i class=\"fa-solid fa-pen-nib\"></i> Add Contact");
            $(".navbar-brand").html(`<i class="fa-solid fa-skull fa-spin" style="--fa-animation-duration: 90s;"></i> WEBD-6201 - Add Contact`);
            $("#btnEdit").html(`<i class="fa-solid fa-user-plus"></i> Add Contact`);

            $("btnEdit").on("click", (event) => {
               event.preventDefault();
               AddContact(fullName.value, contactNumber.value, emailAddress.value);
               location.href = "contact-list.html";
            });

            $("#btnReset").on("click", () => {
                location.href = "contact-list.html";
            });
            break;
        default:{

            let contact = new core.Contact();
            contact.deserialize(localStorage.getItem(page));

            //display the contact info in the edit form
            $("#name").val(contact.FullName);
            $("#phoneNum").val(contact.ContactNumber);
            $("#emailAddress").val(contact.EmailAddress);

            //When edit button is pressed - update the contact
            $("#btnEdit").on("click", (event) => {
                event.preventDefault();
                //get any changes from the form
                contact.FullName = $("#name").val();
                contact.ContactNumber = $("#phoneNum").val();
                contact.EmailAddress = $("#emailAddress").val();

                //replace the item in localstorage
                localStorage.setItem(page, contact.serialize());

                //return to the contact-list
                location.href = "contact-list.html";
            })
            $("#btnReset").on("click", () => {
                location.href = "contact-list.html";
            });
        }

    }



}