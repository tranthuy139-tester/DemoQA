import * as fs from "fs";
import { parse } from "csv-parse/sync";

export function readDataFromCSV(filePath: string): Record<string, string>[] {
  if (!fs.existsSync(filePath)) {
    throw new Error(`CSV file not found: ${filePath}`);
  }

  const content = fs.readFileSync(filePath, "utf8");

  const parsedRows = parse(content, {
    columns: true, // Dòng đầu tiên là header
    skip_empty_lines: true, // Bỏ qua dòng trống
    trim: true, // Xóa khoảng trắng đầu/cuối
  }) as Array<Record<string, string | undefined>>;

  return parsedRows.map(
    (row) =>
      Object.fromEntries(
        Object.entries(row).map(([key, value]) => [key, value ?? ""]),
      ) as Record<string, string>,
  );
}
