# 🚀 FLO Playwright Automation Assignment

## 📌 Overview

This project contains an end-to-end and API automation framework built using **Playwright + TypeScript** to validate a simple energy usage application.

The application includes:

* 🔐 Login page (Basic Authentication)
* 📊 Dashboard displaying energy consumption data
* 📝 Multi-step form for entering energy usage
* 🔌 API endpoint: `/api/nmi-data`

---

## 🧰 Tech Stack

* Playwright
* TypeScript
* Node.js
* Dotenv (environment configuration)

---

## 🏗️ Framework Design

This project follows a **Page Object Model (POM)** and clean separation of concerns:

```
tests/
 ├── e2e/        # UI tests
 ├── api/        # API tests

pages/           # Page Object Models
api/             # API service layer
fixtures/        # Pre/post conditions (e.g., login handling)
utils/           # Helpers (formatting, logging, auth)
types/           # Type definitions
test-data/       # Static/mock data
```

---

## ✅ Test Coverage

### 🔐 Authentication

* Valid login
* Invalid login
* Error message validation

### 📊 Dashboard

* Page load validation
* Table rendering
* UI vs API data validation

### 📝 Energy Usage

* Multi-step form navigation
* Field validations
* Successful submission

### 🔌 API Testing

* `GET /api/nmi-data`
* `POST /api/usage`
* Response validation

---

## ⚙️ Setup Instructions

### 1. Install dependencies

```bash
npm install
```

### 2. Install Playwright browsers

```bash
npx playwright install
```

---

## 🔑 Environment Setup

Create a `.env` file in the root:

```bash
BASE_URL=http://localhost:3000
```

---

## ▶️ Running Tests

### Run all tests

```bash
npm test
```

### Run UI mode (debug)

```bash
npm run test:ui
```

### Run with browser visible

```bash
npm run test:headed
```

### Run specific test groups

```bash
npm run test:e2e
npm run test:api
```

---

## 📊 Reports

After running tests:

```bash
npm run report
```

This will open the Playwright HTML report.

---

## 📈 Code Coverage (Bonus)

Basic coverage reporting is configured using `c8`.
Note: Full frontend coverage requires application instrumentation.

---

## 🧠 Design Decisions

* Used **fixtures** to handle authentication centrally (avoids repeated login steps)
* Separated **API layer** for reusable backend validation
* Added **utility functions** for formatting and consistency
* Implemented **UI vs API validation** for stronger assertions

---

## ⚠️ Assumptions & Limitations

* Test credentials are hardcoded as per assignment instructions
* No data cleanup for created records (test data persists)
* Coverage is limited to test execution (not full app instrumentation)
* Authentication handling is simplified and app-specific

---

## 💯 Improvements (Future Work)

* Add CI/CD integration (GitHub Actions / Azure DevOps)
* Implement full frontend code coverage
* Add data cleanup strategy
* Introduce parallel environment configs (dev/uat/prod)

---

## 👨‍💻 Author

Stephen Dominic Almacen
