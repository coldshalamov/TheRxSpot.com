from PIL import Image, ImageDraw
import os

# Input and output paths
input_path = "TheRxSpot_Logo.png"
output_path = "images/processed/TheRxSpot_Logo_Circle_Transparent.png"

try:
    with Image.open(input_path) as img:
        print(f"Original size: {img.size}")
        
        # Convert to RGBA if not already
        if img.mode != 'RGBA':
            img = img.convert('RGBA')
        
        # Get dimensions
        width, height = img.size
        
        # Step 1: Crop to center square (like object-fit: cover does)
        min_dim = min(width, height)
        left = (width - min_dim) / 2
        top = (height - min_dim) / 2
        right = (width + min_dim) / 2
        bottom = (height + min_dim) / 2
        
        img_square = img.crop((left, top, right, bottom))
        print(f"Cropped to square: {img_square.size}")
        
        # Step 2: Apply the CSS scale(1.45) effect - zoom in by 145%
        # This means we crop to the CENTER 1/1.45 = 69% of the image
        size = img_square.size[0]
        scale_factor = 1.45
        new_size = int(size / scale_factor)
        
        # Calculate crop box for center zoom
        crop_offset = (size - new_size) / 2
        zoom_crop = (crop_offset, crop_offset, size - crop_offset, size - crop_offset)
        img_zoomed = img_square.crop(zoom_crop)
        
        # Resize back to original square size (this is the "zoom" effect)
        img_zoomed = img_zoomed.resize((size, size), Image.Resampling.LANCZOS)
        print(f"After CSS scale(1.45) effect: {img_zoomed.size}")
        
        # Step 3: Create a circular mask
        mask = Image.new('L', (size, size), 0)
        draw = ImageDraw.Draw(mask)
        draw.ellipse((0, 0, size, size), fill=255)
        
        # Step 4: Apply the mask to make it circular with transparent background
        output = Image.new('RGBA', (size, size), (0, 0, 0, 0))
        output.paste(img_zoomed, (0, 0))
        output.putalpha(mask)
        
        # Save the circular logo
        output.save(output_path, 'PNG')
        
        print(f"\n✅ Circular logo created: {output_path}")
        print(f"Size: {output.size}")
        print(f"File size: {os.path.getsize(output_path) / 1024:.2f} KB")
        print("\nThis matches the CSS effect: object-fit: cover + scale(1.45) + border-radius: 50%")
        
except Exception as e:
    print(f"Error: {e}")
