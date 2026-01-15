import React, { useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Trash2 } from 'lucide-react';

export default function SignaturePadField({ label, value, onChange }) {
    const signatureRef = useRef();

    const handleClear = () => {
        signatureRef.current?.clear();
        onChange('');
    };

    const handleSave = () => {
        const signature = signatureRef.current?.toDataURL();
        if (signature) {
            onChange(signature);
        }
    };

    const handleDrawing = () => {
        // Real-time drawing detection
        if (signatureRef.current && signatureRef.current.isEmpty()) {
            onChange('');
        }
    };

    return (
        <div className="space-y-2">
            <Label>{label}</Label>
            <div className="border-2 border-slate-300 rounded-lg overflow-hidden bg-white">
                <SignatureCanvas
                    ref={signatureRef}
                    canvasProps={{
                        className: 'w-full h-32',
                        style: { display: 'block', cursor: 'crosshair' }
                    }}
                    onEnd={handleDrawing}
                    penColor="black"
                />
            </div>
            <div className="flex gap-2">
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleClear}
                    className="flex items-center gap-2"
                >
                    <Trash2 className="w-4 h-4" />
                    ลบลายเซ็น
                </Button>
                <Button
                    type="button"
                    size="sm"
                    onClick={handleSave}
                    className="bg-blue-600 hover:bg-blue-700"
                >
                    บันทึกลายเซ็น
                </Button>
            </div>
            {value && <p className="text-xs text-green-600">✓ บันทึกลายเซ็นแล้ว</p>}
        </div>
    );
}