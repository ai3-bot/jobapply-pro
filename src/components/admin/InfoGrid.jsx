import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const RenderValue = ({ value, label }) => {
    if (value === null || value === undefined || value === '') return <span className="text-slate-300">-</span>;
    
    // Boolean mapping
    if (value === true) return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Yes</Badge>;
    if (value === false) return <Badge variant="outline" className="bg-slate-50 text-slate-500">No</Badge>;

    if (typeof value === 'object') {
        if (Array.isArray(value)) {
            if (value.length === 0) return <span className="text-slate-300">-</span>;
            return (
                <div className="grid gap-3 mt-2">
                    {value.map((item, i) => (
                        <div key={i} className="bg-slate-50 p-3 rounded-md border border-slate-100 text-sm">
                            <RenderValue value={item} />
                        </div>
                    ))}
                </div>
            );
        }
        
        // Handle object
        return (
             <div className="space-y-2 mt-1">
                {Object.entries(value).map(([k, v]) => {
                    if (k === 'id') return null; // Only skip exact 'id'
                    return (
                        <div key={k} className="flex flex-col sm:flex-row sm:justify-between text-sm border-b last:border-0 border-slate-100 pb-1 last:pb-0">
                            <span className="text-xs font-medium text-slate-500 uppercase tracking-wide pt-1 min-w-[120px]">{k.replace(/_/g, ' ')}</span>
                            <div className="flex-1 sm:text-right font-medium text-slate-700"><RenderValue value={v} /></div>
                        </div>
                    );
                })}
            </div>
        );
    }
    return <span className="text-slate-700 break-words">{value.toString()}</span>;
};

export default function InfoGrid({ data, title, icon: Icon }) {
    if (!data || Object.keys(data).length === 0) return null;

    const filteredData = Object.entries(data).filter(([, v]) => v !== null && v !== undefined && v !== '');

    return (
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredData.map(([key, value]) => (
                        <div key={key} className="bg-slate-50 border border-slate-100 rounded-lg p-3 hover:border-slate-200 transition-colors">
                            <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1">{key.replace(/_/g, ' ')}</p>
                            <div className="text-sm font-medium">
                                <RenderValue value={value} label={key} />
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}