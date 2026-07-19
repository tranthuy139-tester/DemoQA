import { test, expect } from "@playwright/test";
import { WebTablesPage } from "../pages/WebTablePage.js";
import { readDataFromCSV } from "../common/Utils.js";

const testData = readDataFromCSV("testcase/data/WebTable_TC1_6.csv");
test.describe("Web Tables Test", () => {
  for (const data of testData) {
    test(`Search user by ${data.SearchBy}`, async ({ page }) => {
      const webTablesPage = new WebTablesPage(page);

      await page.goto("/webtables");
      await webTablesPage.createNewUser(
        data.FirstName ?? "",
        data.LastName ?? "",
        parseInt(data.Age ?? "0"),
        data.Email ?? "",
        parseInt(data.Salary ?? "0"),
        data.Department ?? "",
      );
      const keyword = data.Keyword ?? "";

      await webTablesPage.search(keyword);

      let result = await webTablesPage.verifySearchResult(
        data.SearchBy ?? "",
        keyword,
      );
      await expect(result).toContain(keyword);
    });
  }
});
