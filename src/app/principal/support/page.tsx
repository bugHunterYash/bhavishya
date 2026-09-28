"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function PrincipalSupportDashboard() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/support/tickets')
      .then(res => res.json())
      .then(data => {
        setTickets(data || []);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-6 text-slate-500">Loading support dashboard...</div>;

  const openTickets = tickets.filter((t: any) => !['RESOLVED', 'CLOSED'].includes(t.status));
  const urgentTickets = tickets.filter((t: any) => t.priority === 'URGENT' && !['RESOLVED', 'CLOSED'].includes(t.status));
  const resolvedThisWeek = tickets.filter((t: any) => t.status === 'RESOLVED').length; // Simplification

  return (
    <div className="p-6 max-w-6xl mx-auto text-slate-800">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Support Operations</h1>
        <p className="text-slate-500 mt-1">Manage and respond to school support tickets.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
          <div className="text-sm font-medium text-slate-500 mb-1">Open Issues</div>
          <div className="text-3xl font-bold text-slate-900">{openTickets.length}</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
          <div className="text-sm font-medium text-slate-500 mb-1">Urgent Priority</div>
          <div className="text-3xl font-bold text-red-600">{urgentTickets.length}</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
          <div className="text-sm font-medium text-slate-500 mb-1">Waiting for School</div>
          <div className="text-3xl font-bold text-orange-600">
            {tickets.filter((t: any) => t.status === 'OPEN' || t.status === 'ASSIGNED').length}
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
          <div className="text-sm font-medium text-slate-500 mb-1">Resolved (Demo)</div>
          <div className="text-3xl font-bold text-green-600">{resolvedThisWeek}</div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-4 py-3 font-medium text-slate-600">Ticket ID</th>
                <th className="px-4 py-3 font-medium text-slate-600">Subject</th>
                <th className="px-4 py-3 font-medium text-slate-600">Requester</th>
                <th className="px-4 py-3 font-medium text-slate-600">Category</th>
                <th className="px-4 py-3 font-medium text-slate-600">Status</th>
                <th className="px-4 py-3 font-medium text-slate-600">Priority</th>
                <th className="px-4 py-3 text-right font-medium text-slate-600">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {tickets.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-slate-500">No tickets found.</td>
                </tr>
              ) : (
                tickets.map((t: any) => (
                  <tr key={t.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-mono text-xs text-slate-500">{t.ticketNumber}</td>
                    <td className="px-4 py-3 font-medium text-slate-900 truncate max-w-xs">{t.subject}</td>
                    <td className="px-4 py-3 text-slate-600">
                      <div>{t.requester?.name}</div>
                      <div className="text-xs text-slate-400">{t.requester?.role}</div>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{t.category?.name}</td>
                    <td className="px-4 py-3">
                      <span className={\`text-xs px-2 py-1 rounded \${t.status === 'RESOLVED' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}\`}>
                        {t.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={\`text-xs px-2 py-1 rounded \${t.priority === 'URGENT' ? 'bg-red-100 text-red-800' : 'bg-slate-100 text-slate-800'}\`}>
                        {t.priority}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Link href={\`/principal/support/\${t.id}\`} className="text-teal-600 hover:underline font-medium">
                        View
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
