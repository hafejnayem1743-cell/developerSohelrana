import React, { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { useApp } from '../context/AppContext';
import {
  AlertTriangle,
  Check,
  CheckCircle2,
  Clock,
  Copy,
  QrCode,
  UploadCloud,
  Wallet,
  X,
} from 'lucide-react';
import {
  MAX_PAYMENT_SCREENSHOT_BYTES,
  isPaymentAmountValid,
  isPaymentScreenshotValid,
  parsePaymentAmount,
} from '../utils/paymentValidation';

export const PaymentPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { data, submitOrder, isLocalOnlyMode } = useApp();
  const { walletSettings, courses, bundle } = data;
  const initialSlug = searchParams.get('course') || 'full-stack';

  const [selectedCourseSlug, setSelectedCourseSlug] = useState(initialSlug);
  const [network, setNetwork] = useState<'TRC20' | 'BEP20'>('TRC20');
  const [amountSent, setAmountSent] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [email, setEmail] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [txid, setTxid] = useState('');
  const [message, setMessage] = useState('');
  const [screenshotData, setScreenshotData] = useState<{ name: string; url: string } | null>(null);
  const [copied, setCopied] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [orderConfirmedId, setOrderConfirmedId] = useState<string | null>(null);

  const isBundle = selectedCourseSlug === 'bundle';
  const activeCourse = isBundle
    ? null
    : courses.find((course) => course.slug === selectedCourseSlug) || courses.find((course) => course.enabled);
  const requiredAmount = isBundle ? Number(bundle.finalPrice) : Number(activeCourse?.price || 0);
  const currentTitle = isBundle ? bundle.title : activeCourse?.title || '';
  const parsedAmount = parsePaymentAmount(amountSent);
  const amountIsValid = isPaymentAmountValid(amountSent, requiredAmount);
  const requiredFieldsValid = Boolean(
    customerName.trim() &&
      email.trim() &&
      contactInfo.trim() &&
      txid.trim() &&
      screenshotData &&
      currentTitle &&
      requiredAmount > 0
  );
  const canSubmit = requiredFieldsValid && amountIsValid && !submitting;

  const activeWalletAddress = useMemo(
    () =>
      network === 'TRC20'
        ? walletSettings.usdtTrc20Address
        : walletSettings.usdtBep20Address,
    [network, walletSettings.usdtTrc20Address, walletSettings.usdtBep20Address]
  );

  const validationMessage = !amountSent.trim()
    ? 'Enter the amount you sent.'
    : !amountIsValid
      ? 'Payment amount is below the required package price. Please send the required amount before submitting.'
      : !screenshotData
        ? 'Payment screenshot is required before submitting.'
        : !txid.trim()
          ? 'TXID is required before submitting.'
          : !contactInfo.trim()
            ? 'Contact information is required so the request can be followed up.'
            : '';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(activeWalletAddress);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setSubmitError('Copy failed. Please select and copy the wallet address manually.');
    }
  };

  const handleScreenshotUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setSubmitError('');

    if (!isPaymentScreenshotValid(file)) {
      const extension = file.name.toLowerCase().split('.').pop() || '';
      const acceptedType = ['jpg', 'jpeg', 'png', 'webp'].includes(extension) && ['image/jpeg', 'image/png', 'image/webp'].includes(file.type);
      setSubmitError(acceptedType
        ? `Payment screenshot must be ${MAX_PAYMENT_SCREENSHOT_BYTES / (1024 * 1024)}MB or smaller in this browser-only storage mode.`
        : 'Only JPG, JPEG, PNG, and WEBP payment screenshots are accepted.');
      event.target.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setScreenshotData({ name: file.name, url: reader.result });
      }
    };
    reader.onerror = () => setSubmitError('The screenshot could not be read. Please choose another image.');
    reader.readAsDataURL(file);
  };

  const handleCourseChange = (slug: string) => {
    setSelectedCourseSlug(slug);
    setAmountSent('');
    setSubmitError('');
  };

  const handleSubmitOrder = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitError('');

    if (!canSubmit) {
      setSubmitError(validationMessage || 'Complete all required fields before submitting.');
      return;
    }

    setSubmitting(true);
    try {
      const orderId = await submitOrder({
        customerName: customerName.trim(),
        email: email.trim(),
        telegramContact: contactInfo.trim(),
        contactInfo: contactInfo.trim(),
        courseId: isBundle ? 'bundle' : activeCourse?.id || '',
        courseTitle: currentTitle,
        requiredAmount,
        amount: parsedAmount,
        network,
        txid: txid.trim(),
        screenshotUrl: screenshotData?.url,
        screenshotName: screenshotData?.name,
        message: message.trim(),
      });
      setOrderConfirmedId(orderId);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'The payment request could not be saved.');
    } finally {
      setSubmitting(false);
    }
  };

  if (orderConfirmedId) {
    return (
      <div className="py-12 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rgb-border rounded-3xl p-8 sm:p-12 text-center flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-emerald-500/15 border border-emerald-400/40 flex items-center justify-center mb-5 text-emerald-300">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-300 font-bold mb-2">
              PAYMENT REQUEST SAVED
            </span>
            <h1 className="font-display font-black text-2xl sm:text-3xl text-white mb-3">
              {orderConfirmedId} is Pending
            </h1>
            <p className="text-slate-300 text-sm leading-relaxed max-w-xl mb-6">
              The request was saved locally with status <strong className="text-yellow-300">Pending</strong>. It has not been automatically verified and no blockchain verification was performed.
            </p>
            {isLocalOnlyMode && (
              <div className="w-full max-w-xl p-4 rounded-2xl bg-amber-500/10 border border-amber-400/25 text-left text-xs font-mono text-amber-200 mb-6">
                This portfolio currently has no server-side payment database or email service. The request is available only in this browser&apos;s local admin data.
              </div>
            )}
            <div className="w-full max-w-md p-4 rounded-2xl bg-slate-950/80 border border-white/10 text-left text-xs font-mono space-y-2 mb-8">
              <div className="flex justify-between gap-4"><span className="text-slate-500">Course</span><span className="text-cyan-300 text-right">{currentTitle}</span></div>
              <div className="flex justify-between gap-4"><span className="text-slate-500">Required amount</span><span className="text-white">${requiredAmount} USDT</span></div>
              <div className="flex justify-between gap-4"><span className="text-slate-500">Amount sent</span><span className="text-emerald-300">${parsedAmount} USDT</span></div>
              <div className="flex justify-between gap-4"><span className="text-slate-500">Network</span><span className="text-white">{network}</span></div>
              <div className="flex justify-between gap-4"><span className="text-slate-500">Status</span><span className="text-yellow-300">Pending</span></div>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              <Link to="/courses" className="premium-button px-5 py-3 text-xs">Browse Courses</Link>
              <Link to="/" className="premium-button premium-button-muted px-5 py-3 text-xs">Return Home</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 sm:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="section-kicker"><Wallet className="w-3.5 h-3.5" /> COURSE PAYMENT</div>
          <h1 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight">
            Course <span className="rgb-text-gradient">Payment Portal</span>
          </h1>
          <p className="mt-3 text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
            Select the package, use the matching network wallet, send at least the required amount, then submit the TXID and payment proof for manual review.
          </p>
        </div>

        <div className="space-y-8">
          <section className="rgb-border rounded-3xl p-6 sm:p-8">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div className="flex-1">
                <span className="text-xs font-mono uppercase tracking-widest text-cyan-300 block mb-2">Step 1 // Package</span>
                <label htmlFor="payment-course" className="block text-sm font-bold text-white mb-2">Selected Course Package</label>
                <select
                  id="payment-course"
                  value={selectedCourseSlug}
                  onChange={(event) => handleCourseChange(event.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
                >
                  {courses.filter((course) => course.enabled).map((course) => (
                    <option key={course.id} value={course.slug}>{course.title} — ${course.price}</option>
                  ))}
                  <option value="bundle">{bundle.title} — ${bundle.finalPrice}</option>
                </select>
              </div>
              <div className="min-w-0 lg:min-w-[260px] p-5 rounded-2xl bg-slate-950/80 border border-cyan-400/20">
                <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Required amount</div>
                <div className="font-display font-black text-4xl text-cyan-300 mt-1">${requiredAmount}</div>
                <div className="text-xs font-mono text-slate-500 mt-1">USDT • {currentTitle}</div>
              </div>
            </div>
          </section>

          <section className="rgb-border rounded-3xl p-6 sm:p-8">
            <div className="mb-6">
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-300 block mb-2">Step 2 // Network</span>
              <h2 className="font-display font-bold text-xl text-white">Choose the exact payment network</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {(['TRC20', 'BEP20'] as const).map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setNetwork(option)}
                  className={`premium-option ${network === option ? 'premium-option-active' : ''}`}
                  aria-pressed={network === option}
                >
                  <span className="font-bold">USDT {option}</span>
                  <span className="text-xs text-slate-500">{option === 'TRC20' ? 'Tron network' : 'BNB Smart Chain network'}</span>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6 items-center p-5 rounded-2xl bg-slate-950/80 border border-white/10">
              <div className="min-w-0">
                <div className="flex items-center gap-2 text-cyan-300 text-xs font-mono uppercase tracking-widest mb-3"><QrCode className="w-4 h-4" /> USDT {network} Wallet</div>
                <div className="p-3 rounded-xl bg-black/40 border border-white/10 flex flex-col sm:flex-row sm:items-center gap-3">
                  <code className="text-xs sm:text-sm text-cyan-200 break-all select-all flex-1">{activeWalletAddress}</code>
                  <button type="button" onClick={handleCopy} className="premium-button px-3 py-2 text-xs shrink-0">
                    {copied ? <><Check className="w-3.5 h-3.5" /> Copied</> : <><Copy className="w-3.5 h-3.5" /> Copy</>}
                  </button>
                </div>
                <div className="text-xs font-mono text-slate-300 mt-3">Send <strong className="text-white">at least ${requiredAmount} USDT</strong> using <strong className="text-white">{network}</strong>.</div>
                <div className="mt-4 p-3 rounded-xl bg-amber-500/10 border border-amber-400/25 text-amber-200 text-xs flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>Never use a different network. A wrong-network transfer may be unrecoverable.</span>
                </div>
              </div>
              <div className="mx-auto p-3 rounded-2xl bg-white shadow-[0_0_35px_rgba(0,240,255,0.18)]">
                <QRCodeSVG value={activeWalletAddress} size={190} level="M" includeMargin aria-label={`USDT ${network} wallet QR code`} />
              </div>
            </div>
          </section>

          <section className="rgb-border rounded-3xl p-6 sm:p-8">
            <div className="mb-6">
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-300 block mb-2">Step 3 // Verification Request</span>
              <h2 className="font-display font-bold text-xl text-white">Submit your transaction details</h2>
            </div>
            <form onSubmit={handleSubmitOrder} className="space-y-5" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="payment-name" className="form-label">Full Name *</label>
                  <input id="payment-name" className="form-input" value={customerName} onChange={(e) => setCustomerName(e.target.value)} autoComplete="name" required />
                </div>
                <div>
                  <label htmlFor="payment-email" className="form-label">Email *</label>
                  <input id="payment-email" type="email" className="form-input" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" required />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="payment-contact" className="form-label">Telegram / WhatsApp / Contact *</label>
                  <input id="payment-contact" className="form-input" value={contactInfo} onChange={(e) => setContactInfo(e.target.value)} placeholder="@handle or phone number" required />
                </div>
                <div>
                  <label htmlFor="payment-amount" className="form-label">Amount Sent (USDT) *</label>
                  <input id="payment-amount" type="number" min={requiredAmount} step="0.01" inputMode="decimal" className={`form-input ${amountSent && !amountIsValid ? 'form-input-error' : ''}`} value={amountSent} onChange={(e) => setAmountSent(e.target.value)} placeholder={`Minimum ${requiredAmount}`} required />
                  <p className="mt-2 text-xs font-mono text-cyan-300">Required amount: ${requiredAmount} USDT</p>
                </div>
              </div>

              <div>
                <label htmlFor="payment-txid" className="form-label">TXID / Transaction Hash *</label>
                <input id="payment-txid" className="form-input" value={txid} onChange={(e) => setTxid(e.target.value)} placeholder="Paste the TXID from your wallet or exchange" required />
                <p className="mt-2 text-xs text-slate-500">The TXID must correspond to the payment you submitted. Do not invent or reuse a different transaction ID.</p>
              </div>

              <div>
                <label className="form-label" htmlFor="payment-screenshot">Payment Screenshot / Proof *</label>
                {screenshotData ? (
                  <div className="p-4 rounded-2xl bg-slate-950 border border-cyan-400/30 flex flex-col sm:flex-row sm:items-center gap-4">
                    <img src={screenshotData.url} alt="Payment screenshot preview" className="w-24 h-24 rounded-xl object-cover border border-white/10" />
                    <div className="min-w-0 flex-1">
                      <div className="text-cyan-200 text-sm font-mono font-bold break-all">{screenshotData.name}</div>
                      <div className="text-slate-500 text-xs mt-1">Image attached and ready for manual review.</div>
                    </div>
                    <button type="button" onClick={() => setScreenshotData(null)} className="premium-button premium-button-danger px-3 py-2 text-xs"><X className="w-3.5 h-3.5" /> Remove</button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center p-7 rounded-2xl bg-slate-950/70 border border-dashed border-white/20 hover:border-cyan-400/50 cursor-pointer text-center">
                    <UploadCloud className="w-8 h-8 text-cyan-300 mb-2" />
                    <span className="text-sm font-mono text-slate-200 font-bold">Upload payment proof</span>
                    <span className="text-[11px] font-mono text-slate-500 mt-1">JPG, JPEG, PNG, WEBP • max 2MB</span>
                    <input id="payment-screenshot" type="file" onChange={handleScreenshotUpload} accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp" className="sr-only" required />
                  </label>
                )}
              </div>

              <div>
                <label htmlFor="payment-message" className="form-label">Optional Message</label>
                <textarea id="payment-message" rows={3} className="form-input resize-y" value={message} onChange={(e) => setMessage(e.target.value)} />
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/80 border border-white/10 flex items-start gap-3 text-xs text-slate-400">
                <Clock className="w-4 h-4 text-cyan-300 shrink-0 mt-0.5" />
                <span>Submission creates a <strong className="text-white">Pending</strong> request only. This app does not automatically verify blockchain payments or mark transactions as Verified.</span>
              </div>

              {submitError && (
                <div role="alert" className="p-4 rounded-2xl bg-red-500/10 border border-red-400/25 text-red-200 text-xs font-mono">
                  {submitError}
                </div>
              )}
              {!canSubmit && !submitError && validationMessage && (
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-400/25 text-amber-200 text-xs font-mono">
                  {validationMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={!canSubmit}
                id="btn-submit-payment-details"
                className="premium-button w-full py-4 text-xs disabled:opacity-45 disabled:cursor-not-allowed disabled:shadow-none"
              >
                <Check className="w-4 h-4" />
                {submitting ? 'Saving Request...' : 'Submit Payment Details'}
              </button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
};
