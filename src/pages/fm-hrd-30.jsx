import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { useQueryClient, useQuery } from '@tanstack/react-query';
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileDown, Eye, Loader2 } from "lucide-react";
import FMHRD30Document from '@/components/application/pdf/FMHRD30Document';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import toast from 'react-hot-toast';
import { createPageUrl } from '@/utils';

export default function FMHRD30Page() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [applicantId, setApplicantId] = useState(null);
    const [generatingPdf, setGeneratingPdf] = useState(false);

    useEffect(() => {
        const id = localStorage.getItem('user_applicant_id');
        if (!id) {
            navigate(createPageUrl('user-login'));
        } else {
            setApplicantId(id);
        }
    }, [navigate]);

    const { data: applicant, isLoading } = useQuery({
        queryKey: ['applicant', applicantId],
        queryFn: () => base44.entities.Applicant.list().then(apps => apps.find(a => a.id === applicantId)),
        enabled: !!applicantId
    });

    const handleGeneratePDF = async (action) => {
        const pages = document.querySelectorAll('.pdpa-page');
        if (!pages || pages.length === 0) return;

        setGeneratingPdf(true);
        try {
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();

            for (let i = 0; i < pages.length; i++) {
                const page = pages[i];
                const canvas = await html2canvas(page, {
                    scale: 2,
                    useCORS: true,
                    logging: false,
                    windowWidth: 1200
                });

                const imgData = canvas.toDataURL('image/png');
                const imgWidth = pdfWidth;
                const imgHeight = (canvas.height * imgWidth) / canvas.width;

                if (i > 0) {
                    pdf.addPage();
                }
                pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
            }

            if (action === 'download') {
                pdf.save(`FMHRD30_${applicant?.full_name || 'Document'}.pdf`);
            } else {
                window.open(pdf.output('bloburl'), '_blank');
            }
        } catch (error) {
            console.error("PDF Generation failed", error);
            alert("เกิดข้อผิดพลาดในการสร้าง PDF");
        } finally {
            setGeneratingPdf(false);
        }
    };

    const handleAcknowledge = async () => {
        try {
            await base44.entities.Applicant.update(applicant.id, {
                fmhrd30_document: {
                    acknowledged: true,
                    acknowledged_date: new Date().toISOString()
                }
            });
            
            queryClient.invalidateQueries(['applicant', applicantId]);
            toast.success('รับทราบเรียบร้อยแล้ว');
            navigate(createPageUrl('user-dashboard'));
        } catch (error) {
            console.error('Error acknowledging document:', error);
            toast.error('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง');
        }
    };

    if (isLoading || !applicant) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
            </div>
        );
    }

    const isAcknowledged = applicant?.fmhrd30_document?.acknowledged;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="mb-6">
                    <Button
                        variant="ghost"
                        onClick={() => navigate(createPageUrl('user-dashboard'))}
                        className="mb-4"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        กลับไปหน้าหลัก
                    </Button>
                    <h1 className="text-3xl font-bold text-slate-900">การตรวจประวัติอาชญากรรม (FM-HRD-30)</h1>
                    <p className="text-slate-600 mt-2">โปรดอ่านและรับทราบเอกสารนี้</p>
                </div>

                {/* Actions */}
                <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                    <div className="flex flex-wrap gap-3">
                        <Button
                            variant="outline"
                            onClick={() => handleGeneratePDF('preview')}
                            disabled={generatingPdf}
                        >
                            {generatingPdf ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Eye className="w-4 h-4 mr-2" />}
                            ดูตัวอย่าง
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => handleGeneratePDF('download')}
                            disabled={generatingPdf}
                        >
                            {generatingPdf ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <FileDown className="w-4 h-4 mr-2" />}
                            ดาวน์โหลด PDF
                        </Button>
                        <Button
                            onClick={handleAcknowledge}
                            disabled={isAcknowledged}
                            className="bg-green-600 hover:bg-green-700 ml-auto"
                        >
                            {isAcknowledged ? '✓ รับทราบแล้ว' : 'รับทราบ'}
                        </Button>
                    </div>
                </div>

                {/* Document Preview */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <FMHRD30Document applicant={applicant} />
                </div>
            </div>
        </div>
    );
}