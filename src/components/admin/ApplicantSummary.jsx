import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Briefcase, CheckCircle2, AlertCircle } from "lucide-react";

export default function ApplicantSummary({ applicant }) {
    const { personal_data, status, submission_date, start_work_date, job_position_id, approval_status, data_completion_status } = applicant;
    
    const getStatusColor = (status) => {
        switch(status) {
            case 'pending': return 'bg-amber-50 border-amber-200 text-amber-700';
            case 'accepted': return 'bg-green-50 border-green-200 text-green-700';
            case 'rejected': return 'bg-red-50 border-red-200 text-red-700';
            case 'interviewed': return 'bg-blue-50 border-blue-200 text-blue-700';
            default: return 'bg-slate-50 border-slate-200 text-slate-700';
        }
    };

    const completionPercent = data_completion_status === 1 ? 100 : 50;

    return (
        <div className="grid md:grid-cols-2 gap-4 mb-6">
            {/* Status & Application Info */}
            <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm">
                <div className="space-y-4">
                    <div>
                        <p className="text-xs font-semibold text-slate-500 uppercase mb-2">สถานะสมัคร</p>
                        <Badge className={`${getStatusColor(status)} border`}>
                            {status === 'pending' && 'รอพิจารณา'}
                            {status === 'interviewed' && 'สัมภาษณ์แล้ว'}
                            {status === 'accepted' && 'ผ่านการประเมิน'}
                            {status === 'rejected' && 'ไม่ผ่านการประเมิน'}
                        </Badge>
                    </div>
                    <div className="space-y-2">
                        {submission_date && (
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-slate-500">สมัครเมื่อ</span>
                                <span className="font-medium flex items-center gap-1">
                                    <Calendar className="w-4 h-4 text-slate-400" />
                                    {submission_date}
                                </span>
                            </div>
                        )}
                        {start_work_date && (
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-slate-500">วันเริ่มงาน</span>
                                <span className="font-medium flex items-center gap-1">
                                    <Calendar className="w-4 h-4 text-slate-400" />
                                    {start_work_date}
                                </span>
                            </div>
                        )}
                        {personal_data?.position_1 && (
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-slate-500">ตำแหน่งที่สมัคร</span>
                                <span className="font-medium flex items-center gap-1">
                                    <Briefcase className="w-4 h-4 text-slate-400" />
                                    {personal_data.position_1}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Approval Status */}
            <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm">
                <div className="space-y-4">
                    <div>
                        <p className="text-xs font-semibold text-slate-500 uppercase mb-3">ความคืบหน้า</p>
                        <div className="space-y-3">
                            <div>
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-sm font-medium text-slate-700">กรอกข้อมูลเสร็จ</span>
                                    <span className="text-xs font-semibold text-slate-500">{completionPercent}%</span>
                                </div>
                                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                                    <div 
                                        className="h-full bg-blue-500 transition-all"
                                        style={{ width: `${completionPercent}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-2 pt-2 border-t border-slate-100">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-500 flex items-center gap-2">
                                {approval_status === 1 ? <CheckCircle2 className="w-4 h-4 text-green-600" /> : <AlertCircle className="w-4 h-4 text-slate-400" />}
                                ผ่านการประเมิน
                            </span>
                            <Badge variant={approval_status === 1 ? "default" : "outline"} className={approval_status === 1 ? "bg-green-600" : "bg-slate-100 text-slate-600"}>
                                {approval_status === 1 ? 'ผ่าน' : approval_status === 0 ? 'ไม่ผ่าน' : '-'}
                            </Badge>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}