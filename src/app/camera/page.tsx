'use client'
import React, { useRef, useState, useEffect } from 'react';
import { Button, Splitter } from 'antd';
import { uploadImage } from '@/services/uploadService';
import { useUserUUID } from '@/context/UserUUIDContext';
import ResultDiv from '@/components/ResultDiv';

export default function Camera() {
  const { userUUID } = useUserUUID();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loading, setLoading] = useState(false);
  const [resultImg, setResultImg] = useState<string | null>(null);
  const [plateText, setPlateText] = useState<string | null>(null);

  useEffect(() => {
    async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }
      } catch (err) {
        alert(err);
      }
    }
    startCamera();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  const handleCapture = async () => {
    if (!videoRef.current || !canvasRef.current) return;
    if (userUUID === null) return;
    setLoading(true);

    const width = videoRef.current.videoWidth;
    const height = videoRef.current.videoHeight;
    canvasRef.current.width = width;
    canvasRef.current.height = height;
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(videoRef.current, 0, 0, width, height);

    canvasRef.current.toBlob(async (blob) => {
      if (!blob) return;
      const file = new File([blob], 'image.png', { type: 'image/png' });
      try {
        const response = await uploadImage(file, userUUID);
        setResultImg(response?.result_path);
        setPlateText(response?.plate_text || "unknown");
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 'image/png');
  };

  return (
    <div className='flex flex-col w-[100vw] items-center justify-center px-10'>
      <Splitter className='rounded rounded-xl shadow-xl/20 h-[300px] w-full' >
        <Splitter.Panel defaultSize="50%" resizable={false}
          className='flex flex-col w-full items-center justify-center'>
          <video ref={videoRef} style={{ width: '100%', height: '190px' }} autoPlay muted />
          <canvas ref={canvasRef} style={{ display: 'none' }} />
          <div className='h-[100px] flex items-center justify-center'>
            <Button type="primary" onClick={handleCapture} disabled={loading} loading={loading}
              style={{ height: '50px', backgroundColor: 'var(--darkblue)', fontWeight: 'bold', paddingInline: '30px' }}>
              {loading ? 'Reading...' : 'Capture'}
            </Button>
          </div>
        </Splitter.Panel>
        <Splitter.Panel className='flex flex-col w-full h-full'>
          {resultImg && plateText && <ResultDiv resultImg={resultImg} plateText={plateText} />}
        </Splitter.Panel>
      </Splitter>
    </div>
  );
};
