
from PIL import Image
import os

input_path = "images/processed/TheRxSpot_Logo.png"
output_path = "images/processed/TheRxSpot_Logo_v2.png"

try:
    with Image.open(input_path) as img:
        print(f"Original size: {img.size}")
        
        # Calculate new size (1200px width - high quality for retina)
        width = 1200
        ratio = width / float(img.size[0])
        height = int(float(img.size[1]) * float(ratio))
        
        img_resized = img.resize((width, height), Image.Resampling.LANCZOS)
        
        print(f"New size: {img_resized.size}")
        
        # Save with high quality
        img_resized.save(output_path, "PNG", optimize=True)
        
        original_size = os.path.getsize(input_path)
        new_size = os.path.getsize(output_path)
        
        print(f"Original file size: {original_size} bytes")
        print(f"New file size: {new_size} bytes")
        print("Optimization complete.")

except Exception as e:
    print(f"Error: {e}")
