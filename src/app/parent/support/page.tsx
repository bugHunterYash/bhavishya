"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ParentSupportTickets() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    fetch('/api/support/tickets').then(res => res.json()).then(setTickets);
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto text-slate-800">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-900">My Support Tickets</h1>
        <Link href="/parent/support/new" className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded shadow transition">
          Create a Support Ticket
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
        {tickets.length === 0 ? (
          <div className="text-center py-10 text-slate-500">
            <p>You haven't reported any issues yet.</p>
            <Link href="/parent/support/new" className="text-teal-600 hover:underline mt-2 inline-block">Create a support ticket</Link>
          </div>
        ) : (
          <div className="space-y-4">
            {tickets.map((t: any) => (
              <div key={t.id} className="flex justify-between items-center border-b pb-4 last:border-0 last:pb-0">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-mono text-sm text-slate-500">{t.ticketNumber}</span>
                    <span className={`text-xs px-2 py-1 rounded ${t.status === 'RESOLVED' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                      {t.status}
                    </span>
                  </div>
                  <h3 className="font-medium text-slate-900">{t.subject}</h3>
                  <p className="text-sm text-slate-500 mt-1">{t.category?.name}</p>
                </div>
                <Link href={`/parent/support/${t.id}`} className="text-teal-600 hover:underline text-sm font-medium">
                  View Ticket
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}