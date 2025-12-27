
from PIL import Image

input_path = "TheRxSpot_Logo.png"
output_path = "images/processed/TheRxSpot_Logo_Square.png"

try:
    with Image.open(input_path) as img:
        print(f"Original size: {img.size}")
        
        # Calculate center square crop
        width, height = img.size
        min_dim = min(width, height)
        
        left = (width - min_dim) / 2
        top = (height - min_dim) / 2
        right = (width + min_dim) / 2
        bottom = (height + min_dim) / 2
        
        # Crop to square
        img_cropped = img.crop((left, top, right, bottom))
        print(f"Cropped size: {img_cropped.size}")
        
        # Resize to 512x512 (High Res for web icon)
        # Using LANCZOS for best quality downsampling
        img_resized = img_cropped.resize((1024, 1024), Image.Resampling.LANCZOS)
        print(f"Resized to: {img_resized.size}")
        
        # Save
        img_resized.save(output_path, "PNG", optimize=True)
        print("Done.")

except Exception as e:
    print(f"Error: {e}")
