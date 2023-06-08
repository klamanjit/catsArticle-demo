class Cat {
  // nav
  btnOpenNav: HTMLButtonElement;
  btnCloseNav: HTMLButtonElement;
  containerDiv: HTMLDivElement;
  navigatorSection: HTMLDivElement;
  // search bar
  searchBarContainer: HTMLFormElement;
  searchBarEl: HTMLInputElement;
  btnSearch: HTMLButtonElement;
  // images
  imagsEl: NodeListOf<Element>;
  // progression-bar
  progressBar: HTMLDivElement;
  progressCicles: NodeListOf<Element>;
  btnNext: HTMLButtonElement;
  btnPrev: HTMLButtonElement;
  // section-register
  registerContainer: HTMLDivElement;

  numOfImg: number = 0;

  constructor() {
    // selection properties
    this.btnOpenNav = document.querySelector(".btn-open")! as HTMLButtonElement;
    this.btnCloseNav = document.querySelector(
      ".btn-close"
    )! as HTMLButtonElement;
    this.containerDiv = document.querySelector(".container")! as HTMLDivElement;
    this.navigatorSection = document.querySelector(
      ".section-navigator"
    )! as HTMLDivElement;

    this.searchBarContainer = document.querySelector(
      ".search-container"
    )! as HTMLFormElement;
    this.btnSearch = document.querySelector(
      ".btn-search"
    )! as HTMLButtonElement;
    this.searchBarEl = document.querySelector(
      ".search-bar"
    )! as HTMLInputElement;
    this.imagsEl = document.querySelectorAll(".img")!;
    this.progressBar = document.querySelector(
      ".progress-bar"
    )! as HTMLDivElement;
    this.progressCicles = document.querySelectorAll(".progress-circle")!;
    this.btnNext = document.querySelector(".btn-next")! as HTMLButtonElement;
    this.btnPrev = document.querySelector(".btn-prev")! as HTMLButtonElement;
    this.registerContainer = document.querySelector(
      ".register-container"
    )! as HTMLDivElement;

    // active nav btns
    this.openNavOnBtn();
    this.closeNavOnBtn();

    // activate home,abot.contact links
    this.activeHomeLink();
    this.activateAboutLink();
    this.closeRegisterOnBtn();
    // active search bar
    this.toggleSearchBar();

    // activate imgs expandion
    // this.expandingImgOnclick();

    //Progression bar
    this.adjustProgressionBar();
  }

  private openNav() {
    // add show-nav class
    this.containerDiv.classList.add("show-nav");
    this.navigatorSection.classList.add("show-nav");

    // adjust btns position
    this.btnCloseNav.style.transform = `rotate(0)`;
    this.btnOpenNav.style.transform = `rotate(-90deg)`;

    this.navigatorSection.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "end",
    });
  }

  private closeNav() {
    // add show-nav class
    this.containerDiv.classList.remove("show-nav");
    this.navigatorSection.classList.remove("show-nav");

    // adjust btns position
    this.btnCloseNav.style.transform = `rotate(90deg)`;
    this.btnOpenNav.style.transform = `rotate(0)`;
  }

  private closeRegisterSection() {
    this.registerContainer.style.display = `none`;
  }

  private openNavOnBtn() {
    this.btnOpenNav.addEventListener("click", this.openNav.bind(this));
  }

  private closeNavOnBtn() {
    this.btnCloseNav.addEventListener("click", this.closeNav.bind(this));
  }

  private closeRegisterOnBtn() {
    document
      .querySelector(".regis-close-btn")!
      .addEventListener("click", this.closeRegisterSection.bind(this));
  }

  private activeHomeLink() {
    document.getElementById("home")!.addEventListener("click", () => {
      this.closeNav();
      this.containerDiv.scrollIntoView({ behavior: "smooth" });
    });
  }

  private activateAboutLink() {
    document.getElementById("about")!.addEventListener("click", () => {
      this.closeNav();

      this.registerContainer.style.display = `flex`;
      document.querySelector(".form-container")!.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "end",
      });
    });
  }

  private toggleSearchBar() {
    this.btnSearch.addEventListener("click", (e: Event) => {
      e.preventDefault();

      this.searchBarEl.classList.toggle("active");
      this.searchBarEl.focus();
    });
  }

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

  private expandingImgOnbtn(numImg: number) {
    document.getElementById(`img${numImg}`)!.style.flex = `5`;
  }

  private downSizeImg(numIng: number) {
    document.getElementById(`img${numIng}`)!.style.flex = `0.5`;
  }

  private upProgressionBar(numImg: number) {
    this.progressBar.style.width = `${(numImg - 1) * 25}%`;
    const circle = document.getElementById(`circle${numImg}`) as HTMLDivElement;
    circle.style.borderColor = "#d97706";
  }

  private downProgressionBar(numImg: number) {
    this.progressBar.style.width = `${(numImg - 1) * 25}%`;
    const circle = document.getElementById(
      `circle${numImg + 1}`
    ) as HTMLDivElement;
    circle.style.borderColor = "#e0e0e0";
  }

  private upProgression(): any {
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
  }

  private downProgression(): any {
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
  }

  private adjustProgressionBar() {
    this.btnNext.addEventListener("click", this.upProgression.bind(this));
    this.btnPrev.addEventListener("click", this.downProgression.bind(this));

    return this.numOfImg;
  }
}

const cat1 = new Cat();
console.log(cat1.numOfImg);
