import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Mail,
  Send,
  Paperclip,
  CheckCircle2,
  Clock,
  ShieldCheck,
  FileText,
  X,
  Sparkles,
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { data, submitContactMessage, isLocalOnlyMode } = useApp();
  const { socialLinks, siteSettings } = data;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contactInfo: '',
    subject: '',
    message: '',
  });

  const [attachment, setAttachment] = useState<{
    name: string;
    size: string;
    dataUrl?: string;
  } | null>(null);

  const [submitting, setSubmitting] = useState(false);
  const [submittedId, setSubmittedId] = useState<string | null>(null);
  const [submissionError, setSubmissionError] = useState('');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSubmissionError('');
    // Browser-only localStorage cannot reliably hold 10MB attachments. Keep the local mode limit conservative.
    if (file.size > 2 * 1024 * 1024) {
      setSubmissionError('Attachment exceeds the 2MB limit in this browser-only storage mode.');
      return;
    }

    const fileNameLower = file.name.toLowerCase();
    const extension = fileNameLower.split('.').pop() || '';
    const allowedExtensions = ['pdf', 'png', 'jpg', 'jpeg', 'webp', 'zip', 'txt'];
    const dangerousExtensions = ['exe', 'bat', 'cmd', 'sh', 'vbs', 'js', 'msi', 'scr', 'com', 'dll', 'jar'];
    const allowedMimeTypes = [
      'application/pdf',
      'image/png',
      'image/jpeg',
      'image/webp',
      'application/zip',
      'application/x-zip-compressed',
      'text/plain',
    ];
    if (dangerousExtensions.includes(extension) || !allowedExtensions.includes(extension) || (file.type && !allowedMimeTypes.includes(file.type))) {
      setSubmissionError('Attachment type is not allowed. Use PDF, PNG, JPG, JPEG, WEBP, ZIP, or TXT only.');
      return;
    }

    const sizeFormatted =
      file.size > 1024 * 1024
        ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
        : `${(file.size / 1024).toFixed(0)} KB`;

    const reader = new FileReader();
    reader.onload = (event) => {
      setAttachment({
        name: file.name,
        size: sizeFormatted,
        dataUrl: event.target?.result as string,
      });
    };
    reader.onerror = () => setSubmissionError('The attachment could not be read. Please choose another file.');
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionError('');
    if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
      setSubmissionError('Please complete all required contact fields.');
      return;
    }
    setSubmitting(true);

    try {
      const msgId = await submitContactMessage({
        name: formData.name.trim(),
        email: formData.email.trim(),
        contactInfo: formData.contactInfo.trim(),
        subject: formData.subject.trim() || 'General Workstation Inquiry',
        message: formData.message.trim(),
        attachmentName: attachment?.name,
        attachmentSize: attachment?.size,
        attachmentUrl: attachment?.dataUrl,
      });

      setSubmittedId(msgId);
    } catch (err) {
      setSubmissionError(err instanceof Error ? err.message : 'The message could not be saved.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono mb-3">
            <Mail className="w-3.5 h-3.5" />
            <span>07 // SECURE COMMUNICATION</span>
          </div>
          <h1 className="font-['Outfit'] font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight">
            Start a <span className="rgb-text-gradient">Conversation</span>
          </h1>
          <p className="mt-4 text-slate-400 max-w-2xl text-base font-['Plus_Jakarta_Sans']">
            Available for remote contracts, full-stack web engineering, course inquiries, and bespoke technical consultations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Info & Social Hub */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-[#090D1A]/90 border border-white/[0.08] backdrop-blur-xl">
              <h3 className="font-['Outfit'] font-bold text-2xl text-white mb-2">
                Workstation Coordinates
              </h3>
              <p className="text-slate-400 text-sm mb-8 font-['Plus_Jakarta_Sans'] leading-relaxed">
                Direct dispatches are routed privately to the developer inbox.
              </p>

              {/* Status Info */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-950/60 border border-white/[0.06]">
                  <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                  <div>
                    <div className="text-[10px] font-mono text-slate-500 uppercase">Availability</div>
                    <div className="text-sm font-semibold text-white">Accepting Select Projects</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-950/60 border border-white/[0.06]">
                  <Clock className="w-4 h-4 text-cyan-400" />
                  <div>
                    <div className="text-[10px] font-mono text-slate-500 uppercase">Response Time</div>
                    <div className="text-sm font-semibold text-white">Within 12 - 24 Hours</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-950/60 border border-white/[0.06]">
                  <Mail className="w-4 h-4 text-purple-400" />
                  <div>
                    <div className="text-[10px] font-mono text-slate-500 uppercase">Official Email</div>
                    <a
                      href={`mailto:${socialLinks.email}`}
                      className="text-sm font-mono text-cyan-300 hover:underline"
                    >
                      {socialLinks.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Official Contact Channel */}
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-slate-400 block mb-3 font-semibold">
                  Official Contact Channel:
                </span>
                <a
                  href={`mailto:${socialLinks.email}`}
                  className="p-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800/90 border border-cyan-500/30 hover:border-cyan-400/60 flex items-center justify-between transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider font-bold">
                        Direct Email
                      </div>
                      <div className="text-xs font-mono text-slate-200 group-hover:text-white transition-colors break-all">
                        {socialLinks.email || 'Email not configured'}
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-cyan-400/70">Email</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-[#090D1A]/90 border border-white/[0.08] backdrop-blur-xl relative">
              {submittedId ? (
                <div className="py-12 text-center flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mb-4 text-emerald-400">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-['Outfit'] font-black text-2xl text-white mb-2">
                    Your message has been received successfully.
                  </h3>
                  <p className="text-slate-300 max-w-md text-sm font-['Plus_Jakarta_Sans'] leading-relaxed mb-4">
                    Thank you, <strong className="text-white">{formData.name}</strong>. Your inquiry reference is <span className="font-mono text-cyan-400 font-bold">{submittedId}</span>. {isLocalOnlyMode ? 'The message is stored only in this browser because no server-side inbox or email delivery is configured.' : `Sohel Rana can review the inquiry at ${formData.email}.`}
                  </p>
                  <button
                    onClick={() => {
                      setSubmittedId(null);
                      setFormData({ name: '', email: '', contactInfo: '', subject: '', message: '' });
                      setAttachment(null);
                      setSubmissionError('');
                    }}
                    className="px-6 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-xs font-mono text-cyan-300 hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name */}
                    <div>
                      <label
                        htmlFor="public-contact-name"
                        className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2"
                      >
                        Your Name *
                      </label>
                      <input
                        id="public-contact-name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Alex Morgan"
                        className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-white/10 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 font-mono transition-all"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label
                        htmlFor="public-contact-email"
                        className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2"
                      >
                        Your Email *
                      </label>
                      <input
                        id="public-contact-email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="alex@company.com"
                        className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-white/10 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 font-mono transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Additional Contact Information */}
                    <div>
                      <label
                        htmlFor="public-contact-info"
                        className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2"
                      >
                        Contact Information (Optional)
                      </label>
                      <input
                        id="public-contact-info"
                        type="text"
                        value={formData.contactInfo}
                        onChange={(e) => setFormData({ ...formData, contactInfo: e.target.value })}
                        placeholder="e.g. phone number or preferred contact method"
                        className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-white/10 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 font-mono transition-all"
                      />
                    </div>

                    {/* Subject */}
                    <div>
                      <label
                        htmlFor="public-contact-subject"
                        className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2"
                      >
                        Subject / Project Scope *
                      </label>
                      <input
                        id="public-contact-subject"
                        type="text"
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="e.g. Portfolio Website or Custom Web"
                        className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-white/10 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 font-mono transition-all"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="public-contact-message"
                      className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2"
                    >
                      Message Details *
                    </label>
                    <textarea
                      id="public-contact-message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Outline your requirements, target timeline, or technical objectives..."
                      className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-white/10 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 font-['Plus_Jakarta_Sans'] transition-all"
                    />
                  </div>

                  {/* Optional File Attachment */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                      Document or Asset Attachment (Optional, PDF / Image / ZIP)
                    </label>

                    {attachment ? (
                      <div className="p-3 rounded-xl bg-slate-950 border border-cyan-500/30 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs font-mono text-cyan-300 truncate">
                          <FileText className="w-4 h-4 shrink-0" />
                          <span className="truncate">{attachment.name}</span>
                          <span className="text-slate-500">({attachment.size})</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setAttachment(null)}
                          className="p-1 rounded-lg text-slate-400 hover:text-white"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <label className="flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-950/60 border border-dashed border-white/20 hover:border-cyan-400/50 cursor-pointer text-xs font-mono text-slate-400 hover:text-slate-200 transition-colors">
                        <Paperclip className="w-4 h-4 text-cyan-400" />
                        <span>Attach Project Brief / Specifications (Max 2MB)</span>
                        <input
                          type="file"
                          onChange={handleFileUpload}
                          className="hidden"
                          accept=".pdf,.png,.jpg,.jpeg,.webp,.zip,.txt"
                        />
                      </label>
                    )}
                  </div>

                  {submissionError && (
                    <div role="alert" className="p-3.5 rounded-xl bg-red-500/10 border border-red-400/25 text-red-200 text-xs font-mono">
                      {submissionError}
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={submitting}
                      id="contact-form-submit-btn"
                      className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold font-mono text-xs uppercase tracking-wider text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>{submitting ? 'Transmitting...' : 'Send Message'}</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
