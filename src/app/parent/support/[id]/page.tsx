"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, MessageSquare, Send, CheckCircle, Clock } from 'lucide-react';

export default function TicketDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [ticket, setTicket] = useState<any>(null);
  const [reply, setReply] = useState('');
  const [isReplying, setIsReplying] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(\`/api/support/tickets/\${id}\`)
      .then(res => {
        if (!res.ok) throw new Error('Not found');
        return res.json();
      })
      .then(data => {
        setTicket(data);
        setLoading(false);
      })
      .catch(() => {
        router.push('/parent/support');
      });
  }, [id, router]);

  const handleReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reply.trim()) return;

    setIsReplying(true);
    try {
      const res = await fetch(\`/api/support/tickets/\${id}/messages\`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ body: reply })
      });

      if (res.ok) {
        const newMessage = await res.json();
        newMessage.author = { name: 'You', role: 'PARENT' }; // optimistic local update structure
        setTicket((prev: any) => ({
          ...prev,
          messages: [...prev.messages, newMessage]
        }));
        setReply('');
      }
    } catch (err) {
      alert("Failed to send reply");
    } finally {
      setIsReplying(false);
    }
  };

  if (loading) return <div className="p-6 text-center text-slate-500">Loading ticket...</div>;
  if (!ticket) return null;

  return (
    <div className="p-6 max-w-4xl mx-auto text-slate-800">
      <div className="mb-6">
        <Link href="/parent/support" className="text-teal-600 hover:underline flex items-center gap-1 mb-4 text-sm font-medium w-fit">
          <ArrowLeft size={16} /> Back to Support
        </Link>
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="font-mono text-sm text-slate-500">{ticket.ticketNumber}</span>
              <span className={\`text-xs px-2 py-1 rounded \${ticket.status === 'RESOLVED' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}\`}>
                {ticket.status}
              </span>
              <span className={\`text-xs px-2 py-1 rounded \${ticket.priority === 'URGENT' ? 'bg-red-100 text-red-800' : 'bg-slate-100 text-slate-800'}\`}>
                {ticket.priority} PRIORITY
              </span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900">{ticket.subject}</h1>
            <p className="text-sm text-slate-500 mt-1">Category: {ticket.category?.name}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden mb-6">
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-bold text-sm">
                {ticket.requester?.name?.charAt(0) || 'U'}
              </div>
              <div>
                <div className="font-medium text-slate-900 text-sm">{ticket.requester?.name || 'You'}</div>
                <div className="text-xs text-slate-500">{new Date(ticket.createdAt).toLocaleString()}</div>
              </div>
            </div>
          </div>
          <div className="text-slate-700 whitespace-pre-wrap">{ticket.description}</div>
        </div>

        {ticket.messages?.map((msg: any) => (
          <div key={msg.id} className="p-6 border-b border-slate-100 bg-slate-50/50">
            <div className="flex items-center gap-2 mb-3">
              <div className={\`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm \${msg.author?.role === 'PARENT' ? 'bg-teal-100 text-teal-700' : 'bg-blue-100 text-blue-700'}\`}>
                {msg.author?.name?.charAt(0) || 'A'}
              </div>
              <div>
                <div className="font-medium text-slate-900 text-sm flex items-center gap-2">
                  {msg.author?.name}
                  {msg.author?.role !== 'PARENT' && <span className="text-xs bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded">Support</span>}
                </div>
                <div className="text-xs text-slate-500">{new Date(msg.createdAt).toLocaleString()}</div>
              </div>
            </div>
            <div className="text-slate-700 whitespace-pre-wrap pl-10">{msg.body}</div>
          </div>
        ))}

        {ticket.resolutionSummary && (
          <div className="p-6 bg-green-50/50 border-b border-green-100">
            <h3 className="text-sm font-semibold text-green-800 mb-2 flex items-center gap-2">
              <CheckCircle size={16} /> Resolution Summary
            </h3>
            <p className="text-green-900 text-sm">{ticket.resolutionSummary}</p>
          </div>
        )}
      </div>

      {ticket.status !== 'CLOSED' && ticket.status !== 'RESOLVED' && (
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
          <h3 className="font-medium text-slate-900 mb-3 text-sm">Add a reply</h3>
          <form onSubmit={handleReply}>
            <textarea
              className="w-full border border-slate-300 rounded-md p-3 focus:ring-teal-500 focus:border-teal-500 text-sm"
              rows={4}
              placeholder="Type your reply here..."
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              required
            ></textarea>
            <div className="flex justify-end mt-3">
              <button
                type="submit"
                disabled={isReplying || !reply.trim()}
                className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2 rounded shadow transition flex items-center gap-2 text-sm disabled:opacity-50"
              >
                {isReplying ? 'Sending...' : <><Send size={14} /> Send Reply</>}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
