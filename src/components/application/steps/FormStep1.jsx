import React from 'react';
import { Input } from "@/components/ui/input";
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

export default function FormStep1({ data, updateData, photo, errors = {} }) {
    // Job positions query removed

    // Validation helpers
    const validatePhone = (phone) => {
        return phone && phone.length === 10;
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return email && emailRegex.test(email);
    };

    const validateIdCard = (idCard) => {
        return idCard && idCard.length === 13;
    };

    const validateThaiName = (firstName, lastName) => {
        const thaiRegex = /[\u0E00-\u0E7F]/;
        return firstName && lastName && thaiRegex.test(firstName) && thaiRegex.test(lastName);
    };

    const validateEnglishName = (englishName) => {
        const englishRegex = /^[a-zA-Z\s]+$/;
        return englishName && englishRegex.test(englishName) && englishName.trim().includes(' ');
    };

    // Helper to update nested address fields
    const updateAddress = (type, field, value) => {
        const currentAddr = data[type] || {};
        updateData('personal_data', type, { ...currentAddr, [field]: value });
    };

    const calculateAge = (dob) => {
        if (!dob) return "";
        const diff = Date.now() - new Date(dob).getTime();
        const ageDate = new Date(diff); 
        return Math.abs(ageDate.getUTCFullYear() - 1970).toString();
    };

    const handleDobChange = (e) => {
        const val = e.target.value;
        updateData('personal_data', 'dob', val);
        updateData('personal_data', 'age', calculateAge(val));
    };

    return (
    <div className="space-y-3">
        <h3 className="text-xl font-bold text-slate-900 border-b pb-2 mb-3">ส่วนที่ 1: ประวัติส่วนตัว</h3>

        <div className="space-y-2 bg-slate-50 p-3 rounded-lg border">
            <div className="flex items-center gap-3">
                <Label className="whitespace-nowrap">วันที่ยื่นใบสมัคร</Label>
                <Input className="w-auto" type="date" value={data.application_date} onChange={(e) => updateData('personal_data', 'application_date', e.target.value)} max={new Date().toISOString().split('T')[0]} />
            </div>
            <div className="text-sm text-slate-600 leading-relaxed text-justify">
                ใบสมัครงานฉบับนี้เป็นส่วนหนึ่งในการพิจารณา ในโอกาสที่ท่านมาสมัครเข้าทำงานที่บริษัทฯ ซึ่งใบสมัครนี้ท่าน ไม่ว่าจะ การพิจารณา รับเข้าทำงาน ข้อมูลในใบสมัครจะถูกเก็บไว้เป็นระยะเวลา 1 เดือน หากมีการพิจารณาเข้าเป็นพนักงาน ซึ่งท้ายหลังจากหมดระยะ อายุใบสมัครนี้ท่านสามาทำการสมัครงานใหม่ได้ ข้อมูลในใบสมัครจะถูกเก็บไว้สำหรับหน่วยงานบริษัทของบริษัท/ลูกจ้างของ บริษัทและผู้ประมวลผลข้อมูลของบริษัท/ลูกจ้างอีกทั้ง บริษัทจะไม่เปิดเผยข้อมูลส่วนบุคคลไปยังบุคคลภายนอก 2 ปี ท่านยินยอมที่ ต้องเป็นพนักงานประจำของการพิจารณาค่าตอบแทน หลักฐานทรัพย์สินผลตอบแทนการรับ อันมิอาจเปิดเผยข้อมูลดังกล่าวแก่บุคคล ภายนอกได้ อนึ่ง ตาม พ.ร.บ. คุ้มครอง ข้อมูล ส่วนบุคคล ปี 2562 เป็นเหตุเกิดอาจกระทบต่อสิทธิและเสรีภาพในความเป็นบุคคลของ ข้าน ตาม (PDPA) คุ้มข้อมูลส่วนบุคคลผู้ที่นำไปใช้ กรม.คุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 "การคุ้มครองข้อมูลส่วนบุคคล" และ "ข้อมูลส่วนบุคคลทั่วไปภายในสำนักงาน" ในแบบแบ่งปันข้อมูลการพิจารณาบุคคลภายนอกเปิดเผยข้อทำ
            </div>
        </div>

        <div className="grid md:grid-cols-3 gap-2">
            <div className="space-y-1">
                <Label>สมัครงานในตำแหน่ง 1 <span className="text-red-500">*</span></Label>
                <Input className={`h-9 ${errors.position_1 ? 'border-red-500 border-2' : ''}`} value={data.position_1} onChange={(e) => updateData('personal_data', 'position_1', e.target.value)} />
            </div>
            <div className="space-y-1">
                <Label>สมัครงานในตำแหน่ง 2</Label>
                <Input className="h-9" value={data.position_2} onChange={(e) => updateData('personal_data', 'position_2', e.target.value)} />
            </div>
            <div className="space-y-1">
                <Label>อัตราเงินเดือนที่ต้องการ <span className="text-red-500">*</span></Label>
                <Input className={`h-9 ${errors.expected_salary ? 'border-red-500 border-2' : ''}`} value={data.expected_salary} onChange={(e) => updateData('personal_data', 'expected_salary', e.target.value)} />
            </div>
        </div>

        <div className="flex flex-col md:flex-row gap-3 items-start">
            <div className="flex-1 space-y-2">
                <div className="grid md:grid-cols-2 gap-2">
                    <div className="space-y-2">
                        <Label>ชื่อ-สกุล (ภาษาไทย) <span className="text-red-500">*</span></Label>
                        <div className="flex gap-2">
                             <Select value={data.prefix} onValueChange={(v) => updateData('personal_data', 'prefix', v)}>
                                <SelectTrigger className="w-[80px]"><SelectValue placeholder="คำนำ" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="นาย">นาย</SelectItem>
                                    <SelectItem value="นาง">นาง</SelectItem>
                                    <SelectItem value="นางสาว">น.ส.</SelectItem>
                                </SelectContent>
                            </Select>
                            <Input 
                                placeholder="ชื่อ (ภาษาไทย)" 
                                value={data.first_name} 
                                onChange={(e) => updateData('personal_data', 'first_name', e.target.value)}
                                className={errors.first_name ? 'border-red-500 border-2' : (!validateThaiName(data.first_name, data.last_name) && (data.first_name || data.last_name) ? 'border-red-300' : '')}
                            />
                            <Input 
                                placeholder="สกุล (ภาษาไทย)" 
                                value={data.last_name} 
                                onChange={(e) => updateData('personal_data', 'last_name', e.target.value)}
                                className={errors.last_name ? 'border-red-500 border-2' : (!validateThaiName(data.first_name, data.last_name) && (data.first_name || data.last_name) ? 'border-red-300' : '')}
                            />
                        </div>
                        {!validateThaiName(data.first_name, data.last_name) && (data.first_name || data.last_name) && (
                            <p className="text-xs text-red-500">กรุณากรอกชื่อและนามสกุลเป็นภาษาไทย</p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label>ชื่อเล่น (ภาษาไทย)</Label>
                        <Input value={data.thai_nickname} onChange={(e) => updateData('personal_data', 'thai_nickname', e.target.value)} />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label>Name in English <span className="text-red-500">*</span></Label>
                    <Input 
                        placeholder="Firstname Lastname" 
                        value={data.english_name} 
                        onChange={(e) => updateData('personal_data', 'english_name', e.target.value)}
                        className={errors.english_name ? 'border-red-500 border-2' : (!validateEnglishName(data.english_name) && data.english_name ? 'border-red-300' : '')}
                    />
                    {!validateEnglishName(data.english_name) && data.english_name && (
                        <p className="text-xs text-red-500">กรุณากรอกชื่อและนามสกุลเป็นภาษาอังกฤษ (เช่น John Smith)</p>
                    )}
                </div>
                <div className="space-y-2">
                    <Label>เลขประจำตัวประชาชน (Citizen ID) <span className="text-red-500">*</span></Label>
                    <Input 
                        placeholder="เลข 13 หลัก" 
                        value={data.id_card || ''} 
                        maxLength={13}
                        onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, '');
                            updateData('personal_data', 'id_card', val);
                        }}
                        className={errors.id_card ? 'border-red-500 border-2' : (!validateIdCard(data.id_card) && data.id_card ? 'border-red-300' : '')}
                    />
                    {data.id_card && !validateIdCard(data.id_card) && (
                        <p className="text-xs text-red-500">เลขประจำตัวประชาชนต้องมี 13 หลัก (ปัจจุบัน {data.id_card.length} หลัก)</p>
                    )}
                </div>
            </div>
            
            {photo && (
                <div className="w-32 h-40 bg-slate-100 border rounded-md overflow-hidden shrink-0 mt-1">
                     <img src={photo} alt="Applicant" className="w-full h-full object-cover" />
                </div>
            )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
             <div className="space-y-1">
                <Label>วัน/เดือน/ปีเกิด <span className="text-red-500">*</span></Label>
                <Input className={`h-9 ${errors.dob ? 'border-red-500 border-2' : ''}`} type="date" value={data.dob} onChange={handleDobChange} max={new Date().toISOString().split('T')[0]} />
            </div>
            <div className="space-y-1">
                <Label>อายุ <span className="text-red-500">*</span></Label>
                <Input className="h-9 bg-slate-50" value={data.age} onChange={(e) => updateData('personal_data', 'age', e.target.value)} readOnly />
            </div>
            <div className="space-y-1">
                <Label>น้ำหนัก (กก.)</Label>
                <Input className="h-9" value={data.weight} onChange={(e) => updateData('personal_data', 'weight', e.target.value)} />
            </div>
            <div className="space-y-1">
                <Label>ส่วนสูง (ซม.)</Label>
                <Input className="h-9" value={data.height} onChange={(e) => updateData('personal_data', 'height', e.target.value)} />
            </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            <div className="space-y-1">
                <Label>เชื้อชาติ <span className="text-red-500">*</span></Label>
                <Input className={`h-9 ${errors.race ? 'border-red-500 border-2' : ''}`} value={data.race} onChange={(e) => updateData('personal_data', 'race', e.target.value)} />
            </div>
            <div className="space-y-1">
                <Label>สัญชาติ <span className="text-red-500">*</span></Label>
                <Input className={`h-9 ${errors.nationality ? 'border-red-500 border-2' : ''}`} value={data.nationality} onChange={(e) => updateData('personal_data', 'nationality', e.target.value)} />
            </div>
            <div className="space-y-1">
                <Label>ศาสนา <span className="text-red-500">*</span></Label>
                <Input className={`h-9 ${errors.religion ? 'border-red-500 border-2' : ''}`} value={data.religion} onChange={(e) => updateData('personal_data', 'religion', e.target.value)} />
            </div>
        </div>

        <div className="grid md:grid-cols-2 gap-2">
            <div className="space-y-1">
                <Label>(Email) อีเมล์ที่ติดต่อได้ <span className="text-red-500">*</span></Label>
                <Input 
                    className={`h-9 ${errors.email ? 'border-red-500 border-2' : (!validateEmail(data.email) && data.email ? 'border-red-300' : '')}`}
                    value={data.email} 
                    placeholder="example@email.com"
                    onChange={(e) => updateData('personal_data', 'email', e.target.value)} 
                />
                {data.email && !validateEmail(data.email) && (
                    <p className="text-xs text-red-500">กรุณากรอกอีเมลให้ถูกต้อง (เช่น example@gmail.com)</p>
                )}
            </div>
            <div className="space-y-1">
                <Label>โทรศัพท์มือถือที่ติดต่อได้สะดวก <span className="text-red-500">*</span></Label>
                <Input 
                    className={`h-9 ${errors.mobile_phone ? 'border-red-500 border-2' : (!validatePhone(data.mobile_phone) && data.mobile_phone ? 'border-red-300' : '')}`}
                    value={data.mobile_phone} 
                    maxLength={10}
                    placeholder="ตัวเลข 10 หลัก"
                    onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, '');
                        updateData('personal_data', 'mobile_phone', val);
                    }} 
                />
                {data.mobile_phone && !validatePhone(data.mobile_phone) && (
                    <p className="text-xs text-red-500">เบอร์โทรศัพท์ต้องมี 10 หลัก (ปัจจุบัน {data.mobile_phone.length} หลัก)</p>
                )}
            </div>
        </div>

        {/* Registered Address */}
        <div className={`bg-slate-50 p-4 rounded-lg border space-y-3 ${errors.registered_address ? 'border-red-500 border-2' : ''}`}>
            <Label className="font-semibold text-indigo-700">ที่อยู่ตามบัตรประชาชน <span className="text-red-500">*</span></Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="col-span-1"><Input placeholder="เลขที่ *" value={data.registered_address?.number || ''} onChange={(e) => updateAddress('registered_address', 'number', e.target.value)} /></div>
                <div className="col-span-1"><Input placeholder="หมู่" value={data.registered_address?.moo || ''} onChange={(e) => updateAddress('registered_address', 'moo', e.target.value)} /></div>
                <div className="col-span-2"><Input placeholder="ถนน" value={data.registered_address?.road || ''} onChange={(e) => updateAddress('registered_address', 'road', e.target.value)} /></div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                 <Input placeholder="ตำบล/แขวง *" value={data.registered_address?.subdistrict || ''} onChange={(e) => updateAddress('registered_address', 'subdistrict', e.target.value)} />
                 <Input placeholder="อำเภอ/เขต *" value={data.registered_address?.district || ''} onChange={(e) => updateAddress('registered_address', 'district', e.target.value)} />
                 <Input placeholder="จังหวัด *" value={data.registered_address?.province || ''} onChange={(e) => updateAddress('registered_address', 'province', e.target.value)} />
                 <Input 
                    placeholder="รหัสไปรษณีย์ *" 
                    value={data.registered_address?.zipcode || ''} 
                    maxLength={5}
                    onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, '');
                        updateAddress('registered_address', 'zipcode', val);
                    }} 
                 />
            </div>
            {errors.registered_address && (
                <p className="text-xs text-red-500">กรุณากรอกที่อยู่ให้ครบถ้วน (เลขที่, ตำบล/แขวง, อำเภอ/เขต, จังหวัด, รหัสไปรษณีย์)</p>
            )}
        </div>

        {/* Current Address */}
        <div className="bg-slate-50 p-4 rounded-lg border space-y-3">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
                 <Label className="font-semibold text-indigo-700">ที่อยู่ปัจจุบัน</Label>
                 <Select value={data.current_address_type} onValueChange={(v) => {
                     updateData('personal_data', 'current_address_type', v);
                     if (v === 'same') {
                         updateData('personal_data', 'current_address', data.registered_address);
                     }
                 }}>
                    <SelectTrigger className="w-[250px]"><SelectValue placeholder="เลือกประเภทที่อยู่" /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="own">บ้านตนเอง</SelectItem>
                        <SelectItem value="rent">บ้านเช่า / หอพัก</SelectItem>
                        <SelectItem value="same">ที่อยู่ตามบัตรประชาชน</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {data.current_address_type === 'same' ? (
                <div className="text-sm text-slate-600 bg-slate-100 p-3 rounded">
                    {data.registered_address?.number && `เลขที่ ${data.registered_address.number}`}
                    {data.registered_address?.moo && ` หมู่ ${data.registered_address.moo}`}
                    {data.registered_address?.road && ` ถนน${data.registered_address.road}`}
                    {data.registered_address?.subdistrict && ` ตำบล/แขวง${data.registered_address.subdistrict}`}
                    {data.registered_address?.district && ` อำเภอ/เขต${data.registered_address.district}`}
                    {data.registered_address?.province && ` จังหวัด${data.registered_address.province}`}
                    {data.registered_address?.zipcode && ` ${data.registered_address.zipcode}`}
                    {!data.registered_address?.number && !data.registered_address?.subdistrict && (
                        <span className="text-slate-400">กรุณากรอกที่อยู่ตามบัตรประชาชนด้านบนก่อน</span>
                    )}
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <div className="col-span-1"><Input placeholder="เลขที่" value={data.current_address?.number || ''} onChange={(e) => updateAddress('current_address', 'number', e.target.value)} /></div>
                        <div className="col-span-1"><Input placeholder="หมู่" value={data.current_address?.moo || ''} onChange={(e) => updateAddress('current_address', 'moo', e.target.value)} /></div>
                        <div className="col-span-2"><Input placeholder="ถนน" value={data.current_address?.road || ''} onChange={(e) => updateAddress('current_address', 'road', e.target.value)} /></div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                         <Input placeholder="ตำบล/แขวง" value={data.current_address?.subdistrict || ''} onChange={(e) => updateAddress('current_address', 'subdistrict', e.target.value)} />
                         <Input placeholder="อำเภอ/เขต" value={data.current_address?.district || ''} onChange={(e) => updateAddress('current_address', 'district', e.target.value)} />
                         <Input placeholder="จังหวัด" value={data.current_address?.province || ''} onChange={(e) => updateAddress('current_address', 'province', e.target.value)} />
                         <Input 
                            placeholder="รหัสไปรษณีย์" 
                            value={data.current_address?.zipcode || ''} 
                            maxLength={5}
                            onChange={(e) => {
                                const val = e.target.value.replace(/\D/g, '');
                                updateAddress('current_address', 'zipcode', val);
                            }} 
                         />
                    </div>
                </>
            )}
        </div>

        <div className="space-y-4 pt-4 border-t">
            <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-2">
                    <Label>เพศ</Label>
                    <Select value={data.gender} onValueChange={(v) => updateData('personal_data', 'gender', v)}>
                        <SelectTrigger><SelectValue placeholder="เลือกเพศ" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="male">ชาย</SelectItem>
                            <SelectItem value="female">หญิง</SelectItem>
                            <SelectItem value="other">ไม่ระบุ</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {data.gender === 'male' && (
                    <>
                        <div className="space-y-2">
                            <Label>สถานะทางทหาร</Label>
                            <div className="space-y-1">
                                 <div className="flex items-center space-x-2">
                                    <Checkbox id="mil_exempt" checked={data.military_status === 'exempted'} onCheckedChange={() => updateData('personal_data', 'military_status', 'exempted')} />
                                    <label htmlFor="mil_exempt" className="text-sm cursor-pointer">ได้รับการยกเว้นทางทหาร</label>
                                 </div>
                                 <div className="flex items-center space-x-2">
                                    <Checkbox id="mil_served" checked={data.military_status === 'served'} onCheckedChange={() => updateData('personal_data', 'military_status', 'served')} />
                                    <label htmlFor="mil_served" className="text-sm cursor-pointer">เกณฑ์ทหารแล้ว</label>
                                 </div>
                                 <div className="flex items-center space-x-2">
                                    <Checkbox id="mil_not" checked={data.military_status === 'not_served'} onCheckedChange={() => updateData('personal_data', 'military_status', 'not_served')} />
                                    <label htmlFor="mil_not" className="text-sm cursor-pointer">ยังไม่ได้รับการเกณฑ์ทหาร</label>
                                 </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>สถานะอุปสมบท</Label>
                            <div className="space-y-1">
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="ord_not" checked={data.ordination_status === 'not_yet'} onCheckedChange={() => updateData('personal_data', 'ordination_status', 'not_yet')} />
                                    <label htmlFor="ord_not" className="text-sm cursor-pointer">ยังไม่อุปสมบท</label>
                                 </div>
                                 <div className="flex items-center space-x-2">
                                    <Checkbox id="ord_done" checked={data.ordination_status === 'ordained'} onCheckedChange={() => updateData('personal_data', 'ordination_status', 'ordained')} />
                                    <label htmlFor="ord_done" className="text-sm cursor-pointer">อุปสมบทแล้ว</label>
                                 </div>
                            </div>
                        </div>
                    </>
                )}

                {data.gender === 'female' && (
                    <div className="space-y-2 md:col-span-2">
                        <Label>สถานภาพ (หญิง)</Label>
                        <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                                <Checkbox id="not_pregnant" checked={data.pregnancy_status === 'not_pregnant'} onCheckedChange={() => updateData('personal_data', 'pregnancy_status', 'not_pregnant')} />
                                <label htmlFor="not_pregnant" className="text-sm cursor-pointer">ไม่อยู่ระหว่างการตั้งครรภ์</label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="has_children" checked={data.has_children_status === 'yes'} onCheckedChange={() => updateData('personal_data', 'has_children_status', 'yes')} />
                                <label htmlFor="has_children" className="text-sm cursor-pointer">มีบุตรแล้ว</label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="no_children" checked={data.has_children_status === 'no'} onCheckedChange={() => updateData('personal_data', 'has_children_status', 'no')} />
                                <label htmlFor="no_children" className="text-sm cursor-pointer">ยังไม่มีบุตร</label>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="pregnant" checked={data.pregnancy_status === 'pregnant'} onCheckedChange={() => updateData('personal_data', 'pregnancy_status', 'pregnant')} />
                                    <label htmlFor="pregnant" className="text-sm cursor-pointer">อยู่ระหว่างการตั้งครรภ์ ระบุ สัปดาห์/เดือน</label>
                                </div>
                                {data.pregnancy_status === 'pregnant' && (
                                    <Input 
                                        placeholder="เช่น 12 สัปดาห์ หรือ 3 เดือน" 
                                        className="ml-6 h-9 w-64"
                                        value={data.pregnancy_weeks || ''}
                                        onChange={(e) => updateData('personal_data', 'pregnancy_weeks', e.target.value)}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>

    </div>
    );
}