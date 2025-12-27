
import zipfile
import os
from datetime import datetime

def create_deploy_zip():
    source_dir = "."
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    output_filename = f"TheRxSpot_EMERGENCY_DEPLOY_{timestamp}.zip"
    
    # Files and folders to include specifically
    includes = [
        "index.html",
        "Patients", # New directory
        "privacy-policy.html",
        "style.css",
        "main.js",
        ".htaccess",
        "images"  # Directory
    ]
    
    try:
        with zipfile.ZipFile(output_filename, 'w', zipfile.ZIP_DEFLATED) as zipf:
            for item in includes:
                if os.path.isdir(item):
                    for root, dirs, files in os.walk(item):
                        for file in files:
                            # Skip system files
                            if file in [".DS_Store", "Thumbs.db"]:
                                continue
                            
                            file_path = os.path.join(root, file)
                            zipf.write(file_path, file_path)
                            print(f"Added: {file_path}")
                elif os.path.isfile(item):
                    zipf.write(item, item)
                    print(f"Added: {item}")
                else:
                    print(f"Warning: {item} not found, skipping.")
                    
        print(f"\n=== SUCCESS ===")
        print(f"File: {output_filename}")
        print(f"Location: {os.path.abspath(output_filename)}")
        print(f"Size: {os.path.getsize(output_filename) / 1024 / 1024:.2f} MB")
        
    except Exception as e:
        print(f"Error creating zip: {e}")

if __name__ == "__main__":
    create_deploy_zip()
