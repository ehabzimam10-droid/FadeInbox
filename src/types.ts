export interface ActiveEmailAccount {
  id: string;
  address: string;
  accountToken: string;
  expiresAt: number; // timestamp in ms
  durationSeconds: number;
  createdAt: string;
}

export type MailProvider = 'mail.tm' | 'mail.gw' | '1secmail' | 'guerrillamail' | 'dropmail';

export interface MailDomain {
  id: string;
  domain: string;
  provider: MailProvider;
  isActive: boolean;
  isPrivate: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface MailAccount {
  id: string;
  address: string;
  quota: number;
  used: number;
  isDisabled: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface MailToken {
  token: string;
  id: string;
}

export interface MailHeader {
  [key: string]: string;
}

export interface MailAttachment {
  id: string;
  filename: string;
  contentType: string;
  disposition: string;
  size: number;
  downloadUrl?: string;
}

export interface MailMessageSummary {
  id: string;
  accountId: string;
  msgid: string;
  from: {
    address: string;
    name: string;
  };
  to: Array<{
    address: string;
    name: string;
  }>;
  subject: string;
  intro: string;
  seen: boolean;
  isDeleted: boolean;
  hasAttachments: boolean;
  size: number;
  createdAt: string;
  updatedAt: string;
}

export interface MailMessageDetail extends MailMessageSummary {
  text?: string;
  html?: string[];
  attachments?: MailAttachment[];
}

export interface SavedEmailHistory {
  id: string;
  userId: string;
  address: string;
  accountToken: string;
  createdAt: string;
  expiresAt?: string;
  note?: string;
}

export interface SavedMessage {
  id: string;
  userId: string;
  emailAddress: string;
  messageId: string;
  fromAddress: string;
  fromName: string;
  subject: string;
  intro: string;
  text?: string;
  html?: string;
  createdAt: string;
}

export type LanguageCode =
  | 'en'
  | 'ar'
  | 'es'
  | 'pt'
  | 'fr'
  | 'ru'
  | 'de'
  | 'hi'
  | 'zh'
  | 'tr';

export interface LanguageOption {
  code: LanguageCode;
  name: string;
  nativeName: string;
  flag: string;
  dir: 'ltr' | 'rtl';
}
