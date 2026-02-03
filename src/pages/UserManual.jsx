import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
    Book, Users, Settings, FileText, Camera, Video, 
    CheckCircle, ArrowRight, Search, Lock, LayoutDashboard,
    FileCheck, Download, UserCircle, Edit, Eye, ChevronDown, ChevronUp
} from "lucide-react";

function AccordionItem({ title, icon: Icon, children, defaultOpen = false }) {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    
    return (
        <div className="border border-slate-200 rounded-lg overflow-hidden mb-4">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 transition-colors"
            >
                <div className="flex items-center gap-3">
                    {Icon && <Icon className="w-5 h-5 text-indigo-600" />}
                    <span className="font-semibold text-slate-800">{title}</span>
                </div>
                {isOpen ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
            </button>
            {isOpen && (
                <div className="p-4 bg-white">
                    {children}
                </div>
            )}
        </div>
    );
}

function StepItem({ number, title, description, image }) {
    return (
        <div className="flex gap-4 mb-6">
            <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold shrink-0">
                {number}
            </div>
            <div className="flex-1">
                <h4 className="font-semibold text-slate-800 mb-2">{title}</h4>
                <p className="text-slate-600 text-sm leading-relaxed">{description}</p>
                {image && (
                    <div className="mt-3 border rounded-lg overflow-hidden">
                        <img src={image} alt={title} className="w-full" />
                    </div>
                )}
            </div>
        </div>
    );
}

export default function UserManual() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Book className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">คู่มือการใช้งานระบบ</h1>
                    <p className="text-slate-600">คู่มืออย่างละเอียดสำหรับผู้สมัครงานและผู้ดูแลระบบ</p>
                </div>

                {/* Main Content */}
                <Tabs defaultValue="applicant" className="w-full">
                    <TabsList className="w-full justify-center bg-white border border-slate-200 p-1 mb-8">
                        <TabsTrigger value="applicant" className="gap-2 px-6 py-3">
                            <Users className="w-4 h-4" /> คู่มือสำหรับผู้สมัคร
                        </TabsTrigger>
                        <TabsTrigger value="employee" className="gap-2 px-6 py-3">
                            <UserCircle className="w-4 h-4" /> คู่มือสำหรับพนักงานใหม่
                        </TabsTrigger>
                        <TabsTrigger value="admin" className="gap-2 px-6 py-3">
                            <Settings className="w-4 h-4" /> คู่มือสำหรับแอดมิน
                        </TabsTrigger>
                    </TabsList>

                    {/* Applicant Guide */}
                    <TabsContent value="applicant" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Users className="w-6 h-6 text-indigo-600" />
                                    คู่มือสำหรับผู้สมัครงาน
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mb-6">
                                    <h3 className="font-semibold text-indigo-800 mb-2">ภาพรวมขั้นตอนการสมัคร</h3>
                                    <div className="flex flex-wrap gap-2 items-center text-sm text-indigo-700">
                                        <span className="bg-white px-3 py-1 rounded-full">1. ยอมรับเงื่อนไข</span>
                                        <ArrowRight className="w-4 h-4" />
                                        <span className="bg-white px-3 py-1 rounded-full">2. ถ่ายรูป</span>
                                        <ArrowRight className="w-4 h-4" />
                                        <span className="bg-white px-3 py-1 rounded-full">3. กรอกข้อมูล (4 ขั้นตอน)</span>
                                        <ArrowRight className="w-4 h-4" />
                                        <span className="bg-white px-3 py-1 rounded-full">4. PDPA</span>
                                        <ArrowRight className="w-4 h-4" />
                                        <span className="bg-white px-3 py-1 rounded-full">5. สัมภาษณ์วิดีโอ</span>
                                    </div>
                                </div>

                                <AccordionItem title="ขั้นตอนที่ 1: ยอมรับเงื่อนไข" icon={FileText} defaultOpen={true}>
                                    <StepItem 
                                        number="1.1"
                                        title="เข้าสู่หน้าสมัครงาน"
                                        description="คลิกปุ่ม 'เริ่มสมัครงานทันที' จากหน้าแรก หรือเข้าที่ URL /application โดยตรง"
                                    />
                                    <StepItem 
                                        number="1.2"
                                        title="อ่านข้อตกลงและเงื่อนไข"
                                        description="อ่านข้อตกลงการสมัครงานอย่างละเอียด รวมถึงนโยบายความเป็นส่วนตัว และข้อกำหนดการใช้งาน"
                                    />
                                    <StepItem 
                                        number="1.3"
                                        title="ยืนยันการยอมรับ"
                                        description="ทำเครื่องหมายยอมรับเงื่อนไขทั้งหมด แล้วคลิกปุ่ม 'ถัดไป' เพื่อดำเนินการต่อ"
                                    />
                                </AccordionItem>

                                <AccordionItem title="ขั้นตอนที่ 2: ถ่ายรูปยืนยันตัวตน" icon={Camera}>
                                    <StepItem 
                                        number="2.1"
                                        title="เปิดกล้อง"
                                        description="อนุญาตให้เว็บไซต์เข้าถึงกล้องของอุปกรณ์ กรุณาใช้อุปกรณ์ที่มีกล้องและอยู่ในที่ที่แสงสว่างเพียงพอ"
                                    />
                                    <StepItem 
                                        number="2.2"
                                        title="ถ่ายรูปใบหน้า"
                                        description="จัดตำแหน่งใบหน้าให้อยู่ในกรอบ มองตรงไปที่กล้อง หลีกเลี่ยงการสวมแว่นกันแดดหรือหมวก คลิกปุ่มถ่ายรูป"
                                    />
                                    <StepItem 
                                        number="2.3"
                                        title="ยืนยันรูปภาพ"
                                        description="ตรวจสอบรูปภาพที่ถ่าย หากไม่พอใจสามารถถ่ายใหม่ได้ หากพอใจแล้วให้คลิก 'ใช้รูปนี้' เพื่อดำเนินการต่อ"
                                    />
                                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-4">
                                        <p className="text-sm text-amber-800">
                                            <strong>คำแนะนำ:</strong> รูปภาพควรเห็นใบหน้าชัดเจน ไม่มีแสงสะท้อน และพื้นหลังเรียบง่าย
                                        </p>
                                    </div>
                                </AccordionItem>

                                <AccordionItem title="ขั้นตอนที่ 3: กรอกข้อมูลส่วนตัว (Step 1/4)" icon={Edit}>
                                    <p className="text-slate-600 mb-4">ขั้นตอนนี้แบ่งเป็น 4 ส่วนย่อย:</p>
                                    
                                    <div className="bg-slate-50 rounded-lg p-4 mb-4">
                                        <h5 className="font-semibold text-slate-800 mb-3">3.1 ข้อมูลการสมัคร</h5>
                                        <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
                                            <li>วันที่สมัคร (กรอกอัตโนมัติ)</li>
                                            <li>ตำแหน่งที่ต้องการสมัคร (เลือกได้ 2 ตำแหน่ง)</li>
                                            <li>เงินเดือนที่คาดหวัง</li>
                                        </ul>
                                    </div>

                                    <div className="bg-slate-50 rounded-lg p-4 mb-4">
                                        <h5 className="font-semibold text-slate-800 mb-3">3.2 ข้อมูลส่วนบุคคล</h5>
                                        <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
                                            <li>คำนำหน้า, ชื่อ-นามสกุล (ไทย/อังกฤษ)</li>
                                            <li>เลขบัตรประชาชน 13 หลัก</li>
                                            <li>วันเดือนปีเกิด, อายุ</li>
                                            <li>น้ำหนัก, ส่วนสูง</li>
                                            <li>เชื้อชาติ, สัญชาติ, ศาสนา</li>
                                            <li>อีเมล, เบอร์โทรศัพท์</li>
                                        </ul>
                                    </div>

                                    <div className="bg-slate-50 rounded-lg p-4 mb-4">
                                        <h5 className="font-semibold text-slate-800 mb-3">3.3 ที่อยู่</h5>
                                        <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
                                            <li>ที่อยู่ตามทะเบียนบ้าน (บ้านเลขที่, หมู่, ถนน, ตำบล, อำเภอ, จังหวัด, รหัสไปรษณีย์)</li>
                                            <li>ที่อยู่ปัจจุบัน (สามารถเลือก "ตามทะเบียนบ้าน" ได้หากเหมือนกัน)</li>
                                        </ul>
                                    </div>

                                    <div className="bg-slate-50 rounded-lg p-4">
                                        <h5 className="font-semibold text-slate-800 mb-3">3.4 ข้อมูลเพิ่มเติม (เพศชาย)</h5>
                                        <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
                                            <li>สถานะทางทหาร (ผ่านการเกณฑ์, ได้รับการยกเว้น, ยังไม่ได้เกณฑ์)</li>
                                            <li>สถานะการบวช</li>
                                        </ul>
                                    </div>
                                </AccordionItem>

                                <AccordionItem title="ขั้นตอนที่ 3: ข้อมูลครอบครัวและการศึกษา (Step 2/4)" icon={Edit}>
                                    <div className="bg-slate-50 rounded-lg p-4 mb-4">
                                        <h5 className="font-semibold text-slate-800 mb-3">สถานภาพครอบครัว</h5>
                                        <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
                                            <li>สถานะสมรส (โสด/สมรส)</li>
                                            <li>ข้อมูลคู่สมรส (กรณีสมรสแล้ว)</li>
                                            <li>ข้อมูลบุตร</li>
                                        </ul>
                                    </div>

                                    <div className="bg-slate-50 rounded-lg p-4 mb-4">
                                        <h5 className="font-semibold text-slate-800 mb-3">ประวัติการศึกษา</h5>
                                        <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
                                            <li>ระดับการศึกษา (ประถม, มัธยม, ปวช., ปวส., ปริญญาตรี, ปริญญาโท, ปริญญาเอก)</li>
                                            <li>สถาบัน, สาขาวิชา</li>
                                            <li>ปีที่เริ่ม - ปีที่จบ, เกรดเฉลี่ย</li>
                                        </ul>
                                    </div>

                                    <div className="bg-slate-50 rounded-lg p-4 mb-4">
                                        <h5 className="font-semibold text-slate-800 mb-3">ทักษะต่างๆ</h5>
                                        <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
                                            <li>ทักษะภาษา (ไทย, อังกฤษ, จีน, อื่นๆ)</li>
                                            <li>ทักษะสำนักงาน (พิมพ์ดีด, เครื่องคิดเลข, คอมพิวเตอร์)</li>
                                            <li>ใบขับขี่ (รถจักรยานยนต์, รถยนต์, รถบรรทุก)</li>
                                        </ul>
                                    </div>

                                    <div className="bg-slate-50 rounded-lg p-4">
                                        <h5 className="font-semibold text-slate-800 mb-3">ประวัติการฝึกอบรม</h5>
                                        <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
                                            <li>หลักสูตร, สถาบัน, ระยะเวลา</li>
                                        </ul>
                                    </div>
                                </AccordionItem>

                                <AccordionItem title="ขั้นตอนที่ 3: ประสบการณ์ทำงานและคำแถลง (Step 3/4)" icon={Edit}>
                                    <div className="bg-slate-50 rounded-lg p-4 mb-4">
                                        <h5 className="font-semibold text-slate-800 mb-3">ประวัติการทำงาน</h5>
                                        <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
                                            <li>บริษัท/สถานที่ทำงาน</li>
                                            <li>ตำแหน่ง</li>
                                            <li>ระยะเวลาทำงาน</li>
                                            <li>เงินเดือนเข้า-ออก</li>
                                            <li>เหตุผลที่ลาออก</li>
                                            <li>การอนุญาตติดต่อนายจ้างเดิม</li>
                                        </ul>
                                    </div>

                                    <div className="bg-slate-50 rounded-lg p-4 mb-4">
                                        <h5 className="font-semibold text-slate-800 mb-3">คำแถลงเพิ่มเติม</h5>
                                        <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
                                            <li>การทำงานล่วงเวลา</li>
                                            <li>ประวัติคดีความ</li>
                                            <li>ประวัติการใช้สารเสพติด</li>
                                            <li>การสูบบุหรี่, ดื่มสุรา</li>
                                            <li>สุขภาพโดยทั่วไป</li>
                                            <li>ภาระหนี้สิน</li>
                                            <li>ยินยอมตรวจประวัติอาชญากรรม</li>
                                            <li>ยินยอมตรวจเครดิตบูโร</li>
                                        </ul>
                                    </div>

                                    <div className="bg-slate-50 rounded-lg p-4">
                                        <h5 className="font-semibold text-slate-800 mb-3">บุคคลอ้างอิงและข้อมูลบิดา-มารดา</h5>
                                        <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
                                            <li>ผู้แนะนำมาสมัคร</li>
                                            <li>คนรู้จักในบริษัท</li>
                                            <li>ข้อมูลบิดา-มารดา (ชื่อ, อาชีพ, ที่อยู่, เบอร์โทร)</li>
                                        </ul>
                                    </div>
                                </AccordionItem>

                                <AccordionItem title="ขั้นตอนที่ 3: ผู้ติดต่อฉุกเฉินและลายเซ็น (Step 4/4)" icon={Edit}>
                                    <StepItem 
                                        number="4.1"
                                        title="ผู้ติดต่อฉุกเฉิน"
                                        description="กรอกข้อมูลผู้ติดต่อฉุกเฉินอย่างน้อย 1 คน ประกอบด้วย ชื่อ-นามสกุล, ความสัมพันธ์, ที่อยู่, เบอร์โทรศัพท์"
                                    />
                                    <StepItem 
                                        number="4.2"
                                        title="ทัศนคติในการทำงาน"
                                        description="กรอกทัศนคติหรือแนวคิดในการทำงานของคุณ"
                                    />
                                    <StepItem 
                                        number="4.3"
                                        title="อ่านคำรับรองและข้อสัญญา"
                                        description="อ่านคำรับรองข้อมูลและข้อสัญญาต่างๆ อย่างละเอียด"
                                    />
                                    <StepItem 
                                        number="4.4"
                                        title="ลงลายเซ็น"
                                        description="เซ็นชื่อในกรอบที่กำหนด สามารถวาดด้วยนิ้วหรือเมาส์ หรืออัพโหลดรูปลายเซ็น"
                                    />
                                    <StepItem 
                                        number="4.5"
                                        title="ระบุวันที่เริ่มงานได้"
                                        description="เลือกวันที่พร้อมเริ่มงาน"
                                    />
                                </AccordionItem>

                                <AccordionItem title="ขั้นตอนที่ 4: ยินยอม PDPA" icon={Lock}>
                                    <StepItem 
                                        number="4.1"
                                        title="อ่านนโยบาย PDPA"
                                        description="อ่านนโยบายการคุ้มครองข้อมูลส่วนบุคคล (PDPA) อย่างละเอียด"
                                    />
                                    <StepItem 
                                        number="4.2"
                                        title="กรอกข้อมูลและลงลายเซ็น"
                                        description="กรอกข้อมูลตามที่กำหนดและลงลายเซ็นยินยอม"
                                    />
                                    <StepItem 
                                        number="4.3"
                                        title="ยืนยันและส่ง"
                                        description="ตรวจสอบข้อมูลและคลิกยืนยันเพื่อส่งเอกสาร PDPA"
                                    />
                                </AccordionItem>

                                <AccordionItem title="ขั้นตอนที่ 5: สัมภาษณ์วิดีโอ" icon={Video}>
                                    <StepItem 
                                        number="5.1"
                                        title="เลือกตำแหน่งงาน"
                                        description="ยืนยันตำแหน่งงานที่ต้องการสมัคร"
                                    />
                                    <StepItem 
                                        number="5.2"
                                        title="ตอบคำถามสัมภาษณ์"
                                        description="ตอบคำถามสัมภาษณ์ที่กำหนด อาจเป็นแบบข้อความหรือวิดีโอ ขึ้นอยู่กับคำถามที่ตั้งไว้"
                                    />
                                    <StepItem 
                                        number="5.3"
                                        title="ส่งใบสมัคร"
                                        description="ตรวจสอบคำตอบและคลิก 'ส่งใบสมัคร' เพื่อเสร็จสิ้นกระบวนการสมัคร"
                                    />
                                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
                                        <p className="text-sm text-green-800">
                                            <strong>สำเร็จ!</strong> เมื่อส่งใบสมัครเสร็จแล้ว ระบบจะแสดงหน้ายืนยันความสำเร็จ และคุณสามารถรอการติดต่อกลับจากฝ่ายบุคคล
                                        </p>
                                    </div>
                                </AccordionItem>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Employee Guide */}
                    <TabsContent value="employee" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <UserCircle className="w-6 h-6 text-indigo-600" />
                                    คู่มือสำหรับพนักงานใหม่ (กรอกเอกสารหลังผ่านการคัดเลือก)
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                                    <h3 className="font-semibold text-blue-800 mb-2">เงื่อนไขการเข้าสู่ระบบ</h3>
                                    <p className="text-sm text-blue-700">
                                        พนักงานใหม่สามารถเข้าสู่ระบบได้เฉพาะเมื่อผ่านการคัดเลือก (approval_status = 1) เท่านั้น
                                    </p>
                                </div>

                                <AccordionItem title="การเข้าสู่ระบบพนักงานใหม่" icon={Lock} defaultOpen={true}>
                                    <StepItem 
                                        number="1"
                                        title="เข้าหน้า Login"
                                        description="เข้าที่ URL /user-login หรือได้รับลิงก์จากฝ่ายบุคคล"
                                    />
                                    <StepItem 
                                        number="2"
                                        title="ค้นหาชื่อของคุณ"
                                        description="พิมพ์ชื่อไทยหรือชื่ออังกฤษในช่องค้นหา ระบบจะแสดงรายชื่อที่ตรงกัน"
                                    />
                                    <StepItem 
                                        number="3"
                                        title="เลือกชื่อของคุณ"
                                        description="คลิกที่ชื่อของคุณในรายการ จะแสดงข้อมูลและรูปภาพเพื่อยืนยัน"
                                    />
                                    <StepItem 
                                        number="4"
                                        title="ยืนยันตัวตน"
                                        description="กรอกเลขบัตรประชาชน 6 ตัวท้าย เพื่อยืนยันตัวตน"
                                    />
                                    <StepItem 
                                        number="5"
                                        title="เข้าสู่ระบบ"
                                        description="คลิกปุ่ม 'เข้าสู่ระบบ' เพื่อเข้าสู่หน้า Dashboard"
                                    />
                                </AccordionItem>

                                <AccordionItem title="หน้า Dashboard พนักงานใหม่" icon={LayoutDashboard}>
                                    <p className="text-slate-600 mb-4">หน้า Dashboard แสดงข้อมูลส่วนตัวและรายการเอกสารที่ต้องกรอก:</p>
                                    
                                    <div className="bg-slate-50 rounded-lg p-4 mb-4">
                                        <h5 className="font-semibold text-slate-800 mb-3">ข้อมูลที่แสดง</h5>
                                        <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
                                            <li>รูปภาพ, ชื่อ-นามสกุล (ไทย/อังกฤษ)</li>
                                            <li>วันเดือนปีเกิด, อายุ</li>
                                            <li>ตำแหน่งที่สมัคร</li>
                                        </ul>
                                    </div>

                                    <div className="bg-slate-50 rounded-lg p-4">
                                        <h5 className="font-semibold text-slate-800 mb-3">ปุ่มออกจากระบบ</h5>
                                        <p className="text-sm text-slate-600">คลิกปุ่ม "ออกจากระบบ" มุมขวาบนเพื่อออกจากระบบ</p>
                                    </div>
                                </AccordionItem>

                                <AccordionItem title="เอกสารที่ต้องกรอก" icon={FileText}>
                                    <p className="text-slate-600 mb-4">รายการเอกสารที่พนักงานใหม่ต้องกรอก:</p>
                                    
                                    <div className="space-y-3">
                                        <div className="border rounded-lg p-4">
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold text-sm">1</div>
                                                <h5 className="font-semibold">FM-HRD-19</h5>
                                            </div>
                                            <p className="text-sm text-slate-600">แบบฟอร์มการเข้าทำงาน - กรอกข้อมูลตำแหน่ง, แผนก, วันเริ่มงาน และลงลายเซ็น</p>
                                        </div>

                                        <div className="border rounded-lg p-4">
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold text-sm">2</div>
                                                <h5 className="font-semibold">สัญญาจ้างงาน</h5>
                                            </div>
                                            <p className="text-sm text-slate-600">สัญญาจ้างงาน - อ่านและลงลายเซ็นยอมรับสัญญาจ้าง</p>
                                        </div>

                                        <div className="border rounded-lg p-4">
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold text-sm">3</div>
                                                <h5 className="font-semibold">FM-HRD-27 (NDA)</h5>
                                            </div>
                                            <p className="text-sm text-slate-600">สัญญาไม่เปิดเผยข้อมูล - อ่านและลงลายเซ็นยินยอม</p>
                                        </div>

                                        <div className="border rounded-lg p-4">
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold text-sm">4</div>
                                                <h5 className="font-semibold">FM-HRD-30</h5>
                                            </div>
                                            <p className="text-sm text-slate-600">การตรวจประวัติอาชญากรรม - กรอกข้อมูลและลงลายเซ็น</p>
                                        </div>

                                        <div className="border rounded-lg p-4">
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold text-sm">5</div>
                                                <h5 className="font-semibold">หนังสือมอบอำนาจตรวจประวัติอาชญากรรม</h5>
                                            </div>
                                            <p className="text-sm text-slate-600">หนังสือมอบอำนาจ - กรอกข้อมูลและลงลายเซ็น</p>
                                        </div>

                                        <div className="border rounded-lg p-4">
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold text-sm">6</div>
                                                <h5 className="font-semibold">แบบ สปส. 1-03 หรือ 9-02</h5>
                                            </div>
                                            <p className="text-sm text-slate-600">แบบฟอร์มประกันสังคม - ระบบจะเลือกฟอร์มตามที่แอดมินกำหนด (1-03 หากมีประกันอยู่แล้ว, 9-02 หากยังไม่มี)</p>
                                        </div>

                                        <div className="border rounded-lg p-4">
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold text-sm">7</div>
                                                <h5 className="font-semibold">ใบขอเอาประกันภัยพนักงาน</h5>
                                            </div>
                                            <p className="text-sm text-slate-600">แบบฟอร์มประกันภัย - กรอกข้อมูลและลงลายเซ็น</p>
                                        </div>
                                    </div>

                                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
                                        <p className="text-sm text-green-800">
                                            <strong>สถานะเอกสาร:</strong> เอกสารที่กรอกเสร็จและได้รับการอนุมัติจากแอดมินแล้ว จะแสดงเครื่องหมาย ✓ สีเขียว และไม่สามารถแก้ไขได้
                                        </p>
                                    </div>
                                </AccordionItem>

                                <AccordionItem title="การกรอกเอกสาร" icon={Edit}>
                                    <StepItem 
                                        number="1"
                                        title="เลือกเอกสาร"
                                        description="คลิกที่เอกสารที่ต้องการกรอกจากรายการ"
                                    />
                                    <StepItem 
                                        number="2"
                                        title="กรอกข้อมูล"
                                        description="กรอกข้อมูลตามฟอร์มที่กำหนด บางฟิลด์จะถูกกรอกอัตโนมัติจากข้อมูลที่สมัครไว้"
                                    />
                                    <StepItem 
                                        number="3"
                                        title="ลงลายเซ็น"
                                        description="ลงลายเซ็นในช่องที่กำหนด สามารถวาดด้วยนิ้วหรือเมาส์"
                                    />
                                    <StepItem 
                                        number="4"
                                        title="ส่งเอกสาร"
                                        description="ตรวจสอบข้อมูลและคลิก 'ส่งเอกสาร' เพื่อส่งให้แอดมินตรวจสอบ"
                                    />
                                </AccordionItem>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Admin Guide */}
                    <TabsContent value="admin" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Settings className="w-6 h-6 text-indigo-600" />
                                    คู่มือสำหรับผู้ดูแลระบบ (Admin)
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
                                    <h3 className="font-semibold text-purple-800 mb-2">การเข้าถึงระบบ Admin</h3>
                                    <p className="text-sm text-purple-700">
                                        คลิก "Admin Login" ที่มุมขวาบน หรือเข้าที่ /admin โดยตรง ต้องเข้าสู่ระบบด้วยบัญชีที่ได้รับสิทธิ์
                                    </p>
                                </div>

                                <AccordionItem title="ภาพรวมหน้า Admin Portal" icon={LayoutDashboard} defaultOpen={true}>
                                    <p className="text-slate-600 mb-4">หน้า Admin Portal มี 3 แท็บหลัก:</p>
                                    
                                    <div className="grid md:grid-cols-3 gap-4">
                                        <div className="bg-slate-50 rounded-lg p-4 text-center">
                                            <Users className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
                                            <h5 className="font-semibold">ผู้สมัคร</h5>
                                            <p className="text-xs text-slate-500 mt-1">จัดการข้อมูลผู้สมัคร</p>
                                        </div>
                                        <div className="bg-slate-50 rounded-lg p-4 text-center">
                                            <FileCheck className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
                                            <h5 className="font-semibold">เอกสาร</h5>
                                            <p className="text-xs text-slate-500 mt-1">ตรวจสอบเอกสาร</p>
                                        </div>
                                        <div className="bg-slate-50 rounded-lg p-4 text-center">
                                            <Settings className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
                                            <h5 className="font-semibold">ตั้งค่า</h5>
                                            <p className="text-xs text-slate-500 mt-1">ตั้งค่าระบบ</p>
                                        </div>
                                    </div>
                                </AccordionItem>

                                <AccordionItem title="แท็บผู้สมัคร - รายการและการค้นหา" icon={Users}>
                                    <div className="bg-slate-50 rounded-lg p-4 mb-4">
                                        <h5 className="font-semibold text-slate-800 mb-3">แถบด้านซ้าย - รายการผู้สมัคร</h5>
                                        <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
                                            <li><strong>ค้นหาชื่อ:</strong> พิมพ์ชื่อเพื่อค้นหาผู้สมัคร</li>
                                            <li><strong>ค้นหาตำแหน่ง:</strong> เลือกตำแหน่งจาก dropdown เพื่อกรองผู้สมัคร</li>
                                            <li><strong>กรองวันที่:</strong> เลือกวันที่สมัครเพื่อกรอง</li>
                                            <li><strong>สถานะ:</strong> แสดง pending, complete, accepted, rejected</li>
                                        </ul>
                                    </div>

                                    <div className="bg-slate-50 rounded-lg p-4">
                                        <h5 className="font-semibold text-slate-800 mb-3">คลิกที่ผู้สมัคร</h5>
                                        <p className="text-sm text-slate-600">คลิกที่รายชื่อผู้สมัครเพื่อดูรายละเอียดทางด้านขวา</p>
                                    </div>
                                </AccordionItem>

                                <AccordionItem title="แท็บผู้สมัคร - รายละเอียดผู้สมัคร" icon={Eye}>
                                    <p className="text-slate-600 mb-4">เมื่อเลือกผู้สมัครแล้ว จะแสดงข้อมูลทางด้านขวา:</p>

                                    <div className="bg-slate-50 rounded-lg p-4 mb-4">
                                        <h5 className="font-semibold text-slate-800 mb-3">ส่วนหัว</h5>
                                        <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
                                            <li>รูปภาพ, ชื่อ, สถานะ</li>
                                            <li>เบอร์โทร, อีเมล, วันที่สมัคร</li>
                                            <li>ปุ่ม "ดูคำตอบ" - ดูคำตอบจากการสัมภาษณ์</li>
                                            <li>Toggle "ผ่านการประเมิน" - เปิด/ปิดสถานะผ่านการประเมิน</li>
                                            <li>Toggle "กรอกข้อมูลเสร็จ" - เปิด/ปิดสถานะกรอกข้อมูลครบ</li>
                                            <li>ปุ่ม "กรอกข้อมูล Admin" - กรอกข้อมูลเพิ่มเติมจากฝ่ายบุคคล</li>
                                            <li>ปุ่ม Preview / Download - ดูตัวอย่างหรือดาวน์โหลด PDF</li>
                                        </ul>
                                    </div>

                                    <div className="bg-slate-50 rounded-lg p-4 mb-4">
                                        <h5 className="font-semibold text-slate-800 mb-3">แท็บข้อมูล</h5>
                                        <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
                                            <li><strong>ข้อมูลส่วนตัว:</strong> ข้อมูลพื้นฐาน, ที่อยู่, ผู้ติดต่อฉุกเฉิน</li>
                                            <li><strong>ครอบครัว:</strong> สถานะครอบครัว, ข้อมูลบิดา-มารดา</li>
                                            <li><strong>การศึกษา & ทักษะ:</strong> ประวัติการศึกษา, ทักษะ, การฝึกอบรม</li>
                                            <li><strong>ประสบการณ์ทำงาน:</strong> ประวัติการทำงาน, บุคคลอ้างอิง</li>
                                            <li><strong>สุขภาพ & อื่นๆ:</strong> ข้อมูลสุขภาพ, คำแถลง, ลายเซ็น</li>
                                            <li><strong>ข้อมูล Admin:</strong> ข้อมูลที่ Admin กรอกเพิ่มเติม</li>
                                        </ul>
                                    </div>

                                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                                        <h5 className="font-semibold text-amber-800 mb-2">การอัพเดทสถานะ</h5>
                                        <p className="text-sm text-amber-700">
                                            เมื่อเปิด Toggle "ผ่านการประเมิน" = ON และ "กรอกข้อมูลเสร็จ" = ON สถานะจะเปลี่ยนเป็น "complete" โดยอัตโนมัติ
                                        </p>
                                    </div>
                                </AccordionItem>

                                <AccordionItem title="การกรอกข้อมูล Admin" icon={Edit}>
                                    <p className="text-slate-600 mb-4">คลิกปุ่ม "กรอกข้อมูล Admin" เพื่อเปิดฟอร์มกรอกข้อมูลเพิ่มเติม:</p>

                                    <div className="space-y-3">
                                        <div className="bg-slate-50 rounded-lg p-3">
                                            <h6 className="font-semibold text-sm mb-1">ระบบ HR</h6>
                                            <p className="text-xs text-slate-600">Web HR, SPS In, SPS Out, B Plus</p>
                                        </div>
                                        <div className="bg-slate-50 rounded-lg p-3">
                                            <h6 className="font-semibold text-sm mb-1">ประเภทแบบฟอร์ม สปส.</h6>
                                            <p className="text-xs text-slate-600">เลือก 1-03 (มีประกันอยู่แล้ว) หรือ 9-02 (ยังไม่มีประกัน)</p>
                                        </div>
                                        <div className="bg-slate-50 rounded-lg p-3">
                                            <h6 className="font-semibold text-sm mb-1">ข้อมูล HR</h6>
                                            <p className="text-xs text-slate-600">รหัสพนักงาน, วันเริ่มงานจริง, แผนก, ขนาดเสื้อ</p>
                                        </div>
                                        <div className="bg-slate-50 rounded-lg p-3">
                                            <h6 className="font-semibold text-sm mb-1">เอกสารประกอบ</h6>
                                            <p className="text-xs text-slate-600">Checkbox สำหรับเอกสารที่รับแล้ว (รูปถ่าย, สำเนาบัตร, ทะเบียนบ้าน ฯลฯ)</p>
                                        </div>
                                        <div className="bg-slate-50 rounded-lg p-3">
                                            <h6 className="font-semibold text-sm mb-1">ผลการทดสอบ</h6>
                                            <p className="text-xs text-slate-600">คะแนนทดสอบต่างๆ</p>
                                        </div>
                                        <div className="bg-slate-50 rounded-lg p-3">
                                            <h6 className="font-semibold text-sm mb-1">การสัมภาษณ์</h6>
                                            <p className="text-xs text-slate-600">ชื่อผู้สัมภาษณ์, รายละเอียดการสัมภาษณ์</p>
                                        </div>
                                        <div className="bg-slate-50 rounded-lg p-3">
                                            <h6 className="font-semibold text-sm mb-1">การอนุมัติ</h6>
                                            <p className="text-xs text-slate-600">ลายเซ็นและการอนุมัติจากผู้เกี่ยวข้อง</p>
                                        </div>
                                    </div>
                                </AccordionItem>

                                <AccordionItem title="แท็บเอกสาร - ตรวจสอบเอกสาร" icon={FileCheck}>
                                    <p className="text-slate-600 mb-4">ต้องเลือกผู้สมัครจากแท็บ "ผู้สมัคร" ก่อน จึงจะดูเอกสารได้:</p>

                                    <div className="bg-slate-50 rounded-lg p-4 mb-4">
                                        <h5 className="font-semibold text-slate-800 mb-3">ประเภทเอกสาร</h5>
                                        <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
                                            <li>PDPA</li>
                                            <li>NDA (FM-HRD-27)</li>
                                            <li>FM-HRD-19</li>
                                            <li>สปส. 1-03 / 9-02</li>
                                            <li>ใบสมัครประกันภัยพนักงาน</li>
                                            <li>สัญญาจ้างงาน</li>
                                            <li>FM-HRD-30</li>
                                            <li>หนังสือมอบอำนาจตรวจประวัติอาชญากรรม</li>
                                        </ul>
                                    </div>

                                    <div className="bg-slate-50 rounded-lg p-4 mb-4">
                                        <h5 className="font-semibold text-slate-800 mb-3">สถานะเอกสาร</h5>
                                        <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
                                            <li><strong>แบบร่าง (draft):</strong> ยังไม่ได้ส่ง</li>
                                            <li><strong>รอดำเนินการ (submitted):</strong> ส่งแล้ว รอตรวจสอบ</li>
                                            <li><strong>อนุมัติแล้ว (approved):</strong> ตรวจสอบและอนุมัติแล้ว</li>
                                        </ul>
                                    </div>

                                    <div className="bg-slate-50 rounded-lg p-4">
                                        <h5 className="font-semibold text-slate-800 mb-3">การดำเนินการ</h5>
                                        <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
                                            <li>คลิก "ดูเอกสาร" หรือ "กรอกข้อมูลพยาน" เพื่อเปิด Modal ตรวจสอบ</li>
                                            <li>สามารถดู Preview และ Download PDF ได้</li>
                                            <li>กรอกข้อมูลพยาน/บริษัท และลงลายเซ็นอนุมัติ</li>
                                            <li>คลิก "ดาวน์โหลดทุกเอกสาร" เพื่อดาวน์โหลดเป็น ZIP</li>
                                        </ul>
                                    </div>
                                </AccordionItem>

                                <AccordionItem title="แท็บตั้งค่า" icon={Settings}>
                                    <div className="bg-slate-50 rounded-lg p-4 mb-4">
                                        <h5 className="font-semibold text-slate-800 mb-3">ตั้งค่าโลโก้</h5>
                                        <p className="text-sm text-slate-600">อัพโหลดโลโก้บริษัทเพื่อแสดงในระบบ</p>
                                    </div>

                                    <div className="bg-slate-50 rounded-lg p-4 mb-4">
                                        <h5 className="font-semibold text-slate-800 mb-3">จัดการตำแหน่งงาน</h5>
                                        <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
                                            <li>เพิ่ม/แก้ไข/ลบตำแหน่งงาน</li>
                                            <li>เปิด/ปิดสถานะตำแหน่ง (Active/Inactive)</li>
                                        </ul>
                                    </div>

                                    <div className="bg-slate-50 rounded-lg p-4">
                                        <h5 className="font-semibold text-slate-800 mb-3">จัดการคำถามสัมภาษณ์</h5>
                                        <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
                                            <li>เพิ่ม/แก้ไข/ลบคำถาม</li>
                                            <li>ประเภทคำถาม: ทั่วไป หรือ เฉพาะตำแหน่ง</li>
                                            <li>รูปแบบคำตอบ: ข้อความ, ตัวเลือกเดียว, หลายตัวเลือก, วิดีโอ</li>
                                            <li>เปิด/ปิดสถานะคำถาม</li>
                                        </ul>
                                    </div>
                                </AccordionItem>

                                <AccordionItem title="การจัดการสถานะผู้สมัคร" icon={CheckCircle}>
                                    <p className="text-slate-600 mb-4">อธิบายการทำงานของสถานะต่างๆ:</p>

                                    <div className="overflow-x-auto">
                                        <table className="w-full text-sm">
                                            <thead>
                                                <tr className="bg-slate-100">
                                                    <th className="p-3 text-left">สถานะ</th>
                                                    <th className="p-3 text-left">ความหมาย</th>
                                                    <th className="p-3 text-left">เงื่อนไข</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className="border-b">
                                                    <td className="p-3"><span className="bg-amber-100 text-amber-700 px-2 py-1 rounded text-xs">pending</span></td>
                                                    <td className="p-3">รอดำเนินการ</td>
                                                    <td className="p-3">สถานะเริ่มต้น</td>
                                                </tr>
                                                <tr className="border-b">
                                                    <td className="p-3"><span className="bg-amber-100 text-amber-700 px-2 py-1 rounded text-xs">pending_video</span></td>
                                                    <td className="p-3">รอวิดีโอ</td>
                                                    <td className="p-3">ยังไม่ส่งวิดีโอสัมภาษณ์</td>
                                                </tr>
                                                <tr className="border-b">
                                                    <td className="p-3"><span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">complete</span></td>
                                                    <td className="p-3">สมบูรณ์</td>
                                                    <td className="p-3">approval_status=1 AND data_completion_status=1</td>
                                                </tr>
                                                <tr className="border-b">
                                                    <td className="p-3"><span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">accepted</span></td>
                                                    <td className="p-3">ผ่าน</td>
                                                    <td className="p-3">ตั้งค่าด้วยตนเอง</td>
                                                </tr>
                                                <tr>
                                                    <td className="p-3"><span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs">rejected</span></td>
                                                    <td className="p-3">ไม่ผ่าน</td>
                                                    <td className="p-3">ตั้งค่าด้วยตนเอง</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                                        <h5 className="font-semibold text-blue-800 mb-2">Toggle สำคัญ</h5>
                                        <ul className="list-disc list-inside text-sm text-blue-700 space-y-1">
                                            <li><strong>ผ่านการประเมิน (approval_status):</strong> 0=ไม่ผ่าน, 1=ผ่าน - เมื่อเปิดจะอนุญาตให้พนักงานใหม่ Login เข้าระบบได้</li>
                                            <li><strong>กรอกข้อมูลเสร็จ (data_completion_status):</strong> 0=ยังไม่ครบ, 1=ครบ - ใช้ติดตามว่าพนักงานใหม่กรอกเอกสารครบหรือยัง</li>
                                        </ul>
                                    </div>
                                </AccordionItem>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>

                {/* Footer */}
                <div className="text-center mt-8 text-slate-500 text-sm">
                    <p>คู่มือนี้อัพเดทล่าสุดเมื่อ: {new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
            </div>
        </div>
    );
}