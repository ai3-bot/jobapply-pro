import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Trash2 } from "lucide-react";

export default function FormStep3({ data, experienceData, statementData, updateData }) {
    
    // Experience Logic
    const history = experienceData?.history || [];
    const hasExperience = experienceData?.has_experience || 'no';

    const handleHasExpChange = (hasExp) => {
        updateData('experience_data', 'has_experience', hasExp ? 'yes' : 'no');
        if (hasExp && history.length === 0) {
             handleAddRow();
        }
    };

    const handleAddRow = () => {
        const newHistory = [...history, { period: '', workplace: '', employer: '', position: '', reason: '', salary_in: '', salary_out: '' }];
        updateData('experience_data', 'history', newHistory);
    };

    const handleRemoveRow = (index) => {
        const newHistory = history.filter((_, i) => i !== index);
        updateData('experience_data', 'history', newHistory);
    };

    const handleRowChange = (index, field, value) => {
        const newHistory = [...history];
        newHistory[index] = { ...newHistory[index], [field]: value };
        updateData('experience_data', 'history', newHistory);
    };

    // Statement Helpers
    const updateStatement = (field, value) => {
        updateData('statement_data', field, value);
    };

    const updateStatementObj = (parent, field, value) => {
        const current = statementData?.[parent] || {};
        updateData('statement_data', parent, { ...current, [field]: value });
    };

    // Table Styles
    const thClass = "border border-slate-300 bg-slate-100 text-slate-700 h-9 px-2 font-semibold text-center align-middle";
    const tdClass = "border border-slate-300 p-0";
    const inputClass = "border-none shadow-none focus-visible:ring-0 h-9 w-full rounded-none bg-transparent px-2";

    return (
    <div className="space-y-8">
        {/* Work Experience Section - Moved from Step 4 */}
        <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900 border-b pb-2">ประวัติการทำงาน (Work Experience)</h3>
            <div className="border border-slate-300 rounded-md overflow-hidden">
                <Table className="w-full border-collapse">
                    <TableHeader>
                        <TableRow>
                            <TableHead colSpan={5} className="border border-slate-300 bg-slate-50 p-3 h-auto">
                                <div className="flex items-center gap-6">
                                    <div className="font-bold text-slate-900">ประวัติการทำงาน</div>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox 
                                            id="no_exp" 
                                            checked={hasExperience === 'no'}
                                            onCheckedChange={(c) => handleHasExpChange(!c)}
                                        />
                                        <Label htmlFor="no_exp" className="cursor-pointer font-normal">ไม่มีประสบการณ์ทำงาน</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox 
                                            id="has_exp" 
                                            checked={hasExperience === 'yes'}
                                            onCheckedChange={(c) => handleHasExpChange(c)}
                                        />
                                        <Label htmlFor="has_exp" className="cursor-pointer font-normal">มีประสบการณ์ทำงานระบุ (เรียงลำดับจากล่าสุด)</Label>
                                    </div>
                                </div>
                            </TableHead>
                            <TableHead colSpan={2} className="border border-slate-300 bg-slate-50 p-3 h-auto text-center font-bold text-slate-900">
                                เงินเดือน
                            </TableHead>
                        </TableRow>
                        <TableRow>
                            {/* Column 1-5 (Exp) */}
                            <TableHead className={thClass + " w-[180px]"}>วัน/เดือน/ปี<br/>เริ่มงาน - ออก</TableHead>
                            <TableHead className={thClass}>ชื่อสถานที่ทำงาน</TableHead>
                            <TableHead className={thClass}>ชื่อ - นามสกุล(นายจ้าง)</TableHead>
                            <TableHead className={thClass}>ตำแหน่งสุดท้าย</TableHead>
                            <TableHead className={thClass}>สาเหตุที่ออก</TableHead>
                            
                            {/* Column 6-7 (Salary) */}
                            <TableHead className={thClass + " w-[100px]"}>บาท/เข้า</TableHead>
                            <TableHead className={thClass + " w-[100px]"}>บาท/ออก</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {hasExperience === 'yes' ? (
                            <>
                                {history.map((item, index) => (
                                    <TableRow key={index} className="hover:bg-transparent">
                                        <TableCell className={tdClass}>
                                            <Input 
                                                className={inputClass} 
                                                value={item.period} 
                                                onChange={(e) => handleRowChange(index, 'period', e.target.value)}
                                                placeholder="วว/ดด/ปป - วว/ดด/ปป"
                                            />
                                        </TableCell>
                                        <TableCell className={tdClass}>
                                            <Input 
                                                className={inputClass} 
                                                value={item.workplace} 
                                                onChange={(e) => handleRowChange(index, 'workplace', e.target.value)} 
                                            />
                                        </TableCell>
                                        <TableCell className={tdClass}>
                                            <Input 
                                                className={inputClass} 
                                                value={item.employer} 
                                                onChange={(e) => handleRowChange(index, 'employer', e.target.value)} 
                                            />
                                        </TableCell>
                                        <TableCell className={tdClass}>
                                            <Input 
                                                className={inputClass} 
                                                value={item.position} 
                                                onChange={(e) => handleRowChange(index, 'position', e.target.value)} 
                                            />
                                        </TableCell>
                                        <TableCell className={tdClass}>
                                            <div className="flex items-center">
                                                <Input 
                                                    className={inputClass} 
                                                    value={item.reason} 
                                                    onChange={(e) => handleRowChange(index, 'reason', e.target.value)} 
                                                />
                                                {history.length > 1 && (
                                                    <Button 
                                                        variant="ghost" 
                                                        size="icon" 
                                                        className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50 mr-1"
                                                        onClick={() => handleRemoveRow(index)}
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell className={tdClass}>
                                            <Input 
                                                className={inputClass} 
                                                value={item.salary_in} 
                                                onChange={(e) => handleRowChange(index, 'salary_in', e.target.value)} 
                                            />
                                        </TableCell>
                                        <TableCell className={tdClass}>
                                            <Input 
                                                className={inputClass} 
                                                value={item.salary_out} 
                                                onChange={(e) => handleRowChange(index, 'salary_out', e.target.value)} 
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                                <TableRow>
                                    <TableCell colSpan={7} className="p-2 bg-slate-50 border border-slate-300">
                                        <Button 
                                            variant="outline" 
                                            size="sm" 
                                            onClick={handleAddRow}
                                            className="w-full text-indigo-600 border-indigo-200 hover:bg-indigo-50"
                                        >
                                            <Plus className="w-4 h-4 mr-2" /> เพิ่มประวัติการทำงาน
                                        </Button>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell colSpan={7} className="p-4 border border-slate-300 bg-white">
                                        <div className="flex flex-col gap-3">
                                            <Label className="text-base font-medium">ท่านจะยินดีหรือไม่หากทางการบริษัทฯ จะติดต่อสอบถามไปยังบริษัทฯเดิม (บริษัทที่ท่านเคยปฏิบัติงาน)</Label>
                                            <div className="flex flex-col gap-3">
                                                <RadioGroup
                                                    value={experienceData?.contact_previous_employer?.status}
                                                    onValueChange={(val) => {
                                                        updateData('experience_data', 'contact_previous_employer', { 
                                                            status: val, 
                                                            reason: val === 'allowed' ? '' : experienceData?.contact_previous_employer?.reason 
                                                        });
                                                    }}
                                                    className="flex gap-6 items-center"
                                                >
                                                    <div className="flex items-center space-x-2">
                                                        <Label htmlFor="contact_allowed" className="font-normal cursor-pointer">ไม่ขัดข้อง</Label>
                                                        <RadioGroupItem value="allowed" id="contact_allowed" />
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <Label htmlFor="contact_not_allowed" className="font-normal cursor-pointer">ขัดข้อง</Label>
                                                        <RadioGroupItem value="not_allowed" id="contact_not_allowed" />
                                                    </div>
                                                </RadioGroup>
                                                {experienceData?.contact_previous_employer?.status === 'not_allowed' && (
                                                    <div className="flex items-center gap-2 w-full">
                                                        <Label className="whitespace-nowrap">โปรดระบุสาเหตุ:</Label>
                                                        <Input 
                                                            value={experienceData?.contact_previous_employer?.reason || ''}
                                                            onChange={(e) => updateData('experience_data', 'contact_previous_employer', { ...experienceData?.contact_previous_employer, reason: e.target.value })}
                                                            placeholder="ระบุสาเหตุที่ขัดข้อง"
                                                            className="h-9 flex-1"
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            </>
                        ) : (
                            <TableRow>
                                <TableCell colSpan={7} className="h-24 text-center text-slate-400 border border-slate-300 bg-slate-50">
                                    เลือก "ไม่มีประสบการณ์ทำงาน"
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>

        {/* Statement Section */}
        <div className="space-y-6 pt-6">
            <div className="bg-gradient-to-r from-slate-100 to-white p-4 rounded-lg border border-slate-200">
                <h3 className="text-xl font-bold text-indigo-900 flex items-center gap-2">
                    <span className="bg-indigo-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">3</span>
                    คำแถลง
                </h3>
                <p className="text-slate-500 text-sm mt-1 ml-10">กรุณาระบุข้อมูลตามความเป็นจริงเพื่อประโยชน์ในการพิจารณา</p>
            </div>
            
            <div className="grid gap-6">
                {/* 1. Overtime */}
                <div className="bg-white p-5 rounded-xl border shadow-sm hover:shadow-md transition-shadow">
                    <div className="space-y-3">
                        <Label className="text-base font-semibold text-slate-800">1. ท่านสามารถปฏิบัติงานล่วงเวลาได้หรือไม่</Label>
                        <RadioGroup 
                            value={statementData?.can_work_overtime} 
                            onValueChange={(val) => updateStatement('can_work_overtime', val)}
                            className="flex gap-6 pt-1"
                        >
                            <label htmlFor="ot_yes" className="flex items-center space-x-2 bg-slate-50 px-4 py-2 rounded-lg border cursor-pointer hover:bg-slate-100 transition-colors">
                                <RadioGroupItem value="yes" id="ot_yes" />
                                <span className="font-medium">ได้</span>
                            </label>
                            <label htmlFor="ot_no" className="flex items-center space-x-2 bg-slate-50 px-4 py-2 rounded-lg border cursor-pointer hover:bg-slate-100 transition-colors">
                                <RadioGroupItem value="no" id="ot_no" />
                                <span className="font-medium">ไม่ได้</span>
                            </label>
                        </RadioGroup>
                        
                        {statementData?.can_work_overtime === 'no' && (
                            <div className="flex items-center gap-2 pt-2 animate-in slide-in-from-top-2 fade-in duration-300">
                                <Label htmlFor="overtime_reason" className="whitespace-nowrap font-normal text-slate-600">โปรดระบุสาเหตุ:</Label>
                                <Input 
                                    id="overtime_reason"
                                    className="h-9 max-w-md"
                                    placeholder="ระบุสาเหตุที่ไม่สามารถทำล่วงเวลาได้"
                                    value={statementData?.can_work_overtime_reason || ''}
                                    onChange={(e) => updateStatement('can_work_overtime_reason', e.target.value)}
                                />
                            </div>
                        )}
                    </div>
                </div>

                {/* 2. Legal Cases */}
                <div className="bg-white p-5 rounded-xl border shadow-sm hover:shadow-md transition-shadow">
                    <div className="space-y-3">
                        <Label className="text-base font-semibold text-slate-800">2. ท่านเคยเป็นผู้ต้องหาหรือต้องคำพิพากษาในคดีอาญา/แพ่งหรือไม่</Label>
                        <RadioGroup 
                            value={statementData?.has_legal_cases} 
                            onValueChange={(val) => updateStatement('has_legal_cases', val)}
                            className="flex gap-4 pt-1"
                        >
                            <label htmlFor="legal_never" className="flex items-center space-x-2 bg-slate-50 px-4 py-2 rounded-lg border cursor-pointer hover:bg-slate-100 transition-colors">
                                <RadioGroupItem value="never" id="legal_never" />
                                <span className="font-medium">ไม่เคย</span>
                            </label>
                            <label htmlFor="legal_ever" className="flex items-center space-x-2 bg-slate-50 px-4 py-2 rounded-lg border cursor-pointer hover:bg-slate-100 transition-colors">
                                <RadioGroupItem value="ever" id="legal_ever" />
                                <span className="font-medium">เคย</span>
                            </label>
                        </RadioGroup>
                        
                        {statementData?.has_legal_cases === 'ever' && (
                            <div className="flex flex-wrap gap-3 pt-2 animate-in slide-in-from-top-2 fade-in duration-300 bg-red-50 p-3 rounded-md border border-red-100">
                                <Input 
                                    id="legal_case_details"
                                    className="h-9 w-full sm:w-64 bg-white"
                                    placeholder="ระบุคดี"
                                    value={statementData?.has_legal_cases_details || ''}
                                    onChange={(e) => updateStatement('has_legal_cases_details', e.target.value)}
                                />
                                <Input 
                                    id="legal_case_year"
                                    className="h-9 w-full sm:w-40 bg-white"
                                    placeholder="เมื่อปี พ.ศ."
                                    value={statementData?.has_legal_cases_year || ''}
                                    onChange={(e) => updateStatement('has_legal_cases_year', e.target.value)}
                                />
                            </div>
                        )}
                    </div>
                </div>

                {/* 3. Drugs */}
                <div className="bg-white p-5 rounded-xl border shadow-sm hover:shadow-md transition-shadow">
                    <div className="space-y-3">
                        <Label className="text-base font-semibold text-slate-800">3. ท่านเคยเสพสารเสพติดหรือเคยรับการบำบัด</Label>
                        <RadioGroup 
                            value={statementData?.has_drug_history} 
                            onValueChange={(val) => updateStatement('has_drug_history', val)}
                            className="flex gap-4 pt-1"
                        >
                            <label htmlFor="drug_never" className="flex items-center space-x-2 bg-slate-50 px-4 py-2 rounded-lg border cursor-pointer hover:bg-slate-100 transition-colors">
                                <RadioGroupItem value="never" id="drug_never" />
                                <span className="font-medium">ไม่เคย</span>
                            </label>
                            <label htmlFor="drug_ever" className="flex items-center space-x-2 bg-slate-50 px-4 py-2 rounded-lg border cursor-pointer hover:bg-slate-100 transition-colors">
                                <RadioGroupItem value="ever" id="drug_ever" />
                                <span className="font-medium">เคย</span>
                            </label>
                        </RadioGroup>

                        {statementData?.has_drug_history === 'ever' && (
                            <div className="grid sm:grid-cols-3 gap-3 pt-2 animate-in slide-in-from-top-2 fade-in duration-300 bg-red-50 p-3 rounded-md border border-red-100">
                                <Input 
                                    id="drug_type"
                                    className="h-9 bg-white"
                                    placeholder="ระบุประเภท"
                                    value={statementData?.has_drug_history_type || ''}
                                    onChange={(e) => updateStatement('has_drug_history_type', e.target.value)}
                                />
                                <Input 
                                    id="drug_place"
                                    className="h-9 bg-white"
                                    placeholder="สถานที่บำบัด"
                                    value={statementData?.has_drug_history_place || ''}
                                    onChange={(e) => updateStatement('has_drug_history_place', e.target.value)}
                                />
                                <Input 
                                    id="drug_year"
                                    className="h-9 bg-white"
                                    placeholder="เมื่อปี พ.ศ."
                                    value={statementData?.has_drug_history_year || ''}
                                    onChange={(e) => updateStatement('has_drug_history_year', e.target.value)}
                                />
                            </div>
                        )}
                    </div>
                </div>

                {/* 4. Smoking */}
                <div className="bg-white p-5 rounded-xl border shadow-sm hover:shadow-md transition-shadow">
                    <div className="space-y-3">
                        <Label className="text-base font-semibold text-slate-800">4. ในปัจจุบันท่านสูบบุหรี่หรือไม่</Label>
                        <RadioGroup 
                            value={statementData?.smoking_habit?.status} 
                            onValueChange={(val) => updateStatementObj('smoking_habit', 'status', val)}
                            className="flex flex-wrap gap-3 pt-1"
                        >
                            <label htmlFor="smoke_no" className="flex items-center space-x-2 bg-slate-50 px-4 py-2 rounded-lg border cursor-pointer hover:bg-slate-100 transition-colors">
                                <RadioGroupItem value="no" id="smoke_no" />
                                <span className="font-medium">ไม่สูบ</span>
                            </label>
                            <label htmlFor="smoke_social" className="flex items-center space-x-2 bg-slate-50 px-4 py-2 rounded-lg border cursor-pointer hover:bg-slate-100 transition-colors">
                                <RadioGroupItem value="socially" id="smoke_social" />
                                <span className="font-medium">สูบเฉพาะเที่ยว</span>
                            </label>
                            <label htmlFor="smoke_sometimes" className="flex items-center space-x-2 bg-slate-50 px-4 py-2 rounded-lg border cursor-pointer hover:bg-slate-100 transition-colors">
                                <RadioGroupItem value="sometimes" id="smoke_sometimes" />
                                <span className="font-medium">สูบบ้างบางครั้ง</span>
                            </label>
                            <label htmlFor="smoke_yes" className="flex items-center space-x-2 bg-slate-50 px-4 py-2 rounded-lg border cursor-pointer hover:bg-slate-100 transition-colors">
                                <RadioGroupItem value="yes" id="smoke_yes" />
                                <span className="font-medium">สูบประจำ</span>
                            </label>
                        </RadioGroup>

                        {statementData?.smoking_habit?.status === 'yes' && (
                            <div className="flex items-center gap-3 pt-2 animate-in slide-in-from-top-2 fade-in duration-300">
                                <Label htmlFor="smoke_amount" className="whitespace-nowrap font-normal text-slate-600">เฉลี่ยต่อวัน:</Label>
                                <Input 
                                    id="smoke_amount"
                                    className="h-9 w-40"
                                    placeholder="ม้วน/กล่อง"
                                    value={statementData?.smoking_habit?.amount || ''}
                                    onChange={(e) => updateStatementObj('smoking_habit', 'amount', e.target.value)}
                                />
                            </div>
                        )}
                    </div>
                </div>

                {/* 5. Alcohol */}
                <div className="bg-white p-5 rounded-xl border shadow-sm hover:shadow-md transition-shadow">
                    <div className="space-y-3">
                        <Label className="text-base font-semibold text-slate-800">5. ท่านดื่มแอลกอฮอล์หรือไม่</Label>
                        <RadioGroup 
                            value={statementData?.alcohol_habit} 
                            onValueChange={(val) => updateStatement('alcohol_habit', val)}
                            className="flex flex-wrap gap-3 pt-1"
                        >
                            <label htmlFor="alc_no" className="flex items-center space-x-2 bg-slate-50 px-4 py-2 rounded-lg border cursor-pointer hover:bg-slate-100 transition-colors">
                                <RadioGroupItem value="no" id="alc_no" />
                                <span className="font-medium">ไม่ดื่ม</span>
                            </label>
                            <label htmlFor="alc_yes" className="flex items-center space-x-2 bg-slate-50 px-4 py-2 rounded-lg border cursor-pointer hover:bg-slate-100 transition-colors">
                                <RadioGroupItem value="yes" id="alc_yes" />
                                <span className="font-medium">ดื่ม</span>
                            </label>
                            <label htmlFor="alc_some" className="flex items-center space-x-2 bg-slate-50 px-4 py-2 rounded-lg border cursor-pointer hover:bg-slate-100 transition-colors">
                                <RadioGroupItem value="sometimes" id="alc_some" />
                                <span className="font-medium">ดื่มบ้าง</span>
                            </label>
                        </RadioGroup>

                        {(statementData?.alcohol_habit === 'yes' || statementData?.alcohol_habit === 'sometimes') && (
                            <div className="flex items-center gap-2 pt-2 animate-in slide-in-from-top-2 fade-in duration-300">
                                <Input 
                                    id="alc_freq"
                                    className="h-9 w-60"
                                    placeholder="ความถี่ (วันต่อสัปดาห์)"
                                    value={statementData?.alcohol_habit_frequency || ''}
                                    onChange={(e) => updateStatement('alcohol_habit_frequency', e.target.value)}
                                />
                            </div>
                        )}
                    </div>
                </div>

                {/* 6. Health Status */}
                <div className="bg-white p-5 rounded-xl border shadow-sm hover:shadow-md transition-shadow">
                    <div className="space-y-3">
                        <Label className="text-base font-semibold text-slate-800">6. สุขภาพของท่าน</Label>
                        <RadioGroup 
                            value={statementData?.health_status?.status} 
                            onValueChange={(val) => updateStatementObj('health_status', 'status', val)}
                            className="flex flex-wrap gap-3 pt-1"
                        >
                            <label htmlFor="health_good" className="flex items-center space-x-2 bg-slate-50 px-4 py-2 rounded-lg border cursor-pointer hover:bg-slate-100 transition-colors">
                                <RadioGroupItem value="healthy" id="health_good" />
                                <span className="font-medium">แข็งแรงสมบูรณ์ทุกอย่าง</span>
                            </label>
                            <label htmlFor="health_no_chronic" className="flex items-center space-x-2 bg-slate-50 px-4 py-2 rounded-lg border cursor-pointer hover:bg-slate-100 transition-colors">
                                <RadioGroupItem value="no_chronic" id="health_no_chronic" />
                                <span className="font-medium">ไม่มีโรคประจำตัว</span>
                            </label>
                            <label htmlFor="health_chronic" className="flex items-center space-x-2 bg-slate-50 px-4 py-2 rounded-lg border cursor-pointer hover:bg-slate-100 transition-colors">
                                <RadioGroupItem value="chronic" id="health_chronic" />
                                <span className="font-medium">มีโรคประจำตัว</span>
                            </label>
                        </RadioGroup>

                        {statementData?.health_status?.status === 'chronic' && (
                            <div className="flex items-center gap-2 pt-2 animate-in slide-in-from-top-2 fade-in duration-300">
                                <Input 
                                    id="health_details"
                                    className="h-9 w-full max-w-md"
                                    placeholder="ระบุโรคประจำตัว"
                                    value={statementData?.health_status?.details || ''}
                                    onChange={(e) => updateStatementObj('health_status', 'details', e.target.value)}
                                />
                            </div>
                        )}
                    </div>
                </div>

                {/* 7. Recent Illness */}
                <div className="bg-white p-5 rounded-xl border shadow-sm hover:shadow-md transition-shadow">
                    <div className="space-y-3">
                        <Label className="text-base font-semibold text-slate-800">7. ท่านเคยล้มป่วยมากกว่า 3 วันติดต่อกันในรอบ 12 เดือนที่ผ่านมาหรือไม่</Label>
                        <RadioGroup 
                            value={statementData?.recent_major_illness} 
                            onValueChange={(val) => updateStatement('recent_major_illness', val)}
                            className="flex gap-4 pt-1"
                        >
                            <label htmlFor="ill_never" className="flex items-center space-x-2 bg-slate-50 px-4 py-2 rounded-lg border cursor-pointer hover:bg-slate-100 transition-colors">
                                <RadioGroupItem value="never" id="ill_never" />
                                <span className="font-medium">ไม่เคย</span>
                            </label>
                            <label htmlFor="ill_ever" className="flex items-center space-x-2 bg-slate-50 px-4 py-2 rounded-lg border cursor-pointer hover:bg-slate-100 transition-colors">
                                <RadioGroupItem value="ever" id="ill_ever" />
                                <span className="font-medium">เคย</span>
                            </label>
                        </RadioGroup>
                        
                        {statementData?.recent_major_illness === 'ever' && (
                            <div className="pt-2 animate-in slide-in-from-top-2 fade-in duration-300">
                                 <Input 
                                    id="ill_details"
                                    className="h-9 w-full sm:w-1/2"
                                    placeholder="ระบุโรค/อาการ"
                                    value={statementData?.recent_major_illness_details || ''}
                                    onChange={(e) => updateStatement('recent_major_illness_details', e.target.value)}
                                />
                            </div>
                        )}
                    </div>
                </div>

                {/* 8. Contagious Diseases */}
                <div className="bg-white p-5 rounded-xl border shadow-sm hover:shadow-md transition-shadow">
                    <div className="space-y-3">
                        <Label className="text-base font-semibold text-slate-800">8. ท่านมีโรคติดต่อร้ายแรงหรือไม่ เช่น กาฬโรค/HIV/Covid-19 อื่นๆ</Label>
                        <RadioGroup 
                            value={statementData?.has_contagious_disease} 
                            onValueChange={(val) => updateStatement('has_contagious_disease', val)}
                            className="flex gap-4 pt-1"
                        >
                            <label htmlFor="contagious_no" className="flex items-center space-x-2 bg-slate-50 px-4 py-2 rounded-lg border cursor-pointer hover:bg-slate-100 transition-colors">
                                <RadioGroupItem value="no" id="contagious_no" />
                                <span className="font-medium">ไม่มี</span>
                            </label>
                            <label htmlFor="contagious_yes" className="flex items-center space-x-2 bg-slate-50 px-4 py-2 rounded-lg border cursor-pointer hover:bg-slate-100 transition-colors">
                                <RadioGroupItem value="yes" id="contagious_yes" />
                                <span className="font-medium">มี</span>
                            </label>
                        </RadioGroup>
                        
                        {statementData?.has_contagious_disease === 'yes' && (
                            <div className="pt-2 animate-in slide-in-from-top-2 fade-in duration-300">
                                <Input 
                                    id="contagious_details"
                                    className="h-9 w-full sm:w-1/2"
                                    placeholder="โปรดระบุโรคให้ชัดเจน"
                                    value={statementData?.has_contagious_disease_details || ''}
                                    onChange={(e) => updateStatement('has_contagious_disease_details', e.target.value)}
                                />
                            </div>
                        )}
                    </div>
                </div>

                {/* 9. Physical Defects */}
                <div className="bg-white p-5 rounded-xl border shadow-sm hover:shadow-md transition-shadow">
                    <div className="space-y-3">
                        <Label className="text-base font-semibold text-slate-800">9. ท่านมีข้อบกพร่องเกี่ยวกับร่างกาย หรือไม่</Label>
                        <div className="grid md:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border">
                            {['eyes', 'hearing', 'speaking', 'movement'].map((type) => {
                                const labels = { eyes: 'สายตา', hearing: 'การฟัง', speaking: 'การพูด', movement: 'การเคลื่อนไหว' };
                                return (
                                    <div key={type} className="flex flex-col space-y-2 bg-white p-3 rounded-lg border shadow-sm">
                                        <Label className="font-semibold text-slate-700">{labels[type]}</Label>
                                        <RadioGroup 
                                            value={statementData?.physical_conditions?.[type]} 
                                            onValueChange={(val) => updateStatementObj('physical_conditions', type, val)}
                                            className="flex gap-4"
                                        >
                                            <label htmlFor={`${type}_normal`} className="flex items-center space-x-2 cursor-pointer">
                                                <RadioGroupItem value="normal" id={`${type}_normal`} />
                                                <span className="font-normal">ปกติ</span>
                                            </label>
                                            <label htmlFor={`${type}_abnormal`} className="flex items-center space-x-2 cursor-pointer">
                                                <RadioGroupItem value="abnormal" id={`${type}_abnormal`} />
                                                <span className="font-normal">ไม่ปกติ</span>
                                            </label>
                                        </RadioGroup>
                                        {statementData?.physical_conditions?.[type] === 'abnormal' && (
                                            <Input 
                                                id={`${type}_details`}
                                                className="h-8 mt-1" 
                                                placeholder="โปรดระบุรายละเอียด"
                                                value={statementData?.physical_conditions?.[`${type}_details`] || ''}
                                                onChange={(e) => updateStatementObj('physical_conditions', `${type}_details`, e.target.value)}
                                            />
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* 10. Debts */}
                <div className="bg-white p-5 rounded-xl border shadow-sm hover:shadow-md transition-shadow">
                    <div className="space-y-3">
                        <Label className="text-base font-semibold text-slate-800">10. ท่านมีหนี้สินหรือภาระด้านใด</Label>
                        <div className="grid grid-cols-1 sm:grid-cols-6 gap-4 bg-slate-50 p-5 rounded-xl border">
                            <label htmlFor="debt_outside" className="sm:col-span-2 flex items-center space-x-3 bg-white p-3 rounded-lg border shadow-sm cursor-pointer hover:bg-slate-50 transition-colors">
                                <Checkbox 
                                    id="debt_outside" 
                                    checked={statementData?.debt_status?.outside_system || false}
                                    onCheckedChange={(c) => updateStatementObj('debt_status', 'outside_system', c)}
                                />
                                <span className="font-normal">กู้นอกระบบ</span>
                            </label>
                            <label htmlFor="debt_inside" className="sm:col-span-2 flex items-center space-x-3 bg-white p-3 rounded-lg border shadow-sm cursor-pointer hover:bg-slate-50 transition-colors">
                                <Checkbox 
                                    id="debt_inside" 
                                    checked={statementData?.debt_status?.inside_system || false}
                                    onCheckedChange={(c) => updateStatementObj('debt_status', 'inside_system', c)}
                                />
                                <span className="font-normal">กู้ในระบบ บัตรเครดิต/สินเชื่อต่างๆ</span>
                            </label>
                            <label htmlFor="debt_house" className="sm:col-span-2 flex items-center space-x-3 bg-white p-3 rounded-lg border shadow-sm cursor-pointer hover:bg-slate-50 transition-colors">
                                <Checkbox 
                                    id="debt_house" 
                                    checked={statementData?.debt_status?.house || false}
                                    onCheckedChange={(c) => updateStatementObj('debt_status', 'house', c)}
                                />
                                <span className="font-normal">ภาระการผ่อนชำระบ้าน/คอนโด</span>
                            </label>
                            <label htmlFor="debt_car" className="sm:col-span-3 flex items-center space-x-3 bg-white p-3 rounded-lg border shadow-sm cursor-pointer hover:bg-slate-50 transition-colors">
                                <Checkbox 
                                    id="debt_car" 
                                    checked={statementData?.debt_status?.car || false}
                                    onCheckedChange={(c) => updateStatementObj('debt_status', 'car', c)}
                                />
                                <span className="font-normal">ภาระการผ่อนส่งรถยนต์ / มอเตอร์ไซค์</span>
                            </label>
                            <label htmlFor="debt_edu" className="sm:col-span-3 flex items-center space-x-3 bg-white p-3 rounded-lg border shadow-sm cursor-pointer hover:bg-slate-50 transition-colors">
                                <Checkbox 
                                    id="debt_edu" 
                                    checked={statementData?.debt_status?.student_loan || false}
                                    onCheckedChange={(c) => updateStatementObj('debt_status', 'student_loan', c)}
                                />
                                <span className="font-normal">เงินกู้ยืมเพื่อการศึกษา กยส.</span>
                            </label>
                            <div className="sm:col-span-6 flex flex-col gap-2 bg-white p-3 rounded-lg border shadow-sm">
                                <label htmlFor="debt_other" className="flex items-center space-x-3 cursor-pointer">
                                    <Checkbox 
                                        id="debt_other" 
                                        checked={statementData?.debt_status?.other || false}
                                        onCheckedChange={(c) => updateStatementObj('debt_status', 'other', c)}
                                    />
                                    <span className="font-normal">อื่นๆ</span>
                                </label>
                                {statementData?.debt_status?.other && (
                                    <Input 
                                        id="debt_other_details"
                                        className="h-9 w-full mt-1" 
                                        placeholder="ระบุรายละเอียดหนี้สินอื่นๆ"
                                        value={statementData?.debt_status?.other_details || ''}
                                        onChange={(e) => updateStatementObj('debt_status', 'other_details', e.target.value)}
                                    />
                                )}
                            </div>
                            <div className="sm:col-span-6 flex items-center gap-3 mt-2 pt-4 border-t border-slate-200">
                                 <Label htmlFor="debt_monthly" className="whitespace-nowrap font-medium text-indigo-700">รวมรายการผ่อนชำระต่อเดือน:</Label>
                                 <div className="relative">
                                    <Input 
                                        id="debt_monthly"
                                        className="h-10 w-40 pr-10 text-right font-medium"
                                        placeholder="0.00"
                                        value={statementData?.debt_status?.monthly_payment || ''}
                                        onChange={(e) => updateStatementObj('debt_status', 'monthly_payment', e.target.value)}
                                    />
                                    <span className="absolute right-3 top-2.5 text-slate-400 text-sm">บาท</span>
                                 </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 11 & 12 Consents */}
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white p-5 rounded-xl border shadow-sm hover:shadow-md transition-shadow">
                        <Label className="text-base font-semibold text-slate-800 block mb-3 h-12">11. ท่านยินยอมให้บริษัทฯตรวจสอบประวัติอาชญากรรมหรือไม่</Label>
                        <RadioGroup 
                            value={statementData?.criminal_record_check_consent} 
                            onValueChange={(val) => updateStatement('criminal_record_check_consent', val)}
                            className="flex gap-4 mb-3"
                        >
                            <label htmlFor="crim_agree" className="flex-1 flex items-center justify-center space-x-2 bg-slate-50 py-3 rounded-lg border cursor-pointer hover:bg-slate-100 data-[state=checked]:bg-indigo-50 data-[state=checked]:border-indigo-200 transition-colors">
                                <RadioGroupItem value="agree" id="crim_agree" />
                                <span className="font-medium">ยินยอม</span>
                            </label>
                            <label htmlFor="crim_disagree" className="flex-1 flex items-center justify-center space-x-2 bg-slate-50 py-3 rounded-lg border cursor-pointer hover:bg-slate-100 transition-colors">
                                <RadioGroupItem value="disagree" id="crim_disagree" />
                                <span className="font-medium">ไม่ยินยอม</span>
                            </label>
                        </RadioGroup>
                         {statementData?.criminal_record_check_consent === 'disagree' && (
                            <div className="animate-in slide-in-from-top-2 fade-in">
                                <Input 
                                    id="crim_reason"
                                    className="h-9 w-full"
                                    placeholder="ระบุสาเหตุที่ไม่ยินยอม"
                                    value={statementData?.criminal_record_check_consent_reason || ''}
                                    onChange={(e) => updateStatement('criminal_record_check_consent_reason', e.target.value)}
                                />
                            </div>
                        )}
                    </div>

                    <div className="bg-white p-5 rounded-xl border shadow-sm hover:shadow-md transition-shadow">
                        <Label className="text-base font-semibold text-slate-800 block mb-3 h-12">12. ท่านยินยอมให้บริษัทฯตรวจสอบเครดิตบูโรหรือไม่</Label>
                        <RadioGroup 
                            value={statementData?.credit_bureau_check_consent} 
                            onValueChange={(val) => updateStatement('credit_bureau_check_consent', val)}
                            className="flex gap-4 mb-3"
                        >
                            <label htmlFor="credit_agree" className="flex-1 flex items-center justify-center space-x-2 bg-slate-50 py-3 rounded-lg border cursor-pointer hover:bg-slate-100 transition-colors">
                                <RadioGroupItem value="agree" id="credit_agree" />
                                <span className="font-medium">ยินยอม</span>
                            </label>
                            <label htmlFor="credit_disagree" className="flex-1 flex items-center justify-center space-x-2 bg-slate-50 py-3 rounded-lg border cursor-pointer hover:bg-slate-100 transition-colors">
                                <RadioGroupItem value="disagree" id="credit_disagree" />
                                <span className="font-medium">ไม่ยินยอม</span>
                            </label>
                        </RadioGroup>
                        {statementData?.credit_bureau_check_consent === 'disagree' && (
                            <div className="animate-in slide-in-from-top-2 fade-in">
                                <Input 
                                    id="credit_reason"
                                    className="h-9 w-full"
                                    placeholder="ระบุสาเหตุที่ไม่ยินยอม"
                                    value={statementData?.credit_bureau_check_consent_reason || ''}
                                    onChange={(e) => updateStatement('credit_bureau_check_consent_reason', e.target.value)}
                                />
                            </div>
                        )}
                    </div>
                </div>

            </div> {/* Closing grid gap-6 */}
        </div> {/* Closing Statement Section */}
    </div>
    );
}