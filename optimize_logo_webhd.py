
from PIL import Image
import os

input_path = "TheRxSpot_Logo.png"
output_path = "images/processed/TheRxSpot_Logo_WebHD.png"

try:
    with Image.open(input_path) as img:
        print(f"Original size: {img.size}")
        
        # Resize to 2000px width (High Definition but lighter than 5MB)
        width = 2000
        ratio = width / float(img.size[0])
        height = int(float(img.size[1]) * float(ratio))
        
        # Use High Quality Downsampling
        img_resized = img.resize((width, height), Image.Resampling.LANCZOS)
        print(f"New size: {img_resized.size}")
        
        # Save as PNG
        img_resized.save(output_path, "PNG", optimize=True)
        
        original_size = os.path.getsize(input_path)
        new_size = os.path.getsize(output_path)
        
        print(f"Original file size: {original_size} bytes")
        print(f"New file size: {new_size} bytes")
        print(f"Reduction: {100 - (new_size/original_size)*100:.2f}%")

except Exception as e:
    print(f"Error: {e}")
