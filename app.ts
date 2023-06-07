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

  private openNav() {
    this.btnOpenNav.addEventListener("click", () => {
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
    });
  }

  private closeNav() {
    this.btnCloseNav.addEventListener("click", () => {
      // add show-nav class
      this.containerDiv.classList.remove("show-nav");
      this.navigatorSection.classList.remove("show-nav");

      // adjust btns position
      this.btnCloseNav.style.transform = `rotate(90deg)`;
      this.btnOpenNav.style.transform = `rotate(0)`;
    });
  }

  private toggleSearchBar() {
    this.btnSearch.addEventListener("click", (e: Event) => {
      e.preventDefault();

      this.searchBarEl.classList.toggle("active");
    });
  }

  private removeActiveClassOnImgs() {
    this.imagsEl.forEach((img) => {
      (img as HTMLDivElement).classList.remove("active");
    });
  }

  private expandingImgOnclick() {
    this.imagsEl.forEach((img) => {
      (img as HTMLDivElement).addEventListener("click", () => {
        this.removeActiveClassOnImgs();
        img.classList.toggle("active");
      });
    });
  }

  private expandingImgOnbtn(numImg: number) {
    document.getElementById(`img${numImg}`)!.style.flex = `5`;
  }

  private downSizeImg(numIng: number) {
    document.getElementById(`img${numIng}`)!.style.flex = `0.5`;
  }

  private adjustProgressionBar() {
    this.btnNext.addEventListener("click", (): any => {
      this.numOfImg++;

      if (this.numOfImg > this.imagsEl.length) {
        this.numOfImg = this.imagsEl.length;
        return this.numOfImg;
      }
      this.numOfImg !== 1
        ? this.downSizeImg(this.numOfImg - 1)
        : this.expandingImgOnbtn((this.numOfImg = 1));

      this.expandingImgOnbtn(this.numOfImg);
      this.progressBar.style.width = `${(this.numOfImg - 1) * 25}%`;
      const circle = document.getElementById(
        `circle${this.numOfImg}`
      ) as HTMLDivElement;
      circle.style.borderColor = "#d97706";
    });

    this.btnPrev.addEventListener("click", (): any => {
      this.numOfImg--;

      if (this.numOfImg < 0) {
        this.numOfImg = 0;
        return this.numOfImg;
      }

      this.numOfImg !== 5
        ? this.downSizeImg(this.numOfImg + 1)
        : this.expandingImgOnbtn((this.numOfImg = 5));

      this.expandingImgOnbtn(this.numOfImg === 0 ? 1 : this.numOfImg);
      this.progressBar.style.width = `${(this.numOfImg - 1) * 25}%`;
      const circle = document.getElementById(
        `circle${this.numOfImg + 1}`
      ) as HTMLDivElement;
      circle.style.borderColor = "#e0e0e0";
    });

    return this.numOfImg;
  }
}

const cat1 = new Cat();
