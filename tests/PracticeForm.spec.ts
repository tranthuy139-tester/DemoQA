import { test, expect } from '@playwright/test';
import { PracticeFormPage } from '../pages/PracticeFormPage.js';
import { ThanksForSubmittingPage } from '../pages/ThanksForSubmittingPage.js';
import { readDataFromCSV } from '../common/Utils.js';   

const filePath = 'testcase/data/PracticeForm_TC1.csv';
const testData = readDataFromCSV(filePath);

test.describe('Practice Form Tests', () => {
    let practiceFormPage: PracticeFormPage;
    let thanksForSubmittingPage: ThanksForSubmittingPage;
        test.beforeEach(async ({page}) => {
        practiceFormPage = new PracticeFormPage(page);
        thanksForSubmittingPage = new ThanksForSubmittingPage(page);
        await practiceFormPage.goTo();
        await page.evaluate(() => {
        document.body.style.zoom = '80%'; // thu nhỏ xuống 80%
        });
    });   
    for (const data of testData) {
        test(`Submit data successfully`, async ({ page }) => {
        await practiceFormPage.inputData(data.firstName??"", data.lastName??"", data.email??"", data.gender??"", data.mobile??"", data.dateOfBirth??"", data.subjects??"", data.hobbies??"", data.picture??"", data.currentAddress??"", data.state??"", data.city??"");
        const actualStudentName: string = await thanksForSubmittingPage.getValueByLabel(thanksForSubmittingPage.lblValue, 'Student Name');
        const expectedStudentName: string = data.firstName + ' ' + data.lastName;
        expect(actualStudentName.trim()).toBe(expectedStudentName);
        
        const actualStudentEmail: string = await thanksForSubmittingPage.getValueByLabel(thanksForSubmittingPage.lblValue, 'Student Email');
        expect(actualStudentEmail.trim()).toBe(data.email);   

        const actualGender: string = await thanksForSubmittingPage.getValueByLabel(thanksForSubmittingPage.lblValue, 'Gender');
        expect(actualGender.trim()).toBe(data.gender);

        const actualMobile: string = await thanksForSubmittingPage.getValueByLabel(thanksForSubmittingPage.lblValue, 'Mobile');
        expect(actualMobile.trim()).toBe(data.mobile);   

        const actualDateOfBirth: string = await thanksForSubmittingPage.getValueByLabel(thanksForSubmittingPage.lblValue, 'Date of Birth');
        let dateOfBirths = data.dateOfBirth?.split(' ') || [];
        const expectedDateOfBirth: string = dateOfBirths.length >= 3 ? `${dateOfBirths[0]} ${dateOfBirths[1]}, ${dateOfBirths[2]}` : '';

        expect(actualDateOfBirth.trim()).toBe(expectedDateOfBirth);

        const actualSubjects: string = await thanksForSubmittingPage.getValueByLabel(thanksForSubmittingPage.lblValue, 'Subjects');
        expect(actualSubjects.trim()).toBe(data.subjects);

        const actualHobbies: string = await thanksForSubmittingPage.getValueByLabel(thanksForSubmittingPage.lblValue, 'Hobbies');
        const expectedHobbies: string = data.hobbies?.split(',').map((hobby: string) => hobby.trim()).join(', ') || '';
        expect(actualHobbies.trim()).toBe(expectedHobbies); 

        const actualPicture: string = await thanksForSubmittingPage.getValueByLabel(thanksForSubmittingPage.lblValue, 'Picture');
        expect(actualPicture.trim()).toBe(data.picture);     

        const actualAddress: string = await thanksForSubmittingPage.getValueByLabel(thanksForSubmittingPage.lblValue, 'Address');
        expect(actualAddress.trim()).toBe(data.currentAddress);
        });
    }

});