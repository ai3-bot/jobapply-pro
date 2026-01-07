import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Eye, Loader2, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SPS103Document from '@/components/application/pdf/SPS103Document';
import SPS902Document from '@/components/application/pdf/SPS902Document';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import toast from 'react-hot-toast';

export default function SPSFormPage() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [applicantId, setApplicantId] = useState(null);
    const [generatingPdf, setGeneratingPdf] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        // For SPS 1-03
        previousEmployer: '',
        previousEmployerId: '',
        lastWorkDate: '',
        newEmployer: '',
        newEmployerId: '',
        
        // For SPS 9-02
        employerName: '',
        employerId: '',
        educationLevel: '',
        educationMajor: '',
        
        // Common
        salary: '',
        signatureDate: ''
    });

    useEffect(() => {
        const id = localStorage.getItem('user_applicant_id');
        if (!id) {
            navigate('/user-login');
        } else {
            setApplicantId(id);
        }
    }, [navigate]);

    const { data: applicant } = useQuery({
        queryKey: ['user_applicant', applicantId],
        queryFn: async () => {
            const applicants = await base44.entities.Applicant.list();
            return applicants.find(a => a.id === applicantId);
        },
        enabled: !!applicantId
    });

    const submitMutation = useMutation({
        mutationFn: async (data) => {
            return await base44.entities.Applicant.update(applicantId, data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['user_applicant', applicantId]);
            toast.success('ส่งเอกสารเรียบร้อยแล้ว');
            navigate('/user-dashboard');
        },
        onError: () => {
            toast.error('เกิดข้อผิดพลาดในการส่งเอกสาร');
        }
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

            const spsType = applicant?.admin_data?.sps_form_type || '1-03';
            if (action === 'download') {
                pdf.save(`SPS_${spsType}_${applicant?.full_name || 'Document'}.pdf`);
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

    const handleSubmit = () => {
        const spsData = {
            sps_document: {
                status: 'submitted',
                form_type: applicant?.admin_data?.sps_form_type || '1-03',
                form_data: formData,
                submitted_date: new Date().toISOString()
            }
        };
        submitMutation.mutate(spsData);
    };

    if (!applicant) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
                <div className="text-slate-400">กำลังโหลด...</div>
            </div>
        );
    }

    const spsType = applicant?.admin_data?.sps_form_type || '1-03';

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-6">
            <div className="max-w-5xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <Button 
                        variant="outline" 
                        onClick={() => navigate('/user-dashboard')}
                        className="flex items-center gap-2"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        กลับ
                    </Button>
                    <div className="flex gap-2">
                        <Button 
                            onClick={() => setShowForm(true)}
                            className="bg-indigo-600 hover:bg-indigo-700"
                        >
                            กรอกเอกสาร
                        </Button>
                        <Button 
                            variant="outline"
                            onClick={() => handleGeneratePDF('preview')}
                            disabled={generatingPdf}
                        >
                            {generatingPdf ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Eye className="w-4 h-4 mr-2" />}
                            Preview
                        </Button>
                        <Button 
                            onClick={handleSubmit}
                            disabled={submitMutation.isPending}
                            className="bg-green-600 hover:bg-green-700"
                        >
                            {submitMutation.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Send className="w-4 h-4 mr-2" />}
                            ส่งเอกสาร
                        </Button>
                    </div>
                </div>

                {/* Document Preview Card */}
                <Card className="shadow-xl">
                    <CardHeader className="border-b bg-slate-50">
                        <CardTitle>แบบฟอร์ม สปส. {spsType}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="overflow-auto max-h-[800px] bg-slate-100 p-8 flex justify-center">
                            <div id="sps-content">
                                {spsType === '1-03' ? (
                                    <SPS103Document 
                                        applicant={applicant}
                                        formData={formData}
                                    />
                                ) : (
                                    <SPS902Document 
                                        applicant={applicant}
                                        formData={formData}
                                    />
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Form Modal */}
                {showForm && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                        <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                            <CardHeader className="border-b bg-slate-50">
                                <CardTitle>กรอกข้อมูล สปส. {spsType}</CardTitle>
                            </CardHeader>
                            <CardContent className="p-6 space-y-6">
                                {spsType === '1-03' ? (
                                    // Form for SPS 1-03
                                    <div className="space-y-4">
                                        <div className="p-4 bg-blue-50 border border-blue-200 rounded">
                                            <p className="text-sm font-medium">แบบฟอร์มนี้สำหรับผู้ที่มีประกันสังคมอยู่แล้ว และย้ายมาจากนายจ้างรายเดิม</p>
                                        </div>

                                        <div>
                                            <h3 className="font-semibold text-slate-800 mb-3">ข้อมูลนายจ้างเดิม</h3>
                                            <div className="space-y-3">
                                                <div>
                                                    <Label>ชื่อสถานประกอบการเดิม</Label>
                                                    <Input
                                                        value={formData.previousEmployer}
                                                        onChange={(e) => setFormData({ ...formData, previousEmployer: e.target.value })}
                                                        placeholder="ชื่อบริษัท/ห้างร้าน"
                                                    />
                                                </div>
                                                <div>
                                                    <Label>เลขที่นายจ้าง (10 หลัก)</Label>
                                                    <Input
                                                        value={formData.previousEmployerId}
                                                        onChange={(e) => setFormData({ ...formData, previousEmployerId: e.target.value })}
                                                        placeholder="เลข 10 หลัก"
                                                    />
                                                </div>
                                                <div>
                                                    <Label>วันที่ออกจากงาน</Label>
                                                    <Input
                                                        type="date"
                                                        value={formData.lastWorkDate}
                                                        onChange={(e) => setFormData({ ...formData, lastWorkDate: e.target.value })}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <h3 className="font-semibold text-slate-800 mb-3">ข้อมูลนายจ้างใหม่</h3>
                                            <div className="space-y-3">
                                                <div>
                                                    <Label>ชื่อสถานประกอบการใหม่</Label>
                                                    <Input
                                                        value={formData.newEmployer}
                                                        onChange={(e) => setFormData({ ...formData, newEmployer: e.target.value })}
                                                        placeholder="ชื่อบริษัท/ห้างร้าน"
                                                    />
                                                </div>
                                                <div>
                                                    <Label>เลขที่นายจ้าง (10 หลัก)</Label>
                                                    <Input
                                                        value={formData.newEmployerId}
                                                        onChange={(e) => setFormData({ ...formData, newEmployerId: e.target.value })}
                                                        placeholder="เลข 10 หลัก"
                                                    />
                                                </div>
                                                <div>
                                                    <Label>อัตราค่าจ้าง (บาท/เดือน)</Label>
                                                    <Input
                                                        value={formData.salary}
                                                        onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                                                        placeholder="เงินเดือน"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <Label>วันที่ลงนาม</Label>
                                            <Input
                                                type="date"
                                                value={formData.signatureDate}
                                                onChange={(e) => setFormData({ ...formData, signatureDate: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    // Form for SPS 9-02
                                    <div className="space-y-4">
                                        <div className="p-4 bg-blue-50 border border-blue-200 rounded">
                                            <p className="text-sm font-medium">แบบฟอร์มนี้สำหรับผู้ที่ยังไม่เคยมีประกันสังคม</p>
                                        </div>

                                        <div>
                                            <h3 className="font-semibold text-slate-800 mb-3">ข้อมูลนายจ้าง</h3>
                                            <div className="space-y-3">
                                                <div>
                                                    <Label>ชื่อสถานประกอบการ</Label>
                                                    <Input
                                                        value={formData.employerName}
                                                        onChange={(e) => setFormData({ ...formData, employerName: e.target.value })}
                                                        placeholder="ชื่อบริษัท/ห้างร้าน"
                                                    />
                                                </div>
                                                <div>
                                                    <Label>เลขที่นายจ้าง (10 หลัก)</Label>
                                                    <Input
                                                        value={formData.employerId}
                                                        onChange={(e) => setFormData({ ...formData, employerId: e.target.value })}
                                                        placeholder="เลข 10 หลัก"
                                                    />
                                                </div>
                                                <div>
                                                    <Label>อัตราค่าจ้าง (บาท/เดือน)</Label>
                                                    <Input
                                                        value={formData.salary}
                                                        onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                                                        placeholder="เงินเดือน"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <h3 className="font-semibold text-slate-800 mb-3">วุฒิการศึกษา</h3>
                                            <div className="space-y-3">
                                                <div>
                                                    <Label>ระดับการศึกษาสูงสุด</Label>
                                                    <Input
                                                        value={formData.educationLevel}
                                                        onChange={(e) => setFormData({ ...formData, educationLevel: e.target.value })}
                                                        placeholder="เช่น ปริญญาตรี, ปวส."
                                                    />
                                                </div>
                                                <div>
                                                    <Label>สาขาวิชา</Label>
                                                    <Input
                                                        value={formData.educationMajor}
                                                        onChange={(e) => setFormData({ ...formData, educationMajor: e.target.value })}
                                                        placeholder="เช่น บริหารธุรกิจ, คอมพิวเตอร์"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <Label>วันที่ลงนาม</Label>
                                            <Input
                                                type="date"
                                                value={formData.signatureDate}
                                                onChange={(e) => setFormData({ ...formData, signatureDate: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                )}

                                <div className="flex justify-end gap-2 pt-4">
                                    <Button 
                                        variant="outline"
                                        onClick={() => setShowForm(false)}
                                    >
                                        ปิด
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )}
            </div>
        </div>
    );
}