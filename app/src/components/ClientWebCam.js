import React, { useState, useRef } from 'react';

const ClientWebCam= () => {
    const [stream, setStream] = useState(null);
    const canvasRef = useRef(null);

    const handleStartWebcam = async () => {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
            video: true
        });
        setStream(mediaStream);
    };

    const handleStopWebcam = () => {
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
        setStream(null);
    };

    React.useEffect(() => {
        if (!stream) {
            return;
        }

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        const video = document.createElement('video');
        video.srcObject = stream;
        video.play();

        const render = () => {
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            requestAnimationFrame(render);
        };

        requestAnimationFrame(render);

        return () => {
            const tracks = stream.getTracks();
            tracks.forEach(track => track.stop());
        };
    }, [stream]);

    return (
        <div style={{display:'grid'}}>
            <h1>Simple Webcam with React </h1>
            <button onClick={handleStartWebcam}>Start Webcam</button>
            <button onClick={handleStopWebcam}>Stop Webcam</button>
            <canvas ref={canvasRef} width={480} height={640} />
        </div>
    );
};

export default ClientWebCam;
