import React from 'react';

export default function SPS103Document({ applicant, formData = {} }) {
    const personalData = applicant?.personal_data || {};
    
    return (
        <div 
            className="pdpa-page bg-white mx-auto relative shadow-sm print:shadow-none"
            style={{ 
                fontSize: "14px",
                padding: '8mm',
                width: '210mm', 
                minHeight: '297mm',
                fontFamily: 'TH Sarabun New, Sarabun, sans-serif',
                lineHeight: '1.4'
            }}
        >
            {/* Header */}
            <div className="text-center mb-6">
                <h1 className="text-[20px] font-bold mb-2">แบบ สปส. 1-03</h1>
                <h2 className="text-[18px] font-bold mb-1">แบบแจ้งการเปลี่ยนแปลงข้อมูลผู้ประกันตน</h2>
                <p className="text-[14px]">(กรณีย้ายจากนายจ้างรายเดิม)</p>
            </div>

            {/* เลขที่กรมธรรม์ */}
            <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                    <span>เลขประจำตัวประชาชน</span>
                    <div className="flex gap-1">
                        {(personalData.id_card || '').split('').concat(Array(13).fill('')).slice(0, 13).map((digit, idx) => (
                            <div key={idx} className="w-6 h-8 border border-slate-400 flex items-center justify-center">
                                {digit}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ข้อมูลผู้ประกันตน */}
            <div className="border border-slate-900 p-4 mb-4">
                <h3 className="font-bold mb-3">ข้อมูลผู้ประกันตน</h3>
                
                <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <label className="text-sm">คำนำหน้า</label>
                            <div className="border-b border-dotted border-slate-400 min-h-[24px]">
                                {personalData.prefix || '\u00A0'}
                            </div>
                        </div>
                        <div>
                            <label className="text-sm">ชื่อ</label>
                            <div className="border-b border-dotted border-slate-400 min-h-[24px]">
                                {personalData.first_name || '\u00A0'}
                            </div>
                        </div>
                        <div>
                            <label className="text-sm">นามสกุล</label>
                            <div className="border-b border-dotted border-slate-400 min-h-[24px]">
                                {personalData.last_name || '\u00A0'}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm">วัน/เดือน/ปีเกิด</label>
                            <div className="border-b border-dotted border-slate-400 min-h-[24px]">
                                {personalData.dob ? new Date(personalData.dob).toLocaleDateString('th-TH', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                }) : '\u00A0'}
                            </div>
                        </div>
                        <div>
                            <label className="text-sm">สัญชาติ</label>
                            <div className="border-b border-dotted border-slate-400 min-h-[24px]">
                                {personalData.nationality || '\u00A0'}
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="text-sm">ที่อยู่ปัจจุบัน</label>
                        <div className="border-b border-dotted border-slate-400 min-h-[24px]">
                            {personalData.current_address ? 
                                `${personalData.current_address.number || ''} หมู่ ${personalData.current_address.moo || ''} ถนน ${personalData.current_address.road || ''} ตำบล/แขวง ${personalData.current_address.subdistrict || ''} อำเภอ/เขต ${personalData.current_address.district || ''} จังหวัด ${personalData.current_address.province || ''} ${personalData.current_address.zipcode || ''}`
                                : '\u00A0'
                            }
                        </div>
                    </div>
                </div>
            </div>

            {/* ข้อมูลนายจ้างเดิม */}
            <div className="border border-slate-900 p-4 mb-4">
                <h3 className="font-bold mb-3">ข้อมูลนายจ้างเดิม</h3>
                <div className="space-y-3">
                    <div>
                        <label className="text-sm">ชื่อสถานประกอบการเดิม</label>
                        <div className="border-b border-dotted border-slate-400 min-h-[24px]">
                            {formData.previousEmployer || '\u00A0'}
                        </div>
                    </div>
                    <div>
                        <label className="text-sm">เลขที่นายจ้าง (10 หลัก)</label>
                        <div className="border-b border-dotted border-slate-400 min-h-[24px]">
                            {formData.previousEmployerId || '\u00A0'}
                        </div>
                    </div>
                    <div>
                        <label className="text-sm">วันที่ออกจากงาน</label>
                        <div className="border-b border-dotted border-slate-400 min-h-[24px]">
                            {formData.lastWorkDate ? new Date(formData.lastWorkDate).toLocaleDateString('th-TH', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            }) : '\u00A0'}
                        </div>
                    </div>
                </div>
            </div>

            {/* ข้อมูลนายจ้างใหม่ */}
            <div className="border border-slate-900 p-4 mb-4">
                <h3 className="font-bold mb-3">ข้อมูลนายจ้างใหม่</h3>
                <div className="space-y-3">
                    <div>
                        <label className="text-sm">ชื่อสถานประกอบการใหม่</label>
                        <div className="border-b border-dotted border-slate-400 min-h-[24px]">
                            {formData.newEmployer || '\u00A0'}
                        </div>
                    </div>
                    <div>
                        <label className="text-sm">เลขที่นายจ้าง (10 หลัก)</label>
                        <div className="border-b border-dotted border-slate-400 min-h-[24px]">
                            {formData.newEmployerId || '\u00A0'}
                        </div>
                    </div>
                    <div>
                        <label className="text-sm">วันที่เริ่มทำงาน</label>
                        <div className="border-b border-dotted border-slate-400 min-h-[24px]">
                            {applicant?.start_work_date ? new Date(applicant.start_work_date).toLocaleDateString('th-TH', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            }) : '\u00A0'}
                        </div>
                    </div>
                    <div>
                        <label className="text-sm">อัตราค่าจ้าง (บาท/เดือน)</label>
                        <div className="border-b border-dotted border-slate-400 min-h-[24px]">
                            {formData.salary || personalData.expected_salary || '\u00A0'}
                        </div>
                    </div>
                </div>
            </div>

            {/* ลายเซ็น */}
            <div className="mt-8 grid grid-cols-2 gap-8">
                <div className="text-center">
                    <div className="border-b border-slate-400 min-h-[60px] mb-2 mx-8 flex items-center justify-center">
                        {applicant?.signature_url ? (
                            <img src={applicant.signature_url} alt="Signature" crossOrigin="anonymous" className="h-[50px] object-contain" />
                        ) : (
                            '\u00A0'
                        )}
                    </div>
                    <p>ลายมือชื่อผู้ประกันตน</p>
                    <p className="text-sm text-slate-600 mt-2">
                        วันที่ {formData.signatureDate ? new Date(formData.signatureDate).toLocaleDateString('th-TH', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        }) : '................................'}
                    </p>
                </div>
                <div className="text-center">
                    <div className="border-b border-slate-400 min-h-[60px] mb-2 mx-8">
                        \u00A0
                    </div>
                    <p>ลายมือชื่อนายจ้าง/ผู้มีอำนาจลงนาม</p>
                    <p className="text-sm text-slate-600 mt-2">
                        วันที่ ................................
                    </p>
                </div>
            </div>
        </div>
    );
}