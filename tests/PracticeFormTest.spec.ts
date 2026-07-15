import { expect, test } from "@playwright/test";
import { PracticeFormPage } from "../pages/PracticeFormPage.js";
import { ThanksForSubmitPage } from "../pages/ThanksForSubmitPage.js";
import { readDataFromCSV } from "../common/Utils.js";

const testData = readDataFromCSV("testcase/data/PracticeForm_TC1.csv");

test.describe("Practice Form Test", () => {
  for (const data of testData) {
    test(`Submit data successfully`, async ({ page }) => {
      const practiceFormPage = new PracticeFormPage(page);
      const thanksForSubmitPage = new ThanksForSubmitPage(page);

      await practiceFormPage.goTo();

      await practiceFormPage.inputData(
        data.firstName ?? "",
        data.lastName ?? "",
        data.email ?? "",
        data.gender ?? "",
        data.mobile ?? "",
        data.dateOfBirth ?? "",
        data.subject ?? "",
        data.hobbies ?? "",
        data.picture ?? "",
        data.currentAddress ?? "",
        data.state ?? "",
        data.city ?? "",
      );

      expect(
        await thanksForSubmitPage.getValueByLabel(
          thanksForSubmitPage.lblValue,
          "Student Name",
        ),
      ).toBe(`${data.firstName} ${data.lastName}`);

      expect(
        await thanksForSubmitPage.getValueByLabel(
          thanksForSubmitPage.lblValue,
          "Student Email",
        ),
      ).toBe(data.email);

      expect(
        await thanksForSubmitPage.getValueByLabel(
          thanksForSubmitPage.lblValue,
          "Gender",
        ),
      ).toBe(data.gender);

      expect(
        await thanksForSubmitPage.getValueByLabel(
          thanksForSubmitPage.lblValue,
          "Mobile",
        ),
      ).toBe(data.mobile);

      const expectedDOB = data.dateOfBirth
        ? (() => {
            const [day, month, year] = data.dateOfBirth.split(" ");
            return `${day} ${month},${year}`;
          })()
        : "";

      expect(
        await thanksForSubmitPage.getValueByLabel(
          thanksForSubmitPage.lblValue,
          "Date of Birth",
        ),
      ).toBe(expectedDOB);

      expect(
        await thanksForSubmitPage.getValueByLabel(
          thanksForSubmitPage.lblValue,
          "Subjects",
        ),
      ).toBe(data.subject);

      expect(
        await thanksForSubmitPage.getValueByLabel(
          thanksForSubmitPage.lblValue,
          "Hobbies",
        ),
      ).toBe(data.hobbies);

      expect(
        await thanksForSubmitPage.getValueByLabel(
          thanksForSubmitPage.lblValue,
          "Picture",
        ),
      ).toBe(data.picture);

      expect(
        await thanksForSubmitPage.getValueByLabel(
          thanksForSubmitPage.lblValue,
          "Address",
        ),
      ).toBe(data.currentAddress);

      expect(
        await thanksForSubmitPage.getValueByLabel(
          thanksForSubmitPage.lblValue,
          "State and City",
        ),
      ).toBe(`${data.state} ${data.city}`);
    });
  }
});
