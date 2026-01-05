import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';

export default function SalaryDeductionDocument({ applicant, formData = {}, signatureUrl }) {
    const { data: settings } = useQuery({
        queryKey: ['system_settings_layout'],
        queryFn: () => base44.entities.SystemSetting.list(),
        staleTime: 1000 * 60 * 5 
    });
    
    const appLogo = settings?.find(s => s.key === 'app_logo')?.value;
    const p = applicant?.personal_data || {};

    return (
        <div 
            className="pdpa-page bg-white text-slate-900 mx-auto relative text-[16px] font-sans shadow-sm print:shadow-none"
            style={{ 
                padding: '20mm',
                width: '210mm', 
                minHeight: '297mm',
                fontFamily: 'TH Sarabun New, Sarabun, sans-serif',
                lineHeight: '1.6'
            }}
        >
            {/* Header with Logo */}
            <div className="flex justify-end mb-6">
                {appLogo ? (
                    <img src={appLogo} alt="Logo" crossOrigin="anonymous" className="h-[60px] w-auto object-contain" />
                ) : (
                    <div className="h-[60px] w-[100px] bg-slate-100 rounded flex items-center justify-center text-[10px] text-slate-400">LOGO</div>
                )}
            </div>

            {/* Title */}
            <div className="text-center mb-6">
                <h1 className="text-[18px] font-bold mb-4">หนังสือยินยอมให้หักเงินเดือน</h1>
                <div className="text-right mb-4">
                    <p>
                        วันที่ <span className={`border-b border-dotted border-slate-400 inline-block min-w-[200px] text-center px-2 ${formData.date ? 'pb-1' : ''}`} style={{ verticalAlign: 'baseline', ...(!formData.date && { minHeight: '1.2em' }) }}>{formData.date || '\u00A0'}</span>
                    </p>
                </div>
            </div>

            {/* Subject and Recipient */}
            <div className="mb-4 space-y-2">
                <p><strong>เรื่อง</strong> ยินยอมให้หักเงินเดือนเพื่อนำส่งการตรวจประวัติอาชญากรรม</p>
                <p><strong>เรียน</strong> พนักงานทุกท่าน</p>
            </div>

            {/* Content */}
            <div className="space-y-4 text-justify">
                <p className="indent-8">
                    ข้าพเจ้า นาย/นาง/นางสาว/อื่นๆ <span className={`border-b border-dotted border-slate-400 inline-block min-w-[300px] text-center px-2 ${applicant?.full_name ? 'pb-1' : ''}`} style={{ verticalAlign: 'baseline', ...(!applicant?.full_name && { minHeight: '1.2em' }) }}>{applicant?.full_name || '\u00A0'}</span> รหัสพนักงาน <span className={`border-b border-dotted border-slate-400 inline-block min-w-[150px] text-center px-2 ${formData.employeeId ? 'pb-1' : ''}`} style={{ verticalAlign: 'baseline', ...(!formData.employeeId && { minHeight: '1.2em' }) }}>{formData.employeeId || '\u00A0'}</span>
                </p>
                <p>
                    เป็นพนักงานประจำตำแหน่ง <span className={`border-b border-dotted border-slate-400 inline-block min-w-[200px] text-center px-2 ${formData.position ? 'pb-1' : ''}`} style={{ verticalAlign: 'baseline', ...(!formData.position && { minHeight: '1.2em' }) }}>{formData.position || '\u00A0'}</span> แผนก <span className={`border-b border-dotted border-slate-400 inline-block min-w-[200px] text-center px-2 ${formData.department ? 'pb-1' : ''}`} style={{ verticalAlign: 'baseline', ...(!formData.department && { minHeight: '1.2em' }) }}>{formData.department || '\u00A0'}</span> เริ่มงานเมื่อวันที่ <span className={`border-b border-dotted border-slate-400 inline-block min-w-[150px] text-center px-2 ${formData.startDate ? 'pb-1' : ''}`} style={{ verticalAlign: 'baseline', ...(!formData.startDate && { minHeight: '1.2em' }) }}>{formData.startDate || '\u00A0'}</span>
                </p>
                <p className="indent-8">
                    ข้าพเจ้าขอทำหนังสือฉบับนี้มอบไว้ให้แก่ บริษัท เค แอนด์ โอ ซิสเต็มส์ แอนด์ คอนซัลติ้ง จำกัด มีข้อความดังต่อไปนี้
                </p>
                <p className="indent-8">
                    ข้าพเจ้ายินยอมให้บริษัท เค แอนด์ โอ ซิสเต็มส์ แอนด์ คอนซัลติ้ง จำกัด หักเงินเดือนจำนวน 130 บาท เพื่อนำส่งตรวจประวัติอาชญากรรม ให้กับบริษัทฯ ดังนี้
                </p>

                {/* List */}
                <div className="ml-8 space-y-1">
                    <p>- ค่าตรวจประวัติอาชญากรรม ท่านละ 100 บาท</p>
                    <p>- หนังสือมอบอำนาจ (ค่าแสตมป์อากรท่านละ 30 บาท)</p>
                    <p>- รวมเป็นท่านละ 130 บาท ทางบริษัทจะหักจากรอบเงินเดือนแรกของพนักงาน</p>
                </div>

                <p className="indent-8">
                    หนังสือยินยอมฉบับนี้ทำขึ้นโดยความสมัครใจ และข้าพเจ้าได้ตรวจสอบข้อความและถ้อยคำในหนังสือนี้ทั้งหมดแล้ว ตรงตามเจตนารมณ์ของข้าพเจ้าทุกประการ จึงลงลายมือชื่อไว้เป็นหลักฐาน
                </p>
            </div>

            {/* Signature */}
            <div className="mt-12 text-center">
                <p className="mb-4">
                    (ลงชื่อ) 
                    {signatureUrl ? (
                        <img src={signatureUrl} alt="Signature" crossOrigin="anonymous" className="inline-block h-[40px] object-contain mx-2" />
                    ) : (
                        <span className="inline-block border-b border-dotted border-slate-400 w-[200px] mx-2" style={{ minHeight: '40px', display: 'inline-block' }}>&nbsp;</span>
                    )}
                    ผู้ให้ความยินยอม
                </p>
                <p>({applicant?.full_name || '........................................'})</p>
                <p className="mt-2">
                    ตำแหน่ง <span className={`border-b border-dotted border-slate-400 inline-block min-w-[200px] text-center px-2 ${formData.position ? 'pb-1' : ''}`} style={{ verticalAlign: 'baseline', ...(!formData.position && { minHeight: '1.2em' }) }}>{formData.position || '\u00A0'}</span>
                </p>
                <p className="mt-2">
                    วันที่ <span className={`border-b border-dotted border-slate-400 inline-block min-w-[50px] text-center px-2 ${formData.signDay ? 'pb-1' : ''}`} style={{ verticalAlign: 'baseline', ...(!formData.signDay && { minHeight: '1.2em' }) }}>{formData.signDay || '\u00A0'}</span> เดือน <span className={`border-b border-dotted border-slate-400 inline-block min-w-[100px] text-center px-2 ${formData.signMonth ? 'pb-1' : ''}`} style={{ verticalAlign: 'baseline', ...(!formData.signMonth && { minHeight: '1.2em' }) }}>{formData.signMonth || '\u00A0'}</span> พ.ศ. <span className={`border-b border-dotted border-slate-400 inline-block min-w-[70px] text-center px-2 ${formData.signYear ? 'pb-1' : ''}`} style={{ verticalAlign: 'baseline', ...(!formData.signYear && { minHeight: '1.2em' }) }}>{formData.signYear || '\u00A0'}</span>
                </p>
            </div>

            {/* Footer */}
            <div className="absolute bottom-[10mm] left-0 right-0 text-center">
                <div className="flex justify-center items-center gap-4 text-[9px] text-slate-400">
                    <div className="flex items-center gap-2">
                        <img src="https://via.placeholder.com/40x40?text=ISO" alt="ISO" className="h-[30px] opacity-60" />
                        <span>FM-HRD-30 Rev.02/26/02/66</span>
                    </div>
                    <span>www.ko.in.th Strategy . AI . DX . Sustainability</span>
                </div>
            </div>
        </div>
    );
}