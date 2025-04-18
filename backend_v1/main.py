from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from models.ocr import extract_text
from models.nlp_model import summarize_text
from models.image_model import analyze_xray
from utils.helpers import convert_image_to_base64
import tempfile
from PIL import Image
import io
from typing import List

app = FastAPI()

# CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/upload/medical-report")
async def upload_medical_report(files: List[UploadFile] = File(...)):
    results = []

    for file in files:
        content = await file.read()

        with tempfile.NamedTemporaryFile(delete=False, suffix=file.filename) as tmp:
            tmp.write(content)
            temp_path = tmp.name

        if file.content_type.endswith("pdf") or file.content_type.startswith("text"):
            extracted = extract_text(temp_path)
            summary = summarize_text(extracted)

            results.append({
                "filename": file.filename,
                "text_summary": summary,
                "diagnosis": "Text report analyzed.",
                "image_heatmap": None
            })

    if not results:
        return {"error": "No valid medical reports."}

    return {
        "report_type": "medical_report",
        "reports": results
    }

@app.post("/upload/test-report")
async def upload_test_report(files: List[UploadFile] = File(...)):
    results = []

    for file in files:
        content = await file.read()

        with tempfile.NamedTemporaryFile(delete=False, suffix=file.filename) as tmp:
            tmp.write(content)
            temp_path = tmp.name

        if file.content_type.endswith("pdf"):
            extracted = extract_text(temp_path)
            summary = summarize_text(extracted)

            results.append({
                "filename": file.filename,
                "text_summary": summary,
                "diagnosis": "Test report processed.",
                "image_heatmap": None
            })

    if not results:
        return {"error": "No valid test reports."}

    return {
        "report_type": "test_report",
        "reports": results
    }

@app.post("/upload/image")
async def upload_image(files: List[UploadFile] = File(...)):
    results = []

    for file in files:
        content = await file.read()

        try:
            image = Image.open(io.BytesIO(content)).convert("RGB")
            diagnosis, heatmap = analyze_xray(image)

            results.append({
                "filename": file.filename,
                "text_summary": "N/A (image)",
                "diagnosis": diagnosis,
                "image_heatmap": convert_image_to_base64(heatmap)
            })
        except Exception:
            continue

    if not results:
        return {"error": "No valid images processed."}

    return {
        "report_type": "image_scan",
        "reports": results
    }
