import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';

export default function FMHRD30Document({ applicant }) {
    const { data: settings } = useQuery({
        queryKey: ['system_settings_layout'],
        queryFn: () => base44.entities.SystemSetting.list(),
        staleTime: 1000 * 60 * 5 
    });
    
    const appLogo = settings?.find(s => s.key === 'app_logo')?.value;

    return (
        <div 
            className="pdpa-page bg-white text-slate-900 mx-auto relative text-[14px] font-sans shadow-sm print:shadow-none"
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
                <h1 className="text-[18px] font-bold mb-4">การตรวจประวัติอาชญากรรม</h1>
                <div className="text-right mb-4">
                    <p>วันที่ 19 ธันวาคม 2566</p>
                </div>
            </div>

            {/* Document Number */}
            <div className="mb-4">
                <p><strong>เลขที่ประกาศ:</strong> KO.G 2566/46</p>
            </div>

            {/* Subject */}
            <div className="mb-4">
                <p><strong>เรื่อง</strong> การตรวจประวัติอาชญากรรม</p>
            </div>

            {/* Recipient */}
            <div className="mb-4">
                <p><strong>เรียน</strong> พนักงานทุกท่าน</p>
            </div>

            {/* Content */}
            <div className="space-y-3 text-justify">
                <p className="indent-8">
                    ทางบริษัท เค แอนด์ โอ ซิสเต็มส์ แอนด์ คอนซัลติ้ง จำกัด ได้มีมาตรฐานการในการตรวจสอบประวัติอาชญากรรมของพนักงานในบริษัทก่อนเริ่มงาน และพนักงานที่ปฏิบัติงานอยู่ในปัจจุบันส่งตรวจไม่น้อยกว่าปีละ 1 ครั้ง ถือเป็นกระบวนการที่สำคัญ เพื่อให้บริษัทได้มีข้อมูลที่เป็นประโยชน์เกี่ยวกับความเสี่ยงทางกฎหมายและการดำเนินงานที่มีความปลอดภัยประสิทธิภาพในการจ้างงานบุคคลในองค์กร เพื่อส่งเสริมคุณภาพ ประสิทธิภาพของการบริการหรือผลิตภัณฑ์ มาตรฐานบางประการที่เกี่ยวข้องกับการจัดการทรัพยากรมนุษย์และการบริหารจัดการธุรกิจบริษัท อีกทั้ง เพื่อให้สอดคล้องกับมาตรฐานสากล ระบบคุณภาพ นโยบายคุณภาพ อาทิ
                </p>

                {/* ISO Standards */}
                <div className="ml-6 space-y-2">
                    <p>
                        <strong>• ISO 9001</strong> มาตรฐานที่เกี่ยวข้องกับการจัดการคุณภาพของผลิตภัณฑ์หรือบริการ การตรวจสอบประวัติอาชญากรรมของพนักงานเป็นส่วนหนึ่งของการจัดการทรัพยากรมนุษย์ เพื่อให้ผลิตภัณฑ์หรือบริการมีคุณภาพ
                    </p>
                    <p>
                        <strong>• ISO 26000</strong> เน้นถึงความรับผิดชอบทางสังคมขององค์กร การตรวจสอบประวัติอาชญากรรมเป็นส่วนหนึ่งของการดูแลสังคมและความรับผิดชอบขององค์กรต่อสังคม
                    </p>
                    <p>
                        <strong>• ISO 45001</strong> เกี่ยวข้องกับการบริหารความปลอดภัยและสุขภาพทางการทำงาน การตรวจสอบประวัติอาชญากรรมอาจมีบทบาทในการประเมินความเสี่ยงและการจัดการความปลอดภัยในองค์กร
                    </p>
                </div>

                <p className="indent-8">
                    ทั้งนี้ บริษัทได้นำส่งตรวจประวัติอาชญากรรมต่อสำนักงานตำรวจแห่งชาติ โดยมีการดำเนินงานดังนี้
                </p>

                {/* Procedures */}
                <div className="space-y-3">
                    <div>
                        <p>
                            <strong>1.</strong> พนักงานสามารถตรวจประวัติอาชญากรรมได้ด้วยตนเอง และส่งผลประวัติอาชญากรรมก่อนวันเริ่มปฏิบัติงาน ช่องทางการตรวจประวัติอาชญากรรม ดังนี้
                        </p>
                        <p className="ml-8">- ลงทะเบียนออนไลน์ <a href="http://www.crd-check.com" className="underline">www.crd-check.com</a></p>
                    </div>

                    <div>
                        <p>
                            <strong>2.</strong> พนักงานท่านใดที่ไม่สะดวก ให้ทางบริษัทนำส่งตรวจประวัติอาชญากรรมได้ โดยมีค่าตรวจประวัติอาชญากรรม ดังนี้
                        </p>
                        <div className="ml-8 space-y-1">
                            <p>- ค่าตรวจประวัติอาชญากรรม ท่านละ 100 บาท</p>
                            <p>- หนังสือมอบอำนาจ (ค่าแสตมป์อากรท่านละ 30 บาท)</p>
                            <p className="font-semibold">รวมเป็นท่านละ 130 บาท ทางบริษัทจะหักจากรอบเงินเดือนแรกของพนักงาน</p>
                        </div>
                    </div>
                </div>

                <p className="font-semibold">
                    ให้มีผลบังคับใช้ ตั้งแต่ 2 มกราคม 2567 เป็นต้นไป
                </p>

                {/* Contact */}
                <div className="mt-4">
                    <p className="font-semibold">ติดต่อสอบถามเพิ่มเติม</p>
                    <p>แผนก HRD: นางสาวณัฎฐณิชา มาวงศ์</p>
                    <p>E-mail: hr@ko.in.th</p>
                </div>

                <p className="mt-4">จึงเรียนมาเพื่อทราบโดยทั่วกัน</p>
            </div>

            {/* Signature */}
            <div className="mt-8 text-center">
                <p className="mb-12">
                    ลงชื่อ: <span className="inline-block border-b border-dotted border-slate-400 w-[200px] mx-2" style={{ minHeight: '40px', display: 'inline-block' }}>&nbsp;</span> (ผู้อนุมัติ)
                </p>
                <p>( นายกฤษณ์พงษ์ สุคันโธ )</p>
                <p>กรรมการผู้จัดการ</p>
            </div>

            {/* Footer */}
            <div className="absolute bottom-[10mm] left-[50%] -translate-x-1/2 text-[9px] text-slate-400 text-center">
                FM-HRD-30 Rev.00<br/>
                www.ko.in.th Strategy . AI . DX . Sustainability
            </div>
        </div>
    );
}