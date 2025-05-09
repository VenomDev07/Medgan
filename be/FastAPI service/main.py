# # File: generator.py
# # ```python
# import torch
# import torch.nn as nn

# class Generator(nn.Module):
#     def __init__(self):
#         super(Generator, self).__init__()
        
#         # Encoder (Downsampling)
#         self.encoder = nn.Sequential(
#             nn.Conv2d(3, 64, kernel_size=4, stride=2, padding=1),
#             nn.BatchNorm2d(64),
#             nn.LeakyReLU(0.2, inplace=True),
            
#             nn.Conv2d(64, 128, kernel_size=4, stride=2, padding=1),
#             nn.BatchNorm2d(128),
#             nn.LeakyReLU(0.2, inplace=True),
            
#             nn.Conv2d(128, 256, kernel_size=4, stride=2, padding=1),
#             nn.BatchNorm2d(256),
#             nn.LeakyReLU(0.2, inplace=True)
#         )

#         # Decoder (Upsampling)
#         self.decoder = nn.Sequential(
#             nn.Upsample(scale_factor=2, mode='bilinear', align_corners=True),
#             nn.Conv2d(256, 256, kernel_size=3, stride=1, padding=1),
#             nn.BatchNorm2d(256),
#             nn.ReLU(inplace=True),

#             nn.Upsample(scale_factor=2, mode='bilinear', align_corners=True),
#             nn.Conv2d(256, 128, kernel_size=3, stride=1, padding=1),
#             nn.BatchNorm2d(128),
#             nn.ReLU(inplace=True),

#             nn.Upsample(scale_factor=2, mode='bilinear', align_corners=True),
#             nn.Conv2d(128, 64, kernel_size=3, stride=1, padding=1),
#             nn.BatchNorm2d(64),
#             nn.ReLU(inplace=True),

#             nn.Conv2d(64, 3, kernel_size=3, stride=1, padding=1),
#             nn.Tanh()
#         )

#     def forward(self, x):
#         x = self.encoder(x)
#         x = self.decoder(x)
#         return x
# # ```

# # File: main.py
# # ```python
# import io
# import os
# from fastapi import FastAPI, File, UploadFile
# from fastapi.responses import StreamingResponse
# import torch
# from PIL import Image
# from torchvision import transforms

# # Import your Generator class from generator.py
# # from generator import Generator

# # Initialize FastAPI
# app = FastAPI()

# # Device configuration
# device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# # Load the trained Generator model
# model_path = os.path.join("generator_v11.pth")  # adjust path if needed
# generator = Generator().to(device)
# generator.load_state_dict(torch.load(model_path, map_location=device))
# generator.eval()

# # Define preprocessing and postprocessing transforms
# preprocess = transforms.Compose([
#     transforms.Resize((256, 256)),
#     transforms.ToTensor(),
#     transforms.Normalize(mean=[0.5, 0.5, 0.5], std=[0.5, 0.5, 0.5]),
# ])

# postprocess = transforms.Compose([
#     transforms.Lambda(lambda t: (t * 0.5 + 0.5) * 255),  # denormalize from [-1,1] to [0,255]
#     transforms.Lambda(lambda t: t.clamp(0, 255).byte()),
#     transforms.ToPILImage(),
# ])

# # Path for a static test image
# STATIC_IMAGE_PATH = os.path.join("image.png")

# @app.get("/static_generate")
# def static_generate():
#     """
#     Processes a static image (static/input.jpg) through the Generator and returns the result.
#     """
#     image = Image.open(STATIC_IMAGE_PATH).convert("RGB")
#     input_tensor = preprocess(image).unsqueeze(0).to(device)

#     with torch.no_grad():
#         output_tensor = generator(input_tensor)

#     output_tensor = output_tensor.squeeze(0).cpu()
#     output_image = postprocess(output_tensor)

#     buf = io.BytesIO()
#     output_image.save(buf, format="PNG")
#     buf.seek(0)
#     return StreamingResponse(buf, media_type="image/png")

# @app.post("/generate")
# async def generate_endpoint(image_file: UploadFile = File(...)):
#     """
#     Accepts an uploaded image file, processes it through the Generator, and returns the result.
#     """
#     # Read image bytes and convert to PIL Image
#     image_data = await image_file.read()
#     image = Image.open(io.BytesIO(image_data)).convert("RGB")
#     input_tensor = preprocess(image).unsqueeze(0).to(device)

#     with torch.no_grad():
#         output_tensor = generator(input_tensor)

#     output_tensor = output_tensor.squeeze(0).cpu()
#     output_image = postprocess(output_tensor)

#     buf = io.BytesIO()
#     output_image.save(buf, format="PNG")
#     buf.seek(0)
#     return StreamingResponse(buf, media_type="image/png")

# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

# File: generator.py
# ```python
import torch
import torch.nn as nn

class Generator(nn.Module):
    def __init__(self):
        super(Generator, self).__init__()
        
        # Encoder (Downsampling)
        self.encoder = nn.Sequential(
            nn.Conv2d(3, 64, kernel_size=4, stride=2, padding=1),
            nn.BatchNorm2d(64),
            nn.LeakyReLU(0.2, inplace=True),
            
            nn.Conv2d(64, 128, kernel_size=4, stride=2, padding=1),
            nn.BatchNorm2d(128),
            nn.LeakyReLU(0.2, inplace=True),
            
            nn.Conv2d(128, 256, kernel_size=4, stride=2, padding=1),
            nn.BatchNorm2d(256),
            nn.LeakyReLU(0.2, inplace=True)
        )

        # Decoder (Upsampling)
        self.decoder = nn.Sequential(
            nn.Upsample(scale_factor=2, mode='bilinear', align_corners=True),
            nn.Conv2d(256, 256, kernel_size=3, stride=1, padding=1),
            nn.BatchNorm2d(256),
            nn.ReLU(inplace=True),

            nn.Upsample(scale_factor=2, mode='bilinear', align_corners=True),
            nn.Conv2d(256, 128, kernel_size=3, stride=1, padding=1),
            nn.BatchNorm2d(128),
            nn.ReLU(inplace=True),

            nn.Upsample(scale_factor=2, mode='bilinear', align_corners=True),
            nn.Conv2d(128, 64, kernel_size=3, stride=1, padding=1),
            nn.BatchNorm2d(64),
            nn.ReLU(inplace=True),

            nn.Conv2d(64, 3, kernel_size=3, stride=1, padding=1),
            nn.Tanh()
        )

    def forward(self, x):
        x = self.encoder(x)
        x = self.decoder(x)
        return x
# ```

# File: main.py
# ```python
import io
import os
from fastapi import FastAPI, File, UploadFile
from fastapi.responses import StreamingResponse
import torch
from PIL import Image
from torchvision import transforms

# Import your Generator class from generator.py
# from generator import Generator

# Initialize FastAPI
app = FastAPI()

# Device configuration
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# Load the trained Generator model
model_path = os.path.join("generator_v11.pth")  # adjust path if needed
generator = Generator().to(device)
generator.load_state_dict(torch.load(model_path, map_location=device))
generator.eval()

# Define preprocessing and postprocessing transforms
preprocess = transforms.Compose([
    transforms.Resize((256, 256)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.5, 0.5, 0.5], std=[0.5, 0.5, 0.5]),
])

postprocess = transforms.Compose([
    transforms.Lambda(lambda t: (t * 0.5 + 0.5) * 255),  # denormalize from [-1,1] to [0,255]
    transforms.Lambda(lambda t: t.clamp(0, 255).byte()),
    transforms.ToPILImage(),
])

# Path for a static test image
STATIC_IMAGE_PATH = os.path.join("image.png")

@app.get("/static_generate")
def static_generate():
    """
    Processes a static image (static/input.jpg) through the Generator and returns the result.
    """
    image = Image.open(STATIC_IMAGE_PATH).convert("RGB")
    input_tensor = preprocess(image).unsqueeze(0).to(device)

    with torch.no_grad():
        output_tensor = generator(input_tensor)

    output_tensor = output_tensor.squeeze(0).cpu()
    output_image = postprocess(output_tensor)

    buf = io.BytesIO()
    output_image.save(buf, format="PNG")
    buf.seek(0)

    # Set the Content-Disposition header to prompt a file download with a specified filename
    return StreamingResponse(buf, media_type="image/png", headers={
        "Content-Disposition": "attachment; filename=enhanced_image.png"
    })

@app.post("/generate")
async def generate_endpoint(image_file: UploadFile = File(...)):
    """
    Accepts an uploaded image file, processes it through the Generator, and returns it as a downloadable file.
    """
    image_data = await image_file.read()
    image = Image.open(io.BytesIO(image_data)).convert("RGB")
    input_tensor = preprocess(image).unsqueeze(0).to(device)

    with torch.no_grad():
        output_tensor = generator(input_tensor)

    output_tensor = output_tensor.squeeze(0).cpu()
    output_image = postprocess(output_tensor)

    buf = io.BytesIO()
    output_image.save(buf, format="PNG")
    buf.seek(0)
    headers = {"Content-Disposition": f"attachment; filename=enhanced_{image_file.filename}"}
    return StreamingResponse(buf, media_type="image/png", headers=headers)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)