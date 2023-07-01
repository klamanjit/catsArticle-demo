var Cat = /** @class */ (function () {
    function Cat() {
        this.userProjects = [];
        this.numOfImg = 0;
        // check valid User info
        this.isInfoValid = true;
        // selection properties
        this.btnOpenNav = document.querySelector(".btn-open");
        this.btnCloseNav = document.querySelector(".btn-close");
        this.containerDiv = document.querySelector(".container");
        this.navigatorSection = document.querySelector(".section-navigator");
        this.searchBarContainer = document.querySelector(".search-container");
        this.btnSearch = document.querySelector(".btn-search");
        this.searchBarEl = document.querySelector(".search-bar");
        this.imagsEl = document.querySelectorAll(".img");
        this.progressBar = document.querySelector(".progress-bar");
        this.progressCicles = document.querySelectorAll(".progress-circle");
        this.btnNext = document.querySelector(".btn-next");
        this.btnPrev = document.querySelector(".btn-prev");
        this.registerContainer = document.querySelector(".register-container");
        this.footerSection = document.querySelector(".section-footer");
        this.usernameEl = document.getElementById("user-name");
        this.rateEl = document.getElementById("rate");
        this.descriptionEl = document.getElementById("description");
        this.hallOfFlameSection = document.querySelector(".section-hall-of-flame");
        this.hallOfFlameBtn = document.querySelector(".hall-of-flame-btn");
        this.cardInsertEl = document.getElementById("card-insert");
        this.mainTextEls = document.querySelectorAll(".main-text");
        // active nav btns
        this.openNavOnBtn();
        this.closeNavOnBtn();
        // activate home,abot.contact links
        this.activeHomeLink();
        this.activateAboutLink();
        this.closeRegisterOnBtn();
        this.activateContactLink();
        this.closeFooterOnBtn();
        this.showContactInfo();
        // active search bar
        this.toggleSearchBar();
        // activate submitBtn
        this.activateSubmitBtn();
        // activate hall of flame
        this.toggleHallOfFlameOnBtn();
        this.activateShowDetailsBtn();
        this.hideDetailBtn();
        // activate imgs expandion
        // this.expandingImgOnclick();
        //Progression bar
        this.adjustProgressionBar();
    }
    Cat.prototype.openNav = function () {
        // add show-nav class
        this.containerDiv.classList.add("show-nav");
        this.navigatorSection.classList.add("show-nav");
        // adjust btns position
        this.btnCloseNav.style.transform = "rotate(0)";
        this.btnOpenNav.style.transform = "rotate(-90deg)";
        this.navigatorSection.scrollIntoView({
            behavior: "smooth",
            block: "end",
            inline: "end",
        });
    };
    Cat.prototype.closeNav = function () {
        // add show-nav class
        this.containerDiv.classList.remove("show-nav");
        this.navigatorSection.classList.remove("show-nav");
        // adjust btns position
        this.btnCloseNav.style.transform = "rotate(90deg)";
        this.btnOpenNav.style.transform = "rotate(0)";
    };
    Cat.prototype.closeRegisterSection = function () {
        this.registerContainer.style.display = "none";
    };
    Cat.prototype.closeFooterSection = function () {
        this.footerSection.style.display = "none";
    };
    Cat.prototype.openNavOnBtn = function () {
        this.btnOpenNav.addEventListener("click", this.openNav.bind(this));
    };
    Cat.prototype.closeNavOnBtn = function () {
        this.btnCloseNav.addEventListener("click", this.closeNav.bind(this));
    };
    Cat.prototype.closeRegisterOnBtn = function () {
        document
            .querySelector(".regis-close-btn")
            .addEventListener("click", this.closeRegisterSection.bind(this));
    };
    Cat.prototype.closeFooterOnBtn = function () {
        document
            .querySelector(".footer-close-btn")
            .addEventListener("click", this.closeFooterSection.bind(this));
    };
    Cat.prototype.activeHomeLink = function () {
        var _this = this;
        document.getElementById("home").addEventListener("click", function () {
            _this.closeFooterSection();
            _this.closeRegisterSection();
            _this.closeNav();
            _this.containerDiv.scrollIntoView({ behavior: "smooth" });
        });
    };
    Cat.prototype.activateAboutLink = function () {
        var _this = this;
        document.getElementById("about").addEventListener("click", function () {
            _this.closeFooterSection();
            _this.closeNav();
            _this.registerContainer.style.display = "flex";
            document.querySelector(".form-container").scrollIntoView({
                behavior: "smooth",
                block: "end",
                inline: "end",
            });
        });
    };
    Cat.prototype.clearRegisInputs = function () {
        this.usernameEl.value = "";
        this.rateEl.value = "";
        this.descriptionEl.value = "";
    };
    Cat.prototype.isValided = function (validateObj) {
        var isValid = true;
        if (validateObj.required) {
            isValid = isValid && validateObj.value.toString().trim().length !== 0;
        }
        if (validateObj.minLength != null &&
            typeof validateObj.value === "string") {
            isValid = isValid && validateObj.value.length >= validateObj.minLength;
        }
        if (validateObj.maxLength != null &&
            typeof validateObj.value === "string") {
            isValid = isValid && validateObj.value.length <= validateObj.maxLength;
        }
        if (validateObj.min != null && typeof validateObj.value === "number") {
            isValid = isValid && validateObj.value >= validateObj.min;
        }
        if (validateObj.max != null && typeof validateObj.value === "number") {
            isValid = isValid && validateObj.value <= validateObj.max;
        }
        return isValid;
    };
    // Post userInfo data to server
    Cat.prototype.postUserInfoToServer = function (userInfo) {
        fetch("https://cat-article-default-rtdb.asia-southeast1.firebasedatabase.app/userInfo.json", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: userInfo.userName,
                rate: userInfo.rate,
                description: userInfo.description,
            }),
        })
            .then(function (res) {
            if (res) {
                return;
            }
            else {
                throw new Error("Could not post the data, Try again later.");
            }
        })
            .catch(function (err) {
            alert("".concat(err.message, ": Please try again later \uD83D\uDE3F"));
        });
    };
    // Get userInfo from server
    Cat.prototype.getUserInfoFromServer = function () {
        var _this = this;
        fetch("https://cat-article-default-rtdb.asia-southeast1.firebasedatabase.app/userInfo.json")
            .then(function (res) {
            if (res)
                return res.json();
            else {
                throw new Error("Could not get data from the server, try again later.");
            }
        })
            .then(function (data) {
            console.log(data);
            var userInfos = [];
            for (var id in data) {
                userInfos.unshift({
                    userName: data[id].name,
                    rate: data[id].rate,
                    description: data[id].description,
                });
            }
            _this.userProjects = userInfos;
            console.log(_this.userProjects, userInfos);
            // try
            _this.showCardInsert();
        })
            .catch(function (err) {
            alert("".concat(err.message, ": Please try again later \uD83D\uDE3F"));
        });
    };
    Cat.prototype.gatherRegisterInfo = function () {
        var usernameInfo = this.usernameEl.value;
        var rateInfo = +this.rateEl.value;
        var descriptionInfo = this.descriptionEl.value;
        var validedUserNane = {
            value: usernameInfo,
            required: true,
        };
        var validRate = {
            value: +rateInfo,
            required: true,
            min: 1,
            max: 10,
        };
        var validDescription = {
            value: descriptionInfo,
            required: true,
            maxLength: 12,
            minLength: 0,
        };
        if (this.isValided(validedUserNane) &&
            this.isValided(validRate) &&
            this.isValided(validDescription)) {
            var userInfo = {
                userName: usernameInfo,
                rate: rateInfo,
                description: descriptionInfo,
            };
            // Post userInfo data to server
            this.postUserInfoToServer(userInfo);
            console.log(userInfo);
            // No need to push this again
            // this.userProjects.push(userInfo);
            // return userInfo;
        }
        else {
            this.isInfoValid = false;
            alert("Oopsie-daisy! Something seems to be amiss with the inputs you provided. Could you double-check and make sure they're correct? We want to make sure everything is in order. Thanks! \n      \n Your Kitty Alias!: not empthy\n Rate the cat cuteness level!: not more than 10\n Express your feelings!: 0-12 characters including space\n \uD83D\uDE18 \uD83D\uDE18 \uD83D\uDE18 \uD83D\uDE18 ");
            this.clearRegisInputs();
            return;
        }
    };
    Cat.prototype.showCardInsert = function () {
        var _this = this;
        this.cardInsertEl.innerHTML = "";
        if (this.userProjects) {
            this.userProjects.forEach(function (user) {
                var html = "\n        <div class=\"card-container\">\n      <ul>\n            <li class=\"card-user-name\">\n              <ion-icon name=\"logo-octocat\"></ion-icon>\n              <span class=\"card-text\">".concat(user.userName, "</span>\n            </li>\n            <li class=\"card-rate\">\n              <ion-icon name=\"star-half-outline\"></ion-icon>\n              <span class=\"card-text\">").concat(user.rate, "</span>\n            </li>\n            <li class=\"card-description\">\n            <ion-icon name=\"chatbubble-ellipses-outline\"></ion-icon\n            ><span class=\"card-text\">").concat(user.description, "</span>\n          </li>\n        </ul>\n          \n        </div>\n        <p class=\"author\"><span class=\"copy-right\">&copy; </span> Kla Manjit</p>\n      ");
                _this.cardInsertEl.insertAdjacentHTML("beforeend", html);
            });
        }
    };
    Cat.prototype.activateSubmitBtn = function () {
        var _this = this;
        document
            .querySelector(".regis-submit-btn")
            .addEventListener("click", function (e) {
            e.preventDefault();
            _this.isInfoValid = true;
            _this.gatherRegisterInfo();
            if (_this.isInfoValid === true) {
                _this.clearRegisInputs();
                _this.closeRegisterSection();
                _this.toogleHallOFFlame();
                _this.showCardInsert();
            }
            else {
                return;
            }
        });
    };
    Cat.prototype.activateShowDetailsBtn = function () {
        var _this = this;
        document
            .querySelector(".show-infos-btn")
            .addEventListener("click", function (e) {
            e.preventDefault();
            _this.cardInsertEl.style.display = "flex";
            _this.getUserInfoFromServer();
        });
    };
    Cat.prototype.hideDetailBtn = function () {
        var _this = this;
        document.querySelector(".hide-infos-btn").addEventListener("click", function () {
            _this.cardInsertEl.style.display = "none";
        });
    };
    Cat.prototype.toogleHallOFFlame = function () {
        this.hallOfFlameSection.classList.toggle("active");
    };
    Cat.prototype.toggleHallOfFlameOnBtn = function () {
        this.hallOfFlameBtn.addEventListener("click", this.toogleHallOFFlame.bind(this));
    };
    Cat.prototype.activateContactLink = function () {
        var _this = this;
        document.getElementById("contact").addEventListener("click", function () {
            _this.closeRegisterSection();
            _this.closeNav();
            _this.footerSection.style.display = "block";
            document
                .querySelector(".footer-container")
                .scrollIntoView({ behavior: "smooth" });
        });
    };
    Cat.prototype.showContactInfo = function () {
        document
            .querySelector(".footer-container")
            .addEventListener("mouseover", function (e) {
            // console.log(e.target);
            var iconTarget = e.target.classList.contains("contacts-icon");
            if (iconTarget) {
                document.querySelectorAll(".contact-text").forEach(function (text) {
                    text.style.display = "block";
                });
            }
            else {
                document.querySelectorAll(".contact-text").forEach(function (text) {
                    text.style.display = "none";
                });
            }
        });
    };
    Cat.prototype.toggleSearchBar = function () {
        var _this = this;
        this.btnSearch.addEventListener("click", function (e) {
            e.preventDefault();
            _this.searchBarEl.classList.toggle("active");
            _this.searchBarEl.focus();
        });
    };
    // // close
    // private removeActiveClassOnImgs() {
    //   this.imagsEl.forEach((img) => {
    //     (img as HTMLDivElement).classList.remove("active");
    //   });
    // }
    // private expandingImgOnclick() {
    //   this.imagsEl.forEach((img) => {
    //     (img as HTMLDivElement).addEventListener("click", (e: Event) => {
    //       this.removeActiveClassOnImgs();
    //       img.classList.toggle("active");
    //       let targetImg = +(e.target as HTMLDivElement).dataset.img!;
    //       let numOfImgNextBtn = this.upProgression();
    //       let numOfImgPrevBtn = this.downProgression();
    //       console.log(numOfImgPrevBtn, numOfImgNextBtn);
    //       if (targetImg === numOfImgNextBtn) {
    //         targetImg = numOfImgNextBtn;
    //       }
    //       if (targetImg === numOfImgPrevBtn) {
    //         targetImg = numOfImgPrevBtn;
    //       }
    //       this.upProgressionBar(targetImg);
    //       this.downProgressionBar(targetImg);
    //       return targetImg;
    //     });
    //   });
    // }
    // // clisae
    Cat.prototype.expandingImgOnbtn = function (numImg) {
        document.getElementById("img".concat(numImg)).style.flex = "5";
    };
    Cat.prototype.downSizeImg = function (numIng) {
        document.getElementById("img".concat(numIng)).style.flex = "0.5";
    };
    Cat.prototype.activateMainTextContent = function (numImg) {
        this.mainTextEls.forEach(function (text, i) {
            text.classList.remove("active");
            if (i === numImg) {
                var targetText = document.getElementById("main-text-".concat(numImg));
                targetText.classList.add("active");
            }
        });
    };
    Cat.prototype.upProgressionBar = function (numImg) {
        this.progressBar.style.width = "".concat((numImg - 1) * 25, "%");
        var circle = document.getElementById("circle".concat(numImg));
        circle.style.borderColor = "#d97706";
    };
    Cat.prototype.downProgressionBar = function (numImg) {
        this.progressBar.style.width = "".concat((numImg - 1) * 25, "%");
        var circle = document.getElementById("circle".concat(numImg + 1));
        circle.style.borderColor = "#e0e0e0";
    };
    Cat.prototype.upProgression = function () {
        this.numOfImg++;
        if (this.numOfImg > this.imagsEl.length) {
            this.numOfImg = this.imagsEl.length;
            // return this.numOfImg;
        }
        this.numOfImg !== 1
            ? this.downSizeImg(this.numOfImg - 1)
            : this.expandingImgOnbtn(1);
        this.expandingImgOnbtn(this.numOfImg);
        this.upProgressionBar(this.numOfImg);
        this.activateMainTextContent(this.numOfImg);
        // console.log(this.numOfImg);
        return this.numOfImg;
    };
    Cat.prototype.downProgression = function () {
        this.numOfImg--;
        if (this.numOfImg < 0) {
            this.numOfImg = 0;
        }
        this.numOfImg !== 5
            ? this.downSizeImg(this.numOfImg + 1)
            : this.expandingImgOnbtn(5);
        if (this.numOfImg === 0) {
            this.expandingImgOnbtn(1);
            this.downSizeImg(1);
        }
        else {
            this.expandingImgOnbtn(this.numOfImg);
        }
        // console.log(this.numOfImg);
        this.downProgressionBar(this.numOfImg);
        this.activateMainTextContent(this.numOfImg);
        return this.numOfImg;
    };
    Cat.prototype.adjustProgressionBar = function () {
        this.btnNext.addEventListener("click", this.upProgression.bind(this));
        this.btnPrev.addEventListener("click", this.downProgression.bind(this));
    };
    return Cat;
}());
var cat1 = new Cat();
