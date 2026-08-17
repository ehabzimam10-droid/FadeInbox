import {
  MailDomain,
  MailAccount,
  MailToken,
  MailMessageSummary,
  MailMessageDetail,
  MailProvider,
} from '../types';

export interface UnifiedToken {
  provider: MailProvider;
  token?: string; // JWT token for mail.tm & mail.gw
  address: string;
  password?: string;
  sidToken?: string; // Guerrilla Mail sid_token
  sessionId?: string; // DropMail session id
}

export function parseToken(rawToken: string): UnifiedToken {
  try {
    const parsed = JSON.parse(rawToken);
    if (parsed && parsed.provider && parsed.address) {
      return parsed as UnifiedToken;
    }
  } catch {
    // legacy plain JWT token
  }
  return {
    provider: 'mail.tm',
    token: rawToken,
    address: '',
  };
}

export function encodeToken(tokenObj: UnifiedToken): string {
  return JSON.stringify(tokenObj);
}

/**
  Generate random string for temporary usernames
 */
export function generateRandomUsername(length = 8): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
  Generate random password required for accounts
 */
export function generateRandomPassword(length = 12): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Fetch and merge ALL domains from all 5 Providers:
 * 1. mail.tm
 * 2. mail.gw
 * 3. 1secmail
 * 4. Guerrilla Mail
 * 5. DropMail.me
 */
export async function getAllDomains(): Promise<MailDomain[]> {
  const domains: MailDomain[] = [];

  // Provider 1: mail.tm
  try {
    const res = await fetch('https://api.mail.tm/domains');
    if (res.ok) {
      const data = await res.json();
      const members = data['hydra:member'] || data.member || data;
      members.filter((d: { isActive?: boolean }) => d.isActive !== false).forEach((d: { id: string; domain: string }) => {
        domains.push({
          id: `tm-${d.id || d.domain}`,
          domain: d.domain,
          provider: 'mail.tm',
          isActive: true,
          isPrivate: false,
          createdAt: '',
          updatedAt: '',
        });
      });
    }
  } catch (e) {
    console.warn('mail.tm domains fetch warning:', e);
  }

  // Provider 2: mail.gw
  try {
    const res = await fetch('https://api.mail.gw/domains');
    if (res.ok) {
      const data = await res.json();
      const members = data['hydra:member'] || data.member || data;
      members.filter((d: { isActive?: boolean }) => d.isActive !== false).forEach((d: { id: string; domain: string }) => {
        // avoid duplicates
        if (!domains.some((existing) => existing.domain === d.domain)) {
          domains.push({
            id: `gw-${d.id || d.domain}`,
            domain: d.domain,
            provider: 'mail.gw',
            isActive: true,
            isPrivate: false,
            createdAt: '',
            updatedAt: '',
          });
        }
      });
    }
  } catch (e) {
    console.warn('mail.gw domains fetch warning:', e);
  }

  // Provider 3: 1secmail
  try {
    const res = await fetch('https://www.1secmail.com/api/v1/?action=getDomainList');
    if (res.ok) {
      const list: string[] = await res.json();
      list.forEach((dom) => {
        if (!domains.some((existing) => existing.domain === dom)) {
          domains.push({
            id: `1sec-${dom}`,
            domain: dom,
            provider: '1secmail',
            isActive: true,
            isPrivate: false,
            createdAt: '',
            updatedAt: '',
          });
        }
      });
    }
  } catch (e) {
    console.warn('1secmail domains fetch warning:', e);
  }

  // Provider 4: Guerrilla Mail domains
  const guerrillaDomains = ['sharklasers.com', 'guerrillamail.info', 'guerrillamail.biz', 'guerrillamail.com', 'guerrillamail.de', 'guerrillamail.net', 'guerrillamail.org', 'pokemail.net', 'spam4.me'];
  guerrillaDomains.forEach((dom) => {
    if (!domains.some((existing) => existing.domain === dom)) {
      domains.push({
        id: `gmail-${dom}`,
        domain: dom,
        provider: 'guerrillamail',
        isActive: true,
        isPrivate: false,
        createdAt: '',
        updatedAt: '',
      });
    }
  });

  // Provider 5: DropMail.me domains
  const dropmailDomains = ['dropmail.me', 'emlpro.com', 'emlhub.com', 'dropmail.info'];
  dropmailDomains.forEach((dom) => {
    if (!domains.some((existing) => existing.domain === dom)) {
      domains.push({
        id: `drop-${dom}`,
        domain: dom,
        provider: 'dropmail',
        isActive: true,
        isPrivate: false,
        createdAt: '',
        updatedAt: '',
      });
    }
  });

  // Fallback defaults if list empty
  if (domains.length === 0) {
    return [
      { id: 'dom-tm1', domain: 'web-library.net', provider: 'mail.tm', isActive: true, isPrivate: false, createdAt: '', updatedAt: '' },
      { id: 'dom-gw1', domain: 'vmail.me', provider: 'mail.gw', isActive: true, isPrivate: false, createdAt: '', updatedAt: '' },
      { id: 'dom-1sec1', domain: '1secmail.com', provider: '1secmail', isActive: true, isPrivate: false, createdAt: '', updatedAt: '' },
      { id: 'dom-g1', domain: 'sharklasers.com', provider: 'guerrillamail', isActive: true, isPrivate: false, createdAt: '', updatedAt: '' },
      { id: 'dom-d1', domain: 'dropmail.me', provider: 'dropmail', isActive: true, isPrivate: false, createdAt: '', updatedAt: '' },
    ];
  }

  return domains;
}

/**
 * Unified Account Creation across all 5 Providers
 */
export async function createUnifiedAccount(
  fullAddress: string,
  password: string,
  provider: MailProvider
): Promise<{ accountToken: string; address: string }> {
  const [username, domain] = fullAddress.split('@');

  // PROVIDER 1: mail.tm
  if (provider === 'mail.tm') {
    const apiBase = 'https://api.mail.tm';
    const accRes = await fetch(`${apiBase}/accounts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ address: fullAddress, password }),
    });

    if (!accRes.ok && accRes.status !== 422) {
      const err = await accRes.json().catch(() => ({}));
      throw new Error(err['hydra:description'] || `mail.tm account creation failed (${accRes.status})`);
    }

    const tokenRes = await fetch(`${apiBase}/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ address: fullAddress, password }),
    });

    if (!tokenRes.ok) {
      throw new Error(`mail.tm token failed (${tokenRes.status})`);
    }

    const tokenData = await tokenRes.json();
    const tokenObj: UnifiedToken = {
      provider: 'mail.tm',
      token: tokenData.token,
      address: fullAddress,
      password,
    };
    return { accountToken: encodeToken(tokenObj), address: fullAddress };
  }

  // PROVIDER 2: mail.gw
  if (provider === 'mail.gw') {
    const apiBase = 'https://api.mail.gw';
    const accRes = await fetch(`${apiBase}/accounts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ address: fullAddress, password }),
    });

    if (!accRes.ok && accRes.status !== 422) {
      const err = await accRes.json().catch(() => ({}));
      throw new Error(err['hydra:description'] || `mail.gw account creation failed (${accRes.status})`);
    }

    const tokenRes = await fetch(`${apiBase}/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ address: fullAddress, password }),
    });

    if (!tokenRes.ok) {
      throw new Error(`mail.gw token failed (${tokenRes.status})`);
    }

    const tokenData = await tokenRes.json();
    const tokenObj: UnifiedToken = {
      provider: 'mail.gw',
      token: tokenData.token,
      address: fullAddress,
      password,
    };
    return { accountToken: encodeToken(tokenObj), address: fullAddress };
  }

  // PROVIDER 3: 1secmail
  if (provider === '1secmail') {
    const tokenObj: UnifiedToken = {
      provider: '1secmail',
      address: fullAddress,
    };
    return { accountToken: encodeToken(tokenObj), address: fullAddress };
  }

  // PROVIDER 4: Guerrilla Mail
  if (provider === 'guerrillamail') {
    try {
      const res = await fetch('https://api.guerrillamail.com/ajax.php?f=get_email_address');
      const data = await res.json();
      const sidToken = data.sid_token || '';

      if (username) {
        await fetch(
          `https://api.guerrillamail.com/ajax.php?f=set_email_user&email_user=${encodeURIComponent(
            username
          )}&sid_token=${sidToken}`
        ).catch(() => {});
      }

      const assignedAddr = `${username || data.alias || 'user'}@${domain || 'sharklasers.com'}`;
      const tokenObj: UnifiedToken = {
        provider: 'guerrillamail',
        address: assignedAddr,
        sidToken,
      };
      return { accountToken: encodeToken(tokenObj), address: assignedAddr };
    } catch {
      const tokenObj: UnifiedToken = {
        provider: 'guerrillamail',
        address: fullAddress,
        sidToken: `sid_${Date.now()}`,
      };
      return { accountToken: encodeToken(tokenObj), address: fullAddress };
    }
  }

  // PROVIDER 5: DropMail.me
  if (provider === 'dropmail') {
    try {
      const res = await fetch('https://dropmail.me/api/graphql/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: 'mutation { introduceSession { id, expiresAt, addresses { address } } }',
        }),
      });
      if (res.ok) {
        const json = await res.json();
        const session = json.data?.introduceSession;
        if (session) {
          const generatedAddr = session.addresses?.[0]?.address || fullAddress;
          const tokenObj: UnifiedToken = {
            provider: 'dropmail',
            address: generatedAddr,
            sessionId: session.id,
          };
          return { accountToken: encodeToken(tokenObj), address: generatedAddr };
        }
      }
    } catch (e) {
      console.warn('Dropmail introduceSession error:', e);
    }

    const tokenObj: UnifiedToken = {
      provider: 'dropmail',
      address: fullAddress,
      sessionId: `drop_${Date.now()}`,
    };
    return { accountToken: encodeToken(tokenObj), address: fullAddress };
  }

  // Default fallback
  const tokenObj: UnifiedToken = {
    provider: 'mail.tm',
    address: fullAddress,
  };
  return { accountToken: encodeToken(tokenObj), address: fullAddress };
}

/**
 * Unified Get Messages Inbox polling handler (every 10s)
 */
export async function getUnifiedMessages(rawToken: string): Promise<MailMessageSummary[]> {
  const tokenInfo = parseToken(rawToken);
  const { provider, token, address, sidToken, sessionId } = tokenInfo;
  const [username, domain] = address.split('@');

  // PROVIDER 1: mail.tm
  if (provider === 'mail.tm') {
    if (!token) return [];
    const res = await fetch('https://api.mail.tm/messages', {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
      if (res.status === 401) throw new Error('401_UNAUTHORIZED');
      return [];
    }
    const data = await res.json();
    return data['hydra:member'] || data.member || [];
  }

  // PROVIDER 2: mail.gw
  if (provider === 'mail.gw') {
    if (!token) return [];
    const res = await fetch('https://api.mail.gw/messages', {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
      if (res.status === 401) throw new Error('401_UNAUTHORIZED');
      return [];
    }
    const data = await res.json();
    return data['hydra:member'] || data.member || [];
  }

  // PROVIDER 3: 1secmail
  if (provider === '1secmail') {
    if (!username || !domain) return [];
    const res = await fetch(
      `https://www.1secmail.com/api/v1/?action=getMessages&login=${encodeURIComponent(
        username
      )}&domain=${encodeURIComponent(domain)}`
    );
    if (!res.ok) return [];
    const rawMsgs: Array<{ id: number; from: string; subject: string; date: string }> =
      await res.json();

    return rawMsgs.map((m) => ({
      id: String(m.id),
      accountId: address,
      msgid: String(m.id),
      from: { address: m.from, name: m.from.split('@')[0] },
      to: [{ address, name: username }],
      subject: m.subject || '(No Subject)',
      intro: m.subject || '',
      seen: true,
      isDeleted: false,
      hasAttachments: false,
      size: 1024,
      createdAt: m.date,
      updatedAt: m.date,
    }));
  }

  // PROVIDER 4: Guerrilla Mail
  if (provider === 'guerrillamail') {
    if (!sidToken) return [];
    const res = await fetch(
      `https://api.guerrillamail.com/ajax.php?f=check_email&seq=0&sid_token=${encodeURIComponent(
        sidToken
      )}`
    );
    if (!res.ok) return [];
    const data = await res.json();
    const list: Array<{
      mail_id: string;
      mail_from: string;
      mail_subject: string;
      mail_excerpt: string;
      mail_date: string;
      mail_size: string;
    }> = data.list || [];

    return list.map((m) => ({
      id: String(m.mail_id),
      accountId: address,
      msgid: String(m.mail_id),
      from: { address: m.mail_from, name: m.mail_from.split('@')[0] },
      to: [{ address, name: '' }],
      subject: m.mail_subject || '(No Subject)',
      intro: m.mail_excerpt || '',
      seen: true,
      isDeleted: false,
      hasAttachments: false,
      size: Number(m.mail_size) || 1024,
      createdAt: m.mail_date,
      updatedAt: m.mail_date,
    }));
  }

  // PROVIDER 5: DropMail.me
  if (provider === 'dropmail') {
    if (!sessionId) return [];
    try {
      const res = await fetch('https://dropmail.me/api/graphql/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `query { session(id: "${sessionId}") { mails { id, fromAddress, subject, text, htmlReceived, receivedAt } } }`,
        }),
      });
      if (res.ok) {
        const json = await res.json();
        const mails: Array<{
          id: string;
          fromAddress: string;
          subject: string;
          text: string;
          htmlReceived: string;
          receivedAt?: string;
        }> = json.data?.session?.mails || [];

        return mails.map((m) => ({
          id: m.id,
          accountId: address,
          msgid: m.id,
          from: { address: m.fromAddress, name: m.fromAddress.split('@')[0] },
          to: [{ address, name: '' }],
          subject: m.subject || '(No Subject)',
          intro: m.text ? m.text.substring(0, 100) : '',
          seen: true,
          isDeleted: false,
          hasAttachments: false,
          size: 1024,
          createdAt: m.receivedAt || new Date().toISOString(),
          updatedAt: m.receivedAt || new Date().toISOString(),
        }));
      }
    } catch (e) {
      console.warn('Dropmail fetch messages error:', e);
    }
    return [];
  }

  return [];
}

/**
 * Unified Get Message Detail
 */
export async function getUnifiedMessageDetail(
  id: string,
  rawToken: string
): Promise<MailMessageDetail> {
  const tokenInfo = parseToken(rawToken);
  const { provider, token, address, sidToken, sessionId } = tokenInfo;
  const [username, domain] = address.split('@');

  // PROVIDER 1: mail.tm
  if (provider === 'mail.tm') {
    const res = await fetch(`https://api.mail.tm/messages/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error(`mail.tm detail fetch failed (${res.status})`);
    return res.json();
  }

  // PROVIDER 2: mail.gw
  if (provider === 'mail.gw') {
    const res = await fetch(`https://api.mail.gw/messages/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error(`mail.gw detail fetch failed (${res.status})`);
    return res.json();
  }

  // PROVIDER 3: 1secmail
  if (provider === '1secmail') {
    const res = await fetch(
      `https://www.1secmail.com/api/v1/?action=readMessage&login=${encodeURIComponent(
        username
      )}&domain=${encodeURIComponent(domain)}&id=${encodeURIComponent(id)}`
    );
    if (!res.ok) throw new Error(`1secmail detail fetch failed (${res.status})`);
    const data = await res.json();

    const attachments = (data.attachments || []).map(
      (att: { filename: string; size: number; contentType: string }) => ({
        id: att.filename,
        filename: att.filename,
        contentType: att.contentType || 'application/octet-stream',
        disposition: 'attachment',
        size: att.size || 0,
        downloadUrl: `https://www.1secmail.com/api/v1/?action=download&login=${encodeURIComponent(
          username
        )}&domain=${encodeURIComponent(domain)}&id=${encodeURIComponent(id)}&file=${encodeURIComponent(
          att.filename
        )}`,
      })
    );

    return {
      id: String(data.id),
      accountId: address,
      msgid: String(data.id),
      from: { address: data.from, name: data.from.split('@')[0] },
      to: [{ address, name: username }],
      subject: data.subject || '(No Subject)',
      intro: data.textBody ? data.textBody.substring(0, 100) : '',
      seen: true,
      isDeleted: false,
      hasAttachments: attachments.length > 0,
      size: 1024,
      createdAt: data.date,
      updatedAt: data.date,
      text: data.textBody || data.body || '',
      html: data.htmlBody ? [data.htmlBody] : data.body ? [data.body] : [],
      attachments,
    };
  }

  // PROVIDER 4: Guerrilla Mail
  if (provider === 'guerrillamail') {
    const res = await fetch(
      `https://api.guerrillamail.com/ajax.php?f=fetch_email&email_id=${encodeURIComponent(
        id
      )}&sid_token=${encodeURIComponent(sidToken || '')}`
    );
    if (!res.ok) throw new Error(`Guerrilla detail fetch failed (${res.status})`);
    const data = await res.json();

    return {
      id: String(data.mail_id),
      accountId: address,
      msgid: String(data.mail_id),
      from: { address: data.mail_from, name: data.mail_from.split('@')[0] },
      to: [{ address, name: '' }],
      subject: data.mail_subject || '(No Subject)',
      intro: data.mail_excerpt || '',
      seen: true,
      isDeleted: false,
      hasAttachments: false,
      size: Number(data.mail_size) || 1024,
      createdAt: data.mail_date,
      updatedAt: data.mail_date,
      text: data.mail_body || '',
      html: [data.mail_body || ''],
    };
  }

  // PROVIDER 5: DropMail.me
  if (provider === 'dropmail') {
    const msgs = await getUnifiedMessages(rawToken);
    const target = msgs.find((m) => m.id === id);
    return {
      id: id,
      accountId: address,
      msgid: id,
      from: target?.from || { address: 'sender@dropmail.me', name: 'Sender' },
      to: [{ address, name: '' }],
      subject: target?.subject || '(No Subject)',
      intro: target?.intro || '',
      seen: true,
      isDeleted: false,
      hasAttachments: false,
      size: 1024,
      createdAt: target?.createdAt || new Date().toISOString(),
      updatedAt: target?.updatedAt || new Date().toISOString(),
      text: target?.intro || '',
      html: [target?.intro || ''],
    };
  }

  throw new Error('Unknown provider');
}

/**
 * Unified Delete Message
 */
export async function deleteUnifiedMessage(id: string, rawToken: string): Promise<boolean> {
  const tokenInfo = parseToken(rawToken);
  const { provider, token, sidToken } = tokenInfo;

  if (provider === 'mail.tm') {
    const res = await fetch(`https://api.mail.tm/messages/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.status === 204 || res.ok;
  }

  if (provider === 'mail.gw') {
    const res = await fetch(`https://api.mail.gw/messages/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.status === 204 || res.ok;
  }

  if (provider === 'guerrillamail') {
    await fetch(
      `https://api.guerrillamail.com/ajax.php?f=del_email&email_ids[]=${encodeURIComponent(
        id
      )}&sid_token=${encodeURIComponent(sidToken || '')}`
    ).catch(() => {});
    return true;
  }

  // 1secmail & dropmail auto-expire
  return true;
}
