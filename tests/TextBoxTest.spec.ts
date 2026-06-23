import { test, expect } from '@playwright/test';
import { TextBoxPage } from '../pages/TextBoxPage.js';

test.describe('TextBox Tests', () => {
    let textBoxPage: TextBoxPage;

    test.beforeEach(async ({ page }) => {
        textBoxPage = new TextBoxPage(page);
        await textBoxPage.goto();
    });    

        test('Email format is wrong (without "@")', async () => {
        const fullName: string = 'Thuy Tran';
        const email: string = 'thuy.tranexample.com';
        await textBoxPage.inputData(fullName, email, '', '');
        const classValue: string = await textBoxPage.getAttribute(textBoxPage.txtEmail, 'class');
        await expect(classValue).toContain('field-error');
    });

    // test('Submit successfully', async () => {
    //     const fullName: string = 'Thuy Tran';
    //     const email: string = 'thuy.tran@example.com';
    //     const currentAddress: string = '123 Main St, Anytown, USA';
    //     const permanentAddress: string = '456 Elm St, Othertown, USA';
    //     await textBoxPage.inputData(fullName, email, currentAddress, permanentAddress);
    //     const actualName: string = await textBoxPage.getTextByLocator(textBoxPage.lblName);
    //     const actualEmail: string = await textBoxPage.getTextByLocator(textBoxPage.lblEmail);
    //     const actualCurrentAddress: string = await textBoxPage.getTextByLocator(textBoxPage.lblCurrentAddress);
    //     const actualPermanentAddress: string = await textBoxPage.getTextByLocator(textBoxPage.lblPermanentAddress);
    //     await expect(actualName).toBe(fullName);
    //     await expect(actualEmail).toBe(email);
    //     await expect(actualCurrentAddress).toBe(currentAddress);
    //     await expect(actualPermanentAddress).toBe(permanentAddress);
    // });
    
    

});

