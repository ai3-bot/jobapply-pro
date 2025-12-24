import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Printer, Loader2 } from "lucide-react";
import PDFLayoutType2 from '../components/admin/pdf/PDFLayoutType2';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function PDFPreview() {
    const urlParams = new URLSearchParams(window.location.search);
    const applicantId = urlParams.get('id');

    const [generatingPdf, setGeneratingPdf] = useState(false);

    const { data: applicant, isLoading } = useQuery({
        queryKey: ['applicant_pdf', applicantId],
        queryFn: async () => {
            const applicants = await base44.entities.Applicant.filter({ id: applicantId });
            return applicants[0];
        },
        enabled: !!applicantId
    });

    const handlePrint = () => {
        window.print();
    };

    const handleDownload = async () => {
        const input = document.getElementById('pdf-content');
        if (!input) return;

        setGeneratingPdf(true);
        try {
            const canvas = await html2canvas(input, {
                scale: 2,
                useCORS: true,
                logging: false,
                windowWidth: 1200
            });

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const imgWidth = pdfWidth;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            let heightLeft = imgHeight;
            let position = 0;

            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pdfHeight;

            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pdfHeight;
            }

            pdf.save(`${applicant.full_name}_Application.pdf`);
        } catch (error) {
            console.error("PDF Generation failed", error);
            alert("เกิดข้อผิดพลาดในการสร้าง PDF");
        } finally {
            setGeneratingPdf(false);
        }
    };

    if (!applicantId) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-slate-50">
                <div className="text-center">
                    <p className="text-slate-500">ไม่พบข้อมูลผู้สมัคร</p>
                </div>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-slate-50">
                <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
            </div>
        );
    }

    if (!applicant) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-slate-50">
                <div className="text-center">
                    <p className="text-slate-500">ไม่พบข้อมูลผู้สมัคร</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-100">
            {/* Controls */}
            <div className="fixed top-16 left-0 right-0 bg-white border-b border-slate-200 z-40 print:hidden">
                <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <h1 className="font-bold text-lg text-slate-800">PDF Preview: {applicant.full_name}</h1>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={handlePrint}>
                            <Printer className="w-4 h-4 mr-2" />
                            Print
                        </Button>
                        <Button 
                            onClick={handleDownload}
                            disabled={generatingPdf}
                            className="bg-indigo-600 hover:bg-indigo-700"
                        >
                            {generatingPdf ? (
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            ) : (
                                <Download className="w-4 h-4 mr-2" />
                            )}
                            Download PDF
                        </Button>
                    </div>
                </div>
            </div>

            {/* PDF Content */}
            <div className="pt-24 pb-8">
                <div id="pdf-content">
                    <PDFLayoutType2 applicant={applicant} />
                </div>
            </div>
        </div>
    );
}