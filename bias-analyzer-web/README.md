# BiasAnalyzer

> A web application for detecting gender bias in text, based on the research by Gaucher et al. (2011).

## Overview

**BiasAnalyzer** analyzes text and identifies masculine/feminine coded language using the word list from **Gaucher, Friesen & Kay (2011)** combined with contextual analysis powered by Claude AI.

The app can be used to evaluate job descriptions, academic texts, or any content where gendered language may influence reader perception — particularly in the context of gender diversity and inclusion.

---

## Tech Stack

| Layer     | Technology                              |
|-----------|-----------------------------------------|
| Backend   | ASP.NET Core (.NET 10), EF Core         |
| Database  | PostgreSQL                              |
| Frontend  | React 19, Recharts                      |
| AI        | Anthropic Claude 3.5 Sonnet             |

---

## Features

- Automatic detection of masculine/feminine coded words from the Gaucher et al. taxonomy
- Contextual AI analysis via Claude 3.5 Sonnet
- Visual breakdown of bias distribution using Recharts
- REST API

---

## Running Locally

### Prerequisites

- [.NET 10 SDK](https://dotnet.microsoft.com/download)
- [PostgreSQL](https://www.postgresql.org/download/)
- [Node.js](https://nodejs.org/) (v20+)
- Anthropic API key — get one at [console.anthropic.com](https://console.anthropic.com)

---

### Backend

1. Clone the repository:
   ```bash
   git clone https://github.com/<your-username>/BiasAnalyzer.git
   cd BiasAnalyzer
   ```

2. Copy the config file and fill in your credentials:
   ```bash
   cp BiasAnalyzer.API/appsettings.Development.json.example BiasAnalyzer.API/appsettings.Development.json
   ```

   Edit `appsettings.Development.json`:
   ```json
   {
     "ConnectionStrings": {
       "DefaultConnection": "Host=localhost;Database=biasanalyzer;Username=<your_user>;Password=<your_password>"
     },
     "Anthropic": {
       "ApiKey": "<your_api_key>"
     }
   }
   ```

3. Apply database migrations:
   ```bash
   dotnet ef database update --project BiasAnalyzer.Data --startup-project BiasAnalyzer.API
   ```

4. Run the API:
   ```bash
   cd BiasAnalyzer.API
   dotnet run
   ```

   The API will be available at `https://localhost:5001`.

---

### Frontend

1. Navigate to the frontend directory:
   ```bash
   cd BiasAnalyzer.Client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the dev server:
   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173`.

---

## Project Structure

```
BiasAnalyzer/
├── BiasAnalyzer.API/         # ASP.NET Core Web API
├── BiasAnalyzer.Data/        # EF Core DbContext & migrations
├── BiasAnalyzer.Core/        # Domain models & business logic
├── BiasAnalyzer.Client/      # React frontend
└── README.md
```

---

## Research Background

This project implements the gender-bias word list from:

> Gaucher, D., Friesen, J., & Kay, A. C. (2011). *Evidence That Gendered Wording in Job Advertisements Exists and Sustains Gender Inequality.* Journal of Personality and Social Psychology, 101(1), 109–128.

The study identified specific words that are perceived as masculine or feminine coded and shown to affect application rates among job seekers. BiasAnalyzer extends this static word list with Claude AI to account for context and phrasing nuance.

---