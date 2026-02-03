import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { base44 } from '@/api/base44Client';
import FormStep1 from './steps/FormStep1';
import FormStep2 from './steps/FormStep2';
import FormStep3 from './steps/FormStep3';
import FormStep4 from './steps/FormStep4';

export default function DataFormWizard({ onComplete, globalData, setGlobalData }) {
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [step1Errors, setStep1Errors] = useState({});
    const [step3Errors, setStep3Errors] = useState({});
    const [step4Errors, setStep4Errors] = useState({});
    
    const updateData = (section, field, value) => {
        setGlobalData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value
            }
        }));
        // Clear error when user starts typing
        if (section === 'personal_data' && step1Errors[field]) {
            setStep1Errors(prev => ({ ...prev, [field]: false }));
        }
    };

    // Validation for Step 1
    const validateStep1 = () => {
        const pd = globalData.personal_data || {};
        const errors = {};
        
        // Required fields validation
        if (!pd.position_1) errors.position_1 = true;
        if (!pd.expected_salary) errors.expected_salary = true;
        if (!pd.race) errors.race = true;
        if (!pd.nationality) errors.nationality = true;
        if (!pd.religion) errors.religion = true;
        if (!pd.dob) errors.dob = true;
        if (!pd.first_name) errors.first_name = true;
        if (!pd.last_name) errors.last_name = true;
        if (!pd.english_name) errors.english_name = true;
        if (!pd.id_card || pd.id_card.length !== 13) errors.id_card = true;
        if (!pd.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(pd.email)) errors.email = true;
        if (!pd.mobile_phone || pd.mobile_phone.length !== 10) errors.mobile_phone = true;
        
        // Thai name validation
        const thaiRegex = /[\u0E00-\u0E7F]/;
        if (!thaiRegex.test(pd.first_name) || !thaiRegex.test(pd.last_name)) {
            errors.first_name = true;
            errors.last_name = true;
        }
        
        // English name validation
        const englishRegex = /^[a-zA-Z\s]+$/;
        if (!pd.english_name || !englishRegex.test(pd.english_name) || !pd.english_name.trim().includes(' ')) {
            errors.english_name = true;
        }
        
        // Address validation
        const addr = pd.registered_address || {};
        if (!addr.number || !addr.subdistrict || !addr.district || !addr.province || !addr.zipcode) {
            errors.registered_address = true;
        }
        
        setStep1Errors(errors);
        return Object.keys(errors).length === 0;
    };

    // Validation for Step 3 (Work Experience)
    const validateStep3 = () => {
        const expData = globalData.experience_data || {};
        const errors = {};
        
        // If has experience, must have at least 1 entry with data
        if (expData.has_experience === 'yes') {
            const history = expData.history || [];
            if (history.length === 0) {
                errors.experience_history = true;
            } else {
                // Check if at least the first entry has required data
                const firstEntry = history[0];
                if (!firstEntry.period && !firstEntry.workplace && !firstEntry.position) {
                    errors.experience_history = true;
                }
            }
        }
        
        setStep3Errors(errors);
        return Object.keys(errors).length === 0;
    };

    // Validation for Step 4 (Emergency Contact)
    const validateStep4 = () => {
        const contacts = globalData.emergency_contacts || [];
        const errors = {};
        
        // Must have at least 1 emergency contact with name and phone
        if (contacts.length === 0) {
            errors.emergency_contacts = true;
        } else {
            const hasValidContact = contacts.some(c => c.name && c.phone);
            if (!hasValidContact) {
                errors.emergency_contacts = true;
            }
        }
        
        setStep4Errors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleNext = () => {
        // Validate Step 1 before proceeding
        if (step === 1) {
            if (!validateStep1()) {
                alert('กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน');
                return;
            }
        }
        
        // Validate Step 3 before proceeding
        if (step === 3) {
            if (!validateStep3()) {
                alert('กรุณากรอกประวัติการทำงาน');
                return;
            }
        }
        
        // Validate Step 4 before proceeding
        if (step === 4) {
            if (!validateStep4()) {
                alert('กรุณากรอกข้อมูลผู้ติดต่อฉุกเฉินอย่างน้อย 1 คน');
                return;
            }
        }
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
        if (step < 4) setStep(step + 1);
        else onComplete(); // Go to PDPA step instead of submitting
    };

    const handleSubmitData = async () => {
        setIsSubmitting(true);
        try {
            const initialData = {
                full_name: `${globalData.personal_data.first_name} ${globalData.personal_data.last_name}`,
                personal_data: globalData.personal_data,
                family_data: globalData.family_data,
                education_data: globalData.education_data,
                skills_data: globalData.skills_data,
                training_data: globalData.training_data,
                health_data: globalData.health_data,
                statement_data: globalData.statement_data,
                experience_data: globalData.experience_data,
                referral_data: globalData.referral_data,
                parents_data: globalData.parents_data,
                emergency_contacts: globalData.emergency_contacts,
                attitude: globalData.attitude,
                photo_url: globalData.photo_url,
                signature_url: globalData.signature_url,
                signature_date: globalData.signature_date,
                start_work_date: globalData.start_work_date,
                submission_date: new Date().toISOString().split('T')[0],
                status: 'pending_video' // Intermediate status
            };
            
            const record = await base44.entities.Applicant.create(initialData);
            
            // Save the ID for the next step
            setGlobalData(prev => ({ ...prev, applicant_id: record.id }));
            
            onComplete();
        } catch (error) {
            console.error("Failed to save initial data", error);
            alert("ไม่สามารถบันทึกข้อมูลได้ กรุณาลองใหม่อีกครั้ง");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleBack = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        if (step > 1) setStep(step - 1);
    };

    return (
        <div className="max-w-5xl mx-auto py-10 px-4">
            <Card className="min-h-[600px] flex flex-col">
                <CardHeader>
                    <CardTitle>กรอกข้อมูลใบสมัคร</CardTitle>
                    <div className="flex gap-2 mt-4">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className={`h-2 flex-1 rounded-full ${i <= step ? 'bg-indigo-600' : 'bg-slate-200'}`} />
                        ))}
                    </div>
                </CardHeader>
                <CardContent className="flex-1">
                    {step === 1 && <FormStep1 data={globalData.personal_data} updateData={updateData} photo={globalData.photo_url} errors={step1Errors} />}
                    {step === 2 && <FormStep2 
                        data={globalData.education_data} 
                        familyData={globalData.family_data} 
                        skillsData={globalData.skills_data}
                        trainingData={globalData.training_data}
                        updateData={updateData} 
                    />}
                    {step === 3 && <FormStep3 
                        data={globalData.health_data} 
                        experienceData={globalData.experience_data} 
                        statementData={globalData.statement_data}
                        referralData={globalData.referral_data}
                        parentsData={globalData.parents_data}
                        updateData={updateData}
                        errors={step3Errors}
                    />}
                    {step === 4 && <FormStep4 
                        data={globalData}
                        setGlobalData={setGlobalData}
                        errors={step4Errors}
                    />}
                </CardContent>
                <div className="p-6 border-t flex justify-between bg-slate-50 rounded-b-xl">
                    <Button variant="outline" onClick={handleBack} disabled={step === 1 || isSubmitting}>
                        <ChevronLeft className="w-4 h-4 mr-2" /> ย้อนกลับ
                    </Button>
                    <Button onClick={handleNext} disabled={isSubmitting} className="bg-indigo-600 hover:bg-indigo-700">
                        ถัดไป <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                </div>
            </Card>
        </div>
    );
}