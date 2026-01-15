import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, MapPin, Phone } from "lucide-react";

// Template 1: Clean Two-Column Table
const TwoColumnLayout = ({ data, title, icon: Icon }) => (
    <Card className="border-slate-200 shadow-sm">
        {(title || Icon) && (
            <CardHeader className="pb-3 border-b border-slate-50 bg-slate-50/50">
                <CardTitle className="text-base font-semibold flex items-center gap-2 text-slate-800">
                    {Icon && <Icon className="w-4 h-4 text-indigo-500" />}
                    {title}
                </CardTitle>
            </CardHeader>
        )}
        <CardContent className="p-0">
            <table className="w-full text-sm">
                <tbody>
                    {Object.entries(data).map(([key, value], idx) => (
                        <tr key={key} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                            <td className="px-4 py-3 font-medium text-slate-600 w-40 border-r border-slate-100">
                                {key.replace(/_/g, ' ')}
                            </td>
                            <td className="px-4 py-3 text-slate-700">
                                {value || <span className="text-slate-300">-</span>}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </CardContent>
    </Card>
);

// Template 2: Stacked Responsive Cards
const StackedCards = ({ data, title, icon: Icon }) => (
    <Card className="border-slate-200 shadow-sm">
        {(title || Icon) && (
            <CardHeader className="pb-3 border-b border-slate-50 bg-slate-50/50">
                <CardTitle className="text-base font-semibold flex items-center gap-2 text-slate-800">
                    {Icon && <Icon className="w-4 h-4 text-indigo-500" />}
                    {title}
                </CardTitle>
            </CardHeader>
        )}
        <CardContent className="p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {Object.entries(data).map(([key, value]) => (
                    <div key={key} className="border border-slate-200 rounded-lg px-3 py-2 bg-white hover:border-indigo-300 transition">
                        <p className="text-xs font-semibold text-slate-500 uppercase mb-1">{key.replace(/_/g, ' ')}</p>
                        <p className="text-sm font-semibold text-slate-800">{value || '-'}</p>
                    </div>
                ))}
            </div>
        </CardContent>
    </Card>
);

// Template 3: Vertical Stack (Minimal)
const VerticalStack = ({ data, title, icon: Icon }) => (
    <Card className="border-slate-200 shadow-sm">
        {(title || Icon) && (
            <CardHeader className="pb-3 border-b border-slate-50 bg-slate-50/50">
                <CardTitle className="text-base font-semibold flex items-center gap-2 text-slate-800">
                    {Icon && <Icon className="w-4 h-4 text-indigo-500" />}
                    {title}
                </CardTitle>
            </CardHeader>
        )}
        <CardContent className="p-6 space-y-4">
            {Object.entries(data).map(([key, value]) => (
                <div key={key} className="border-b border-slate-200 last:border-0 pb-4 last:pb-0">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">{key.replace(/_/g, ' ')}</p>
                    <p className="text-base font-semibold text-slate-800">{value || '-'}</p>
                </div>
            ))}
        </CardContent>
    </Card>
);

// Template 4: Definition List (DL style)
const DefinitionList = ({ data, title, icon: Icon }) => (
    <Card className="border-slate-200 shadow-sm">
        {(title || Icon) && (
            <CardHeader className="pb-3 border-b border-slate-50 bg-slate-50/50">
                <CardTitle className="text-base font-semibold flex items-center gap-2 text-slate-800">
                    {Icon && <Icon className="w-4 h-4 text-indigo-500" />}
                    {title}
                </CardTitle>
            </CardHeader>
        )}
        <CardContent className="p-4">
            <dl className="space-y-4">
                {Object.entries(data).map(([key, value]) => (
                    <div key={key} className="grid grid-cols-2 gap-4">
                        <dt className="font-semibold text-slate-600">{key.replace(/_/g, ' ')}</dt>
                        <dd className="text-slate-700 text-right">{value || '-'}</dd>
                    </div>
                ))}
            </dl>
        </CardContent>
    </Card>
);

// Demo Component
export default function InfoGridTemplates() {
    const sampleData = {
        first_name: 'นาย',
        last_name: 'ตัวอย่าง',
        email: 'test@mail.com',
        phone: '089-xxx-xxxx',
        dob: '1990-01-15',
        gender: 'ชาย',
        nationality: 'ไทย'
    };

    return (
        <div className="space-y-8 p-8 bg-slate-50 min-h-screen">
            <h1 className="text-3xl font-bold text-slate-900 mb-8">InfoGrid Templates</h1>

            <div>
                <h2 className="text-lg font-semibold text-slate-700 mb-4">Template 1: Clean Two-Column Table</h2>
                <TwoColumnLayout data={sampleData} title="ข้อมูลพื้นฐาน" icon={User} />
            </div>

            <div>
                <h2 className="text-lg font-semibold text-slate-700 mb-4">Template 2: Stacked Responsive Cards</h2>
                <StackedCards data={sampleData} title="ข้อมูลพื้นฐาน" icon={User} />
            </div>

            <div>
                <h2 className="text-lg font-semibold text-slate-700 mb-4">Template 3: Vertical Stack (Minimal)</h2>
                <VerticalStack data={sampleData} title="ข้อมูลพื้นฐาน" icon={User} />
            </div>

            <div>
                <h2 className="text-lg font-semibold text-slate-700 mb-4">Template 4: Definition List</h2>
                <DefinitionList data={sampleData} title="ข้อมูลพื้นฐาน" icon={User} />
            </div>
        </div>
    );
}