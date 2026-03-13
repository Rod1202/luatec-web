from PIL import Image
import os
path = r'd:\Luatec_Web\luatec-web\src\assets\branding\background-img.png'
if os.path.exists(path):
    try:
        with Image.open(path) as img:
            print(f"Dimensions: {img.size}")
    except Exception as e:
        print(f"Error: {e}")
else:
    print(f"File not found at {path}")
