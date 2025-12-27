#!/usr/bin/env python3
"""
Image processing script for The Rx Spot website assets.
Resizes large images to safe dimensions for analysis while preserving quality.
"""

import os
import sys
from pathlib import Path

try:
    from PIL import Image
    import shutil
except ImportError:
    print("Installing required package: Pillow")
    import subprocess
    subprocess.check_call([sys.executable, "-m", "pip", "install", "Pillow"])
    from PIL import Image
    import shutil

# Configuration
MAX_DIMENSION = 2400  # Max width or height
JPEG_QUALITY = 92
PNG_COMPRESSION = 6

def process_image(source_path, original_dest, processed_dest):
    """
    Process a single image: copy original and create processed version.
    """
    filename = os.path.basename(source_path)
    print(f"\nProcessing: {filename}")

    # Copy to originals folder
    orig_path = os.path.join(original_dest, filename)
    if not os.path.exists(orig_path):
        shutil.copy2(source_path, orig_path)
        print(f"  [OK] Copied to originals/")

    # Open and analyze image
    try:
        with Image.open(source_path) as img:
            width, height = img.size
            print(f"  Original size: {width}x{height}")

            # Determine if resize is needed
            max_dim = max(width, height)
            if max_dim > MAX_DIMENSION:
                # Calculate new dimensions maintaining aspect ratio
                ratio = MAX_DIMENSION / max_dim
                new_width = int(width * ratio)
                new_height = int(height * ratio)

                # Resize with high-quality resampling
                resized = img.resize((new_width, new_height), Image.Resampling.LANCZOS)
                print(f"  Resized to: {new_width}x{new_height}")

                # Save processed version
                proc_path = os.path.join(processed_dest, filename)

                # Convert RGBA to RGB for JPEG
                if filename.lower().endswith('.jpg') or filename.lower().endswith('.jpeg'):
                    if resized.mode in ('RGBA', 'LA', 'P'):
                        # Create white background
                        background = Image.new('RGB', resized.size, (255, 255, 255))
                        if resized.mode == 'P':
                            resized = resized.convert('RGBA')
                        background.paste(resized, mask=resized.split()[-1] if resized.mode == 'RGBA' else None)
                        resized = background
                    resized.save(proc_path, 'JPEG', quality=JPEG_QUALITY, optimize=True)
                else:
                    resized.save(proc_path, optimize=True, compress_level=PNG_COMPRESSION)

                print(f"  [OK] Saved to processed/")
            else:
                # Image is small enough, just copy it
                proc_path = os.path.join(processed_dest, filename)
                shutil.copy2(source_path, proc_path)
                print(f"  [OK] Already optimal size, copied to processed/")

    except Exception as e:
        print(f"  [ERROR] Error processing image: {e}")
        return False

    return True

def main():
    base_dir = Path(__file__).parent
    original_dir = base_dir / "images" / "originals"
    processed_dir = base_dir / "images" / "processed"

    # Ensure directories exist
    original_dir.mkdir(parents=True, exist_ok=True)
    processed_dir.mkdir(parents=True, exist_ok=True)

    # Find all image files in root
    image_extensions = {'.png', '.jpg', '.jpeg', '.webp', '.gif'}
    image_files = []

    for ext in image_extensions:
        image_files.extend(base_dir.glob(f'*{ext}'))

    if not image_files:
        print("No image files found in root directory.")
        return

    print(f"Found {len(image_files)} image file(s) to process\n")
    print("=" * 60)

    success_count = 0
    for img_path in sorted(image_files):
        if process_image(str(img_path), str(original_dir), str(processed_dir)):
            success_count += 1

    print("\n" + "=" * 60)
    print(f"\n[COMPLETE] Processing complete: {success_count}/{len(image_files)} images processed successfully")
    print(f"  Originals: {original_dir}")
    print(f"  Processed: {processed_dir}")

if __name__ == "__main__":
    main()
