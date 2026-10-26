const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, "attendance-data.json");

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

function readData() {
  if (!fs.existsSync(DATA_FILE)) {
    return { students: [], attendance: {} };
  }
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
  } catch {
    return { students: [], attendance: {} };
  }
}

function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

app.get("/api/data", (req, res) => {
  res.json(readData());
});

app.post("/api/students", (req, res) => {
  const roll = String(req.body.roll || "").trim();
  const name = String(req.body.name || "").trim();
  const department = String(req.body.department || "").trim();

  if (!roll || !name || !department) {
    return res.status(400).json({ error: "Enter roll number, name, and department." });
  }

  const data = readData();
  if (data.students.some(s => s.roll.toLowerCase() === roll.toLowerCase())) {
    return res.status(409).json({ error: "That roll number already exists." });
  }

  data.students.push({ roll, name, department });
  writeData(data);
  res.status(201).json({ message: "Student added.", students: data.students });
});

app.post("/api/attendance", (req, res) => {
  const { date, records } = req.body;
  if (!date || !Array.isArray(records)) {
    return res.status(400).json({ error: "A date and attendance records are required." });
  }

  const data = readData();
  const validRolls = new Set(data.students.map(s => s.roll));
  const cleaned = {};

  for (const record of records) {
    if (!validRolls.has(record.roll)) continue;
    if (!Array.isArray(record.periods) || record.periods.length !== 7) continue;
    if (!record.periods.every(v => v === "Present" || v === "Absent")) continue;
    cleaned[record.roll] = record.periods;
  }

  data.attendance[date] = cleaned;
  writeData(data);
  res.json({ message: "Attendance saved successfully." });
});

app.get("/api/monthly", (req, res) => {
  const month = String(req.query.month || "");
  if (!/^\d{4}-\d{2}$/.test(month)) {
    return res.status(400).json({ error: "Select a month." });
  }

  const data = readData();
  const dates = Object.keys(data.attendance).filter(d => d.startsWith(month)).sort();
  const report = data.students.map(student => {
    let attended = 0;
    let absent = 0;
    let working = 0;

    for (const date of dates) {
      const periods = data.attendance[date][student.roll];
      if (!periods) continue;
      for (const status of periods) {
        if (status === "Present" || status === "Absent") {
          working++;
          if (status === "Present") attended++;
          else absent++;
        }
      }
    }

    return {
      roll: student.roll,
      name: student.name,
      department: student.department,
      attended,
      absent,
      working,
      percentage: working ? Number((attended / working * 100).toFixed(2)) : 0
    };
  });

  res.json({ month, report });
});

app.listen(PORT, () => {
  console.log(`Attendance app running at http://localhost:${PORT}`);
});
