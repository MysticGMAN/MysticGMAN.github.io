"use strict";

(function () {



    function AjaxRequest(method : string, url : string, callback : Function){

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



    function AddContact(fullName:string, contactNumber:string, emailAddress:string){
        let contactInfo = new core.Contact(fullName, contactNumber, emailAddress);
        console.log(contactInfo);

        if(contactInfo.serialize()){
            let key = contactInfo.FullName.substring(0,1) + Date.now();
            localStorage.setItem(key, contactInfo.serialize() as string);
        }
    }
    //Function that listens for the click of the About Us button on the index.html page
    function DisplayHomePage(){

        console.log("Home page loaded");

        $("main").append(`<p id="MainParagraph" class="mt-3">
        This is the no fun dynamic zone. CSS animations sold separately</p>`);

        let MainParagraph =  $("#MainParagraph");

        MainParagraph.on("mouseenter", function(){
            MainParagraph.addClass("fa-spin");
            MainParagraph.css("color", "lime");
            MainParagraph.on("mouseout", function (){
                MainParagraph.removeClass("fa-spin");
                MainParagraph.css("color", "lime");
            });
       });

        $("body").append(`<article class="container"><p id="ArticleParagraph" class="mt-3">
            This is my article paragraph
            </p></article>`);

        let ContactUsBtn = $("#ContactUsBtn");
        let ServicesBtn = $("#ServicesBtn");
        let ProductsBtn = $("#ProductsBtn");
        let AboutUsButton = $("#AboutUsBtn");

        AboutUsButton.on("click", () => {
           location.href = "/about";
        });

        // AboutUsButton.on("mouseenter", function(){
        //     AboutUsButton.append(`<i class=\"fa-solid fa-circle-user\"></i> Aboot Us`);
        //     AboutUsButton.on("mouseout", function (){
        //        AboutUsButton.append(`<i class=\"fa-solid fa-circle-user\"></i> About Us`);
        //     });
        //});
        // Deprecated
        // AboutUsButton.addEventListener("click", function(){
        //     location.href = "about.html";
        // });
        ProductsBtn.on("click", function(){
            location.href = "/products";
        });
        ServicesBtn.on("click", function(){
            location.href = "/services";
        });
        ContactUsBtn.on("click", function(){
            location.href = "/contact";
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
            let contactList = document.getElementById("contactList") as HTMLElement;
            let data = "";

            let keys = Object.keys(localStorage);
            //console.log(keys);
            let index = 1;
            for(const key of keys){
                //console.log(key);
                let contactData = localStorage.getItem(key) as string;
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
                location.href = "/edit#add";
            });

            $("button.delete").on("click", function() {
               if(confirm("Delete contact, are you sure?")){
                   localStorage.removeItem($(this).val() as string);
               }
               location.href = "/contact-list";
            });

            $("button.edit").on("click", function(){
               location.href = "/edit#" + $(this).val();
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
    function ValidateField(input_field_id : string, reg_expr : RegExp, err_msg : string) {
        console.log("Test Name Function");

        let messageArea = $("#messageArea");

        //let nameRegex = /^+([A-Z][a-z]{1,3}\.?\s)?([A-Z][a-z]+)+([\s, -]([A-Z][a-z]+))*$/;

        $(input_field_id).on("blur", function(){

            let name : string = $(this).val() as string;
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
        ValidateField("#Name",
            /^([A-Z][a-z]{1,3}\.?\s)?([A-Z][a-z]+)+([\s,-]([A-z][a-z]+))*$/,
            "Please enter a valid name (Firstname Lastname)");
        ValidateField("#emailAdrress",
            /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,10}$/,
            "Please enter a valid Email Address");
        ValidateField("#phoneNum",
            /^(\+\d{1,3}[\s-.])?\(?\d{3}\)?[\s-.]?\d{3}[\s-.]\d{4}$/,
            "Please enter a valid Phone number (000-000-0000)");
    }

    function DisplayContactPage() {
        console.log("i am in DisplayContactPage function");

        ValidateContactForm();


        let sendButton = document.getElementById("btnSend") as HTMLElement;
        let subscribeCheckBox = document.getElementById("subscribeCheckbox") as HTMLInputElement;
        let fullName = document.forms[0].Name.value;
        let contactNumber = document.forms[0].phoneNum.value;
        let emailAddress = document.forms[0].emailAddress.value;



        sendButton.addEventListener("click", function(event){
           if(subscribeCheckBox.checked){
               console.log("Checkbox Checked");


               let contactInfo = new core.Contact(fullName, contactNumber, emailAddress);
               //console.log(contactInfo);
               //setTimeout(() => {  console.log("Im Free!"); }, 5000);
               if(contactInfo.serialize()){
                   let key = contactInfo.FullName.substring(0,1) + Date.now();
                   localStorage.setItem(key, contactInfo.serialize() as string);
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

                    let username = document.forms[0].username.value;
                    let password = document.forms[0].password.value;


                    if(username === u.Username && password === u.Password){
                        success = true;
                        newUser.fromJSON(u);
                        break;
                    }
                }

                if(success){

                    sessionStorage.setItem("user", newUser.serialize() as string);
                    messageArea.removeAttr("class").hide();

                }else{
                    $("#username").trigger("focus").trigger("select");
                    messageArea.addClass("alert alert-danger")
                        .text("Error: Invalid Credentials");
                }
            });

            $("#cancelButton").on("click", function() {

                document.forms[0].reset();
                location.href = "/home";

            });

        });
    }

    function CheckLogin() {

        if(sessionStorage.getItem("user")){
            $("#login").html(`<a id="logout" class="nav-link" href="#"><i class="fas fa-sign-out-alt"></i> Logout</a>`)
        }

        $("#logout").on("click", function(){
            sessionStorage.clear();
            location.href = "/login";
        })
    }

    function DisplayRegisterPage() {

    }

    function DisplayEditContact() {

        console.log("Edit page function accessed");

        ValidateContactForm();

        let page = location.hash.substring(1);
        switch (page) {
            case "add":
                $("main>h3").text("Add Contact");
                $("form>h5").html("<i class=\"fa-solid fa-pen-nib\"></i> Add Contact");
                $(".navbar-brand").html(`<i class="fa-solid fa-skull fa-spin" style="--fa-animation-duration: 90s;"></i> WEBD-6201 - Add Contact`);
                $("#btnEdit").html(`<i class="fa-solid fa-user-plus"></i> Add Contact`);

                $("btnEdit").on("click", (event) => {
                    event.preventDefault();

                    let fullName = document.forms[0].Name.value;
                    let contactNumber = document.forms[0].phoneNum.value;
                    let emailAddress = document.forms[0].emailAddress.value;

                    AddContact(fullName, contactNumber, emailAddress);
                    location.href = "/contact-list";
                });

                $("#btnReset").on("click", () => {
                    location.href = "/contact-list";
                });
                break;
            default: {

                let contact = new core.Contact();
                contact.deserialize(localStorage.getItem(page) as string);

                //display the contact info in the edit form
                $("#name").val(contact.FullName);
                $("#phoneNum").val(contact.ContactNumber);
                $("#emailAddress").val(contact.EmailAddress);

                //When edit button is pressed - update the contact
                $("#btnEdit").on("click", (event) => {
                    event.preventDefault();


                    //get any changes from the form
                    contact.FullName = $("#name").val() as string;
                    contact.ContactNumber = $("#phoneNum").val() as string;
                    contact.EmailAddress = $("#emailAddress").val() as string;

                    //replace the item in localstorage
                    localStorage.setItem(page, contact.serialize() as string);

                    //return to the contact-list
                    location.href = "/contact-list";
                })
                $("#btnReset").on("click", () => {
                    location.href = "/contact-list";
                });
            }

        }
    }
    function capitalizeFirstLetter(str : string) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    function LoadHeader(){

        $.get("/Views/components/header.html", function(html_data) {
            $("header").html(html_data);
            document.title = capitalizeFirstLetter(router.ActiveLink);
            $(`li>a:contains(${document.title})`).addClass("active");
            CheckLogin();

        });

        //$("a.navbar-brand").()
    }

    function LoadContent() { //ActiveLink, ActiveLinkCallback(router.ActiveLink)
        let page_name = router.ActiveLink;
        let callback  = ActiveLinkCallback();

        $.get(`./Views/content/${page_name}.html`, function (html_data) {

            $("main").html(html_data);
            callback();

        });
    }
    function LoadFooter(){

        $.get("/Views/components/footer.html", function(html_data) {

            $("footer").html(html_data);

        });
    }
    function Display404Page(){
        console.log("404 Page");
    }
    function ActiveLinkCallback() : Function{

        switch(router.ActiveLink){
            case "home": return DisplayHomePage;
            case "about": return DisplayAboutPage;
            case "contact": return DisplayContactPage;
            case "contact-list": return DisplayContactListPage;
            case "products": return DisplayProductsPage;
            case "services": return DisplayServicesPage;
            case "edit": return DisplayEditContact;
            case "login": return DisplayLoginPage;
            case "register": return DisplayRegisterPage;
            case "404": return Display404Page;
            default:
                console.error("Error: Callback doesn't exist" + router.ActiveLink);
                return new Function();
        }
    }

    //IIFE - Immediately Invoked Function Expression

        function Start()
        {
            console.log("App Started");

            LoadHeader();

            LoadContent();

            LoadFooter();


        }
        window.addEventListener("load", Start);

})()