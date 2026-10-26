# Student Attendance Management System

## Requirements
- Node.js (LTS version recommended)
- VS Code (recommended)

## Run locally
1. Extract the ZIP file.
2. Open the `student-attendance-devops` folder in VS Code.
3. Open Terminal in VS Code.
4. Run:
   ```bash
   npm install
   npm start
   ```
5. Open `http://localhost:3000` in Chrome.

## Try the application
1. Add a few sample students with unique roll numbers.
2. Select the date and mark attendance for Periods 1 to 7.
3. Click **Save Attendance**.
4. Select a month and click **Generate Report**.
5. Click **Export CSV** to download the monthly report.
6. Stop the server with `Ctrl + C`, start it again using `npm start`, and confirm records remain saved.

## Data storage
The application creates `attendance-data.json` in the project folder. Keep this file if you want to retain the records. This is a beginner-friendly local demo; if your instructor requires a database, replace JSON-file storage with SQLite or MySQL.

## DevOps extension plan
- Git/GitHub: track source code and commits.
- Docker: containerize the app.
- Jenkins: run a build/validation pipeline.
- Selenium: automate browser test cases.
- Kubernetes: deploy the Docker image (requires a working cluster).
