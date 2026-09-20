export const MAX_PAYMENT_SCREENSHOT_BYTES = 2 * 1024 * 1024;
export const PAYMENT_SCREENSHOT_MIME_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);
export const PAYMENT_SCREENSHOT_EXTENSIONS = new Set(['jpg', 'jpeg', 'png', 'webp']);

export const parsePaymentAmount = (value: string): number => {
  const parsed = Number(value.trim());
  return Number.isFinite(parsed) ? parsed : NaN;
};

export const isPaymentAmountValid = (value: string, requiredAmount: number): boolean => {
  const amount = parsePaymentAmount(value);
  return Number.isFinite(amount) && requiredAmount > 0 && amount >= requiredAmount;
};

export const isPaymentScreenshotValid = (file: { name: string; type: string; size: number }): boolean => {
  const extension = file.name.toLowerCase().split('.').pop() || '';
  return (
    file.size <= MAX_PAYMENT_SCREENSHOT_BYTES &&
    PAYMENT_SCREENSHOT_MIME_TYPES.has(file.type) &&
    PAYMENT_SCREENSHOT_EXTENSIONS.has(extension)
  );
};
