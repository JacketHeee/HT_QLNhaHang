import React, { useEffect, useRef, useState } from 'react';
import { BrowserQRCodeReader } from '@zxing/library';
import { useNavigate } from 'react-router-dom';

const QRCodeScanner = () => {
    const videoRef = useRef(null);
    const navigate = useNavigate();
    const [cameraError, setCameraError] = useState(null);

    useEffect(() => {
        const codeReader = new BrowserQRCodeReader();

        // Kiểm tra quyền truy cập camera
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(() => {
                // Nếu có quyền, bắt đầu quét mã QR
                codeReader.decodeFromVideoDevice(null, videoRef.current, (result, err) => {
                    if (result) {
                        console.log('QR Code scanned:', result.getText());
                        if (result.getText().includes('/menu')) {
                            navigate('/menu');
                        }
                    }
                    if (err && !(err instanceof window.NotFoundException)) {
                        console.error(err);
                        setCameraError('Error accessing camera. Please ensure camera access is enabled.');
                    }
                });
            })
            .catch((err) => {
                console.error(err);
                setCameraError('Camera access denied. Please grant camera access to scan QR codes.');
            });

        return () => codeReader.reset();
    }, [navigate]);

    return (
        <div className="container text-center mt-5" style={{ padding: '0 15px' }}>
            <h2>Scan QR Code to Access Menu</h2>
            {cameraError ? (
                <div className="alert alert-danger mt-3">{cameraError}</div>
            ) : (
                <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
                    <video
                        ref={videoRef}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                        }}
                    />
                </div>
            )}
        </div>
    );
};

export default QRCodeScanner;