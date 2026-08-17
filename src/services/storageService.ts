import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
  setDoc,
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { SavedEmailHistory, SavedMessage, MailMessageDetail } from '../types';

const LOCAL_HISTORY_KEY = 'fadeinbox_guest_history';
const LOCAL_SAVED_MSGS_KEY = 'fadeinbox_guest_saved_messages';

/**
 * Save created email address to history (Firestore for auth users, localStorage for guests)
 */
export async function saveEmailToHistory(
  userId: string | null,
  address: string,
  accountToken: string
): Promise<SavedEmailHistory> {
  const newItem: SavedEmailHistory = {
    id: Date.now().toString() + '_' + Math.random().toString(36).substring(2, 7),
    userId: userId || 'guest',
    address,
    accountToken,
    createdAt: new Date().toISOString(),
  };

  if (userId) {
    try {
      const docRef = await addDoc(collection(db, 'history'), newItem);
      return { ...newItem, id: docRef.id };
    } catch (err) {
      console.error('Error saving history to Firestore:', err);
    }
  }

  // Fallback to guest localStorage
  try {
    const existing = getGuestEmailHistory();
    const updated = [newItem, ...existing.filter((item) => item.address !== address)].slice(0, 20);
    localStorage.setItem(LOCAL_HISTORY_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('LocalStorage save history error:', err);
  }

  return newItem;
}

/**
 * Retrieve saved email history
 */
export async function getEmailHistory(userId: string | null): Promise<SavedEmailHistory[]> {
  if (userId) {
    try {
      const q = query(collection(db, 'history'), where('userId', '==', userId));
      const snapshot = await getDocs(q);
      const items: SavedEmailHistory[] = [];
      snapshot.forEach((doc) => {
        items.push({ ...(doc.data() as SavedEmailHistory), id: doc.id });
      });
      // Sort newest first
      return items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } catch (err) {
      console.error('Error fetching Firestore history:', err);
    }
  }

  return getGuestEmailHistory();
}

/**
 * Delete item from email history
 */
export async function deleteEmailHistoryItem(userId: string | null, id: string): Promise<void> {
  if (userId) {
    try {
      await deleteDoc(doc(db, 'history', id));
      return;
    } catch (err) {
      console.error('Error deleting history doc:', err);
    }
  }

  try {
    const existing = getGuestEmailHistory();
    const filtered = existing.filter((item) => item.id !== id);
    localStorage.setItem(LOCAL_HISTORY_KEY, JSON.stringify(filtered));
  } catch (err) {
    console.error('LocalStorage delete history error:', err);
  }
}

/**
 * Save an important message permanently (Firestore or localStorage)
 */
export async function saveMessagePermanently(
  userId: string | null,
  emailAddress: string,
  message: MailMessageDetail
): Promise<SavedMessage> {
  const newItem: SavedMessage = {
    id: Date.now().toString() + '_' + Math.random().toString(36).substring(2, 7),
    userId: userId || 'guest',
    emailAddress,
    messageId: message.id,
    fromAddress: message.from?.address || 'Unknown Sender',
    fromName: message.from?.name || message.from?.address || 'Unknown Sender',
    subject: message.subject || '(No Subject)',
    intro: message.intro || '',
    text: message.text || '',
    html: Array.isArray(message.html) ? message.html.join('') : message.html || '',
    createdAt: new Date().toISOString(),
  };

  if (userId) {
    try {
      const docRef = await addDoc(collection(db, 'savedMessages'), newItem);
      return { ...newItem, id: docRef.id };
    } catch (err) {
      console.error('Error saving message to Firestore:', err);
    }
  }

  try {
    const existing = getGuestSavedMessages();
    const updated = [newItem, ...existing.filter((m) => m.messageId !== message.id)];
    localStorage.setItem(LOCAL_SAVED_MSGS_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('LocalStorage save message error:', err);
  }

  return newItem;
}

/**
 * Get all permanently saved messages
 */
export async function getSavedMessages(userId: string | null): Promise<SavedMessage[]> {
  if (userId) {
    try {
      const q = query(collection(db, 'savedMessages'), where('userId', '==', userId));
      const snapshot = await getDocs(q);
      const items: SavedMessage[] = [];
      snapshot.forEach((doc) => {
        items.push({ ...(doc.data() as SavedMessage), id: doc.id });
      });
      return items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } catch (err) {
      console.error('Error fetching Firestore saved messages:', err);
    }
  }

  return getGuestSavedMessages();
}

/**
 * Delete a permanently saved message
 */
export async function deleteSavedMessage(userId: string | null, id: string): Promise<void> {
  if (userId) {
    try {
      await deleteDoc(doc(db, 'savedMessages', id));
      return;
    } catch (err) {
      console.error('Error deleting saved message doc:', err);
    }
  }

  try {
    const existing = getGuestSavedMessages();
    const filtered = existing.filter((m) => m.id !== id);
    localStorage.setItem(LOCAL_SAVED_MSGS_KEY, JSON.stringify(filtered));
  } catch (err) {
    console.error('LocalStorage delete saved message error:', err);
  }
}

// Guest helpers
function getGuestEmailHistory(): SavedEmailHistory[] {
  try {
    const raw = localStorage.getItem(LOCAL_HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function getGuestSavedMessages(): SavedMessage[] {
  try {
    const raw = localStorage.getItem(LOCAL_SAVED_MSGS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
