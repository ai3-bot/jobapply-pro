import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Briefcase, FileText, Video } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-white -z-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
            ร่วมงานกับทีม<br/><span className="text-indigo-600">คุณภาพระดับโลก</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10">
            เปิดรับสมัครบุคลากรที่มีความสามารถมาร่วมสร้างสรรค์นวัตกรรมไปด้วยกัน 
            ด้วยขั้นตอนการสมัครที่ง่าย รวดเร็ว และทันสมัย
          </p>
          <Link to="/application">
            <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-lg px-8 py-6 rounded-full shadow-lg shadow-indigo-200 transition-all hover:scale-105">
              เริ่มสมัครงานทันที <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-16">ขั้นตอนการสมัครงาน</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: FileText, title: "1. ยอมรับเงื่อนไข", desc: "อ่านข้อตกลงและยืนยันตัวตนด้วยรูปถ่าย" },
              { icon: Briefcase, title: "2. กรอกข้อมูล", desc: "ประวัติส่วนตัว การศึกษา และประสบการณ์" },
              { icon: Video, title: "3. สัมภาษณ์วิดีโอ", desc: "เลือกตำแหน่งและตอบคำถามผ่านวิดีโอ" },
              { icon: CheckCircle, title: "4. รอผลการคัดเลือก", desc: "ติดตามสถานะผ่านระบบหรืออีเมล" },
            ].map((step, index) => (
              <div key={index} className="relative group">
                <div className="absolute inset-0 bg-indigo-50 rounded-2xl transform rotate-3 transition-transform group-hover:rotate-0" />
                <div className="relative bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
                  <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4 text-indigo-600">
                    <step.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                  <p className="text-slate-500 text-sm">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}