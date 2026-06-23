import type { Page, Locator } from "@playwright/test";
export class PracticeFormPage {
    readonly txtFirstName : Locator;
    readonly txtLastName : Locator;
    readonly txtEmail : Locator; 
    rdGender: string = 'xpath=//*[text()="@param"]';
    readonly txtMobile : Locator;
    readonly txtDateOfBirth : Locator;
    readonly txtSubjects : Locator;
    chkHobbies : string  = 'xpath=//label[text()="@param"]';
    readonly txtPicture : Locator;
    readonly btnChooseFile : Locator;
    readonly txtCurrentAddress : Locator;
    readonly cbxState : Locator ;
    readonly cbxCity : Locator;
    readonly btnSubmit : Locator;
    constructor(public readonly page: Page) {
        this.txtFirstName = page.locator("#firstName");
        this.txtLastName = page.locator("#lastName");
        this.txtEmail = page.locator("#userEmail");
        this.txtMobile = page.locator("#userNumber");
        this.txtDateOfBirth = page.locator("#dateOfBirthInput");
        this.txtSubjects = page.locator("#subjectsInput");
        this.txtPicture = page.locator("#uploadPicture");
        this.btnChooseFile = page.locator("button#uploadButton");
        this.txtCurrentAddress = page.locator("#currentAddress");
        this.cbxState = page.locator('xpath=//*[@id="state"]//input');
        this.cbxCity = page.locator('xpath=//*[@id="city"]//input');
        this.btnSubmit = page.locator("#submit");
    }
    async goto() {
        await this.page.goto("/automation-practice-form");
    }   
    async inputData(firstName: string, lastName: string, email: string, gender: string, mobile: string, dateOfBirth: string, subjects: string, hobbies: string[], picture: string, currentAddress: string = '', state: string, city: string) {
        await this.txtFirstName.fill(firstName);
        await this.txtLastName.fill(lastName);
        await this.txtEmail.fill(email);
        await this.page.click(this.rdGender.replace('@param', gender));
        await this.txtMobile.fill(mobile);
        await this.inputDateOfBirth(dateOfBirth);   
        await this.inputSubjects(subjects);
        await this.inputHobbies(hobbies);
        const picturePath = process.cwd() + '\\testcase\\data\\' + picture;
        await this.txtPicture.setInputFiles(picturePath);
        await this.txtCurrentAddress.fill(currentAddress);
        await this.cbxState.fill(state);
        await this.cbxCity.fill(city);
        await this.btnSubmit.click();
    }
    async submit() {
        await this.btnSubmit.click();
    }   
    async getLocatorByText(originalXpath: string, text: string) : Promise<Locator> {
        const newXpath = originalXpath.replace('@param', text);
        return this.page.locator(newXpath);
    }
    async inputDateOfBirth(dateOfBirth: string) {
        let dateOfBirths = dateOfBirth.split(' ');
        const day = dateOfBirths[0];
        const month = dateOfBirths[1];
        const year  = dateOfBirths[2];  
        if (!day || !month || !year) {
            throw new Error(`Invalid dateOfBirth value: ${dateOfBirth}`);
        }
        await this.txtDateOfBirth.click();
        await this.page.locator('.react-datepicker__year-select').selectOption(year);
        await this.page.locator('.react-datepicker__month-select').selectOption(month);
        await this.page.locator(`.react-datepicker__day--0${day}`).click();
    }
    async inputSubjects(subjects: string) {
        const subjectList = subjects.split(',').map(subject => subject.trim());
        for (const subject of subjectList) {
            await this.txtSubjects.fill(subject);
            await this.txtSubjects.press('Enter');
        }
    }
    async inputHobbies(hobbies: string[]) { 
        const hobbyList = hobbies.map(hobby => hobby.trim());
        for (const hobby of hobbyList) {
            await this.page.click(this.chkHobbies.replace('@param', hobby));
        }
    }
}
