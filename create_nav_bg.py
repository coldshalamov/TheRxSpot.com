from PIL import Image
import os

def crop_hero_for_banner():
    source_path = r'c:\Users\User\Documents\GitHub\Telomere\TheRxSpot.com\images\processed\modern_hero.png'
    output_path = r'c:\Users\User\Documents\GitHub\Telomere\TheRxSpot.com\images\processed\nav_bg.png'
    
    try:
        if not os.path.exists(source_path):
            print(f"Error: Source image not found at {source_path}")
            return

        with Image.open(source_path) as img:
            # Crop the top 200 pixels (adjust as needed for the banner height)
            # The banner/nav is usually around 80-100px, but let's take a bit more for background coverage
            width, height = img.size
            crop_height = 200 
            
            cropped_img = img.crop((0, 0, width, crop_height))
            
            cropped_img.save(output_path)
            print(f"Successfully created banner background at {output_path}")

    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    crop_hero_for_banner()
