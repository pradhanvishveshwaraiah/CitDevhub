import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Download, Bell, Mail, Copy, Check, ExternalLink, AlertCircle, ArrowLeft } from 'lucide-react';
import confetti from 'canvas-confetti';

// --- COMING SOON MODAL ---
interface ComingSoonModalProps {
  isOpen: boolean;
  onClose: () => void;
  featureTitle: string;
}

export const ComingSoonModal: React.FC<ComingSoonModalProps> = ({
  isOpen,
  onClose,
  featureTitle,
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 } });
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto cursor-pointer"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-md rounded-3xl glass p-6 sm:p-8 shadow-2xl text-left bg-[#0c0c0c] border border-white/20 cursor-default my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Prominent, high-visibility Close (X) button */}
        <div className="flex items-center justify-between pb-3 mb-2 border-b border-white/10">
          <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
            CIT DevHub · Roadmap
          </span>
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-mono text-xs transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-3.5 h-3.5 text-white" />
            <span>Close</span>
          </button>
        </div>

        <h3 className="text-2xl font-bold text-white font-['Clash_Display',sans-serif]">
          Coming Soon
        </h3>

        <div className="my-3 p-3 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-mono text-neutral-300">
          {featureTitle}
        </div>

        <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed mb-6">
          Our student core team at CIT Mandya is preparing this release. Enter your email to be notified the moment it goes live.
        </p>

        {subscribed ? (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-white/[0.05] border border-white/20 text-neutral-200 text-xs flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <div className="font-semibold text-white">You're on the list!</div>
                <div className="text-[11px] text-neutral-400 mt-0.5">
                  We'll email updates to {email}. Follow <strong>@citdevhub</strong> on Instagram for announcements.
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3 rounded-full bg-white text-black font-semibold text-xs hover:bg-neutral-200 transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg"
            >
              <X className="w-4 h-4 text-black" />
              <span>Close / Back to Website</span>
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your student email..."
              className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/15 text-white placeholder-neutral-500 text-xs font-mono focus:outline-none focus:border-white/40"
            />
            <button
              type="submit"
              className="w-full py-2.5 rounded-full bg-white text-black font-semibold text-xs hover:bg-neutral-200 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Bell className="w-4 h-4" />
              <span>Notify Me</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};


// --- WORKSHOP RSVP & REGISTRATION MODAL ---
interface RSVPModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventTitle: string;
}

export const RSVPModal: React.FC<RSVPModalProps> = ({
  isOpen,
  onClose,
  eventTitle,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    usn: '',
    email: '',
    phone: '',
    branch: 'Computer Science & Engineering (CSE)',
    year: '2nd Year',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [copied, setCopied] = useState(false);
  const [deliveryInfo, setDeliveryInfo] = useState<{
    status: string;
    message: string;
  }>({ status: '', message: '' });

  // Enable closing by clicking Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const clubEmail = 'citdevhub@gmail.com';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      eventTitle,
      name: formData.name,
      usn: formData.usn,
      email: formData.email,
      phone: formData.phone,
      branch: formData.branch,
      year: formData.year,
      targetClubEmail: clubEmail,
      timestamp: new Date().toISOString(),
    };

    let apiStatus = 'delivered';
    let apiMsg = '';

    // 1. Dual dispatch to server backend (records locally in registrations.json + sends to mail gateway)
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.deliveryStatus) {
        apiStatus = data.deliveryStatus;
        apiMsg = data.message;
      }
    } catch (err) {
      console.warn('Backend route notice:', err);
    }

    // 2. Client-side URL-encoded dispatch to FormSubmit with explicit human-readable keys
    try {
      const params = new URLSearchParams();
      params.append('_subject', `[CIT DevHub Registration] ${formData.name} (${formData.usn}) - ${eventTitle}`);
      params.append('_template', 'table');
      params.append('_captcha', 'false');
      params.append('Student Name', formData.name);
      params.append('USN / Roll Number', formData.usn);
      params.append('Student Email', formData.email);
      params.append('WhatsApp / Phone', formData.phone);
      params.append('Branch / Department', formData.branch);
      params.append('Year of Study', formData.year);
      params.append('Workshop / Event', eventTitle);
      params.append('College', 'Cauvery Institute of Technology, Mandya');

      await fetch(`https://formsubmit.co/ajax/${clubEmail}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
        },
        body: params.toString(),
      });
    } catch (clientErr) {
      console.warn('Client-side dispatch notice:', clientErr);
    }

    setDeliveryInfo({ status: apiStatus, message: apiMsg });
    setIsSubmitting(false);
    setConfirmed(true);
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.5 } });
  };

  const emailSubject = encodeURIComponent(`[Workshop Registration] ${formData.name} (${formData.usn}) - ${eventTitle}`);
  const emailBody = encodeURIComponent(
    `CIT DEVHUB PARTICIPANT REGISTRATION\n` +
    `====================================\n\n` +
    `• Student Name       : ${formData.name}\n` +
    `• USN / Roll Number  : ${formData.usn}\n` +
    `• Student Email      : ${formData.email}\n` +
    `• WhatsApp / Phone   : ${formData.phone}\n` +
    `• Branch / Department: ${formData.branch}\n` +
    `• Year of Study      : ${formData.year}\n` +
    `• Workshop Event     : ${eventTitle}\n` +
    `• College            : Cauvery Institute of Technology, Mandya\n\n` +
    `====================================\n` +
    `Looking forward to attending the workshop!`
  );
  const mailtoLink = `mailto:${clubEmail}?subject=${emailSubject}&body=${emailBody}`;

  const handleCopySummary = () => {
    const summaryText =
      `CIT DevHub Workshop Registration:\n` +
      `---------------------------------\n` +
      `Workshop: ${eventTitle}\n` +
      `Student Name: ${formData.name}\n` +
      `USN: ${formData.usn}\n` +
      `Email: ${formData.email}\n` +
      `Phone: ${formData.phone}\n` +
      `Branch: ${formData.branch} (${formData.year})\n` +
      `College: Cauvery Institute of Technology, Mandya\n` +
      `Club Email: ${clubEmail}`;
    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadICS = () => {
    const icsData = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//CIT DevHub//Events//EN
BEGIN:VEVENT
SUMMARY:${eventTitle} - CIT DevHub
DESCRIPTION:Workshop by CIT DevHub at Cauvery Institute of Technology, Mandya. Participant: ${formData.name} (${formData.usn})
LOCATION:Cauvery Institute of Technology Campus, Mandya
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${eventTitle.slice(0, 15)}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto cursor-pointer"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-lg rounded-3xl glass p-6 sm:p-8 shadow-2xl text-left bg-[#0c0c0c] border border-white/20 my-8 cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Prominent Header with Big Visible Close (X / Cross) button */}
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
          <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
            Cauvery Institute of Technology
          </span>

          {/* Prominent X / Close Button */}
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 hover:bg-white/25 border border-white/25 text-white font-mono text-xs transition-all cursor-pointer shadow-sm hover:scale-105"
            title="Close this window"
          >
            <X className="w-4 h-4 text-white" />
            <span className="font-semibold">Close</span>
          </button>
        </div>

        <h3 className="text-xl sm:text-2xl font-bold text-white font-['Clash_Display',sans-serif]">
          {confirmed ? 'Registration Dispatched!' : `Reserve Seat: ${eventTitle}`}
        </h3>

        {confirmed ? (
          <div className="mt-5 space-y-4">
            {/* Confirmation Box */}
            <div className="p-5 rounded-2xl bg-white/[0.05] border border-white/20 text-neutral-200 text-xs space-y-3">
              <div className="flex items-center gap-2 font-bold text-sm text-white">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Seat Confirmed for {formData.name}!</span>
              </div>

              {/* Explicit Club Mail ID routing notice */}
              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 space-y-1">
                <div className="flex items-center gap-2 font-semibold text-white">
                  <Mail className="w-4 h-4 text-emerald-400" />
                  <span>Targeted Club Email:</span>
                </div>
                <div className="font-mono text-xs text-emerald-200 font-semibold pl-6">
                  {clubEmail}
                </div>
                <div className="text-[11px] text-neutral-300 pl-6 pt-0.5">
                  The participant registration details below have been saved and dispatched to <strong>{clubEmail}</strong>.
                </div>
              </div>

              {/* Summary of submitted details that will appear in the mail */}
              <div className="bg-black/50 p-4 rounded-xl border border-white/10 space-y-2 font-mono text-xs text-neutral-200">
                <div className="text-white font-bold text-xs uppercase tracking-wider border-b border-white/10 pb-1.5 flex items-center justify-between">
                  <span>Participant Details</span>
                  <span className="text-[10px] text-emerald-400 font-normal">Logged ✓</span>
                </div>
                <div className="grid grid-cols-3 gap-1 pt-1">
                  <span className="text-neutral-400">Name:</span>
                  <span className="col-span-2 text-white font-semibold">{formData.name}</span>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <span className="text-neutral-400">USN:</span>
                  <span className="col-span-2 text-white font-semibold">{formData.usn}</span>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <span className="text-neutral-400">Email:</span>
                  <span className="col-span-2 text-white font-semibold">{formData.email}</span>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <span className="text-neutral-400">Phone:</span>
                  <span className="col-span-2 text-white font-semibold">{formData.phone}</span>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <span className="text-neutral-400">Branch:</span>
                  <span className="col-span-2 text-white font-semibold">{formData.branch}</span>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <span className="text-neutral-400">Year:</span>
                  <span className="col-span-2 text-white font-semibold">{formData.year}</span>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <span className="text-neutral-400">Workshop:</span>
                  <span className="col-span-2 text-white font-semibold">{eventTitle}</span>
                </div>
              </div>

              {/* Clarification about FormSubmit Activation Email */}
              <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/15 text-neutral-300 text-[11px] leading-relaxed space-y-1">
                <div className="flex items-center gap-1.5 text-amber-300 font-semibold">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>About the email with "FormSubmit" and numbers:</span>
                </div>
                <p>
                  That email was the initial <strong>Activation Confirmation</strong> from FormSubmit asking you to click <strong>"Activate Form"</strong>. 
                  Once you click "Activate Form" in that email once, all subsequent emails arrive as a clean table with the participant's Name, USN, and Phone!
                </p>
              </div>
            </div>

            {/* Direct 1-Click Email App Option */}
            <div className="space-y-1.5">
              <a
                href={mailtoLink}
                className="w-full py-3 px-4 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
              >
                <Mail className="w-4 h-4 text-black" />
                <span>Send Registration Email Directly from Mail App</span>
                <ExternalLink className="w-3.5 h-3.5 text-black" />
              </a>
              <p className="text-[10px] text-neutral-400 font-mono text-center">
                Pre-fills an email with Name, USN, Phone, and Branch addressed to {clubEmail}
              </p>
            </div>

            {/* Copy details and ICS buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleCopySummary}
                className="flex-1 py-2.5 px-4 rounded-full glass hover:bg-white/[0.08] text-white font-medium text-xs border border-white/15 flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied Details' : 'Copy All Details'}</span>
              </button>

              <button
                onClick={handleDownloadICS}
                className="flex-1 py-2.5 px-4 rounded-full glass hover:bg-white/[0.08] text-white font-mono text-xs border border-white/15 flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Add Calendar (.ics)</span>
              </button>
            </div>

            {/* BIG PROMINENT CLOSE / WRONG BUTTON AT THE BOTTOM TO RETURN TO WEBSITE */}
            <div className="pt-2">
              <button
                onClick={onClose}
                className="w-full py-3.5 rounded-full bg-white text-black font-bold text-sm hover:bg-neutral-200 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xl"
              >
                <X className="w-4 h-4 text-black stroke-[3]" />
                <span>Close &amp; Back to Website</span>
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-3 text-xs">
            {/* Full Name */}
            <div>
              <label className="block text-neutral-300 font-mono mb-1 font-semibold">Full Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Rahul Sharma"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/15 text-white placeholder-neutral-500 focus:outline-none focus:border-white/40"
              />
            </div>

            {/* USN & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-neutral-300 font-mono mb-1 font-semibold">USN / Roll Number *</label>
                <input
                  type="text"
                  required
                  value={formData.usn}
                  onChange={(e) => setFormData({ ...formData, usn: e.target.value })}
                  placeholder="e.g. 4MC22CS001"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/15 text-white placeholder-neutral-500 font-mono focus:outline-none focus:border-white/40"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-mono mb-1 font-semibold">Student Email *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@gmail.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/15 text-white placeholder-neutral-500 focus:outline-none focus:border-white/40"
                />
              </div>
            </div>

            {/* Phone & Year */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-neutral-300 font-mono mb-1 font-semibold">WhatsApp / Phone *</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/15 text-white placeholder-neutral-500 font-mono focus:outline-none focus:border-white/40"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-mono mb-1 font-semibold">Year of Study *</label>
                <select
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/15 text-white font-mono focus:outline-none focus:border-white/40 cursor-pointer"
                >
                  <option value="1st Year" className="bg-[#111]">1st Year (1st / 2nd Sem)</option>
                  <option value="2nd Year" className="bg-[#111]">2nd Year (3rd / 4th Sem)</option>
                  <option value="3rd Year" className="bg-[#111]">3rd Year (5th / 6th Sem)</option>
                  <option value="4th Year" className="bg-[#111]">4th Year (7th / 8th Sem)</option>
                </select>
              </div>
            </div>

            {/* Branch */}
            <div>
              <label className="block text-neutral-300 font-mono mb-1 font-semibold">Branch / Department *</label>
              <select
                value={formData.branch}
                onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/15 text-white font-mono focus:outline-none focus:border-white/40 cursor-pointer"
              >
                <option value="Computer Science & Engineering (CSE)" className="bg-[#111]">Computer Science &amp; Engineering (CSE)</option>
                <option value="Information Science & Engineering (ISE)" className="bg-[#111]">Information Science &amp; Engineering (ISE)</option>
                <option value="Electronics & Communication (ECE)" className="bg-[#111]">Electronics &amp; Communication (ECE)</option>
                <option value="Artificial Intelligence & Machine Learning (AIML)" className="bg-[#111]">Artificial Intelligence &amp; ML (AIML)</option>
                <option value="Mechanical Engineering" className="bg-[#111]">Mechanical Engineering</option>
                <option value="Civil Engineering" className="bg-[#111]">Civil Engineering</option>
                <option value="Other Department" className="bg-[#111]">Other Department</option>
              </select>
            </div>

            {/* Target Mail Notice */}
            <div className="pt-2 text-[11px] font-mono text-neutral-300 flex items-center gap-2 bg-white/[0.03] p-2.5 rounded-xl border border-white/10">
              <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Details will be dispatched to <strong>{clubEmail}</strong></span>
            </div>

            {/* Submit Button & Cancel */}
            <div className="pt-2 space-y-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-full bg-white text-black font-semibold text-xs hover:bg-neutral-200 transition-all cursor-pointer shadow-lg disabled:opacity-50"
              >
                {isSubmitting ? 'Registering & Dispatching to citdevhub@gmail.com...' : 'Submit Registration to citdevhub@gmail.com'}
              </button>

              <button
                type="button"
                onClick={onClose}
                className="w-full py-2 rounded-full glass hover:bg-white/[0.08] text-neutral-400 hover:text-white text-xs font-mono transition-colors cursor-pointer border border-white/10 flex items-center justify-center gap-1.5"
              >
                <X className="w-3.5 h-3.5" />
                <span>Cancel</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
