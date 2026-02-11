from PIL import Image

def remove_background(input_path, output_path):
    img = Image.open(input_path)
    img = img.convert("RGBA")
    datas = img.getdata()

    newData = []
    
    # Simple threshold-based white removal
    for item in datas:
        # Check if pixel is close to white (allow some noise)
        if item[0] > 220 and item[1] > 220 and item[2] > 220:
            newData.append((255, 255, 255, 0))
        else:
            newData.append(item)

    img.putdata(newData)
    img.save(output_path, "PNG")
    print(f"Background removed. Saved to {output_path}")

if __name__ == "__main__":
    try:
        remove_background("public/logo.jpg", "public/logo_final.png")
    except Exception as e:
        print(f"Error: {e}")
