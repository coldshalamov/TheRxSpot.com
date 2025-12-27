
from PIL import Image
import os

input_path = "TheRxSpot_Logo.png"
output_path = "images/processed/TheRxSpot_Logo_Ultra.png"

try:
    with Image.open(input_path) as img:
        print(f"Original size: {img.size}")
        
        # Calculate center square dimensions
        width, height = img.size
        min_dim = min(width, height) # Should be 1536
        
        left = (width - min_dim) / 2
        top = (height - min_dim) / 2
        right = (width + min_dim) / 2
        bottom = (height + min_dim) / 2
        
        # Crop to square (1536x1536)
        # We are NOT resizing down. We keep 1:1 pixel quality.
        img_cropped = img.crop((left, top, right, bottom))
        print(f"Cropped size (Final): {img_cropped.size}")
        
        # Save as PNG with optimization (zlib compression only, lossless)
        img_cropped.save(output_path, "PNG", optimize=True)
        
        original_size = os.path.getsize(input_path)
        new_size = os.path.getsize(output_path)
        
        print(f"Original file size: {original_size} bytes")
        print(f"New file size: {new_size} bytes")
        print("Optimization complete.")

except Exception as e:
    print(f"Error: {e}")
