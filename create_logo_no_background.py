from PIL import Image
import numpy as np
import os

# Input and output paths
input_path = "TheRxSpot_Logo.png"
output_path = "images/processed/TheRxSpot_Logo_Circle_NoBackground.png"

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
        
        # Step 3: Remove dark blue/teal background using color threshold
        # Convert to numpy array for easier manipulation
        img_array = np.array(img_zoomed)
        
        # Define the dark blue/teal color range to remove
        # The background appears to be dark blue/teal (around RGB: 20-80, 60-120, 90-140)
        lower_bound = np.array([0, 30, 50, 0])      # Lower RGB + Alpha
        upper_bound = np.array([100, 140, 170, 255]) # Upper RGB + Alpha
        
        # Create mask for pixels in this color range
        mask = np.all((img_array >= lower_bound) & (img_array <= upper_bound), axis=-1)
        
        # Set those pixels to transparent
        img_array[mask] = [0, 0, 0, 0]
        
        # Convert back to PIL Image
        img_no_bg = Image.fromarray(img_array, 'RGBA')
        
        # Step 4: Apply circular mask to clean up edges
        from PIL import ImageDraw
        circle_mask = Image.new('L', (size, size), 0)
        draw = ImageDraw.Draw(circle_mask)
        draw.ellipse((0, 0, size, size), fill=255)
        
        # Apply the circular mask
        output = Image.new('RGBA', (size, size), (0, 0, 0, 0))
        output.paste(img_no_bg, (0, 0))
        
        # Combine with circular mask
        alpha = output.split()[3]
        alpha = Image.composite(alpha, Image.new('L', (size, size), 0), circle_mask)
        output.putalpha(alpha)
        
        # Save the result
        output.save(output_path, 'PNG')
        
        print(f"\n✅ Logo with transparent interior created: {output_path}")
        print(f"Size: {output.size}")
        print(f"File size: {os.path.getsize(output_path) / 1024:.2f} KB")
        print("\nThis version has the dark blue background removed from inside the circle.")
        print("Only the metallic rings and letters remain on transparent background.")
        
except Exception as e:
    print(f"Error: {e}")
    import traceback
    traceback.print_exc()
