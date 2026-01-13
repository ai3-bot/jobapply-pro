import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { base44 } from '@/api/base44Client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Loader2, FileDown, Eye } from "lucide-react";
import CriminalCheckDocument from '@/components/application/pdf/CriminalCheckDocument';
import SignaturePad from '@/components/admin/SignaturePad';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import toast from 'react-hot-toast';

export default function CriminalCheckReviewModal({ applicant, pdfDoc, isOpen, onClose }) {
    const queryClient = useQueryClient();
    const [generatingPdf, setGeneratingPdf] = useState(false);
    const [companyData, setCompanyData] = useState({
        receiverName: applicant?.criminal_check_document?.company_data?.receiverName || '',
        receiverSignature: applicant?.criminal_check_document?.company_data?.receiverSignature || '',
        receiverDate: applicant?.criminal_check_document?.company_data?.receiverDate || '',
        witnessName1: applicant?.criminal_check_document?.company_data?.witnessName1 || '',
        witness1Signature: applicant?.criminal_check_document?.company_data?.witness1Signature || '',
        witness1Date: applicant?.criminal_check_document?.company_data?.witness1Date || '',
        witnessName2: applicant?.criminal_check_document?.company_data?.witnessName2 || '',
        witness2Signature: applicant?.criminal_check_document?.company_data?.witness2Signature || '',
        witness2Date: applicant?.criminal_check_document?.company_data?.witness2Date || ''
    });

    const updateMutation = useMutation({
        mutationFn: async (data) => {
            return await base44.entities.Applicant.update(applicant.id, data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['applicants']);
            toast.success('บันทึกข้อมูลเรียบร้อยแล้ว');
            onClose();
        },
        onError: () => {
            toast.error('เกิดข้อผิดพลาดในการบันทึก');
        }
    });

    const handleSave = () => {
        const updatedData = {
            criminal_check_document: {
                ...applicant.criminal_check_document,
                status: 'completed',
                company_data: companyData,
                completed_date: new Date().toISOString()
            }
        };
        updateMutation.mutate(updatedData);
    };

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
                pdf.save(`CriminalCheck_${applicant?.full_name || 'Document'}.pdf`);
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

    if (!applicant) return null;

    const employeeData = applicant.criminal_check_document?.employee_data || {};
    const pdfBaseData = pdfDoc || {};

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-xl">ตรวจสอบและกรอกข้อมูลหนังสือมอบอำนาจฯ - {applicant.full_name}</DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    {/* Admin Form */}
                    <div className="bg-slate-50 p-4 rounded-lg space-y-4">
                        <h3 className="font-semibold text-lg">ลงชื่อผู้รับมอบอำนาจและพยาน</h3>

                        <div className="border-t pt-4">
                            <h4 className="font-medium mb-3">ผู้รับมอบอำนาจ</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label>ชื่อผู้รับมอบอำนาจ</Label>
                                    <Input
                                        value={companyData.receiverName}
                                        onChange={(e) => setCompanyData({ ...companyData, receiverName: e.target.value })}
                                        placeholder="ชื่อ-นามสกุล"
                                    />
                                </div>
                                <div>
                                    <Label>วันที่</Label>
                                    <Input
                                        type="date"
                                        value={companyData.receiverDate}
                                        onChange={(e) => setCompanyData({ ...companyData, receiverDate: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="mt-4">
                                <Label>ลายเซ็นผู้รับมอบอำนาจ</Label>
                                <SignaturePad 
                                    signatureUrl={companyData.receiverSignature}
                                    onSave={(url) => setCompanyData({ ...companyData, receiverSignature: url })}
                                />
                            </div>
                        </div>

                        <div className="border-t pt-4">
                            <h4 className="font-medium mb-3">พยาน</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <Label>ชื่อพยานคนที่ 1</Label>
                                    <Input
                                        value={companyData.witnessName1}
                                        onChange={(e) => setCompanyData({ ...companyData, witnessName1: e.target.value })}
                                        placeholder="ชื่อ-นามสกุล"
                                    />
                                    <div className="mt-2">
                                        <Label>วันที่</Label>
                                        <Input
                                            type="date"
                                            value={companyData.witness1Date}
                                            onChange={(e) => setCompanyData({ ...companyData, witness1Date: e.target.value })}
                                        />
                                    </div>
                                    <div className="mt-2">
                                        <Label>ลายเซ็นพยานคนที่ 1</Label>
                                        <SignaturePad 
                                            signatureUrl={companyData.witness1Signature}
                                            onSave={(url) => setCompanyData({ ...companyData, witness1Signature: url })}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <Label>ชื่อพยานคนที่ 2</Label>
                                    <Input
                                        value={companyData.witnessName2}
                                        onChange={(e) => setCompanyData({ ...companyData, witnessName2: e.target.value })}
                                        placeholder="ชื่อ-นามสกุล"
                                    />
                                    <div className="mt-2">
                                        <Label>วันที่</Label>
                                        <Input
                                            type="date"
                                            value={companyData.witness2Date}
                                            onChange={(e) => setCompanyData({ ...companyData, witness2Date: e.target.value })}
                                        />
                                    </div>
                                    <div className="mt-2">
                                        <Label>ลายเซ็นพยานคนที่ 2</Label>
                                        <SignaturePad 
                                            signatureUrl={companyData.witness2Signature}
                                            onSave={(url) => setCompanyData({ ...companyData, witness2Signature: url })}
                                        />
                                    </div>
                                </div>
                            </div>
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
                        
                        <div className="max-h-[500px] overflow-auto bg-white p-4">
                            <CriminalCheckDocument 
                                applicant={{
                                    ...applicant,
                                    criminal_check_document: {
                                        ...applicant.criminal_check_document,
                                        company_data: companyData
                                    }
                                }}
                                formData={employeeData}
                                pdfData={{ data: pdfDoc?.data }}
                            />
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