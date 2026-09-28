"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Send } from 'lucide-react';

export default function CreateSupportTicket() {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    categoryId: '',
    subject: '',
    description: '',
    priority: 'NORMAL',
  });

  useEffect(() => {
    fetch('/api/support/categories')
      .then(res => res.json())
      .then(data => setCategories(data || []))
      .catch(err => console.error("Error fetching categories:", err));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/support/tickets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        const ticket = await res.json();
        router.push(\`/parent/support/\${ticket.id}?success=true\`);
      } else {
        alert("Failed to submit ticket. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while submitting.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto text-slate-800">
      <div className="mb-6">
        <Link href="/parent/support" className="text-teal-600 hover:underline flex items-center gap-1 mb-4 text-sm font-medium w-fit">
          <ArrowLeft size={16} /> Back to Support
        </Link>
        <h1 className="text-2xl font-bold text-slate-900">Create a Support Ticket</h1>
        <p className="text-slate-500 mt-1">Please provide details about the issue you're experiencing.</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Issue Category *</label>
            <select
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              required
              className="w-full border border-slate-300 rounded-md p-2 focus:ring-teal-500 focus:border-teal-500 bg-white"
            >
              <option value="">Select a category</option>
              {categories.map((cat: any) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Priority</label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded-md p-2 focus:ring-teal-500 focus:border-teal-500 bg-white"
            >
              <option value="LOW">Low - General information or minor inconvenience</option>
              <option value="NORMAL">Normal - Regular product/support issue</option>
              <option value="HIGH">High - Feature is significantly affected</option>
              <option value="URGENT">Urgent - Critical issue affecting safety or access</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Subject *</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              placeholder="e.g. Attendance marked absent incorrectly"
              className="w-full border border-slate-300 rounded-md p-2 focus:ring-teal-500 focus:border-teal-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={5}
              placeholder="Please describe your issue in detail..."
              className="w-full border border-slate-300 rounded-md p-2 focus:ring-teal-500 focus:border-teal-500"
            ></textarea>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-md shadow transition flex items-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? 'Submitting...' : (
                <>
                  <Send size={16} /> Submit Ticket
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
