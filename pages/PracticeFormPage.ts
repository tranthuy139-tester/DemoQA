import type { Page, Locator } from "@playwright/test";
export class PracticeFormPage {
  readonly txtFirstName: Locator;
  readonly txtlastName: Locator;
  readonly txtEmail: Locator;
  rdGenderAndHobies: string = 'xpath=//label[normalize-space()="@param"]';
  readonly txtMobile: Locator;
  readonly txtDateOfBirth: Locator;
  readonly ddlYear: Locator;
  readonly ddlMonth: Locator;
  //lblDate: string = 'xpath=//*[@role="rowgroup"]/div[1]/div[text()="@param"]'; //trường hợp lấy các ngày trong row 1
  lblDate: string = 'xpath=//div[text()="@param"]';
  readonly cbSubject: Locator;
  // chkHobbies: string = 'xpath=//label[text()="@param"]';
  readonly txtPicture: Locator;
  readonly txtCurrentAddress: Locator;
  readonly cbState: Locator;
  readonly cbCity: Locator;
  readonly btnSubmit: Locator;
  constructor(public readonly page: Page) {
    this.txtFirstName = page.locator("#firstName");
    this.txtlastName = page.locator("#lastName");
    this.txtEmail = page.locator("#userEmail");
    this.txtMobile = page.locator("#userNumber");
    this.txtDateOfBirth = page.locator("#dateOfBirthInput");
    this.ddlYear = page.locator(".react-datepicker__year-select");
    this.ddlMonth = page.locator(".react-datepicker__month-select");
    this.cbSubject = page.locator("#subjectsInput");
    this.txtPicture = page.locator("#uploadPicture");
    this.txtCurrentAddress = page.locator("#currentAddress");
    this.cbState = page.locator('xpath=//*[@id="state"]//input');
    this.cbCity = page.locator('xpath=//*[@id="city"]//input');
    this.btnSubmit = page.locator("#submit");
  }
  async goTo() {
    await this.page.goto("/automation-practice-form");
  }
  async inputData(
    firstName: string,
    lastName: string,
    email: string,
    gender: string,
    mobile: string,
    dateOfBirth: string,
    subject: string,
    hobbies: string,
    picture: string,
    currentAddress: string,
    state: string,
    city: string,
  ) {
    await this.txtFirstName.fill(firstName);
    await this.txtlastName.fill(lastName);
    await this.txtEmail.fill(email);
    await this.page.click(this.rdGenderAndHobies.replace("@param", gender));
    await this.txtMobile.fill(mobile);
    await this.inputDateOfBirth(dateOfBirth);
    await this.inputSubject(subject);
    await this.inputHobbies(hobbies);
    const picturePath = process.cwd() + "/testcase/data/" + picture;
    await this.txtPicture.setInputFiles(picturePath);
    await this.txtCurrentAddress.fill(currentAddress);
    await this.cbState.fill(state);
    await this.cbState.press("Enter");
    await this.cbCity.fill(city);
    await this.cbCity.press("Enter");
    await this.btnSubmit.click();
  }

  async inputDateOfBirth(dateOfBirth: string) {
    let dateOfBirths = dateOfBirth.split(" ");
    const day: string = dateOfBirths[0] || "";
    const month: string = dateOfBirths[1] || "";
    const year: string = dateOfBirths[2] || "";
    await this.txtDateOfBirth.click();
    await this.ddlYear.selectOption(year);
    await this.ddlMonth.selectOption(month);
    await this.page.click(this.lblDate.replace("@param", day));
  }
  async inputSubject(subject: string) {
    subject = subject.replace(/"/g, ""); //remove dấu " ở đầu và cuối chuỗi
    const subjects = subject.split(",").map((s) => s.trim());
    for (const sub of subjects) {
      await this.cbSubject.fill(sub);
      await this.cbSubject.press("Enter");
      await this.page.waitForTimeout(1000); // Wait for 1 second to allow the subject to be added
    }
  }
  async inputHobbies(hobbies: string) {
    hobbies = hobbies.replace(/"/g, ""); //remove dấu " ở đầu và cuối chuỗi
    const hobbiesList = hobbies.split(",").map((h) => h.trim());
    console.log("Hobbies:", hobbiesList);
    for (const hobby of hobbiesList) {
      console.log("Click hobby:", hobby);
      await this.page.click(this.rdGenderAndHobies.replace("@param", hobby));
    }
  }
}
