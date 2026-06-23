import { test } from '@playwright/test';
import { PracticeFormPage } from '../pages/PracticeFormPage.js';
import { ThanksForSubmittingPage } from '../pages/ThanksForSubmittingPage.js';
test.describe('Practice Form Tests', () => {
    let practiceFormPage : PracticeFormPage;
    let thanksForSubmittingPage;    
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
        const dateOfBirth: string = '01 January 2000';
        const subjects: string = 'Maths';
        const hobbies: string[] = ['Sports', 'Reading'];
            const picturePath: string = 'tests/fixtures/upload.txt';
        const currentAddress: string = '123 Main St, Anytown, USA';
        const state: string = 'NCR';
        const city: string = 'Delhi';
        await practiceFormPage.inputData(firstName, lastName, email, gender, mobile, dateOfBirth, subjects, hobbies, picturePath, currentAddress, state, city);
    });
});