class Cat {
  private btnOpenNav: HTMLButtonElement;
  private btnCloseNav: HTMLButtonElement;
  private containerDiv: HTMLDivElement;
  private navigatorSection: HTMLDivElement;
  constructor() {
    // selection properties
    this.btnOpenNav = document.querySelector(".btn-open") as HTMLButtonElement;
    this.btnCloseNav = document.querySelector(
      ".btn-close"
    ) as HTMLButtonElement;
    this.containerDiv = document.querySelector(".container") as HTMLDivElement;
    this.navigatorSection = document.querySelector(
      ".section-navigator"
    ) as HTMLDivElement;

    // actve nav btns
    this.openNav();
    this.closeNav();
  }

  openNav() {
    this.btnOpenNav.addEventListener("click", () => {
      // add show-nav class
      this.containerDiv.classList.add("show-nav");
      this.navigatorSection.classList.add("show-nav");

      // adjust btns position
      this.btnCloseNav.style.transform = `rotate(0)`;
      this.btnOpenNav.style.transform = `rotate(-90deg)`;
    });
  }

  closeNav() {
    this.btnCloseNav.addEventListener("click", () => {
      // add show-nav class
      this.containerDiv.classList.remove("show-nav");
      this.navigatorSection.classList.remove("show-nav");

      // adjust btns position
      this.btnCloseNav.style.transform = `rotate(90deg)`;
      this.btnOpenNav.style.transform = `rotate(0)`;
    });
  }
}

const cat1 = new Cat();
