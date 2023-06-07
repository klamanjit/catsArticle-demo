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
        this.openNav();
        this.closeNav();
        // active search bar
        this.toggleSearchBar();
        // activate imgs expandion
        this.expandingImgOnclick();
        //Progression bar
        this.adjustProgressionBar();
    }
    Cat.prototype.openNav = function () {
        var _this = this;
        this.btnOpenNav.addEventListener("click", function () {
            // add show-nav class
            _this.containerDiv.classList.add("show-nav");
            _this.navigatorSection.classList.add("show-nav");
            // adjust btns position
            _this.btnCloseNav.style.transform = "rotate(0)";
            _this.btnOpenNav.style.transform = "rotate(-90deg)";
            _this.navigatorSection.scrollIntoView({
                behavior: "smooth",
                block: "end",
                inline: "end",
            });
        });
    };
    Cat.prototype.closeNav = function () {
        var _this = this;
        this.btnCloseNav.addEventListener("click", function () {
            // add show-nav class
            _this.containerDiv.classList.remove("show-nav");
            _this.navigatorSection.classList.remove("show-nav");
            // adjust btns position
            _this.btnCloseNav.style.transform = "rotate(90deg)";
            _this.btnOpenNav.style.transform = "rotate(0)";
        });
    };
    Cat.prototype.toggleSearchBar = function () {
        var _this = this;
        this.btnSearch.addEventListener("click", function (e) {
            e.preventDefault();
            _this.searchBarEl.classList.toggle("active");
        });
    };
    Cat.prototype.removeActiveClassOnImgs = function () {
        this.imagsEl.forEach(function (img) {
            img.classList.remove("active");
        });
    };
    Cat.prototype.expandingImgOnclick = function () {
        var _this = this;
        this.imagsEl.forEach(function (img) {
            img.addEventListener("click", function () {
                _this.removeActiveClassOnImgs();
                img.classList.toggle("active");
            });
        });
    };
    Cat.prototype.expandingImgOnbtn = function (numImg) {
        document.getElementById("img".concat(numImg)).style.flex = "5";
    };
    Cat.prototype.downSizeImg = function (numIng) {
        document.getElementById("img".concat(numIng)).style.flex = "0.5";
    };
    Cat.prototype.adjustProgressionBar = function () {
        var _this = this;
        this.btnNext.addEventListener("click", function () {
            _this.numOfImg++;
            if (_this.numOfImg > _this.imagsEl.length) {
                _this.numOfImg = _this.imagsEl.length;
                return _this.numOfImg;
            }
            _this.numOfImg !== 1
                ? _this.downSizeImg(_this.numOfImg - 1)
                : _this.expandingImgOnbtn((_this.numOfImg = 1));
            _this.expandingImgOnbtn(_this.numOfImg);
            _this.progressBar.style.width = "".concat((_this.numOfImg - 1) * 25, "%");
            var circle = document.getElementById("circle".concat(_this.numOfImg));
            circle.style.borderColor = "#d97706";
        });
        this.btnPrev.addEventListener("click", function () {
            _this.numOfImg--;
            if (_this.numOfImg < 0) {
                _this.numOfImg = 0;
                return _this.numOfImg;
            }
            _this.numOfImg !== 5
                ? _this.downSizeImg(_this.numOfImg + 1)
                : _this.expandingImgOnbtn((_this.numOfImg = 5));
            _this.expandingImgOnbtn(_this.numOfImg === 0 ? 1 : _this.numOfImg);
            _this.progressBar.style.width = "".concat((_this.numOfImg - 1) * 25, "%");
            var circle = document.getElementById("circle".concat(_this.numOfImg + 1));
            circle.style.borderColor = "#e0e0e0";
        });
        return this.numOfImg;
    };
    return Cat;
}());
var cat1 = new Cat();
