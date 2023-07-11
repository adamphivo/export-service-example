import express from "express";
import * as xlsx from "xlsx";

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/status", (req, res) => {
    res.json({
        status: "OK"
    })
});

app.get("/export", (req, res) => {
  const data = [
    ["Name", "Age", "Email"],
    ["John Doe", 32, "john@example.com"],
    ["Jane Smith", 25, "jane@example.com"],
  ];

  const workbook = xlsx.utils.book_new();
  const worksheet = xlsx.utils.aoa_to_sheet(data);
  xlsx.utils.book_append_sheet(workbook, worksheet, "Sheet 1");

  const buffer = xlsx.write(workbook, { type: "buffer", bookType: "xlsx" });

  res.set({
    "Content-Type":
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "Content-Disposition": 'attachment; filename="export.xlsx"',
  });

  res.send(buffer);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
