# 🚀 FLO Playwright Automation Assignment

## 📌 Overview

This project contains an end-to-end and API automation framework built using **Playwright + TypeScript** to validate E2E scenarios and functionality of a simple energy usage application.

The application includes:

* Login page (Basic Authentication)
* Home page displaying assignment information
* Dashboard displaying energy consumption data
* Usage page for adding new consumption/usage records
* API endpoint: `/api/nmi-data`

---

## 🧰 Tech Stack

* Playwright
* TypeScript
* Node.js
* Dotenv (environment configuration)
* Basic logging utility
* Code coverage (test-level using `c8`)

---

## 🏗️ Framework Design

This project follows a **Page Object Model (POM)** and clean separation of concerns:

```id="z8l2kf"
tests/
 ├── e2e/        # UI tests
 ├── api/        # API tests

pages/           # Page Object Models
api/             # API service layer
fixtures/        # Pre/post conditions (e.g., login handling)
utils/           # Helpers (formatting, logging, auth)
types/           # Type definitions
test-data/       
```

---

## ✅ Test Coverage

> ⚠️ **Note:** The implemented test scenarios are **sample-based and focused on core user flows** to demonstrate the framework’s capabilities.

### 🔐 Authentication

* Login is handled via **API-based authentication**
* Session is established by injecting authentication state (e.g., token/session storage)
* Avoids UI login dependency for faster and more stable tests
* Includes invalid login and error handling validation

### 📊 Dashboard

* Page load validation
* Table rendering and data verification
* UI vs API data validation

### 📝 Energy Usage

* Multi-step form navigation
* Field validations
* Successful submission of usage records - E2E Validation

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

Code coverage is configured using `c8` to track **Playwright test execution coverage**.

⚠️ This does **not represent frontend or backend application coverage**, as the application is not instrumented for coverage collection.

Full application coverage would require integrating coverage tools into the application build process (e.g., Istanbul instrumentation), which is outside the scope of this assignment.

---

## 🧠 Design Decisions

* Implemented **API-based login via fixtures** to:

  * reduce execution time
  * avoid flaky UI login flows
  * enable direct navigation to protected pages

* Used **fixtures** to centralize authentication and test setup to act as Post Condition and Pre Condition steps

* Separated **API layer** for reusable backend validation

* Added **utility functions** for formatting and consistency

* Implemented **UI vs API validation** for integration testing and stronger assertions

---

## ⚠️ Assumptions & Limitations

* Post-condition handling is not yet implemented (e.g., logout, data cleanup)
* No CI/CD integration is currently configured
* No work item integration (e.g., Azure DevOps)
* Environment configuration is limited to localhost only

---

## 💯 Improvements (Future Work)

* Add CI/CD integration (GitHub Actions / Azure DevOps)
* Implement post-condition handling (e.g., logout, cleanup)
* Introduce data cleanup strategy
* Support multiple environments (dev/uat/prod)

---

## 👨‍💻 Author

Stephen Dominic Almacen
