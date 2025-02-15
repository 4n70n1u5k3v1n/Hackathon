import React, { useState, useRef, useEffect } from 'react';
import jsQR from 'jsqr';

const ClientWebCam = () => {
  const [stream, setStream] = useState(null);
  const [qrCodeData, setQrCodeData] = useState(null);
  const canvasRef = useRef(null);

  const handleStartWebcam = async () => {
    try {
      let constraints = {
        video: {
          facingMode: "environment", // Try to use the back camera first
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      };

      let mediaStream;
      try {
        mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      } catch (error) {
        console.warn("Back camera unavailable, switching to front camera.");
        constraints.video.facingMode = "user"; // Fall back to front camera
        mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      }

      setStream(mediaStream);
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const handleStopWebcam = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
      setQrCodeData(null);
    }
  };

  useEffect(() => {
    if (!stream) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const video = document.createElement("video");
    video.srcObject = stream;
    video.setAttribute("playsinline", true); // Required for iOS Safari
    video.play();

    let animationFrameId;

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
        } else {
          setQrCodeData(null);
        }
      }
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
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
      <div style={{ display: "grid", gap: "1rem" }}>
        <h1>Webcam QR Code Scanner</h1>
        <div>
          <button onClick={handleStartWebcam}>Start Webcam</button>
          <button onClick={handleStopWebcam}>Stop Webcam</button>
        </div>
        <canvas ref={canvasRef} style={{ width: "100%", maxWidth: "480px" }} />
        {qrCodeData && (
            <div>
              <h2>QR Code Detected:</h2>
              <p>{qrCodeData}</p>
            </div>
        )}
      </div>
  );
};

export default ClientWebCam;
