document.addEventListener('DOMContentLoaded', function() {
    const webcam = document.getElementById("webcam");
    const canvas = document.getElementById("canvas");
    const preview = document.getElementById("preview");
    const startCameraBtn = document.getElementById("startCamera");
    const capturePhotoBtn = document.getElementById("capturePhoto");
    const stopCameraBtn = document.getElementById("stopCamera");
    const getLocationBtn = document.getElementById("getLocation");
    const reportForm = document.getElementById("reportForm");

    let stream = null;
    let capturedImage = null;

    startCameraBtn.addEventListener('click', startCamera);
    capturePhotoBtn.addEventListener('click', capturePhoto);
    stopCameraBtn.addEventListener('click', stopCamera);
    getLocationBtn.addEventListener('click', getCoordinates);
    reportForm.addEventListener('submit', handleFormSubmit);

    function startCamera() {
        navigator.mediaDevices.getUserMedia({
            video: { facingMode: { exact: "environment" } }  // Request back camera
        })
            .then(mediaStream => {
                stream = mediaStream;
                webcam.srcObject = mediaStream;
                webcam.classList.remove("hidden");
            })
            .catch(err => {
                console.warn("Back camera not available or permission denied. Falling back to default camera.");

                // Fallback to default (usually front) camera
                navigator.mediaDevices.getUserMedia({ video: true })
                    .then(mediaStream => {
                        stream = mediaStream;
                        webcam.srcObject = mediaStream;
                        webcam.classList.remove("hidden");
                    })
                    .catch(error => {
                        alert("No camera access: " + error.message);
                    });
            });
    }


    function capturePhoto() {
        if (!stream) {
            alert("Camera not started.");
            return;
        }
        canvas.width = webcam.videoWidth;
        canvas.height = webcam.videoHeight;
        const context = canvas.getContext("2d");
        context.drawImage(webcam, 0, 0);
        capturedImage = canvas.toDataURL("image/png");

        // Show preview
        preview.src = capturedImage;
        preview.classList.remove("hidden");
    }

    function stopCamera() {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            webcam.classList.add("hidden");
            stream = null;
        }
    }

    function getCoordinates() {
        const coordInput = document.getElementById("coordinates");

        if (!navigator.geolocation) {
            coordInput.value = "Geolocation not supported!";
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude.toFixed(6);
                const lon = position.coords.longitude.toFixed(6);
                coordInput.value = `${lat}, ${lon}`;
            },
            (error) => {
                coordInput.value = "Location fetch failed.";
                console.error("Location error:", error);
            }
        );
    }

    function handleFormSubmit(e) {
        e.preventDefault();

        const address = document.getElementById("address").value;
        const street = document.getElementById("street").value;
        const coordinates = document.getElementById("coordinates").value;
        const risk = document.querySelector('input[name="risk"]:checked')?.value;
        const desc = document.getElementById("desc").value;
        const fileInput = document.getElementById("photoUpload");

        submitData();

        function submitData() {
            const [latitude, longitude] = coordinates.split(",").map(coord => coord.trim());
            const formData = new FormData();
            formData.append("latitude", latitude);
            formData.append("longitude", longitude);
            formData.append("address", `${address}, ${street}`);
            formData.append("riskLevel", risk);
            formData.append("description", desc);

            if (fileInput.files.length > 0) {
                formData.append("image", fileInput.files[0]);
            } else if (capturedImage && !preview.classList.contains("hidden")) {
                fetch(capturedImage)
                    .then(res => res.blob())
                    .then(blob => {
                        const file = new File([blob], "captured.png", { type: "image/png" });
                        formData.append("image", file);
                        sendToBackend();
                    });
                return;
            }

            sendToBackend();

            function sendToBackend() {
                fetch("https://6d6bdd41a3e9.ngrok-free.app/api/potholes/report", {
                    method: "POST",
                    body: formData
                })
                    .then(res => {
                        if (!res.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return res.text();
                    })
                    .then(msg => {
                        alert("✅ " + msg);
                        document.getElementById("reportForm").reset();
                        preview.classList.add("hidden");
                        stopCamera();
                        capturedImage = null;
                    })
                    .catch(err => {
                        alert("❌ Error submitting report: " + err.message);
                    });
            }
        }
    }
});