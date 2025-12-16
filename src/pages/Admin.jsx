import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Plus, Trash, Search, Calendar, User, Video, Briefcase, FileText } from "lucide-react";
import { format } from 'date-fns';

// --- Sub-components ---

const ApplicantList = () => {
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [selectedApplicant, setSelectedApplicant] = useState(null);

    const { data: applicants } = useQuery({
        queryKey: ['applicants', selectedDate],
        queryFn: async () => {
            // In a real app we might filter by date in the query, but SDK filtering by date range might be tricky depending on backend capabilities.
            // For now, let's fetch list and filter client side or assume simple equal match if supported
             const list = await base44.entities.Applicant.list('-submission_date'); 
             return list.filter(a => a.submission_date === selectedDate);
        }
    });

    return (
        <div className="space-y-6">
            <div className="flex items-end gap-4">
                <div className="space-y-2">
                    <Label>เลือกวันที่สมัคร</Label>
                    <Input 
                        type="date" 
                        value={selectedDate} 
                        onChange={(e) => setSelectedDate(e.target.value)} 
                        className="w-48"
                    />
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 h-[600px]">
                {/* List Column */}
                <div className="md:col-span-1 border rounded-lg overflow-hidden bg-white flex flex-col">
                    <div className="p-4 bg-slate-50 border-b font-medium text-slate-700">
                        รายชื่อผู้สมัคร ({applicants?.length || 0})
                    </div>
                    <div className="overflow-y-auto flex-1 p-2 space-y-2">
                        {applicants?.map(app => (
                            <div 
                                key={app.id}
                                onClick={() => setSelectedApplicant(app)}
                                className={`p-3 rounded-lg cursor-pointer transition-colors flex items-center gap-3 ${selectedApplicant?.id === app.id ? 'bg-indigo-50 border-indigo-200 border' : 'hover:bg-slate-50 border border-transparent'}`}
                            >
                                <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden shrink-0">
                                    {app.photo_url ? <img src={app.photo_url} className="w-full h-full object-cover"/> : <User className="w-full h-full p-2 text-slate-400"/>}
                                </div>
                                <div className="overflow-hidden">
                                    <p className="font-medium truncate">{app.full_name}</p>
                                    <p className="text-xs text-slate-500 truncate">{app.submission_date}</p>
                                </div>
                            </div>
                        ))}
                        {(!applicants || applicants.length === 0) && (
                             <div className="text-center text-slate-400 py-8 text-sm">ไม่พบผู้สมัครในวันนี้</div>
                        )}
                    </div>
                </div>

                {/* Detail Column */}
                <div className="md:col-span-2 border rounded-lg overflow-hidden bg-white flex flex-col">
                     {!selectedApplicant ? (
                        <div className="flex-1 flex items-center justify-center text-slate-400">
                            เลือกผู้สมัครเพื่อดูรายละเอียด
                        </div>
                     ) : (
                        <div className="flex-1 overflow-y-auto p-6">
                            <div className="flex items-start justify-between mb-6">
                                <div className="flex items-center gap-4">
                                     <div className="w-20 h-20 rounded-lg bg-slate-200 overflow-hidden">
                                        {selectedApplicant.photo_url && <img src={selectedApplicant.photo_url} className="w-full h-full object-cover"/>}
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold">{selectedApplicant.full_name}</h2>
                                        <Badge variant="outline" className="mt-1">{selectedApplicant.status}</Badge>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <Button size="sm" variant="outline" onClick={() => window.open(selectedApplicant.video_response_url, '_blank')}>
                                        <Video className="w-4 h-4 mr-2"/> ดูวิดีโอสัมภาษณ์
                                    </Button>
                                </div>
                            </div>

                            <Tabs defaultValue="personal" className="w-full">
                                <TabsList className="grid w-full grid-cols-4">
                                    <TabsTrigger value="personal">ข้อมูลส่วนตัว</TabsTrigger>
                                    <TabsTrigger value="education">การศึกษา</TabsTrigger>
                                    <TabsTrigger value="health">เพิ่มเติม</TabsTrigger>
                                    <TabsTrigger value="work">ประสบการณ์</TabsTrigger>
                                </TabsList>
                                <div className="mt-6 space-y-4">
                                    <TabsContent value="personal" className="space-y-4">
                                        <InfoGrid data={selectedApplicant.personal_data} />
                                    </TabsContent>
                                    <TabsContent value="education">
                                        <InfoGrid data={selectedApplicant.education_data} />
                                    </TabsContent>
                                    <TabsContent value="health">
                                        <InfoGrid data={selectedApplicant.health_data} />
                                    </TabsContent>
                                    <TabsContent value="work">
                                         <InfoGrid data={selectedApplicant.experience_data} />
                                         <div className="mt-8">
                                            <Label>ลายเซ็น</Label>
                                            <div className="border rounded-md p-4 mt-2 max-w-xs">
                                                <img src={selectedApplicant.signature_url} className="w-full" alt="Signature" />
                                            </div>
                                         </div>
                                    </TabsContent>
                                </div>
                            </Tabs>
                        </div>
                     )}
                </div>
            </div>
        </div>
    );
};

const RenderValue = ({ value }) => {
    if (value === null || value === undefined || value === '') return "-";
    
    if (typeof value === 'object') {
        if (Array.isArray(value)) {
            if (value.length === 0) return "-";
            return (
                <div className="space-y-2 mt-1">
                    {value.map((item, i) => (
                        <div key={i} className="pl-3 border-l-2 border-slate-100">
                            <RenderValue value={item} />
                        </div>
                    ))}
                </div>
            );
        }
        
        // Handle object
        return (
             <div className="pl-3 border-l-2 border-slate-100 mt-1 space-y-1">
                {Object.entries(value).map(([k, v]) => (
                     <div key={k} className="flex flex-col sm:flex-row sm:gap-2 text-sm">
                        <span className="text-xs text-slate-400 uppercase min-w-[80px] pt-1">{k.replace(/_/g, ' ')}:</span>
                        <div className="flex-1"><RenderValue value={v} /></div>
                     </div>
                ))}
            </div>
        );
    }
    return <span className="text-slate-700">{value.toString()}</span>;
};

const InfoGrid = ({ data }) => {
    if (!data) return <div className="text-slate-400">ไม่มีข้อมูล</div>;
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(data).map(([key, value]) => (
                <div key={key} className="space-y-1 p-2 rounded hover:bg-slate-50 transition-colors">
                    <p className="text-xs font-bold text-indigo-900 uppercase tracking-wider">{key.replace(/_/g, ' ')}</p>
                    <div className="text-sm">
                        <RenderValue value={value} />
                    </div>
                </div>
            ))}
        </div>
    );
};

const SettingsPanel = () => {
    const queryClient = useQueryClient();

    // Job Positions Management
    const { data: jobs } = useQuery({
        queryKey: ['jobs_admin'],
        queryFn: () => base44.entities.JobPosition.list()
    });

    const createJob = useMutation({
        mutationFn: (data) => base44.entities.JobPosition.create(data),
        onSuccess: () => queryClient.invalidateQueries(['jobs_admin'])
    });

    const deleteJob = useMutation({
        mutationFn: (id) => base44.entities.JobPosition.delete(id),
        onSuccess: () => queryClient.invalidateQueries(['jobs_admin'])
    });

    // Questions Management
    const { data: questions } = useQuery({
        queryKey: ['questions_admin'],
        queryFn: () => base44.entities.Question.list()
    });

    const createQuestion = useMutation({
        mutationFn: (data) => base44.entities.Question.create(data),
        onSuccess: () => queryClient.invalidateQueries(['questions_admin'])
    });

    const [newJobTitle, setNewJobTitle] = useState("");
    const [newQuestionText, setNewQuestionText] = useState("");
    const [questionType, setQuestionType] = useState("general"); // general or specific
    const [targetJobId, setTargetJobId] = useState("all");

    const handleAddJob = () => {
        if (!newJobTitle) return;
        createJob.mutate({ title: newJobTitle, is_active: true });
        setNewJobTitle("");
    };

    const handleAddQuestion = () => {
        if (!newQuestionText) return;
        createQuestion.mutate({ 
            text: newQuestionText, 
            type: targetJobId === 'all' ? 'general' : 'position_specific',
            job_position_id: targetJobId === 'all' ? null : targetJobId,
            is_active: true
        });
        setNewQuestionText("");
    };

    return (
        <div className="grid md:grid-cols-2 gap-8">
            {/* Job Positions */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">จัดการตำแหน่งงาน</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex gap-2">
                        <Input 
                            placeholder="ชื่อตำแหน่งใหม่..." 
                            value={newJobTitle}
                            onChange={(e) => setNewJobTitle(e.target.value)}
                        />
                        <Button onClick={handleAddJob}><Plus className="w-4 h-4"/></Button>
                    </div>
                    <div className="space-y-2 mt-4">
                        {jobs?.map(job => (
                            <div key={job.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-md border">
                                <span>{job.title}</span>
                                <Button variant="ghost" size="sm" onClick={() => deleteJob.mutate(job.id)}>
                                    <Trash className="w-4 h-4 text-red-400"/>
                                </Button>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Questions */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">จัดการชุดคำถาม</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                     <div className="space-y-2">
                        <Label>เพิ่มคำถามใหม่</Label>
                        <Input 
                            placeholder="พิมพ์คำถาม..." 
                            value={newQuestionText}
                            onChange={(e) => setNewQuestionText(e.target.value)}
                        />
                        <div className="flex gap-2">
                             <select 
                                className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm"
                                value={targetJobId}
                                onChange={(e) => setTargetJobId(e.target.value)}
                             >
                                <option value="all">ใช้กับทุกตำแหน่ง (General)</option>
                                {jobs?.map(job => (
                                    <option key={job.id} value={job.id}>เฉพาะ: {job.title}</option>
                                ))}
                             </select>
                             <Button onClick={handleAddQuestion}>เพิ่ม</Button>
                        </div>
                    </div>
                    
                    <div className="h-64 overflow-y-auto space-y-2 mt-4 pr-2">
                        {questions?.map(q => (
                            <div key={q.id} className="p-3 bg-slate-50 rounded-md border text-sm">
                                <div className="flex justify-between items-start gap-2">
                                    <div>
                                        <p className="font-medium">{q.text}</p>
                                        <p className="text-xs text-slate-500 mt-1">
                                            {q.type === 'general' ? 'General Question' : `Specific to Position ID: ${q.job_position_id}`}
                                        </p>
                                    </div>
                                    <Button variant="ghost" size="icon" className="h-6 w-6">
                                        <Trash className="w-3 h-3 text-red-400"/>
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default function AdminPage() {
    const [activeTab, setActiveTab] = useState("applicants");

    return (
        <div className="min-h-screen bg-slate-100 p-8">
            <div className="max-w-7xl mx-auto space-y-8">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
                </div>

                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                    <TabsList className="bg-white p-1 rounded-lg border">
                        <TabsTrigger value="applicants" className="px-6">ผู้สมัครงาน</TabsTrigger>
                        <TabsTrigger value="settings" className="px-6">ตั้งค่าระบบ</TabsTrigger>
                    </TabsList>

                    <TabsContent value="applicants">
                        <ApplicantList />
                    </TabsContent>

                    <TabsContent value="settings">
                        <SettingsPanel />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}