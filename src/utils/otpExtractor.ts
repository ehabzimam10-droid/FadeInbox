/**
 * Smart OTP & Verification Link Extractor
 * Extracts 4-8 digit verification codes and activation links from email headers, subjects, and bodies.
 */

export interface ExtractedSmartActions {
  otpCode: string | null;
  verificationLink: string | null;
}

// Regex patterns to detect OTP codes
const OTP_CONTEXT_PATTERNS = [
  /(?:code|verification|verify|otp|pin|passcode|token|رمز التحقق|رمز التفعيل|رمز التأكيد|كود التحقق|كود|الرمز هو|رمزك هو)[\s:：\-—]*([0-9]{4,8})/i,
  /(?:your|is|هو)[\s:：\-—]*([0-9]{4,8})[\s\S]{0,30}(?:verification|verify|code|رمز)/i,
  /\b([0-9]{3}[-\s][0-9]{3})\b/, // e.g. 123-456
  /\b([0-9]{4,8})\b/, // Raw fallback for isolated 4-8 digit numbers
];

// Regex patterns to detect verification/activation URLs
const VERIFICATION_LINK_PATTERNS = [
  /https?:\/\/[^\s<>"']+(?:verify|verification|confirm|confirmation|activate|activation|auth\/action|token=[a-zA-Z0-9_\-]+)[^\s<>"']*/i,
  /href=["'](https?:\/\/[^"']*(?:verify|confirm|activate|validation|token=)[^"']*)["']/i,
];

/**
 * Extract OTP verification code from text and subject
 */
export function extractOtpCode(text?: string | null, subject?: string | null): string | null {
  const combined = `${subject || ''} \n ${text || ''}`;
  if (!combined.trim()) return null;

  // Try contextual patterns first
  for (const pattern of OTP_CONTEXT_PATTERNS.slice(0, 3)) {
    const match = combined.match(pattern);
    if (match && match[1]) {
      const cleaned = match[1].replace(/[-\s]/g, '');
      if (/^\d{4,8}$/.test(cleaned)) {
        return cleaned;
      }
    }
  }

  // If in subject specifically, check for isolated 4-8 digits
  if (subject) {
    const subjectMatch = subject.match(/\b([0-9]{4,8})\b/);
    if (subjectMatch && subjectMatch[1]) {
      return subjectMatch[1];
    }
  }

  // Fallback scan on the body if keywords exist in the body
  if (/verification|verify|otp|code|رمز|تأكيد|تفعيل/i.test(combined)) {
    const numbers = combined.match(/\b([0-9]{4,8})\b/g);
    if (numbers && numbers.length > 0) {
      // Return the first candidate that isn't a common year (e.g. 2024, 2025, 2026) if possible
      const best = numbers.find((n) => !['2024', '2025', '2026', '2027'].includes(n)) || numbers[0];
      return best;
    }
  }

  return null;
}

/**
 * Extract direct verification/activation link from html and text
 */
export function extractVerificationLink(html?: string | string[] | null, text?: string | null): string | null {
  const htmlContent = Array.isArray(html) ? html.join(' ') : html || '';
  const combined = `${htmlContent} \n ${text || ''}`;
  if (!combined.trim()) return null;

  for (const pattern of VERIFICATION_LINK_PATTERNS) {
    const match = combined.match(pattern);
    if (match && (match[1] || match[0])) {
      let url = match[1] || match[0];
      // Clean trailing punctuation or quotes
      url = url.replace(/[.,;>)'"]+$/, '');
      if (url.startsWith('http://') || url.startsWith('https://')) {
        return url;
      }
    }
  }

  return null;
}

/**
 * Convenience extractor returning both OTP and Verification Link
 */
export function extractSmartActions(
  subject?: string | null,
  text?: string | null,
  html?: string | string[] | null
): ExtractedSmartActions {
  return {
    otpCode: extractOtpCode(text, subject),
    verificationLink: extractVerificationLink(html, text),
  };
}
