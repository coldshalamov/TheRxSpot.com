#!/usr/bin/env python3
"""
Create small thumbnails for Claude to analyze without choking
"""
from PIL import Image
import os
from pathlib import Path

# Directories
PROCESSED_DIR = Path("images/processed")
THUMBNAIL_DIR = Path("images/thumbnails")

# Maximum dimensions for Claude-safe thumbnails
MAX_WIDTH = 800
MAX_HEIGHT = 800

def create_thumbnails():
    """Create small thumbnails from processed images"""

    # Create thumbnails directory
    THUMBNAIL_DIR.mkdir(parents=True, exist_ok=True)

    # Get all images from processed folder
    image_extensions = {'.jpg', '.jpeg', '.png', '.webp', '.gif'}
    image_files = [f for f in PROCESSED_DIR.iterdir()
                   if f.suffix.lower() in image_extensions]

    print(f"\nFound {len(image_files)} processed image(s) to create thumbnails for\n")
    print("=" * 60)

    success_count = 0

    for img_file in image_files:
        try:
            print(f"\nProcessing: {img_file.name}")

            # Open image
            with Image.open(img_file) as img:
                original_size = img.size
                print(f"  Original size: {original_size[0]}x{original_size[1]}")

                # Calculate new size maintaining aspect ratio
                img.thumbnail((MAX_WIDTH, MAX_HEIGHT), Image.Resampling.LANCZOS)
                new_size = img.size
                print(f"  Thumbnail size: {new_size[0]}x{new_size[1]}")

                # Save thumbnail
                output_path = THUMBNAIL_DIR / img_file.name

                # Convert RGBA to RGB if saving as JPEG
                if img_file.suffix.lower() in ['.jpg', '.jpeg'] and img.mode == 'RGBA':
                    img = img.convert('RGB')

                img.save(output_path, quality=85, optimize=True)
                print(f"  [OK] Saved to thumbnails/")
                success_count += 1

        except Exception as e:
            print(f"  [ERROR] Failed to process {img_file.name}: {str(e)}")

    print("\n" + "=" * 60)
    print(f"\n[COMPLETE] Created {success_count}/{len(image_files)} thumbnails successfully")
    print(f"  Thumbnails folder: {THUMBNAIL_DIR.absolute()}\n")

if __name__ == "__main__":
    create_thumbnails()
