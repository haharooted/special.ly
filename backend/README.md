# Backend


### API / Database
1.  MongoDB startes via. docker med de givede indstillinger og passwords etc.
2.  Fetcher startes derefter for at ingeste

### Fetcher

1. Fetcher sættes op til at køre som CRON job hvert 30 minut på en Ubuntu 22.04 maskine (her benyttes en Microsoft Azure virtuel maskine)
 * cd backend/fetcher
 * pip install .
2. Python API startes med:
 * cd backend/api
 * python3 app.py (start den i en screen for at persistere ved luk af terminal)

