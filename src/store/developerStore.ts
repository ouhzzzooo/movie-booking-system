import { create } from 'zustand';
import {
  developerLogin as apiDeveloperLogin,
  getAdmins,
  createAdmin as apiCreateAdmin,
  deleteAdmin as apiDeleteAdmin,
  getChatMessages,
  postChatMessage,
} from '../api/auth';

interface Developer {
  developerId: number;
  name: string;
  surname: string;
  email: string;
}

interface Admin {
  adminId: number;
  name: string;
  surname: string;
  email: string;
}

interface ChatMessage {
  chatId: number;
  message: string;
  dateTime: string;
  admin?: Admin;
  developer?: Developer;
}

interface DeveloperState {
  developer: Developer | null;
  token: string | null;
  admins: Admin[];
  messages: ChatMessage[];
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  fetchAdmins: () => Promise<void>;
  createAdmin: (adminData: Partial<Admin> & { password: string }) => Promise<void>;
  deleteAdmin: (adminId: number) => Promise<void>;
  fetchChats: () => Promise<void>;
  sendMessage: (message: string) => Promise<void>;
}

export const useDeveloperStore = create<DeveloperState>((set, get) => ({
  developer: JSON.parse(localStorage.getItem('developer') || 'null'),
  token: localStorage.getItem('token') || null,
  admins: [],
  messages: [],
  login: async (email, password) => {
    try {
      const response = await apiDeveloperLogin(email, password);
      const { token, developer } = response;
      set({ developer, token });
      localStorage.setItem('token', token);
      localStorage.setItem('developer', JSON.stringify(developer));
      return true;
    } catch (error) {
      console.error('Developer login failed:', error);
      return false;
    }
  },
  logout: () => {
    set({ developer: null, token: null, admins: [], messages: [] });
    localStorage.removeItem('token');
    localStorage.removeItem('developer');
  },
  fetchAdmins: async () => {
    try {
      const admins = await getAdmins();
      set({ admins });
    } catch (error) {
      console.error('Failed to fetch admins:', error);
    }
  },
  createAdmin: async (adminData) => {
    try {
      await apiCreateAdmin(adminData);
      await get().fetchAdmins();
    } catch (error) {
      console.error('Failed to create admin:', error);
    }
  },
  deleteAdmin: async (adminId) => {
    try {
      await apiDeleteAdmin(adminId);
      await get().fetchAdmins();
    } catch (error) {
      console.error('Failed to delete admin:', error);
    }
  },
  fetchChats: async () => {
    try {
      const messages = await getChatMessages();
      set({ messages });
    } catch (error) {
      console.error('Failed to fetch chat messages:', error);
    }
  },
  sendMessage: async (message) => {
    try {
      await postChatMessage(message);
      await get().fetchChats();
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  },
}));