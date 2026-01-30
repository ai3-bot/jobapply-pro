import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FileCheck, Download, Printer, X, Loader2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function DownloadPreviewModal({ 
    isOpen, 
    onClose, 
    applicant, 
    documents, 
    onConfirmDownload, 
    onPrint,
    isDownloading 
}) {
    if (!applicant) return null;

    const documentTypes = [
        { key: 'nda', label: 'NDA (FM-HRD-27)', color: 'indigo' },
        { key: 'pdpa', label: 'PDPA', color: 'teal' },
        { key: 'fmhrd19', label: 'FM-HRD-19', color: 'blue' },
        { key: 'sps103', label: 'SPS 1-03', color: 'pink' },
        { key: 'sps902', label: 'SPS 9-02', color: 'purple' },
        { key: 'insurance', label: 'ใบสมัครประกัน', color: 'cyan' },
        { key: 'employmentContract', label: 'สัญญาจ้างงาน', color: 'green' },
        { key: 'fmhrd30', label: 'FM-HRD-30', color: 'orange' },
        { key: 'criminalCheck', label: 'หนังสือมอบอำนาจ', color: 'amber' },
    ];

    const totalDocuments = Object.values(documents).reduce((sum, docs) => sum + (docs?.length || 0), 0);

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl max-h-[80vh]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-xl">
                        <FileCheck className="w-6 h-6 text-indigo-600" />
                        สรุปเอกสารของ {applicant.full_name}
                    </DialogTitle>
                </DialogHeader>

                <ScrollArea className="max-h-[50vh] pr-4">
                    <div className="space-y-3">
                        {documentTypes.map(({ key, label, color }) => {
                            const count = documents[key]?.length || 0;
                            return (
                                <div 
                                    key={key} 
                                    className={`flex items-center justify-between p-3 rounded-lg border ${count > 0 ? `bg-${color}-50 border-${color}-200` : 'bg-slate-50 border-slate-200'}`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${count > 0 ? `bg-${color}-100` : 'bg-slate-100'}`}>
                                            <FileCheck className={`w-4 h-4 ${count > 0 ? `text-${color}-600` : 'text-slate-400'}`} />
                                        </div>
                                        <span className={count > 0 ? 'font-medium text-slate-800' : 'text-slate-500'}>
                                            {label}
                                        </span>
                                    </div>
                                    <span className={`px-2 py-1 rounded text-sm font-medium ${count > 0 ? `bg-${color}-100 text-${color}-700` : 'bg-slate-100 text-slate-500'}`}>
                                        {count} เอกสาร
                                    </span>
                                </div>
                            );
                        })}
                    </div>

                    <div className="mt-6 p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                        <div className="flex items-center justify-between">
                            <span className="font-semibold text-indigo-800">รวมทั้งหมด</span>
                            <span className="text-2xl font-bold text-indigo-600">{totalDocuments} เอกสาร</span>
                        </div>
                    </div>
                </ScrollArea>

                <DialogFooter className="flex gap-2 sm:gap-2">
                    <Button variant="outline" onClick={onClose}>
                        <X className="w-4 h-4 mr-2" />
                        ยกเลิก
                    </Button>
                    <Button variant="outline" onClick={onPrint} disabled={totalDocuments === 0}>
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
                                ยืนยันดาวน์โหลดเอกสารทั้งหมด
                            </>
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}