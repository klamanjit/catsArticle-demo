interface Validable {
  value: string | number;
  required: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

interface UserInfo {
  userName: string;
  rate: number;
  description: string;
}

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
  usernameEl: HTMLInputElement;
  rateEl: HTMLInputElement;
  descriptionEl: HTMLTextAreaElement;
  // section-footer
  footerSection: HTMLDivElement;
  // section hall of flame
  hallOfFlameSection: HTMLDivElement;
  hallOfFlameBtn: HTMLButtonElement;
  cardInsertEl: HTMLDivElement;
  userProjects: UserInfo[] = [];

  // Content
  mainTextEls: NodeListOf<Element>;

  numOfImg: number = 0;
  // check valid User info
  isInfoValid: boolean = true;

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
    this.footerSection = document.querySelector(
      ".section-footer"
    )! as HTMLDivElement;
    this.usernameEl = document.getElementById("user-name")! as HTMLInputElement;
    this.rateEl = document.getElementById("rate")! as HTMLInputElement;
    this.descriptionEl = document.getElementById(
      "description"
    )! as HTMLTextAreaElement;
    this.hallOfFlameSection = document.querySelector(
      ".section-hall-of-flame"
    )! as HTMLDivElement;
    this.hallOfFlameBtn = document.querySelector(
      ".hall-of-flame-btn"
    )! as HTMLButtonElement;
    this.cardInsertEl = document.getElementById(
      "card-insert"
    )! as HTMLDivElement;
    this.mainTextEls = document.querySelectorAll(
      ".main-text"
    )! as NodeListOf<Element>;

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

  private closeFooterSection() {
    this.footerSection.style.display = "none";
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

  private closeFooterOnBtn() {
    document
      .querySelector(".footer-close-btn")!
      .addEventListener("click", this.closeFooterSection.bind(this));
  }

  private activeHomeLink() {
    document.getElementById("home")!.addEventListener("click", () => {
      this.closeFooterSection();
      this.closeRegisterSection();
      this.closeNav();
      this.containerDiv.scrollIntoView({ behavior: "smooth" });
    });
  }

  private activateAboutLink() {
    document.getElementById("about")!.addEventListener("click", () => {
      this.closeFooterSection();
      this.closeNav();

      this.registerContainer.style.display = `flex`;
      document.querySelector(".form-container")!.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "end",
      });
    });
  }

  private clearRegisInputs() {
    this.usernameEl.value = "";
    this.rateEl.value = "";
    this.descriptionEl.value = "";
  }

  private isValided(validateObj: Validable) {
    let isValid = true;

    if (validateObj.required) {
      isValid = isValid && validateObj.value.toString().trim().length !== 0;
    }

    if (
      validateObj.minLength != null &&
      typeof validateObj.value === "string"
    ) {
      isValid = isValid && validateObj.value.length >= validateObj.minLength;
    }

    if (
      validateObj.maxLength != null &&
      typeof validateObj.value === "string"
    ) {
      isValid = isValid && validateObj.value.length <= validateObj.maxLength;
    }

    if (validateObj.min != null && typeof validateObj.value === "number") {
      isValid = isValid && validateObj.value >= validateObj.min;
    }

    if (validateObj.max != null && typeof validateObj.value === "number") {
      isValid = isValid && validateObj.value <= validateObj.max;
    }

    return isValid;
  }

  // Post userInfo data to server
  private postUserInfoToServer(userInfo: UserInfo) {
    fetch(
      `https://cat-article-default-rtdb.asia-southeast1.firebasedatabase.app/userInfo.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: userInfo.userName,
          rate: userInfo.rate,
          description: userInfo.description,
        }),
      }
    )
      .then((res) => {
        if (res) {
          return;
        } else {
          throw new Error(`Could not post the data, Try again later.`);
        }
      })
      .catch((err) => {
        alert(`${err.message}: Please try again later 😿`);
      });
  }

  // Get userInfo from server
  private getUserInfoFromServer() {
    fetch(
      `https://cat-article-default-rtdb.asia-southeast1.firebasedatabase.app/userInfo.json`
    )
      .then((res) => {
        if (res) return res.json();
        else {
          throw new Error(
            `Could not get data from the server, try again later.`
          );
        }
      })
      .then((data) => {
        console.log(data);
        const userInfos: UserInfo[] = [];
        for (const id in data) {
          userInfos.unshift({
            userName: data[id].name,
            rate: data[id].rate,
            description: data[id].description,
          });
        }
        this.userProjects = userInfos;
        console.log(this.userProjects, userInfos);

        // try
        this.showCardInsert();
      })
      .catch((err) => {
        alert(`${err.message}: Please try again later 😿`);
      });
  }

  private gatherRegisterInfo(): UserInfo | any {
    const usernameInfo = this.usernameEl.value;
    const rateInfo = +this.rateEl.value;
    const descriptionInfo = this.descriptionEl.value;

    const validedUserNane: Validable = {
      value: usernameInfo,
      required: true,
    };

    const validRate: Validable = {
      value: +rateInfo,
      required: true,
      min: 1,
      max: 10,
    };

    const validDescription: Validable = {
      value: descriptionInfo,
      required: true,
      maxLength: 12,
      minLength: 0,
    };

    if (
      this.isValided(validedUserNane) &&
      this.isValided(validRate) &&
      this.isValided(validDescription)
    ) {
      const userInfo: UserInfo = {
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
    } else {
      this.isInfoValid = false;
      alert(`Oopsie-daisy! Something seems to be amiss with the inputs you provided. Could you double-check and make sure they're correct? We want to make sure everything is in order. Thanks! 
      \n Your Kitty Alias!: not empthy\n Rate the cat cuteness level!: not more than 10\n Express your feelings!: 0-12 characters including space\n 😘 😘 😘 😘 `);
      this.clearRegisInputs();
      return;
    }
  }

  private showCardInsert() {
    this.cardInsertEl.innerHTML = ``;
    if (this.userProjects) {
      this.userProjects.forEach((user) => {
        const html = `
        <div class="card-container">
      <ul>
            <li class="card-user-name">
              <ion-icon name="logo-octocat"></ion-icon>
              <span class="card-text">${user.userName}</span>
            </li>
            <li class="card-rate">
              <ion-icon name="star-half-outline"></ion-icon>
              <span class="card-text">${user.rate}</span>
            </li>
            <li class="card-description">
            <ion-icon name="chatbubble-ellipses-outline"></ion-icon
            ><span class="card-text">${user.description}</span>
          </li>
        </ul>
          
        </div>
        <p class="author"><span class="copy-right">&copy; </span> Kla Manjit</p>
      `;

        this.cardInsertEl.insertAdjacentHTML("beforeend", html);
      });
    }
  }

  private activateSubmitBtn() {
    document
      .querySelector(".regis-submit-btn")!
      .addEventListener("click", (e: Event) => {
        e.preventDefault();
        this.isInfoValid = true;

        this.gatherRegisterInfo();
        if (this.isInfoValid === true) {
          this.clearRegisInputs();

          this.closeRegisterSection();

          this.toogleHallOFFlame();

          this.showCardInsert();
        } else {
          return;
        }
      });
  }

  private activateShowDetailsBtn() {
    document
      .querySelector(".show-infos-btn")!
      .addEventListener("click", (e) => {
        e.preventDefault();
        this.cardInsertEl.style.display = "flex";

        this.getUserInfoFromServer();
      });
  }

  private hideDetailBtn() {
    document.querySelector(".hide-infos-btn")!.addEventListener("click", () => {
      this.cardInsertEl.style.display = "none";
    });
  }

  private toogleHallOFFlame() {
    this.hallOfFlameSection.classList.toggle("active");
  }

  private toggleHallOfFlameOnBtn() {
    this.hallOfFlameBtn.addEventListener(
      "click",
      this.toogleHallOFFlame.bind(this)
    );
  }

  private activateContactLink() {
    document.getElementById("contact")!.addEventListener("click", () => {
      this.closeRegisterSection();
      this.closeNav();
      this.footerSection.style.display = `block`;
      document
        .querySelector(".footer-container")!
        .scrollIntoView({ behavior: "smooth" });
    });
  }

  private showContactInfo() {
    document
      .querySelector(".footer-container")!
      .addEventListener("mouseover", (e: Event) => {
        // console.log(e.target);

        const iconTarget = (e.target! as HTMLElement).classList.contains(
          "contacts-icon"
        );

        if (iconTarget) {
          document.querySelectorAll(".contact-text")!.forEach((text) => {
            (text as HTMLSpanElement).style.display = `block`;
          });
        } else {
          document.querySelectorAll(".contact-text")!.forEach((text) => {
            (text as HTMLSpanElement).style.display = `none`;
          });
        }
      });
  }

  private toggleSearchBar() {
    this.btnSearch.addEventListener("click", (e: Event) => {
      e.preventDefault();

      this.searchBarEl.classList.toggle("active");
      this.searchBarEl.focus();
    });
  }
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

  private expandingImgOnbtn(numImg: number) {
    document.getElementById(`img${numImg}`)!.style.flex = `5`;
  }

  private downSizeImg(numIng: number) {
    document.getElementById(`img${numIng}`)!.style.flex = `0.5`;
  }

  private activateMainTextContent(numImg: number) {
    this.mainTextEls.forEach((text, i) => {
      (text as HTMLParagraphElement).classList.remove("active");

      if (i === numImg) {
        const targetText = document.getElementById(`main-text-${numImg}`)!;
        targetText.classList.add("active");
      }
    });
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

  private upProgression(): number {
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
  }

  private downProgression(): number {
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
    } else {
      this.expandingImgOnbtn(this.numOfImg);
    }

    // console.log(this.numOfImg);
    this.downProgressionBar(this.numOfImg);
    this.activateMainTextContent(this.numOfImg);

    return this.numOfImg;
  }

  private adjustProgressionBar() {
    this.btnNext.addEventListener("click", this.upProgression.bind(this));
    this.btnPrev.addEventListener("click", this.downProgression.bind(this));
  }
}

const cat1 = new Cat();
