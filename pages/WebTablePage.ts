import { expect, type Locator, type Page } from "@playwright/test";

export class WebTablesPage {
  readonly page: Page;
  readonly txtSearch: Locator;
  searchResultXpath: string = "xpath=//tbody/tr/td[@param]";
  readonly btnAdd: Locator;
  readonly txtFirstName: Locator;
  readonly txtLastName: Locator;
  readonly txtAge: Locator;
  readonly txtEmail: Locator;
  readonly txtSalary: Locator;
  readonly txtDepartment: Locator;
  readonly btnSubmit: Locator;

  constructor(page: Page) {
    this.page = page;
    this.txtSearch = page.locator("#searchBox");
    this.btnAdd = page.locator("#addNewRecordButton");
    this.txtFirstName = page.locator("#firstName");
    this.txtLastName = page.locator("#lastName");
    this.txtAge = page.locator("#age");
    this.txtEmail = page.locator("#email");
    this.txtSalary = page.locator("#salary");
    this.txtDepartment = page.locator("#department");
    this.btnSubmit = page.locator("#submit");
  }

  async search(keyword: string) {
    await this.txtSearch.fill(keyword);
    await this.txtSearch.press("Enter");
  }

  async verifySearchResult(keyword: string, searchBy: string): Promise<string> {
    let result = "";
    switch (searchBy) {
      case "FirstName":
        result = await this.getSearchResult(1, keyword);
        break;
      case "LastName":
        result = await this.getSearchResult(2, keyword);
        break;
      case "Age":
        result = await this.getSearchResult(3, keyword);
        break;
      case "Email":
        result = await this.getSearchResult(4, keyword);
        break;
      case "Salary":
        result = await this.getSearchResult(5, keyword);
        break;
      case "Department":
        result = await this.getSearchResult(6, keyword);
        break;
    }
    return result;
  }
  async getSearchResult(columnIndex: number, keyword: string): Promise<string> {
    const searchResultLocator = this.searchResultXpath.replace(
      "@param",
      columnIndex.toString(),
    );
    const text: string =
      (await this.page.locator(searchResultLocator).textContent()) ?? "";
    return text;
  }
  async createNewUser(
    firstName: string,
    lastName: string,
    age: number,
    email: string,
    salary: number,
    department: string,
  ) {
    await this.btnAdd.click();
    await this.txtFirstName.fill(firstName);
    await this.txtLastName.fill(lastName);
    await this.txtAge.fill(age.toString());
    await this.txtEmail.fill(email);
    await this.txtSalary.fill(salary.toString());
    await this.txtDepartment.fill(department);
    await this.page.locator("#submit").click();
  }
}
