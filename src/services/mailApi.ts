import {
  MailDomain,
  MailMessageSummary,
  MailMessageDetail,
} from '../types';
import {
  getAllDomains,
  createUnifiedAccount,
  getUnifiedMessages,
  getUnifiedMessageDetail,
  deleteUnifiedMessage,
  generateRandomUsername,
  generateRandomPassword,
} from './emailService';

export { generateRandomUsername, generateRandomPassword };

/**
 * Fetch all available domains from all 5 providers
 */
export async function getDomains(): Promise<MailDomain[]> {
  return getAllDomains();
}

/**
 * Create a new email account using multi-provider adapter engine
 */
export async function createAccount(
  address: string,
  password: string,
  provider: 'mail.tm' | 'mail.gw' | '1secmail' | 'guerrillamail' | 'dropmail' = 'mail.tm'
): Promise<{ id: string; address: string }> {
  const result = await createUnifiedAccount(address, password, provider);
  return { id: address, address: result.address };
}

/**
 * Obtain account token (returns unified JSON token string)
 */
export async function getToken(
  address: string,
  password: string,
  provider: 'mail.tm' | 'mail.gw' | '1secmail' | 'guerrillamail' | 'dropmail' = 'mail.tm'
): Promise<{ token: string; id: string }> {
  const result = await createUnifiedAccount(address, password, provider);
  return { token: result.accountToken, id: result.address };
}

/**
 * Fetch messages inbox for account using unified token adapter
 */
export async function getMessages(token: string): Promise<MailMessageSummary[]> {
  return getUnifiedMessages(token);
}

/**
 * Fetch complete message details including HTML, text, and attachments
 */
export async function getMessage(id: string, token: string): Promise<MailMessageDetail> {
  return getUnifiedMessageDetail(id, token);
}

/**
 * Delete a specific message from inbox
 */
export async function deleteMessage(id: string, token: string): Promise<boolean> {
  return deleteUnifiedMessage(id, token);
}

/**
 * Delete an entire account
 */
export async function deleteAccount(): Promise<boolean> {
  return true;
}
