var Cat = /** @class */ (function () {
    function Cat() {
        this.numOfImg = 0;
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
        // active nav btns
        this.openNavOnBtn();
        this.closeNavOnBtn();
        // activate about link
        this.activeAboutLink();
        // active search bar
        this.toggleSearchBar();
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
    Cat.prototype.openNavOnBtn = function () {
        this.btnOpenNav.addEventListener("click", this.openNav.bind(this));
    };
    Cat.prototype.closeNavOnBtn = function () {
        this.btnCloseNav.addEventListener("click", this.closeNav.bind(this));
    };
    Cat.prototype.activeAboutLink = function () {
        var _this = this;
        document.getElementById("about").addEventListener("click", function () {
            _this.closeNav();
            _this.containerDiv.scrollIntoView({ behavior: "smooth" });
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
    //       this.numOfImg = targetImg;
    //       this.upProgressionBar(this.numOfImg);
    //       this.downProgressionBar(this.numOfImg);
    //       return this.numOfImg;
    //     });
    //   });
    // }
    Cat.prototype.expandingImgOnbtn = function (numImg) {
        document.getElementById("img".concat(numImg)).style.flex = "5";
    };
    Cat.prototype.downSizeImg = function (numIng) {
        document.getElementById("img".concat(numIng)).style.flex = "0.5";
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
            return this.numOfImg;
        }
        this.numOfImg !== 1
            ? this.downSizeImg(this.numOfImg - 1)
            : this.expandingImgOnbtn((this.numOfImg = 1));
        this.expandingImgOnbtn(this.numOfImg);
        this.upProgressionBar(this.numOfImg);
        return this.numOfImg;
    };
    Cat.prototype.downProgression = function () {
        this.numOfImg--;
        if (this.numOfImg < 0) {
            this.numOfImg = 0;
            return this.numOfImg;
        }
        this.numOfImg !== 5
            ? this.downSizeImg(this.numOfImg + 1)
            : this.expandingImgOnbtn((this.numOfImg = 5));
        this.expandingImgOnbtn(this.numOfImg === 0 ? 1 : this.numOfImg);
        this.downProgressionBar(this.numOfImg);
        return this.numOfImg;
    };
    Cat.prototype.adjustProgressionBar = function () {
        this.btnNext.addEventListener("click", this.upProgression.bind(this));
        this.btnPrev.addEventListener("click", this.downProgression.bind(this));
        return this.numOfImg;
    };
    return Cat;
}());
var cat1 = new Cat();
console.log(cat1.numOfImg);
