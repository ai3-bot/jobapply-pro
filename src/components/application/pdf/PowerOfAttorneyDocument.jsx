import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';

export default function PowerOfAttorneyDocument({ applicant, formData = {} }) {
    const { data: settings } = useQuery({
        queryKey: ['system_settings_layout'],
        queryFn: () => base44.entities.SystemSetting.list(),
        staleTime: 1000 * 60 * 5 
    });
    
    const appLogo = settings?.find(s => s.key === 'app_logo')?.value;
    const p = applicant?.personal_data || {};
    const currentAddr = p.current_address || {};

    return (
        <>
        {/* Page 1 - Power of Attorney */}
        <div 
            className="pdpa-page bg-white text-slate-900 mx-auto relative text-[12px] font-sans p-[20mm] shadow-sm print:shadow-none"
            style={{ 
                width: '210mm', 
                minHeight: '297mm',
                fontFamily: 'TH Sarabun New, Sarabun, sans-serif'
            }}
        >
            {/* Header with Logo */}
            <div className="flex justify-end mb-8">
                {appLogo ? (
                    <img src={appLogo} alt="Logo" crossOrigin="anonymous" className="h-[100px] w-auto object-contain" />
                ) : (
                    <div className="h-[100px] w-[100px] bg-slate-100 rounded flex items-center justify-center text-[10px] text-slate-400">LOGO</div>
                )}
            </div>

            <div className="text-center mb-8">
                <h2 className="text-[16px] font-bold">หนังสือมอบอำนาจ</h2>
            </div>

            <div className="mb-4 leading-[1.4]">
                <p>ทำที่<span className={`border-b border-dotted border-slate-400 inline-block min-w-[400px] mx-2 text-center ${formData.location ? 'pb-1' : ''}`} style={{ verticalAlign: 'baseline', ...(!formData.location && { minHeight: '1.2em' }) }}>{formData.location || '\u00A0'}</span></p>
                <p>วันที่<span className={`border-b border-dotted border-slate-400 inline-block min-w-[400px] mx-2 text-center ${formData.date ? 'pb-1' : ''}`} style={{ verticalAlign: 'baseline', ...(!formData.date && { minHeight: '1.2em' }) }}>{formData.date || '\u00A0'}</span></p>
            </div>

            <div className="mb-4 leading-[1.4] text-justify">
                <p className="indent-8">ข้าพเจ้า<span className={`border-b border-dotted border-slate-400 inline-block min-w-[350px] text-center px-2 mx-2 ${applicant?.full_name ? 'pb-1' : ''}`} style={{ verticalAlign: 'baseline', ...(!applicant?.full_name && { minHeight: '1.2em' }) }}>{applicant?.full_name || '\u00A0'}</span>บัตรประจำตัวประชาชนเลขที่<span className={`border-b border-dotted border-slate-400 inline-block min-w-[180px] text-center px-2 mx-2 ${p.id_card ? 'pb-1' : ''}`} style={{ verticalAlign: 'baseline', ...(!p.id_card && { minHeight: '1.2em' }) }}>{p.id_card || '\u00A0'}</span></p>
                <p>ออกให้โดย<span className={`border-b border-dotted border-slate-400 inline-block min-w-[400px] mx-2 text-center ${formData.idIssuedBy ? 'pb-1' : ''}`} style={{ verticalAlign: 'baseline', ...(!formData.idIssuedBy && { minHeight: '1.2em' }) }}>{formData.idIssuedBy || '\u00A0'}</span></p>
                <p>วันหมดอายุ<span className={`border-b border-dotted border-slate-400 inline-block min-w-[380px] mx-2 text-center ${formData.idExpiryDate ? 'pb-1' : ''}`} style={{ verticalAlign: 'baseline', ...(!formData.idExpiryDate && { minHeight: '1.2em' }) }}>{formData.idExpiryDate || '\u00A0'}</span>ขอมอบอำนาจให้บริษัท เค แอนด์ โอ ซิสเต็มส์ แอนด์ คอนซัลติ้ง จำกัด</p>
                <p>โดย<span className={`border-b border-dotted border-slate-400 inline-block min-w-[400px] mx-2 text-center ${formData.companyRepName ? 'pb-1' : ''}`} style={{ verticalAlign: 'baseline', ...(!formData.companyRepName && { minHeight: '1.2em' }) }}>{formData.companyRepName || '\u00A0'}</span>บัตรประจำตัวประชาชนเลขที่<span className={`border-b border-dotted border-slate-400 inline-block min-w-[180px] mx-2 text-center ${formData.companyRepIdCard ? 'pb-1' : ''}`} style={{ verticalAlign: 'baseline', ...(!formData.companyRepIdCard && { minHeight: '1.2em' }) }}>{formData.companyRepIdCard || '\u00A0'}</span></p>
                <p>ออกให้โดย<span className={`border-b border-dotted border-slate-400 inline-block min-w-[250px] mx-2 text-center ${formData.companyRepIdIssuedBy ? 'pb-1' : ''}`} style={{ verticalAlign: 'baseline', ...(!formData.companyRepIdIssuedBy && { minHeight: '1.2em' }) }}>{formData.companyRepIdIssuedBy || '\u00A0'}</span>วันหมดอายุ<span className={`border-b border-dotted border-slate-400 inline-block min-w-[250px] mx-2 text-center ${formData.companyRepIdExpiryDate ? 'pb-1' : ''}`} style={{ verticalAlign: 'baseline', ...(!formData.companyRepIdExpiryDate && { minHeight: '1.2em' }) }}>{formData.companyRepIdExpiryDate || '\u00A0'}</span>ซึ่งเป็นผู้มีอำนาจลงนามผูกพันบริษัท</p>
                <p className="indent-8">ให้กระทำการแทน ในการติดต่อ ชี้แจง ยื่น ส่ง เอกสารที่เกี่ยวกับหนังสือขอตรวจสอบประวัติอาชญากรรม หนังสือยินยอมตรวจสอบประวัติอาชญากรรม และรับเอกสารผลการตรวจสอบประวัติอาชญากรรมของข้าพเจ้า กับกองทะเบียนประวัติอาชญากร สำนักงานตำรวจแห่งชาติ ตลอดจนการมอบอำนาจช่วง และดำเนินการอื่นใดในส่วนที่เกี่ยวข้องกับเรื่องดังกล่าวข้างต้นแทนข้าพเจ้าจนเสร็จการ</p>
                <p className="indent-8">ให้หนังสือมอบอำนาจฉบับนี้มีผลเริ่มใช้บังคับตั้งแต่วันที่<span className={`border-b border-dotted border-slate-400 inline-block min-w-[200px] mx-2 text-center ${formData.effectiveDate ? 'pb-1' : ''}`} style={{ verticalAlign: 'baseline', ...(!formData.effectiveDate && { minHeight: '1.2em' }) }}>{formData.effectiveDate || '\u00A0'}</span>เป็นต้นไป จนกว่าการดำเนินการกับเรื่องดังกล่าวข้างต้นในครั้งนี้จะเสร็จการ ซึ่งการใด ๆ ที่ผู้รับมอบอำนาจได้กระทำภายใต้เงื่อนไขหนังสือมอบอำนาจฉบับนี้ ให้มีผลผูกพันผู้มอบอำนาจ เสมือนหนึ่งว่าผู้มอบอำนาจ ได้กระทำการดังกล่าวด้วยตนเองทุกประการ เพื่อเป็นหลักฐานแห่งการนี้ จึงได้ลงลายมือชื่อในหนังสือมอบอำนาจฉบับนี้ไว้ต่อหน้าพยานเป็นสำคัญ</p>
            </div>

            <div className="mb-8 leading-[1.4] mt-12">
                <div className="grid grid-cols-2 gap-8">
                    <div>
                        <p className="mb-2">(ลงชื่อ)<span className="inline-block border-b border-dotted border-slate-400 w-[200px] mx-2" style={{ verticalAlign: 'baseline', minHeight: '40px' }}>&nbsp;</span>ผู้มอบอำนาจ</p>
                        <p className="text-center">(<span className={`inline-block w-[250px] ${applicant?.full_name ? '' : 'border-b border-dotted border-slate-400'}`}>{applicant?.full_name || '\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0'}</span>)</p>
                    </div>
                    <div>
                        <p className="mb-2">(ลงชื่อ)<span className="inline-block border-b border-dotted border-slate-400 w-[200px] mx-2" style={{ verticalAlign: 'baseline', minHeight: '40px' }}>&nbsp;</span>ผู้รับมอบอำนาจ</p>
                        <p className="text-center">(<span className={`inline-block w-[250px] ${formData.companyRepName ? '' : 'border-b border-dotted border-slate-400'}`}>{formData.companyRepName || '\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0'}</span>)</p>
                    </div>
                </div>
            </div>

            <div className="mb-6 leading-[1.4]">
                <div className="grid grid-cols-2 gap-8">
                    <div>
                        <p className="mb-2">(ลงชื่อ)<span className="inline-block border-b border-dotted border-slate-400 w-[200px] mx-2" style={{ verticalAlign: 'baseline', minHeight: '40px' }}>&nbsp;</span>พยาน</p>
                        <p className="text-center">(<span className="inline-block border-b border-dotted border-slate-400 w-[250px]">&nbsp;</span>)</p>
                    </div>
                    <div>
                        <p className="mb-2">(ลงชื่อ)<span className="inline-block border-b border-dotted border-slate-400 w-[200px] mx-2" style={{ verticalAlign: 'baseline', minHeight: '40px' }}>&nbsp;</span>พยาน</p>
                        <p className="text-center">(<span className="inline-block border-b border-dotted border-slate-400 w-[250px]">&nbsp;</span>)</p>
                    </div>
                </div>
            </div>

            <div className="text-[10px] leading-[1.3] mt-6">
                <p className="font-bold mb-1">หมายเหตุ</p>
                <p>กรุณาเขียนให้ชัดเจน พร้อมแนบสำเนาบัตรประชาชนผู้มอบและผู้รับมอบ อย่างละ 1 ฉบับ (พร้อมรับรองสำเนาถูกต้อง)</p>
                <p>การมอบอำนาจให้มีพยานอย่างน้อย 1 คน ถ้าผู้มอบอำนาจพิมพ์ลายนิ้วมือ ต้องมีพยาน 2 คน</p>
            </div>
        </div>

        {/* Page 2 - Consent for Criminal Record Check */}
        <div 
            className="pdpa-page bg-white text-slate-900 mx-auto relative text-[12px] font-sans p-[20mm] shadow-sm print:shadow-none mt-8"
            style={{ 
                width: '210mm', 
                minHeight: '297mm',
                fontFamily: 'TH Sarabun New, Sarabun, sans-serif',
                pageBreakBefore: 'always'
            }}
        >
            {/* Header with Logo */}
            <div className="flex justify-end mb-8">
                {appLogo ? (
                    <img src={appLogo} alt="Logo" crossOrigin="anonymous" className="h-[100px] w-auto object-contain" />
                ) : (
                    <div className="h-[100px] w-[100px] bg-slate-100 rounded flex items-center justify-center text-[10px] text-slate-400">LOGO</div>
                )}
            </div>

            <div className="text-center mb-8">
                <h2 className="text-[16px] font-bold">หนังสือยินยอมในการเข้าตรวจดูข้อมูลข่าวสารส่วนบุคคล (ประวัติอาชญากรรม)</h2>
                <h3 className="text-[14px] mt-2">(ผ่านหน่วยงาน/บริษัท)</h3>
            </div>

            <div className="mb-4 leading-[1.4]">
                <p>ทำที่<span className={`border-b border-dotted border-slate-400 inline-block min-w-[400px] mx-2 text-center ${formData.location ? 'pb-1' : ''}`} style={{ verticalAlign: 'baseline', ...(!formData.location && { minHeight: '1.2em' }) }}>{formData.location || '\u00A0'}</span></p>
                <p>วันที่<span className={`border-b border-dotted border-slate-400 inline-block min-w-[400px] mx-2 text-center ${formData.date ? 'pb-1' : ''}`} style={{ verticalAlign: 'baseline', ...(!formData.date && { minHeight: '1.2em' }) }}>{formData.date || '\u00A0'}</span></p>
            </div>

            <div className="mb-4 leading-[1.4]">
                <p className="font-bold">เรียน ผู้บังคับการกองทะเบียนประวัติอาชญากร</p>
            </div>

            <div className="mb-4 leading-[1.4] text-justify">
                <p className="indent-8">ข้าพเจ้า (นาย/นาง/น.ส.)<span className={`border-b border-dotted border-slate-400 inline-block min-w-[300px] text-center px-2 mx-2 ${applicant?.full_name ? 'pb-1' : ''}`} style={{ verticalAlign: 'baseline', ...(!applicant?.full_name && { minHeight: '1.2em' }) }}>{applicant?.full_name || '\u00A0'}</span>บัตรประจำตัวประชาชนเลขที่<span className={`border-b border-dotted border-slate-400 inline-block min-w-[160px] text-center px-2 mx-2 ${p.id_card ? 'pb-1' : ''}`} style={{ verticalAlign: 'baseline', ...(!p.id_card && { minHeight: '1.2em' }) }}>{p.id_card || '\u00A0'}</span></p>
                <p>อยู่บ้านเลขที่<span className={`border-b border-dotted border-slate-400 inline-block min-w-[80px] text-center px-2 mx-2 ${currentAddr.number ? 'pb-1' : ''}`} style={{ verticalAlign: 'baseline', ...(!currentAddr.number && { minHeight: '1.2em' }) }}>{currentAddr.number || '\u00A0'}</span>หมู่ที่<span className={`border-b border-dotted border-slate-400 inline-block min-w-[60px] text-center px-2 mx-2 ${currentAddr.moo ? 'pb-1' : ''}`} style={{ verticalAlign: 'baseline', ...(!currentAddr.moo && { minHeight: '1.2em' }) }}>{currentAddr.moo || '\u00A0'}</span>ซอย<span className={`border-b border-dotted border-slate-400 inline-block min-w-[120px] text-center px-2 mx-2 ${currentAddr.soi ? 'pb-1' : ''}`} style={{ verticalAlign: 'baseline', ...(!currentAddr.soi && { minHeight: '1.2em' }) }}>{currentAddr.soi || '\u00A0'}</span>ถนน<span className={`border-b border-dotted border-slate-400 inline-block min-w-[140px] text-center px-2 mx-2 ${currentAddr.road ? 'pb-1' : ''}`} style={{ verticalAlign: 'baseline', ...(!currentAddr.road && { minHeight: '1.2em' }) }}>{currentAddr.road || '\u00A0'}</span></p>
                <p>ตำบล/แขวง<span className={`border-b border-dotted border-slate-400 inline-block min-w-[180px] text-center px-2 mx-2 ${currentAddr.subdistrict ? 'pb-1' : ''}`} style={{ verticalAlign: 'baseline', ...(!currentAddr.subdistrict && { minHeight: '1.2em' }) }}>{currentAddr.subdistrict || '\u00A0'}</span>อำเภอ/เขต<span className={`border-b border-dotted border-slate-400 inline-block min-w-[180px] text-center px-2 mx-2 ${currentAddr.district ? 'pb-1' : ''}`} style={{ verticalAlign: 'baseline', ...(!currentAddr.district && { minHeight: '1.2em' }) }}>{currentAddr.district || '\u00A0'}</span>จังหวัด<span className={`border-b border-dotted border-slate-400 inline-block min-w-[180px] text-center px-2 mx-2 ${currentAddr.province ? 'pb-1' : ''}`} style={{ verticalAlign: 'baseline', ...(!currentAddr.province && { minHeight: '1.2em' }) }}>{currentAddr.province || '\u00A0'}</span></p>
                <p>โทรศัพท์<span className={`border-b border-dotted border-slate-400 inline-block min-w-[200px] text-center px-2 mx-2 ${p.mobile_phone ? 'pb-1' : ''}`} style={{ verticalAlign: 'baseline', ...(!p.mobile_phone && { minHeight: '1.2em' }) }}>{p.mobile_phone || '\u00A0'}</span></p>
            </div>

            <div className="mb-4 leading-[1.4] font-bold">
                <p>โดยหนังสือฉบับนี้</p>
            </div>

            <div className="mb-4 leading-[1.4] text-justify">
                <p className="indent-8 mb-2">1. ข้าพเจ้ายินยอมให้ บริษัท เค แอนด์ โอ ซิสเต็มส์ แอนด์ คอนซัลติ้ง จำกัด ซึ่งเป็นหน่วยงานของรัฐ หรือบริษัท สำนักงานตั้งอยู่ที่ 15, 17 ซอยกรุงธนบุรี 4 ถนนกรุงธนบุรี แขวงบางลำภูล่าง เขตคลองสาน กรุงเทพมหานคร 10600 ซึ่งเป็นหน่วยงาน ที่ข้าพเจ้าได้ขออนุญาต หรือสมัครงาน มีสิทธิ์ดำเนินการใด ๆ เข้าตรวจดูข้อมูล ข่าวสารส่วนบุคคล (ประวัติอาชญากรรม) ของข้าพเจ้าเพื่อวัตถุประสงค์ในการพิจารณารับเข้าทำงาน</p>
                <p className="indent-8 mb-2">2. ข้าพเจ้ายินยอมให้สำนักงานตำรวจแห่งชาติ หรือสำนักงานพิสูจน์หลักฐานตำรวจ หรือ กองทะเบียนประวัติอาชญากร หรือเจ้าหน้าที่ตรวจสอบประวัติ ดำเนินการจัดเก็บข้อมูล และลายพิมพ์นิ้วมือของข้าพเจ้า รวมทั้งเปิดเผยข้อมูลของข้าพเจ้าแก่หน่วยงานของรัฐเพื่อใช้ขออนุญาต หรือสมัครงานตามอำนาจหน้าที่ของหน่วยงานของรัฐนั้น หรือบริษัทที่ข้าพเจ้าใช้สมัครงาน และดำเนินการใด ๆ ที่เกี่ยวข้องได้ ข้าพเจ้าจะไม่เรียกร้อง ร้องเรียน หรือฟ้องร้องทั้งในความผิดทางแพ่ง ทางอาญา และทางปกครอง</p>
                <p className="indent-8">ข้าพเจ้าได้เข้าใจข้อความในหนังสือยินยอมฉบับนี้โดยตลอดแล้ว จึงได้ลงลายมือชื่อไว้เป็นหลักฐาน ณ วันเดือนปี ที่ระบุข้างต้น</p>
            </div>

            <div className="flex justify-center mt-12">
                <div className="text-center">
                    <p className="mb-2">(ลงชื่อ)<span className="inline-block border-b border-dotted border-slate-400 w-[250px] mx-2" style={{ verticalAlign: 'baseline', minHeight: '40px' }}>&nbsp;</span>ผู้ให้ความยินยอม</p>
                    <p>(<span className={`inline-block w-[280px] ${applicant?.full_name ? '' : 'border-b border-dotted border-slate-400'}`}>{applicant?.full_name || '\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0'}</span>)</p>
                </div>
            </div>

            <div className="text-[10px] leading-[1.3] mt-8">
                <p className="font-bold">หมายเหตุ กรุณากรอกรายละเอียดให้ครบทุกช่อง</p>
            </div>
        </div>
        </>
    );
}