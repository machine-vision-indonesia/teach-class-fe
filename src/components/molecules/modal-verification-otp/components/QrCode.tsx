import React, { FC, useEffect, useRef, useState } from 'react';
import qrcode from 'qrcode';
import { QRCodeProps } from '../types/ModalVerificationOtp';

export const QRCode: FC<QRCodeProps> = ({ text, width = 200, height = 200 }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [_, setDataUrl] = useState<string | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.width = width;
      canvasRef.current.height = height;
      qrcode.toCanvas(canvasRef.current, text, { errorCorrectionLevel: 'H', width }, (error) => {
        if (error) {
          console.error(error);
        } else if (canvasRef.current) {
          setDataUrl(canvasRef.current.toDataURL());
        }
      });
    }
  }, [text, width, height]);

  return (
    <div>
      <canvas ref={canvasRef} style={{ width, height }} />
    </div>
  );
};
