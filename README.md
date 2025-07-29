# 🚧 Pothole Reporter – A Smart Pothole Reporting System

## 📄 Project Description

**Pothole Reporter** is a full-stack web application that allows users to report potholes in their locality by submitting photos, location coordinates, and additional details. The system captures real-time user location and image (via webcam or upload), then sends the data to a backend built with **Spring Boot**, which stores the report details in a **MySQL database** and saves images to the server’s local filesystem.

---

## 📸 Screenshot
**UI**
<img width="1421" height="694" alt="image" src="https://github.com/user-attachments/assets/129e9359-26b5-4ebf-9591-98f1242d23e6" />
**DATABASE**

<img width="690" height="167" alt="image" src="https://github.com/user-attachments/assets/39bec22a-46a9-437d-8678-b80e495386be" />





---

## 🛠️ Key Features

- 📸 **Image Capture**: Users can upload a pothole image or capture one directly using their webcam or mobile camera.
- 📍 **Live Location**: Uses browser geolocation to fetch exact latitude and longitude.
- 📝 **Form Inputs**: Address, street, risk level (High/Medium/Low), and optional description.
- 🌐 **REST API**: Backend exposes endpoints to receive pothole data and store it in the database.
- 💾 **Data Persistence**: Pothole data is saved in a MySQL database, and images are stored in the server’s local filesystem.
- 🔄 **Spring Boot Backend**: Handles API requests, file upload logic, and database interaction.

---

## 🧩 Tech Stack

- **Frontend**: HTML, CSS, JavaScript (vanilla)
- **Backend**: Java, Spring Boot, REST APIs
- **Database**: MySQL
- **Deployment**: Local or via ngrok (for testing on remote devices)

---
