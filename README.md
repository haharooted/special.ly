# Special.ly
<div align="center">
  <a href="https://github.com/k3ring/special.ly/">
    <img src="https://github.com/haharooted/special.ly/assets/23297071/33e8a45f-fb94-4532-ae0d-e981e31f0966" alt="1">
  </a>
</div>

Special.ly is an app for connecting local special shops such as butchers, fishmongers with shoppers looking to buy local. 

<div align="center">
  <a href="https://github.com/k3ring/special.ly/">
    <img src="https://github.com/haharooted/special.ly/assets/23297071/cc99d85c-404e-4648-98ad-6be16ca18c31" alt="2">
  </a>
</div>

To run:

- git clone git@github.com:haharooted/specially.git

- cd specially

- npm install 

- npm run start

- Scan the QR code in Expo Go



## Backend
To run the backend you need a working ubuntu 22.04 environment - the app by default opens demodata from flat .json files. It's the suggested way to run it for PoC purposes.

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
