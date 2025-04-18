from PIL import Image, ImageDraw
import numpy as np

def analyze_xray(image: Image.Image):
    # Dummy logic for now
    diagnosis = "Pneumonia detected (simulated)"
    
    # Simulated heatmap (just draw a red box for now)
    draw = ImageDraw.Draw(image)
    width, height = image.size
    draw.rectangle([width//3, height//3, width//1.5, height//1.5], outline="red", width=5)
    
    return diagnosis, image
