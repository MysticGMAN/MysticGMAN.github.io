"use strict";
(function () {
    function AjaxRequest(method, url, callback) {
        let xhr = new XMLHttpRequest();
        xhr.addEventListener("readystatechange", () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                if (typeof callback === "function") {
                    callback(xhr.responseText);
                    console.log(xhr.responseText);
                }
                else {
                    console.error("Error: callback is not a valid function");
                }
            }
        });
        xhr.open(method, url);
        xhr.send();
    }
    function AddContact(fullName, contactNumber, emailAddress) {
        let contactInfo = new core.Contact(fullName, contactNumber, emailAddress);
        console.log(contactInfo);
        if (contactInfo.serialize()) {
            let key = contactInfo.FullName.substring(0, 1) + Date.now();
            localStorage.setItem(key, contactInfo.serialize());
        }
    }
    function DisplayHomePage() {
        console.log("Home page loaded");
        $("main").append(`<p id="MainParagraph" class="mt-3">
        This is the no fun dynamic zone. CSS animations sold separately</p>`);
        let MainParagraph = $("#MainParagraph");
        MainParagraph.on("mouseenter", function () {
            MainParagraph.addClass("fa-spin");
            MainParagraph.css("color", "lime");
            MainParagraph.on("mouseout", function () {
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
        ProductsBtn.on("click", function () {
            location.href = "/products";
        });
        ServicesBtn.on("click", function () {
            location.href = "/services";
        });
        ContactUsBtn.on("click", function () {
            location.href = "/contact";
        });
    }
    function DisplayContactListPage() {
        if (localStorage.length > 0) {
            let contactList = document.getElementById("contactList");
            let data = "";
            let keys = Object.keys(localStorage);
            let index = 1;
            for (const key of keys) {
                let contactData = localStorage.getItem(key);
                let contact = new core.Contact();
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
            $("button.delete").on("click", function () {
                if (confirm("Delete contact, are you sure?")) {
                    localStorage.removeItem($(this).val());
                }
                location.href = "/contact-list";
            });
            $("button.edit").on("click", function () {
                location.href = "/edit#" + $(this).val();
            });
        }
    }
    function ValidateField(input_field_id, reg_expr, err_msg) {
        console.log("Test Name Function");
        let messageArea = $("#messageArea");
        $(input_field_id).on("blur", function () {
            let name = $(this).val();
            if (!reg_expr.test(name)) {
                $(this).trigger("focus").trigger("select");
                messageArea.addClass("alert alert-danger").text(err_msg).show();
            }
            else {
                messageArea.removeAttr("class").hide();
            }
        });
    }
    function ValidateContactForm() {
        ValidateField("#Name", /^([A-Z][a-z]{1,3}\.?\s)?([A-Z][a-z]+)+([\s,-]([A-z][a-z]+))*$/, "Please enter a valid name (Firstname Lastname)");
        ValidateField("#emailAdrress", /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,10}$/, "Please enter a valid Email Address");
        ValidateField("#phoneNum", /^(\+\d{1,3}[\s-.])?\(?\d{3}\)?[\s-.]?\d{3}[\s-.]\d{4}$/, "Please enter a valid Phone number (000-000-0000)");
    }
    function DisplayContactPage() {
        console.log("i am in DisplayContactPage function");
        ValidateContactForm();
        let sendButton = document.getElementById("btnSend");
        let subscribeCheckBox = document.getElementById("subscribeCheckbox");
        let fullName = document.forms[0].Name.value;
        let contactNumber = document.forms[0].phoneNum.value;
        let emailAddress = document.forms[0].emailAddress.value;
        sendButton.addEventListener("click", function (event) {
            if (subscribeCheckBox.checked) {
                console.log("Checkbox Checked");
                let contactInfo = new core.Contact(fullName, contactNumber, emailAddress);
                if (contactInfo.serialize()) {
                    let key = contactInfo.FullName.substring(0, 1) + Date.now();
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
        $("#loginButton").on("click", function () {
            let success = false;
            let newUser = new core.User();
            $.get("../data/user.json", function (data) {
                for (const u of data.user) {
                    let username = document.forms[0].username.value;
                    let password = document.forms[0].password.value;
                    if (username === u.Username && password === u.Password) {
                        success = true;
                        newUser.fromJSON(u);
                        break;
                    }
                }
                if (success) {
                    sessionStorage.setItem("user", newUser.serialize());
                    messageArea.removeAttr("class").hide();
                }
                else {
                    $("#username").trigger("focus").trigger("select");
                    messageArea.addClass("alert alert-danger")
                        .text("Error: Invalid Credentials");
                }
            });
            $("#cancelButton").on("click", function () {
                document.forms[0].reset();
                location.href = "/home";
            });
        });
    }
    function CheckLogin() {
        if (sessionStorage.getItem("user")) {
            $("#login").html(`<a id="logout" class="nav-link" href="#"><i class="fas fa-sign-out-alt"></i> Logout</a>`);
        }
        $("#logout").on("click", function () {
            sessionStorage.clear();
            location.href = "/login";
        });
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
                contact.deserialize(localStorage.getItem(page));
                $("#name").val(contact.FullName);
                $("#phoneNum").val(contact.ContactNumber);
                $("#emailAddress").val(contact.EmailAddress);
                $("#btnEdit").on("click", (event) => {
                    event.preventDefault();
                    contact.FullName = $("#name").val();
                    contact.ContactNumber = $("#phoneNum").val();
                    contact.EmailAddress = $("#emailAddress").val();
                    localStorage.setItem(page, contact.serialize());
                    location.href = "/contact-list";
                });
                $("#btnReset").on("click", () => {
                    location.href = "/contact-list";
                });
            }
        }
    }
    function capitalizeFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    function LoadHeader() {
        $.get("/Views/components/header.html", function (html_data) {
            $("header").html(html_data);
            document.title = capitalizeFirstLetter(router.ActiveLink);
            $(`li>a:contains(${document.title})`).addClass("active");
            CheckLogin();
        });
    }
    function LoadContent() {
        let page_name = router.ActiveLink;
        let callback = ActiveLinkCallback();
        $.get(`./Views/content/${page_name}.html`, function (html_data) {
            $("main").html(html_data);
            callback();
        });
    }
    function LoadFooter() {
        $.get("/Views/components/footer.html", function (html_data) {
            $("footer").html(html_data);
        });
    }
    function Display404Page() {
        console.log("404 Page");
    }
    function ActiveLinkCallback() {
        switch (router.ActiveLink) {
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
    function Start() {
        console.log("App Started");
        LoadHeader();
        LoadContent();
        LoadFooter();
    }
    window.addEventListener("load", Start);
})();
//# sourceMappingURL=app.js.map