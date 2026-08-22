import React, { useState, useEffect } from 'react';
import { Mail, CheckCircle2, Trash2, Eye, Circle } from 'lucide-react';
import messageService from '../services/messageService';
import { useToast } from '../context/ToastContext';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { SkeletonTable, EmptyState } from '../components/LoadingSkeleton';

export const MessageManagement: React.FC = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<any | null>(null);

  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const { showToast } = useToast();

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    setIsLoading(true);
    try {
      const res = await messageService.getMessages();
      setMessages(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      showToast('Failed to load contact messages', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleRead = async (msg: any) => {
    try {
      const newStatus = !msg.isRead;
      await messageService.markAsRead(msg._id || msg.id, newStatus);
      showToast(`Message marked as ${newStatus ? 'read' : 'unread'}`, 'info');
      fetchMessages();
      if (selectedMessage && (selectedMessage._id === msg._id || selectedMessage.id === msg.id)) {
        setSelectedMessage({ ...selectedMessage, isRead: newStatus });
      }
    } catch (err) {
      showToast('Failed to update status', 'error');
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deletingId) return;
    setIsDeleting(true);
    try {
      await messageService.deleteMessage(deletingId);
      showToast('Message deleted successfully', 'success');
      setDeletingId(null);
      if (selectedMessage && (selectedMessage._id === deletingId || selectedMessage.id === deletingId)) {
        setSelectedMessage(null);
      }
      fetchMessages();
    } catch (err) {
      showToast('Failed to delete message', 'error');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Contact Messages Inbox</h1>
          <p className="text-xs text-gray-400">Customer inquiries, catering requests & feedback</p>
        </div>
      </div>

      {isLoading ? (
        <SkeletonTable />
      ) : messages.length === 0 ? (
        <EmptyState title="No Messages Found" description="Customer contact form submissions will appear here." />
      ) : (
        <div className="bg-[#14151B] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/5 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Sender Name</th>
                  <th className="py-3.5 px-4">Phone / Email</th>
                  <th className="py-3.5 px-4">Message Snippet</th>
                  <th className="py-3.5 px-4">Received</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm">
                {messages.map((msg) => (
                  <tr
                    key={msg._id || msg.id}
                    className={`hover:bg-white/5 transition-colors ${!msg.isRead ? 'bg-[#D4AF37]/5 font-semibold' : ''}`}
                  >
                    <td className="py-3.5 px-4">
                      {msg.isRead ? (
                        <span className="text-xs text-gray-500 flex items-center space-x-1">
                          <CheckCircle2 className="w-4 h-4 text-gray-500" />
                          <span>Read</span>
                        </span>
                      ) : (
                        <span className="text-xs text-[#D4AF37] font-bold flex items-center space-x-1">
                          <Circle className="w-3 h-3 fill-current text-[#D4AF37]" />
                          <span>Unread</span>
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-white font-bold">{msg.name}</td>
                    <td className="py-3.5 px-4 text-xs text-gray-300">
                      <div>{msg.phone}</div>
                      <div className="text-gray-400">{msg.email}</div>
                    </td>
                    <td className="py-3.5 px-4 text-xs text-gray-300 max-w-xs truncate">
                      {msg.message}
                    </td>
                    <td className="py-3.5 px-4 text-xs text-gray-400">
                      {new Date(msg.createdAt).toLocaleDateString('en-US')}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => {
                            setSelectedMessage(msg);
                            if (!msg.isRead) handleToggleRead(msg);
                          }}
                          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white"
                          title="View Message"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeletingId(msg._id || msg.id)}
                          className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400"
                          title="Delete Message"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Message Reader Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#14151B] border border-white/10 rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-lg font-bold text-white">Contact Message</h3>
              <button
                onClick={() => setSelectedMessage(null)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <p className="text-sm font-bold text-white">{selectedMessage.name}</p>
              <p className="text-gray-300">Phone: {selectedMessage.phone}</p>
              <p className="text-gray-300">Email: {selectedMessage.email}</p>
              <p className="text-gray-400 pt-1">
                Received: {new Date(selectedMessage.createdAt).toLocaleString()}
              </p>
            </div>

            <div className="p-4 bg-[#0D0E12] border border-white/5 rounded-xl text-sm text-gray-200 leading-relaxed max-h-48 overflow-y-auto">
              {selectedMessage.message}
            </div>

            <div className="flex justify-between items-center pt-3 border-t border-white/10">
              <button
                onClick={() => handleToggleRead(selectedMessage)}
                className="text-xs text-[#D4AF37] hover:underline"
              >
                {selectedMessage.isRead ? 'Mark as Unread' : 'Mark as Read'}
              </button>
              <button
                onClick={() => setSelectedMessage(null)}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <ConfirmDialog
        isOpen={!!deletingId}
        title="Delete Message"
        message="Are you sure you want to delete this contact message?"
        confirmText="Delete"
        isLoading={isDeleting}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeletingId(null)}
      />
    </div>
  );
};
