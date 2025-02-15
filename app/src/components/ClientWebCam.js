import React, { useState, useRef, useEffect } from 'react';
import jsQR from 'jsqr';

const ClientWebCam = () => {
  const [stream, setStream] = useState(null);
  const [qrCodeData, setQrCodeData] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const canvasRef = useRef(null);

  const handleStartWebcam = async () => {
    try {
      let constraints = {
        video: {
          facingMode: "environment", // Try to use the back camera first
          width: { ideal: 640 },
          height: { ideal: 480 },
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

          // Stop scanning after detecting a QR code
          handleStopWebcam();
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
      <div style={{ display: "grid", gap: "1rem", position: "relative" }}>
        {/* QR Scan Trigger Button */}
        <button
            onClick={handleStartWebcam}
            style={{
              position: 'fixed',
              bottom: '2rem',
              right: '2rem',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              zIndex: 1000,
            }}
        >
          <img src="qrlogo.svg" alt="Scan QR Code" style={{ width: '64px', height: '64px' }} />
        </button>

        {/* Scanning Overlay */}
        {isScanning && (
            <div
                style={{
                  position: 'fixed',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '80vw',
                  maxWidth: '480px',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  boxShadow: '0 0 20px rgba(0,0,0,0.5)',
                  backgroundColor: 'rgba(0,0,0,0.7)',
                  zIndex: 1001,
                }}
            >
              {/* Close Button */}
              <button
                  onClick={handleStopWebcam}
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    background: 'rgba(255,255,255,0.2)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '30px',
                    height: '30px',
                    color: 'white',
                    cursor: 'pointer',
                    zIndex: 1002,
                  }}
              >
                ×
              </button>

              {/* Canvas with Scanning Animation */}
              <div style={{ position: 'relative' }}>
                <canvas
                    ref={canvasRef}
                    style={{ width: '100%', height: 'auto' }}
                />

                {/* Scanning Animation */}
                <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'linear-gradient(transparent 50%, rgba(255, 255, 255, 0.1) 50%)',
                      backgroundSize: '100% 4px',
                      animation: 'scan 2s infinite',
                    }}
                />
              </div>
            </div>
        )}

        {/* Detected QR Code Data */}
        {qrCodeData && (
            <div style={{ marginTop: '2rem' }}>
              <h2>QR Code Detected:</h2>
              <p>{qrCodeData}</p>
            </div>
        )}

        {/* Scanning Animation Keyframes */}
        <style>{`
        @keyframes scan {
          0% { background-position: 0 -100%; }
          100% { background-position: 0 100%; }
        }
      `}</style>
      </div>
  );
};

export default ClientWebCam;