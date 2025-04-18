from PIL import Image, UnidentifiedImageError
import pytesseract
import fitz  # PyMuPDF

def extract_text(file_path):
    try:
        # First, try opening as PDF
        try:
            doc = fitz.open(file_path)
            if doc.page_count > 0:
                print("[OCR] PDF detected. Extracting text...")
                return " ".join([page.get_text() for page in doc])
        except Exception as pdf_error:
            print("[OCR] Not a PDF or failed to open as PDF:", pdf_error)

        # If not a PDF, try image
        print("[OCR] Trying as image...")
        image = Image.open(file_path)
        return pytesseract.image_to_string(image)

    except UnidentifiedImageError:
        print("[OCR ERROR] Unrecognized file format")
        return "Unrecognized file format."
    except Exception as e:
        print("[OCR ERROR]", e)
        return "OCR failed due to internal error."
