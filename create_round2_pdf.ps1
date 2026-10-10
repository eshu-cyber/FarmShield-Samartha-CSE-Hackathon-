$OutputPath = Join-Path $PSScriptRoot "FarmShield_Round_2_Evaluation.pdf"

$pages = @(
@(
"FarmShield - Round 2 Evaluation",
"Solution Architecture & Technical Strategy",
"",
"Project completion",
"- Approximately 60-65% production-ready, or 75-80% demonstrable MVP.",
"- Core crop-recommendation workflow is implemented end to end.",
"- Calendar, market, storage, and IoT areas are clearly labelled prototypes/demos.",
"",
"1. Architecture",
"React + TypeScript frontend -> FastAPI backend -> ML model + cleaned dataset",
"- Frontend: React 19, TypeScript, Vite dashboard.",
"- Backend: Python FastAPI REST API with validated inputs.",
"- Data/ML: CSV dataset, cleaning pipeline, persisted joblib model.",
"- APIs: health, metrics, data summary/preview, and crop prediction.",
"",
"2. Technical Feasibility",
"- Farmers provide N, P, K, temperature, humidity, pH, and rainfall.",
"- The API validates input ranges and returns five ranked crop recommendations.",
"- The trained model is saved and reloadable; it is not retrained per request.",
"- Cleaning removes invalid/duplicate records and excludes yield/price leakage.",
"- The dashboard connects directly to the live local prediction API."
),
@(
"3. Technology Choice",
"",
"Component                 Technology                 Purpose",
"Frontend                  React + TypeScript + Vite  Responsive, typed dashboard",
"Backend                   FastAPI                    Fast API and input validation",
"ML/Data                   Python, pandas, sklearn    Tabular data processing/modeling",
"Model storage             joblib                     Persist/load sklearn pipeline",
"AI algorithm              Random Forest Classifier   Nonlinear tabular classification",
"",
"4. Data / AI / Algorithm Suitability",
"",
"Deployed model: RandomForestClassifier (300 decision trees)",
"Problem: Multi-class crop recommendation",
"Dataset: 2,200 records; 22 crop categories; 7 input features",
"Features: N, P, K, temperature, humidity, pH, rainfall",
"Training/testing: Stratified 80/20 holdout split (random_state=42)",
"Training records: 1,760     Test records: 440",
"",
"Evaluation metrics",
"Accuracy:          99.32%",
"Macro Precision:   99.35%",
"Macro Recall:      99.32%",
"Macro F1-score:    99.32%",
"R2 score:          Not applicable - this is classification, not regression.",
"",
"Important: This performance is on a held-out split of the supplied dataset.",
"It is not evidence of field accuracy; external field validation is still needed."
),
@(
"5. Implementation Scope",
"",
"Completed",
"- Crop recommendation ML pipeline, data cleaning, validation, and model artifact.",
"- FastAPI prediction API and frontend-to-backend integration.",
"- Top-five crop recommendations with model probability scores.",
"- Dataset transparency/metrics endpoints and dashboard support.",
"- Crop calendar UI, harvest/storage calculator, and provider management UI.",
"- Local browser persistence for the demonstration workflow.",
"",
"Prototype / demo only",
"- Crop calendar uses rule-based day counts; DSSAT is not connected.",
"- Market prices/history, storage listings, and IoT readings are sample data.",
"- No live weather, verified inventory, real booking, payments, or live GPS.",
"- No production authentication, cloud database, or user-management workflow.",
"",
"Notebook status",
"- Cropcalendar.ipynb demonstrates GDD/rule logic and historical-weather experiments.",
"- It is not integrated as a validated production crop-calendar model.",
"- Befirecropmodel.ipynb contains an earlier suitability-model experiment; the",
"  deployed application model is the RandomForestClassifier in backend/train_model.py."
),
@(
"6. Risks and Contingencies",
"",
"Risk: Dataset provenance is undocumented.",
"Mitigation: use government/university data; record geography, season, source, and units.",
"",
"Risk: Very high offline score may not generalize.",
"Mitigation: cross-validation plus independent regional and field test sets.",
"",
"Risk: No real-time weather or validated crop simulation.",
"Mitigation: integrate trusted weather data; add DSSAT only with validated soil,",
"cultivar, weather, and farm-management inputs.",
"",
"Risk: Market, storage, and IoT information is simulated.",
"Mitigation: integrate verified mandi data, warehouse partners, and sensor ingestion.",
"",
"Risk: No production security/data layer.",
"Mitigation: add authentication, PostgreSQL, encrypted secrets, backups, and audit logs.",
"",
"Presentation conclusion",
"FarmShield has completed its core AI-enabled crop-recommendation MVP. The next",
"phase is verified data integration, external/field validation, live services,",
"and production security before making farm-critical recommendations."
)
)

function Escape-PdfText([string]$Text) {
    return $Text.Replace("\\", "\\\\").Replace("(", "\\(").Replace(")", "\\)")
}

$objects = [System.Collections.Generic.List[string]]::new()
$objects.Add("<< /Type /Catalog /Pages 2 0 R >>")
$kids = (3..(2 + $pages.Count * 2) | Where-Object { ($_ - 3) % 2 -eq 0 } | ForEach-Object { "$_ 0 R" }) -join " "
$objects.Add("<< /Type /Pages /Kids [ $kids ] /Count $($pages.Count) >>")

for ($p = 0; $p -lt $pages.Count; $p++) {
    $pageObj = 3 + ($p * 2)
    $contentObj = $pageObj + 1
    $objects.Add("<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> /F2 << /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >> >> >> /Contents $contentObj 0 R >>")
    $content = [System.Text.StringBuilder]::new()
    [void]$content.Append("BT`n")
    $y = 744
    foreach ($line in $pages[$p]) {
        $font = if ($line -match "^(FarmShield|Solution Architecture|[1-6]\. |Project completion|Completed$|Prototype / demo only|Notebook status|Evaluation metrics|Presentation conclusion|Deployed model|Risk:)") { "/F2 12 Tf" } else { "/F1 10 Tf" }
        [void]$content.Append("$font 1 0 0 1 48 $y Tm (" + (Escape-PdfText $line) + ") Tj`n")
        $y -= 18
    }
    [void]$content.Append("ET")
    $stream = $content.ToString()
    $objects.Add("<< /Length $([System.Text.Encoding]::ASCII.GetByteCount($stream)) >>`nstream`n$stream`nendstream")
}

$builder = [System.Text.StringBuilder]::new()
[void]$builder.Append("%PDF-1.4`n")
$offsets = [System.Collections.Generic.List[int]]::new()
$offsets.Add(0)
for ($i = 0; $i -lt $objects.Count; $i++) {
    $offsets.Add([System.Text.Encoding]::ASCII.GetByteCount($builder.ToString()))
    [void]$builder.Append("$($i + 1) 0 obj`n$($objects[$i])`nendobj`n")
}
$xref = [System.Text.Encoding]::ASCII.GetByteCount($builder.ToString())
[void]$builder.Append("xref`n0 $($objects.Count + 1)`n0000000000 65535 f `n")
for ($i = 1; $i -lt $offsets.Count; $i++) { [void]$builder.Append(('{0:D10} 00000 n ' -f $offsets[$i]) + "`n") }
[void]$builder.Append("trailer`n<< /Size $($objects.Count + 1) /Root 1 0 R >>`nstartxref`n$xref`n%%EOF")
[System.IO.File]::WriteAllText($OutputPath, $builder.ToString(), [System.Text.Encoding]::ASCII)
Write-Output "Created: $OutputPath"
