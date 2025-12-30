import React, { useState, useEffect } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Users, Settings as SettingsIcon, LayoutDashboard, FileCheck } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import ApplicantList from '@/components/admin/ApplicantList';
import ApplicantDetail from '@/components/admin/ApplicantDetail';
import SettingsPanel from '@/components/admin/SettingsPanel';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import NDAReviewModal from '@/components/admin/NDAReviewModal';

function DocumentsView({ onReview }) {
    const { data: applicants = [], isLoading } = useQuery({
        queryKey: ['applicants'],
        queryFn: () => base44.entities.Applicant.list()
    });

    const submittedDocs = applicants.filter(a => 
        a.nda_document?.status === 'submitted' || a.nda_document?.status === 'completed'
    );

    if (isLoading) {
        return (
            <div className="h-full flex items-center justify-center">
                <div className="text-slate-400">กำลังโหลด...</div>
            </div>
        );
    }

    return (
        <div className="h-full overflow-y-auto p-6">
            <div className="max-w-6xl mx-auto space-y-4">
                <h2 className="text-2xl font-bold text-slate-800">เอกสาร NDA ที่ส่งแล้ว</h2>
                
                {submittedDocs.length === 0 ? (
                    <Card>
                        <CardContent className="p-8 text-center text-slate-500">
                            ยังไม่มีเอกสารที่ส่งมา
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid grid-cols-1 gap-4">
                        {submittedDocs.map(applicant => (
                            <Card key={applicant.id} className="hover:shadow-md transition-shadow">
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
                                                <FileCheck className="w-6 h-6 text-indigo-600" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-lg">{applicant.full_name}</h3>
                                                <p className="text-sm text-slate-500">
                                                    ส่งเมื่อ: {applicant.nda_document?.submitted_date ? 
                                                        new Date(applicant.nda_document.submitted_date).toLocaleDateString('th-TH', {
                                                            year: 'numeric',
                                                            month: 'long',
                                                            day: 'numeric',
                                                            hour: '2-digit',
                                                            minute: '2-digit'
                                                        }) : '-'
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Badge variant={applicant.nda_document?.status === 'completed' ? 'success' : 'default'}>
                                                {applicant.nda_document?.status === 'completed' ? 'เสร็จสิ้น' : 'รอดำเนินการ'}
                                            </Badge>
                                            <Button 
                                                onClick={() => onReview(applicant)}
                                                size="sm"
                                            >
                                                ดูและเซ็น
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default function AdminPage() {
    const navigate = useNavigate();
    const [selectedApplicant, setSelectedApplicant] = useState(null);
    const [activeView, setActiveView] = useState("dashboard"); // dashboard, settings, documents
    const [isAuthorized, setIsAuthorized] = useState(null);
    const [reviewingApplicant, setReviewingApplicant] = useState(null);

    useEffect(() => {
        const checkAccess = async () => {
            // Check if employee is logged in
            const employeeId = localStorage.getItem('user_applicant_id');
            if (employeeId) {
                // Employee logged in, redirect to user dashboard
                navigate('/user-dashboard');
                return;
            }

            // Check if admin is logged in
            try {
                const user = await base44.auth.me();
                if (user) {
                    setIsAuthorized(true);
                } else {
                    setIsAuthorized(false);
                }
            } catch (error) {
                setIsAuthorized(false);
            }
        };
        checkAccess();
    }, [navigate]);

    if (isAuthorized === null) {
        return (
            <div className="h-[calc(100vh-64px)] flex items-center justify-center">
                <div className="text-slate-400">กำลังตรวจสอบสิทธิ์...</div>
            </div>
        );
    }

    if (isAuthorized === false) {
        return <UserNotRegisteredError />;
    }

    return (
        <div className="h-[calc(100vh-64px)] bg-slate-100 flex flex-col overflow-hidden">
             {/* Admin Sub-Header */}
             <div className="bg-white border-b border-slate-200 px-4 h-14 flex items-center justify-between shrink-0 z-20">
                <div className="flex items-center gap-2 text-slate-700 font-semibold">
                    <LayoutDashboard className="w-5 h-5 text-indigo-600" />
                    Admin Portal
                </div>
                <div className="flex bg-slate-100 p-1 rounded-lg">
                    <button 
                        onClick={() => setActiveView("dashboard")}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${activeView === "dashboard" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
                    >
                        <Users className="w-4 h-4" /> ผู้สมัคร
                    </button>
                    <button 
                        onClick={() => setActiveView("documents")}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${activeView === "documents" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
                    >
                        <FileCheck className="w-4 h-4" /> เอกสาร
                    </button>
                    <button 
                        onClick={() => setActiveView("settings")}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${activeView === "settings" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
                    >
                        <SettingsIcon className="w-4 h-4" /> ตั้งค่า
                    </button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 overflow-hidden relative">
                {activeView === "dashboard" ? (
                    <div className="flex h-full">
                        <ApplicantList 
                            onSelect={setSelectedApplicant} 
                            selectedId={selectedApplicant?.id} 
                        />
                        <ApplicantDetail applicant={selectedApplicant} />
                    </div>
                ) : activeView === "documents" ? (
                    <DocumentsView onReview={setReviewingApplicant} />
                ) : (
                    <div className="h-full overflow-y-auto">
                        <SettingsPanel />
                    </div>
                )}
            </div>

            {/* NDA Review Modal */}
            <NDAReviewModal 
                applicant={reviewingApplicant}
                isOpen={!!reviewingApplicant}
                onClose={() => setReviewingApplicant(null)}
            />
        </div>
    );
}