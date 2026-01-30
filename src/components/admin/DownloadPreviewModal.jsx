import React, { useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Eye, Download, Printer, X, Loader2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import PDPADocument from '@/components/application/pdf/PDPADocument';

export default function DownloadPreviewModal({ 
    isOpen, 
    onClose, 
    applicant, 
    documents, 
    onConfirmDownload, 
    onPrint,
    isDownloading 
}) {
    const [previewMode, setPreviewMode] = useState(false);
    const previewRef = useRef(null);

    if (!applicant) return null;

    const totalDocuments = Object.values(documents).reduce((sum, docs) => sum + (docs?.length || 0), 0);

    // Get PDPA document data for preview
    const pdpaDoc = documents.pdpa?.[0];
    const pdpaFormData = pdpaDoc?.data || {};

    const handlePrint = () => {
        if (previewRef.current) {
            const printContent = previewRef.current.innerHTML;
            const printWindow = window.open('', '_blank');
            printWindow.document.write(`
                <html>
                    <head>
                        <title>พิมพ์เอกสาร - ${applicant.full_name}</title>
                        <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
                        <style>
                            @import url('https://fonts.googleapis.com/css2?family=Sarabun:wght@400;600;700&display=swap');
                            body { font-family: 'Sarabun', sans-serif; }
                            @media print {
                                .pdpa-page { page-break-after: always; }
                            }
                        </style>
                    </head>
                    <body>
                        ${printContent}
                    </body>
                </html>
            `);
            printWindow.document.close();
            printWindow.focus();
            setTimeout(() => {
                printWindow.print();
            }, 500);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-[95vw] w-[1200px] max-h-[90vh] p-0">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b bg-slate-50">
                    <DialogTitle className="text-lg font-semibold text-slate-800">
                        ตัวอย่างเอกสาร
                    </DialogTitle>
                </div>

                {/* Content - PDF Preview */}
                <ScrollArea className="h-[calc(90vh-140px)]">
                    <div className="bg-slate-200 p-4 min-h-full" ref={previewRef}>
                        {totalDocuments === 0 ? (
                            <div className="flex items-center justify-center h-64 text-slate-500">
                                ไม่พบเอกสารที่จะแสดง
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {/* PDPA Preview */}
                                {documents.pdpa?.length > 0 && (
                                    <PDPADocument 
                                        applicant={applicant}
                                        formData={pdpaFormData}
                                        signatureUrl={pdpaFormData?.signatureUrl || applicant.signature_url}
                                        witness1Signature={pdpaFormData?.witness1Signature}
                                        witness2Signature={pdpaFormData?.witness2Signature}
                                    />
                                )}
                                
                                {/* Placeholder for other documents */}
                                {documents.pdpa?.length === 0 && (
                                    <div className="bg-white rounded-lg shadow p-8 text-center text-slate-500">
                                        <p>กรุณาเลือกเอกสารเพื่อดูตัวอย่าง</p>
                                        <p className="text-sm mt-2">รวมทั้งหมด {totalDocuments} เอกสาร</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </ScrollArea>

                {/* Footer */}
                <div className="flex items-center justify-between px-6 py-4 border-t bg-white">
                    <Button variant="outline" onClick={onClose}>
                        ยกเลิก
                    </Button>
                    <div className="flex items-center gap-2">
                        <Button 
                            variant="outline" 
                            onClick={handlePrint} 
                            disabled={totalDocuments === 0}
                        >
                            <Printer className="w-4 h-4 mr-2" />
                            สั่งพิมพ์เอกสาร
                        </Button>
                        <Button 
                            onClick={onConfirmDownload} 
                            disabled={isDownloading || totalDocuments === 0}
                            className="bg-indigo-600 hover:bg-indigo-700"
                        >
                            {isDownloading ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    กำลังดาวน์โหลด...
                                </>
                            ) : (
                                <>
                                    <Download className="w-4 h-4 mr-2" />
                                    บันทึกและดาวน์โหลดเอกสาร
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}