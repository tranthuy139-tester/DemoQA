import { test, expect } from '@playwright/test';
import { PracticeFormPage } from '../pages/PracticeFormPage.js';
import { ThanksForSubmittingPage } from '../pages/ThanksForSubmittingPage.js';
test.describe('Practice Form Tests', () => {
    let practiceFormPage : PracticeFormPage;
    let thanksForSubmittingPage : ThanksForSubmittingPage;    
    test.beforeEach(async ({page}) => {
        practiceFormPage = new PracticeFormPage(page);
        thanksForSubmittingPage = new ThanksForSubmittingPage(page);
        await practiceFormPage.goto();
    });   
    test('Submit data successfully', async () => {
        const firstName: string = 'John';
        const lastName: string = 'Doe';
        const email: string = 'Thuy@vcb.com';
        const gender: string = 'Male';
        const mobile: string = '0123456789';
        const dateOfBirth: string = '01 January,2000';
        const subjects: string = 'Maths, Physics, Chemistry';
        const hobbies: string[] = ['Sports', 'Reading', 'Music'];
        const picture = 'THUYTRAN.jpg';
        const state: string = 'NCR';
        const city: string = 'Delhi';
        await practiceFormPage.inputData(firstName, lastName , email, gender, mobile, dateOfBirth, subjects, hobbies, picture, '', state, city);
        const actualStudentName: string = await thanksForSubmittingPage.getValueByLabel(thanksForSubmittingPage.lblValue, 'Student Name');
        const expectedStudentName: string = firstName + ' ' + lastName;
        expect(actualStudentName.trim()).toBe(expectedStudentName);
        
        const actualStudentEmail: string = await thanksForSubmittingPage.getValueByLabel(thanksForSubmittingPage.lblValue, 'Student Email');
        expect(actualStudentEmail.trim()).toBe(email);   

        const actualGender: string = await thanksForSubmittingPage.getValueByLabel(thanksForSubmittingPage.lblValue, 'Gender');
        expect(actualGender.trim()).toBe(gender);

        const actualMobile: string = await thanksForSubmittingPage.getValueByLabel(thanksForSubmittingPage.lblValue, 'Mobile');
        expect(actualMobile.trim()).toBe(mobile);   

        const actualDateOfBirth: string = await thanksForSubmittingPage.getValueByLabel(thanksForSubmittingPage.lblValue, 'Date of Birth');
        const firstSpace = dateOfBirth.indexOf(" ");
        const secondSpace = dateOfBirth.indexOf(" ", firstSpace + 1);
        const expectedDateOfBirth: string = dateOfBirth.replace(dateOfBirth[secondSpace], ","); // Remove the second space to match the format in the confirmation page

        expect(actualDateOfBirth.trim()).toBe(expectedDateOfBirth); 

        const actualSubjects: string = await thanksForSubmittingPage.getValueByLabel(thanksForSubmittingPage.lblValue, 'Subjects');
        expect(actualSubjects.trim()).toBe(subjects);

        const actualHobbies: string = await thanksForSubmittingPage.getValueByLabel(thanksForSubmittingPage.lblValue, 'Hobbies');
        const expectedHobbies: string = hobbies.join(', ');
        expect(actualHobbies.trim()).toBe(expectedHobbies); 

        const actualPicture: string = await thanksForSubmittingPage.getValueByLabel(thanksForSubmittingPage.lblValue, 'Picture');
        expect(actualPicture.trim()).toBe(picture);     

        const actualAddress: string = await thanksForSubmittingPage.getValueByLabel(thanksForSubmittingPage.lblValue, 'Address');
        expect(actualAddress.trim()).toBe(currentAddress);

    }); 
});