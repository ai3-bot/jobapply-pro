import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Check, Square } from 'lucide-react';

export default function PDFLayout({ applicant }) {
    const { data: settings } = useQuery({
        queryKey: ['system_settings_pdf'],
        queryFn: () => base44.entities.SystemSetting.list(),
        staleTime: 1000 * 60 * 5 
    });
    
    const appLogo = settings?.find(s => s.key === 'app_logo')?.value;
    const p = applicant.personal_data || {};
    const f = applicant.family_data || {};

    // Helper for data fields with bottom border
    const Field = ({ label, value, className = "", fullWidth = false }) => (
        <div className={`flex flex-col ${className} ${fullWidth ? 'w-full' : ''}`}>
            <div className="flex items-end text-[12px] leading-tight">
                <span className="font-semibold text-slate-700 mr-2 whitespace-nowrap">{label}:</span>
                <span className="flex-1 border-b border-slate-300 text-slate-900 px-1 pb-0.5 min-h-[18px]">
                    {value || "-"}
                </span>
            </div>
        </div>
    );

    // Helper for checkbox
    const CheckBox = ({ label, checked }) => (
        <div className="flex items-center gap-1.5 min-w-fit">
            <div className={`w-3.5 h-3.5 border border-slate-400 rounded-sm flex items-center justify-center ${checked ? 'bg-slate-800 border-slate-800' : 'bg-white'}`}>
                {checked && <Check className="w-2.5 h-2.5 text-white" strokeWidth={4} />}
            </div>
            <span className="text-[12px] text-slate-700 pt-0.5">{label}</span>
        </div>
    );

    // Section Header
    const SectionHeader = ({ title }) => (
        <div className="bg-slate-100 border-l-4 border-slate-800 px-2 py-1 mt-4 mb-2">
            <h3 className="text-[14px] font-bold text-slate-800 uppercase tracking-wide">{title}</h3>
        </div>
    );

    return (
        <div 
            className="bg-white text-slate-900 p-[10mm] mx-auto shadow-2xl"
            style={{ 
                width: '210mm', 
                minHeight: '297mm',
                fontFamily: 'Sarabun, sans-serif'
            }}
        >
            {/* Header */}
            <div className="flex justify-between items-start mb-6 border-b-2 border-slate-800 pb-4">
                <div className="flex items-center gap-4">
                    {appLogo ? (
                        <img src={appLogo} alt="Logo" className="h-16 w-auto object-contain" />
                    ) : (
                        <div className="h-16 w-16 bg-slate-100 rounded flex items-center justify-center text-xs text-slate-400">
                            NO LOGO
                        </div>
                    )}
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">ใบสมัครงาน</h1>
                        <p className="text-slate-500 text-sm font-medium tracking-wider uppercase">Employment Application</p>
                    </div>
                </div>
                <div className="text-right flex flex-col items-end gap-2">
                    <div className="border-2 border-slate-200 rounded p-1 w-[2.5cm] h-[3.2cm] flex items-center justify-center bg-slate-50">
                        {applicant.photo_url ? (
                            <img src={applicant.photo_url} alt="Applicant" className="w-full h-full object-cover" />
                        ) : (
                            <span className="text-xs text-slate-300">รูปถ่าย 1 นิ้ว</span>
                        )}
                    </div>
                </div>
            </div>

            {/* Position & Salary */}
            <div className="grid grid-cols-3 gap-x-6 gap-y-3 mb-6 bg-slate-50 p-4 rounded border border-slate-100">
                <Field label="วันที่เขียนใบสมัคร" value={p.application_date} />
                <Field label="ตำแหน่งที่ 1" value={p.position_1} />
                <Field label="เงินเดือนที่ต้องการ" value={p.expected_salary} />
                <Field label="ตำแหน่งที่ 2" value={p.position_2} className="col-start-2" />
            </div>

            {/* Personal Details */}
            <SectionHeader title="1. ประวัติส่วนตัว (Personal Details)" />
            <div className="grid grid-cols-12 gap-x-4 gap-y-3 mb-4">
                <div className="col-span-6 flex gap-2">
                     <Field label="ชื่อ-สกุล (ไทย)" value={`${p.prefix || ''} ${p.first_name || ''} ${p.last_name || ''}`} className="flex-1" />
                     <Field label="ชื่อเล่น" value={p.thai_nickname} className="w-20" />
                </div>
                <div className="col-span-6">
                    <Field label="Name (English)" value={p.english_name} fullWidth />
                </div>

                <div className="col-span-4"><Field label="เลขบัตรประชาชน" value={p.id_card} fullWidth /></div>
                <div className="col-span-3"><Field label="วันเกิด" value={p.dob} fullWidth /></div>
                <div className="col-span-2"><Field label="อายุ" value={`${p.age || '-'} ปี`} fullWidth /></div>
                <div className="col-span-3 flex gap-2">
                    <Field label="ส่วนสูง" value={p.height} className="flex-1" />
                    <Field label="น้ำหนัก" value={p.weight} className="flex-1" />
                </div>

                <div className="col-span-3"><Field label="เชื้อชาติ" value={p.race} fullWidth /></div>
                <div className="col-span-3"><Field label="สัญชาติ" value={p.nationality} fullWidth /></div>
                <div className="col-span-3"><Field label="ศาสนา" value={p.religion} fullWidth /></div>
                <div className="col-span-3"><Field label="เพศ" value={p.gender === 'male' ? 'ชาย' : p.gender === 'female' ? 'หญิง' : '-'} fullWidth /></div>
            </div>

            {/* Contact Info */}
            <div className="mb-4">
                <div className="grid grid-cols-2 gap-6 mb-3">
                    <Field label="เบอร์โทรศัพท์มือถือ" value={p.mobile_phone} fullWidth />
                    <Field label="อีเมล" value={p.email} fullWidth />
                </div>
                
                <div className="space-y-2 text-[12px]">
                    <div className="flex gap-2">
                        <span className="font-semibold text-slate-700 whitespace-nowrap w-24">ที่อยู่ตามทะเบียนบ้าน:</span>
                        <span className="flex-1 border-b border-slate-300 pb-0.5">
                            {p.registered_address ? 
                                `เลขที่ ${p.registered_address.number || '-'} หมู่ ${p.registered_address.moo || '-'} ถนน ${p.registered_address.road || '-'} 
                                แขวง/ตำบล ${p.registered_address.subdistrict || '-'} เขต/อำเภอ ${p.registered_address.district || '-'} 
                                จังหวัด ${p.registered_address.province || '-'} ${p.registered_address.zipcode || '-'}`
                                : '-'
                            }
                        </span>
                    </div>
                    <div className="flex gap-2">
                        <span className="font-semibold text-slate-700 whitespace-nowrap w-24">ที่อยู่ปัจจุบัน:</span>
                        <span className="flex-1 border-b border-slate-300 pb-0.5">
                            {p.current_address ? 
                                `เลขที่ ${p.current_address.number || '-'} หมู่ ${p.current_address.moo || '-'} ถนน ${p.current_address.road || '-'} 
                                แขวง/ตำบล ${p.current_address.subdistrict || '-'} เขต/อำเภอ ${p.current_address.district || '-'} 
                                จังหวัด ${p.current_address.province || '-'} ${p.current_address.zipcode || '-'}`
                                : '-'
                            }
                        </span>
                    </div>
                </div>
            </div>

            {/* Status Section - Redesigned to columns as requested */}
            <SectionHeader title="2. สถานภาพ (Status)" />
            <div className="border border-slate-200 rounded p-4">
                <div className="grid grid-cols-2 gap-8">
                    {/* Left Column: Military & Male Status */}
                    <div className="space-y-4">
                        <div>
                            <div className="font-bold text-[13px] text-slate-800 mb-2 border-b border-slate-100 pb-1">การเกณฑ์ทหาร (สำหรับชาย)</div>
                            <div className="grid grid-cols-2 gap-2">
                                <CheckBox label="ได้รับการยกเว้น" checked={p.military_status === 'exempted'} />
                                <CheckBox label="เกณฑ์ทหารแล้ว" checked={p.military_status === 'conscripted'} />
                                <CheckBox label="ยังไม่ได้รับการเกณฑ์" checked={p.military_status === 'not_yet'} />
                            </div>
                        </div>
                        <div>
                            <div className="font-bold text-[13px] text-slate-800 mb-2 border-b border-slate-100 pb-1">สถานภาพสมรส</div>
                            <div className="grid grid-cols-2 gap-2">
                                <CheckBox label="โสด" checked={f.marital_status === 'single'} />
                                <CheckBox label="สมรส" checked={f.marital_status === 'married'} />
                                <CheckBox label="หย่าร้าง" checked={f.marital_status === 'divorced'} />
                                <CheckBox label="หม้าย" checked={f.marital_status === 'widowed'} />
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Female Status & Family */}
                    <div className="space-y-4">
                        <div>
                            <div className="font-bold text-[13px] text-slate-800 mb-2 border-b border-slate-100 pb-1">สถานภาพ (สำหรับหญิง)</div>
                            <div className="space-y-2">
                                <div className="grid grid-cols-2 gap-2">
                                    <CheckBox label="ไม่อยู่ระหว่างการตั้งครรภ์" />
                                    <CheckBox label="อยู่ระหว่างการตั้งครรภ์" />
                                </div>
                                <div className="flex items-center gap-2 pl-6">
                                    <span className="text-[12px] text-slate-600">อายุครรภ์:</span>
                                    <div className="border-b border-slate-300 w-16"></div>
                                    <span className="text-[12px] text-slate-600">สัปดาห์</span>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="font-bold text-[13px] text-slate-800 mb-2 border-b border-slate-100 pb-1">บุตร-ธิดา</div>
                            <div className="grid grid-cols-2 gap-2 mb-2">
                                <CheckBox label="ไม่มีบุตร" checked={f.has_children === 'no'} />
                                <CheckBox label="มีบุตร" checked={f.has_children === 'yes'} />
                            </div>
                            {f.has_children === 'yes' && (
                                <div className="text-[12px] text-slate-600 pl-6 flex gap-4">
                                    <div>จำนวน <span className="border-b border-slate-300 px-2 text-slate-900">{f.children_count || '-'}</span> คน</div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="mt-auto pt-8 border-t border-slate-200 flex justify-between text-[10px] text-slate-400">
                <span>Ref: {applicant.id}</span>
                <span>Generated on {new Date().toLocaleDateString('th-TH')}</span>
            </div>
        </div>
    );
}