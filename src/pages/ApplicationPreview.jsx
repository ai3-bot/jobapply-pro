import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Loader2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import PDFLayoutType2 from '@/components/admin/pdf/PDFLayoutType2';

export default function ApplicationPreview() {
    const [selectedApplicantId, setSelectedApplicantId] = useState('');

    const { data: applicants = [], isLoading: applicantsLoading } = useQuery({
        queryKey: ['applicants_preview'],
        queryFn: () => base44.entities.Applicant.list()
    });

    const applicant = applicants.find(a => a.id === selectedApplicantId);

    if (applicantsLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 py-8">
            <div className="max-w-[210mm] mx-auto">
                <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
                    <label className="block mb-2">
                        <span className="text-sm font-semibold text-slate-700">เลือกผู้สมัคร</span>
                        <Select value={selectedApplicantId} onValueChange={setSelectedApplicantId}>
                            <SelectTrigger className="w-full mt-2">
                                <SelectValue placeholder="-- เลือกผู้สมัคร --" />
                            </SelectTrigger>
                            <SelectContent>
                                {applicants.map(app => (
                                    <SelectItem key={app.id} value={app.id}>
                                        {app.full_name} - {new Date(app.submission_date).toLocaleDateString('th-TH')}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </label>
                    {applicants.length === 0 && (
                        <p className="text-slate-500 text-center py-8">ยังไม่มีข้อมูลผู้สมัคร</p>
                    )}
                </div>
            </div>
            {applicant && (
                <div id="pdf-content">
                    <PDFLayoutType2 applicant={applicant} />
                </div>
            )}
        </div>
    );
}