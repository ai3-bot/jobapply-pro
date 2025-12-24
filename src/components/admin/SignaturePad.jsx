import React, { useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Pen, Trash2, Upload } from "lucide-react";
import SignatureCanvas from 'react-signature-canvas';
import { base44 } from '@/api/base44Client';

export default function SignaturePad({ signatureUrl, onSave, label = "ลงชื่อ" }) {
    const [showDialog, setShowDialog] = useState(false);
    const [mode, setMode] = useState('draw'); // 'draw' or 'upload'
    const [uploadedImage, setUploadedImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const sigCanvas = useRef();

    const clearSignature = () => {
        if (sigCanvas.current) {
            sigCanvas.current.clear();
        }
        setUploadedImage(null);
    };

    const saveSignature = async () => {
        if (mode === 'draw' && sigCanvas.current && !sigCanvas.current.isEmpty()) {
            const dataUrl = sigCanvas.current.toDataURL();
            const blob = await (await fetch(dataUrl)).blob();
            const file = new File([blob], 'signature.png', { type: 'image/png' });
            
            setUploading(true);
            try {
                const { file_url } = await base44.integrations.Core.UploadFile({ file });
                onSave(file_url);
                setShowDialog(false);
            } catch (error) {
                console.error('Upload failed:', error);
                alert('เกิดข้อผิดพลาดในการอัพโหลดลายเซ็น');
            } finally {
                setUploading(false);
            }
        } else if (mode === 'upload' && uploadedImage) {
            setUploading(true);
            try {
                const { file_url } = await base44.integrations.Core.UploadFile({ file: uploadedImage });
                onSave(file_url);
                setShowDialog(false);
            } catch (error) {
                console.error('Upload failed:', error);
                alert('เกิดข้อผิดพลาดในการอัพโหลดลายเซ็น');
            } finally {
                setUploading(false);
            }
        }
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setUploadedImage(e.target.files[0]);
        }
    };

    return (
        <div>
            <div className="flex items-center gap-2">
                <div 
                    className="border-2 border-dashed border-slate-300 rounded-lg w-full h-24 flex items-center justify-center bg-slate-50 hover:bg-slate-100 cursor-pointer transition-colors"
                    onClick={() => setShowDialog(true)}
                >
                    {signatureUrl ? (
                        <img src={signatureUrl} alt="Signature" className="max-h-20 object-contain" />
                    ) : (
                        <div className="text-center text-slate-400">
                            <Pen className="w-6 h-6 mx-auto mb-1" />
                            <span className="text-sm">{label}</span>
                        </div>
                    )}
                </div>
                {signatureUrl && (
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => onSave('')}
                        className="shrink-0"
                    >
                        <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                )}
            </div>

            <Dialog open={showDialog} onOpenChange={setShowDialog}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>{label}</DialogTitle>
                    </DialogHeader>

                    <div className="space-y-4">
                        <div className="flex gap-2">
                            <Button 
                                variant={mode === 'draw' ? 'default' : 'outline'}
                                onClick={() => setMode('draw')}
                                className="flex-1"
                            >
                                <Pen className="w-4 h-4 mr-2" />
                                วาดลายเซ็น
                            </Button>
                            <Button 
                                variant={mode === 'upload' ? 'default' : 'outline'}
                                onClick={() => setMode('upload')}
                                className="flex-1"
                            >
                                <Upload className="w-4 h-4 mr-2" />
                                อัพโหลดรูปภาพ
                            </Button>
                        </div>

                        {mode === 'draw' ? (
                            <div className="border-2 border-slate-300 rounded-lg bg-white">
                                <SignatureCanvas
                                    ref={sigCanvas}
                                    canvasProps={{
                                        className: 'w-full h-64 rounded-lg'
                                    }}
                                />
                            </div>
                        ) : (
                            <div className="space-y-3">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                                />
                                {uploadedImage && (
                                    <div className="border-2 border-slate-300 rounded-lg p-4 bg-slate-50">
                                        <img 
                                            src={URL.createObjectURL(uploadedImage)} 
                                            alt="Preview" 
                                            className="max-h-48 mx-auto object-contain"
                                        />
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="flex justify-end gap-2">
                            <Button variant="outline" onClick={clearSignature}>
                                <Trash2 className="w-4 h-4 mr-2" />
                                ล้าง
                            </Button>
                            <Button 
                                onClick={saveSignature}
                                disabled={uploading || (mode === 'draw' && sigCanvas.current?.isEmpty()) || (mode === 'upload' && !uploadedImage)}
                                className="bg-indigo-600 hover:bg-indigo-700"
                            >
                                {uploading ? 'กำลังบันทึก...' : 'บันทึก'}
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}