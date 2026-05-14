# BiasAnalyzer

A full-stack web application for detecting gender bias in text, based on the research of Gaucher, Friesen & Kay (2011). The tool combines rule-based word matching with Claude AI for contextual analysis, providing quantitative scores and qualitative insights.

---

## Project Status

![Status](https://img.shields.io/badge/status-MVP%20Complete-brightgreen)
![.NET](https://img.shields.io/badge/.NET-10.0-512BD4)
![React](https://img.shields.io/badge/React-19-61DAFB)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14-336791)

### ✅ Implemented
- Gender bias detection using Gaucher et al. (2011) word list
- Masculine / Feminine scoring with percentage breakdown
- Claude AI integration for contextual analysis and reformulation suggestions
- Interactive dashboard with Pie and Bar charts
- Analysis history stored in PostgreSQL
- REST API with full CRUD support
- Clean Architecture (Core / Data / Services / API)

### 🔄 In Progress
- URL scraping — analyze job ads directly from a link
- Text highlighting — color-coded masculine/feminine words in the input

### 📋 Planned
- Corpus analysis — bulk upload and trend visualization across multiple texts
- Side-by-side comparison — original vs. AI-generated neutral version
- User authentication — personal analysis history per account
- Multilingual support — Romanian and other language word lists
- Export to PDF / CSV
- Docker support for easy deployment

---

## Architecture

```
BiasAnalyzer/
├── BiasAnalyzer.Core/        # Domain models, interfaces, enums
├── BiasAnalyzer.Data/        # EF Core DbContext, repositories, seed data
├── BiasAnalyzer.Services/    # Business logic, Gaucher matching, Claude integration
├── BiasAnalyzer.API/         # ASP.NET Core REST API, controllers
├── BiasAnalyzer.Tests/       # Unit tests
└── bias-analyzer-web/        # React 19 frontend dashboard
```

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | ASP.NET Core (.NET 10), C# |
| ORM | Entity Framework Core 10 |
| Database | PostgreSQL 14 |
| AI | Anthropic Claude 3.5 Sonnet |
| Frontend | React 19, Recharts, Axios |
| Architecture | Clean Architecture |

---

## Getting Started

### Prerequisites
- [.NET 10 SDK](https://dotnet.microsoft.com/download)
- [PostgreSQL 14+](https://www.postgresql.org/download/)
- [Node.js 18+](https://nodejs.org/)
- [Anthropic API Key](https://console.anthropic.com)

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/BiasAnalyzer.git
   cd BiasAnalyzer
   ```

2. Configure your local settings in `BiasAnalyzer.API/appsettings.Development.json`:
   ```json
   {
     "ConnectionStrings": {
       "DefaultConnection": "Host=localhost;Database=biasanalyzer;Username=YOUR_USERNAME;Password=YOUR_PASSWORD"
     },
     "Claude": {
       "ApiKey": "YOUR_ANTHROPIC_API_KEY"
     }
   }
   ```

3. Apply database migrations:
   ```bash
   dotnet ef database update --project BiasAnalyzer.Data --startup-project BiasAnalyzer.API
   ```

4. Run the API:
   ```bash
   dotnet run --project BiasAnalyzer.API
   ```
   API will be available at `http://localhost:5294`

### Frontend Setup

```bash
cd bias-analyzer-web
npm install
npm start
```

Frontend will be available at `http://localhost:3000`

---

## API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/analysis` | Analyze a text for gender bias |
| `GET` | `/api/analysis` | Retrieve all past analyses |
| `GET` | `/api/analysis/{id}` | Retrieve a specific analysis |

---

## Research Reference

> Gaucher, D., Friesen, J., & Kay, A. C. (2011). Evidence that gendered wording in job advertisements exists and sustains gender inequality. *Journal of Personality and Social Psychology*, 101(1), 109–128. https://doi.org/10.1037/a0022530

---

## License

This project is for academic and research purposes.
