# 🧠 **MEDGAN — Medical Image Enhancement Using GANs**

**MEDGAN** is an AI-powered web application designed to enhance low-resolution or blurred medical scans such as MRIs and CTs. By integrating a custom-trained GAN model with a modern full-stack web architecture, **MEDGAN** helps improve image clarity in real-time — supporting better diagnostic outcomes for healthcare professionals.

---

## 🚀 **Tech Stack**

| **Layer**        | **Technology Used**                              | **Purpose**                                                |
|------------------|---------------------------------------------------|------------------------------------------------------------|
| **Frontend**     | **React.js, Tailwind CSS**                        | User interface, image preview, modals, routing             |
| **Backend API**  | **NestJS**                                        | Image logic, routing, relaying to GAN service              |
| **AI Model API** | **FastAPI + PyTorch**                             | Hosts and processes the GAN model                          |
| **ORM & DB**     | **Prisma + Neon PostgreSQL**                      | Stores metadata, user-image mapping                        |
| **Storage**      | **Cloudinary**                                    | Securely stores enhanced images                            |
| **Deep Learning**| **Custom PyTorch Generator (generator_v11.pth)**  | Enhances input scans using GAN architecture                |

---

## 🌐 **Application Flow**

1. **Homepage**
   - Users land on a sleek homepage and click **"Start Your Journey"**.

2. **Basic Routing-Based Access Control**
   - On login, user info is saved in localStorage.
   - If localStorage has no user info, they are redirected to the login page.
   - No formal authentication or token-based system implemented yet.

3. **Dashboard**
   - Users can view their image history.
   - Click on **"Enhance Image"** to upload a new scan.

4. **Image Enhancement Process**
   - Upload form opens in a modal.
   - Image and its metadata are posted to: NestJS → /enhance/upload.
   - **NestJS**:
     - Reads user info from localStorage.
     - Sends image as multipart/form to FastAPI.
   - **FastAPI**:
     - Preprocesses image → runs it through custom GAN → postprocesses output.
     - Returns enhanced image via **StreamingResponse**.
   - **NestJS**:
     - Uploads enhanced image to **Cloudinary**.
     - Stores metadata + secure link in **Neon DB**.
   - Dashboard is refreshed with the new image preview.

5. **Previewing Results**
   - Hovering on an image shows an **“eye”** icon.
   - Clicking it opens a modal with the full-resolution enhanced image.

---

## 🧠 **Core Deep Learning Component**

- **Model Architecture:** Custom Generator built using PyTorch with encoder-decoder design.
  - **Encoder:** Downsamples to extract features.
  - **Decoder:** Upsamples to reconstruct a sharper image.
- **Transforms Used:**
  - Preprocessing: **Resize**, **Normalize**, **ToTensor**
  - Postprocessing: **Denormalize**, **Clamp**, **ToPILImage**
- **Model File:** **generator_v11.pth**

### 🔌 **FastAPI Endpoints**

| **Endpoint**        | **Function**                                                     |
|---------------------|------------------------------------------------------------------|
| **/generate**        | Accepts uploaded image → Enhances via GAN → Returns response    |
| **/static_generate** | Processes a static demo image for testing                        |

---

## 📦 **NestJS API Flow (/enhance/upload)**

1. Accepts image + metadata from frontend.
2. Constructs multipart/form-data and calls FastAPI.
3. Receives image buffer → wraps it as a fake file.
4. Sends the file to **Cloudinary** → saves metadata in **Neon PostgreSQL**.

---

## 📁 **Folder Structure Overview**

| Folder         | Description                         |
|----------------|-------------------------------------|
| `MEDGAN/`      | Root directory                      |
| `├── LICENSE`  | MIT License file                    |
| `├── README.md`| Project documentation               |
| `├── frontend/`| React + Tailwind                    |
| `└── backend/` | NestJS backend                      |
| `   └── fastapi/` | FastAPI app with PyTorch model  |


