import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, Printer, ExternalLink, FileText, Image, File } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function AdditionalDocPreviewModal({ 
    isOpen, 
    onClose, 
    document
}) {
    if (!document) return null;

    const fileExtension = document.name?.split('.').pop()?.toLowerCase();
    const isImage = ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(fileExtension);
    const isPdf = fileExtension === 'pdf';

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = document.url;
        link.download = document.name;
        link.target = '_blank';
        link.click();
    };

    const handlePrint = () => {
        const printWindow = window.open(document.url, '_blank');
        if (printWindow) {
            printWindow.onload = () => {
                printWindow.print();
            };
        }
    };

    const handleOpenInNewTab = () => {
        window.open(document.url, '_blank');
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-[90vw] w-[1000px] max-h-[90vh] p-0">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b bg-slate-50">
                    <DialogTitle className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                        <FileText className="w-5 h-5 text-indigo-600" />
                        {document.name}
                    </DialogTitle>
                </div>

                {/* Content - Preview */}
                <ScrollArea className="h-[calc(90vh-160px)]" type="always">
                    <div className="bg-slate-200 p-4 min-h-full flex items-center justify-center">
                        {isImage ? (
                            <img 
                                src={document.url} 
                                alt={document.name}
                                className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-lg"
                            />
                        ) : isPdf ? (
                            <iframe 
                                src={document.url}
                                className="w-full h-[70vh] rounded-lg shadow-lg bg-white"
                                title={document.name}
                            />
                        ) : (
                            <div className="text-center p-12 bg-white rounded-lg shadow-lg">
                                <File className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                                <h3 className="text-lg font-semibold text-slate-700 mb-2">{document.name}</h3>
                                <p className="text-slate-500 mb-4">ไม่สามารถแสดงตัวอย่างไฟล์ประเภทนี้ได้</p>
                                <Button onClick={handleOpenInNewTab} variant="outline">
                                    <ExternalLink className="w-4 h-4 mr-2" />
                                    เปิดในแท็บใหม่
                                </Button>
                            </div>
                        )}
                    </div>
                </ScrollArea>

                {/* Footer */}
                <div className="flex items-center justify-between px-6 py-4 border-t bg-white">
                    <Button variant="outline" onClick={onClose}>
                        ปิด
                    </Button>
                    <div className="flex items-center gap-2">
                        <Button 
                            variant="outline" 
                            onClick={handleOpenInNewTab}
                        >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            เปิดในแท็บใหม่
                        </Button>
                        <Button 
                            variant="outline" 
                            onClick={handlePrint}
                        >
                            <Printer className="w-4 h-4 mr-2" />
                            พิมพ์
                        </Button>
                        <Button 
                            onClick={handleDownload}
                            className="bg-indigo-600 hover:bg-indigo-700"
                        >
                            <Download className="w-4 h-4 mr-2" />
                            ดาวน์โหลด
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}