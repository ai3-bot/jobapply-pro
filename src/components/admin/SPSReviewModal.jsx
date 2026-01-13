import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { base44 } from '@/api/base44Client';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { Loader2, FileDown, Eye } from "lucide-react";
import SPS103Document from '@/components/application/pdf/SPS103Document';
import SPS902Document from '@/components/application/pdf/SPS902Document';
import SignaturePad from '@/components/admin/SignaturePad';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import toast from 'react-hot-toast';

export default function SPSReviewModal({ applicant, pdfDoc, isOpen, onClose }) {
    const queryClient = useQueryClient();
    const [generatingPdf, setGeneratingPdf] = useState(false);
    const [employerData, setEmployerData] = useState({
        employerSignature: '',
        employerPosition: '',
        employerSignDate: new Date().toISOString().split('T')[0]
    });

    useEffect(() => {
        if (pdfDoc?.data?.employer_data) {
            setEmployerData({
                employerSignature: pdfDoc.data.employer_data.employerSignature || '',
                employerPosition: pdfDoc.data.employer_data.employerPosition || '',
                employerSignDate: pdfDoc.data.employer_data.employerSignDate || new Date().toISOString().split('T')[0]
            });
        }
    }, [pdfDoc]);

    const updateMutation = useMutation({
        mutationFn: async (data) => {
            if (pdfDoc) {
                return await base44.entities.PdfBase.update(pdfDoc.id, data);
            }
            return null;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['sps_documents']);
            queryClient.invalidateQueries(['sps_pdf_data', applicant?.id]);
            toast.success('บันทึกข้อมูลเรียบร้อยแล้ว');
            onClose();
        },
        onError: () => {
            toast.error('เกิดข้อผิดพลาดในการบันทึก');
        }
    });

    const handleSave = () => {
        if (!pdfDoc) return;

        const updatedData = {
            data: {
                ...(pdfDoc.data || {}),
                employer_data: employerData
            },
            status: 'approved',
            approved_date: new Date().toISOString()
        };
        updateMutation.mutate(updatedData);
    };

    const handleGeneratePDF = async (action) => {
        // Use a specific class or ID that wraps the SPS document content
        const content = document.querySelector('#sps-review-content');
        if (!content) return;

        setGeneratingPdf(true);
        try {
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            
            // The document might have multiple pages (SPS103 usually fits on one but let's handle if it overflows or if we just want the container)
            // SPS components are designed to be A4 size usually.
            
            const canvas = await html2canvas(content, {
                scale: 2,
                useCORS: true,
                logging: false,
                windowWidth: 1200
            });

            const imgData = canvas.toDataURL('image/png');
            const imgWidth = pdfWidth;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

            if (action === 'download') {
                pdf.save(`${pdfDoc?.pdf_type || 'SPS'}_${applicant?.full_name || 'Document'}.pdf`);
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

    if (!applicant || !pdfDoc) return null;

    const spsType = pdfDoc.pdf_type === 'SPS-9-02' ? '9-02' : '1-03';
    
    // Merge existing form data with employer data for preview
    const previewFormData = {
        ...(pdfDoc.data || {}),
        ...employerData
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-xl">ตรวจสอบและอนุมัติเอกสาร สปส. {spsType} - {applicant.full_name}</DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    {/* Admin Form */}
                    <div className="bg-slate-50 p-4 rounded-lg space-y-4">
                        <h3 className="font-semibold text-lg">ส่วนของนายจ้าง</h3>
                        
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label>ตำแหน่งผู้ลงนาม</Label>
                                <Input
                                    value={employerData.employerPosition}
                                    onChange={(e) => setEmployerData({ ...employerData, employerPosition: e.target.value })}
                                    placeholder="เช่น กรรมการผู้จัดการ, ผู้จัดการฝ่ายบุคคล"
                                />
                            </div>
                            <div>
                                <Label>วันที่ลงนาม</Label>
                                <Input
                                    type="date"
                                    value={employerData.employerSignDate}
                                    onChange={(e) => setEmployerData({ ...employerData, employerSignDate: e.target.value })}
                                />
                            </div>
                        </div>

                        <div>
                            <Label>ลายเซ็นนายจ้าง</Label>
                            <SignaturePad 
                                signatureUrl={employerData.employerSignature}
                                onSave={(url) => setEmployerData({ ...employerData, employerSignature: url })}
                                onDelete={() => setEmployerData({ ...employerData, employerSignature: '' })}
                            />
                        </div>
                    </div>

                    {/* Document Preview */}
                    <div className="bg-slate-100 p-4 rounded-lg">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-semibold text-lg">ตัวอย่างเอกสาร</h3>
                            <div className="flex gap-2">
                                <Button 
                                    variant="outline"
                                    onClick={() => handleGeneratePDF('preview')}
                                    disabled={generatingPdf}
                                    size="sm"
                                >
                                    {generatingPdf ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Eye className="w-4 h-4 mr-2" />}
                                    Preview
                                </Button>
                                <Button 
                                    onClick={() => handleGeneratePDF('download')}
                                    disabled={generatingPdf}
                                    size="sm"
                                >
                                    {generatingPdf ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <FileDown className="w-4 h-4 mr-2" />}
                                    ดาวน์โหลด
                                </Button>
                            </div>
                        </div>
                        
                        <div className="max-h-[600px] overflow-auto bg-white p-4 flex justify-center">
                            <div id="sps-review-content">
                                {spsType === '1-03' ? (
                                    <SPS103Document 
                                        applicant={applicant}
                                        formData={previewFormData}
                                    />
                                ) : (
                                    <SPS902Document 
                                        applicant={applicant}
                                        formData={previewFormData}
                                    />
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={onClose}>
                            ยกเลิก
                        </Button>
                        <Button 
                            onClick={handleSave}
                            disabled={updateMutation.isPending}
                            className="bg-green-600 hover:bg-green-700"
                        >
                            {updateMutation.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                            บันทึกและอนุมัติเอกสาร
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}