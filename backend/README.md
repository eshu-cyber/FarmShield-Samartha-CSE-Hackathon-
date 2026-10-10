# FarmShield local API

The API serves the crop recommendation model, a cleaned preview of the supplied crop dataset, and a notebook-derived crop-calendar demonstration. It does not run DSSAT: the project does not include the DSSAT executable, cultivar coefficients, validated soil/weather files, or crop-specific management inputs.

## Setup

From the FarmShield project directory, create/activate a Python environment, install the backend requirements, clean the data, and train the crop model:

```powershell
.\.venv\Scripts\python.exe -m pip install -r backend\requirements.txt
.\.venv\Scripts\python.exe -m backend.train_model
.\.venv\Scripts\python.exe -m uvicorn backend.app:app --reload --host 127.0.0.1 --port 8000
```

The training command writes `backend\data\crop_recommendation_cleaned.csv`, `backend\data\cleaning_report.json`, and a model plus held-out metrics under `backend\artifacts\`. It uses a stratified 80/20 split and excludes the yield/price columns from classifier features.

Run the frontend separately from `frontend`:

```powershell
npm install
npm run dev
```

The Vite development server proxies `/api` to the local backend. Set `VITE_API_BASE_URL` only when using a different API base (copy `frontend\.env.example` to `frontend\.env.local`).

## Data and model limits

The supplied crop file has 2,200 rows and 22 crop labels. The project contains no publisher, license, collection-method, geographic-coverage, or measurement-unit metadata for it, so the underlying observations cannot be independently verified as real. The trained model is a genuine classifier fit to that supplied file, but its high held-out score only describes this dataset split and is not evidence of field accuracy.

The connected `/api/predict/calendar` endpoint applies the notebook's GDD threshold demonstration to historical daily weather from Open-Meteo. It accepts latitude, longitude, start/end dates, and optional base-temperature and maturity-GDD thresholds. Weather is historical gridded data, not a farm sensor reading or a forecast; the browser sends the coordinates and dates to the local API, which requests them from Open-Meteo.

This endpoint is not DSSAT and is not a validated crop-growth simulation. Its pesticide weather screen is an illustrative notebook heuristic, not a pesticide recommendation; no pest observations, pesticide labels, or crop-specific validation are available. The notebook does not calculate irrigation demand, so irrigation scheduling remains unavailable. The calendar also retains its separate day-count demonstration.
