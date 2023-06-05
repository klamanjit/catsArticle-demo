var Cat = /** @class */ (function () {
    function Cat() {
        // selection properties
        this.btnOpenNav = document.querySelector(".btn-open");
        this.btnCloseNav = document.querySelector(".btn-close");
        this.containerDiv = document.querySelector(".container");
        this.navigatorSection = document.querySelector(".section-navigator");
        // actve nav btns
        this.openNav();
        this.closeNav();
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
    return Cat;
}());
var cat1 = new Cat();
