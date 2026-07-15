import { test, expect } from '@playwright/test';
import { TextBoxPage } from '../pages/TextBoxPage.js';
test.describe('TextBox Tests', () => {
let textBoxPage:TextBoxPage;

test.beforeEach(async ({ page }) => {
    textBoxPage = new TextBoxPage(page);
    await textBoxPage.goTo();
}); 

//TC01: Verify that the user can submit the form successfully with valid data
test('Submit Successfully', async () => {
  const fullName: string = 'Thu Hà';
  const email: string = 'thuha@gmail.com';
  const currentAddress: string = '123 Main St';
  const permanentAddress: string = '456 Elm St';
    await textBoxPage.inputData(fullName, email, currentAddress, permanentAddress);
    const actualNameText: string = await textBoxPage.getTextByLocator(textBoxPage.lbName);
    const actualEmailText: string = await textBoxPage.getTextByLocator(textBoxPage.lbEmail);
    const actualCurrentAddressText: string = await textBoxPage.getTextByLocator(textBoxPage.lbCurrentAddress);
    const actualPermanentAddressText: string = await textBoxPage.getTextByLocator(textBoxPage.lbPermanentAddress);
    await expect(actualNameText).toBe(fullName);
    await expect(actualEmailText).toBe(email);
    await expect(actualCurrentAddressText).toBe(currentAddress);
    await expect(actualPermanentAddressText).toBe(permanentAddress);
    
  });

//TC02: Verify that the user cannot submit the form with an invalid email format (without "@")  
test('Email format is wrong (without "@")', async () => {
  const fullName: string = 'Thu Hà';
  const email: string = 'thuhagamil.com';
  const currentAddress: string = '123 Main St';
  const permanentAddress: string = '456 Elm St';
    await textBoxPage.inputData(fullName, email, currentAddress, permanentAddress);
    const classAttribute: string = await textBoxPage.getAttributeByLocator(textBoxPage.txtEmail, "class");
    await expect(classAttribute).toContain('field-error'); // Red color indicates error
  });

//TC03: Verify that the user cannot submit the form with an invalid email format (without domain name)
test('Email format is wrong (without domain name)', async () => {
  const fullName: string = 'Thu Hà';
  const email: string = 'thuha@';
  const currentAddress: string = '123 Main St';
  const permanentAddress: string = '456 Elm St';
    await textBoxPage.inputData(fullName, email, currentAddress, permanentAddress);
    const classAttribute: string = await textBoxPage.getAttributeByLocator(textBoxPage.txtEmail, "class");
    await expect(classAttribute).toContain('field-error'); // Red color indicates error
  });


});

