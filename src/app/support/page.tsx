import { redirect } from 'next/navigation';

export default function SupportIndex() {
  // Redirect to parent or student dashboard
  redirect('/parent/support');
}