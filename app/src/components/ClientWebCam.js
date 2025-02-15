import React, { useState, useRef, useEffect } from "react";
import jsQR from "jsqr";
import qrlogo from "./qrlogo.svg";
import "./ClientWebCam.css"; // Import CSS

const ClientWebCam = () => {
  const [stream, setStream] = useState(null);
  const [qrCodeData, setQrCodeData] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const canvasRef = useRef(null);

  const handleStartWebcam = async () => {
    try {
      let constraints = {
        video: {
          facingMode: "environment",
          width: { ideal: 640 },
          height: { ideal: 480 },
        },
      };

      let mediaStream;
      try {
        mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      } catch (error) {
        console.warn("Back camera unavailable, switching to front camera.");
        constraints.video.facingMode = "user";
        mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      }

      setStream(mediaStream);
      setIsScanning(true);
      setQrCodeData(null);
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const handleStopWebcam = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
      setIsScanning(false);
      setQrCodeData(null);
    }
  };

  useEffect(() => {
    if (!stream) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const video = document.createElement("video");
    video.srcObject = stream;
    video.setAttribute("playsinline", true);
    video.play();

    let animationFrameId;
    let closeTimeoutId;

    const render = () => {
      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);

        if (code) {
          setQrCodeData(code.data);
          drawLine(context, code.location.topLeftCorner, code.location.topRightCorner, "#FF3B58");
          drawLine(context, code.location.topRightCorner, code.location.bottomRightCorner, "#FF3B58");
          drawLine(context, code.location.bottomRightCorner, code.location.bottomLeftCorner, "#FF3B58");
          drawLine(context, code.location.bottomLeftCorner, code.location.topLeftCorner, "#FF3B58");

          closeTimeoutId = setTimeout(() => {
            handleStopWebcam();
          }, 1000);
        } else {
          setQrCodeData(null);
        }
      }
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(closeTimeoutId);
      stream.getTracks().forEach((track) => track.stop());
    };
  }, [stream]);

  const drawLine = (ctx, begin, end, color) => {
    ctx.beginPath();
    ctx.moveTo(begin.x, begin.y);
    ctx.lineTo(end.x, end.y);
    ctx.lineWidth = 4;
    ctx.strokeStyle = color;
    ctx.stroke();
  };

  return (
      <div className="webcam-container">
        <button onClick={handleStartWebcam} className="qr-button">
          <img src={qrlogo} alt="Scan QR Code" className="qr-icon" />
        </button>

        {isScanning && (
            <div className="scanning-overlay">
              <button onClick={handleStopWebcam} className="close-button">×</button>
              <div className="canvas-container">
                <canvas ref={canvasRef} className="qr-canvas" />
              </div>
            </div>
        )}

        {qrCodeData && (
            <div className="qr-result">
              <h2>QR Code Detected:</h2>
              <p>{qrCodeData}</p>
            </div>
        )}
      </div>
  );
};

export default ClientWebCam;
