import zipfile
import os
from datetime import datetime
from pathlib import Path

def create_deployment_zip():
    """Create a clean deployment package for cPanel/Bluehost"""
    
    # Base directory
    base_dir = Path(__file__).parent
    
    # Create timestamp for filename
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    zip_filename = f"TheRxSpot_Deploy_{timestamp}.zip"
    zip_path = base_dir / zip_filename
    
    # Files and directories to include
    files_to_include = [
        'index.html',
        'style.css',
        'main.js',
        'coming-soon.html',
        'privacy-policy.html',
        '.htaccess',
    ]
    
    # Directories to include
    dirs_to_include = [
        'images/processed',
        'Patients',
    ]
    
    print(f"Creating deployment package: {zip_filename}")
    print("=" * 60)
    
    with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
        # Add individual files
        for file in files_to_include:
            file_path = base_dir / file
            if file_path.exists():
                zipf.write(file_path, file)
                print(f"✓ Added: {file}")
            else:
                print(f"⚠ Skipped (not found): {file}")
        
        # Add directories and their contents
        for dir_name in dirs_to_include:
            dir_path = base_dir / dir_name
            if dir_path.exists() and dir_path.is_dir():
                for root, dirs, files in os.walk(dir_path):
                    for file in files:
                        file_path = Path(root) / file
                        # Calculate the archive name (relative path)
                        arcname = file_path.relative_to(base_dir)
                        zipf.write(file_path, arcname)
                        print(f"✓ Added: {arcname}")
            else:
                print(f"⚠ Skipped (not found): {dir_name}")
    
    print("=" * 60)
    print(f"✅ Deployment package created successfully!")
    print(f"📦 Location: {zip_path}")
    print(f"📊 Size: {zip_path.stat().st_size / 1024 / 1024:.2f} MB")
    print("\n📋 Deployment Instructions:")
    print("1. Log in to your Bluehost cPanel")
    print("2. Navigate to File Manager")
    print("3. Go to public_html directory")
    print("4. Upload this zip file")
    print("5. Extract the zip file")
    print("6. Verify all files are in place")
    print("\n⚠️  Note: Make sure to backup your current site before deploying!")
    
    return zip_path

if __name__ == "__main__":
    create_deployment_zip()
