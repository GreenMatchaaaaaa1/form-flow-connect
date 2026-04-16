import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Loader2, Sparkles, ChevronDown } from 'lucide-react';
import { useAgentChat, createConversation } from '@/lib/agent-chat';
import ReactMarkdown from 'react-markdown';
import { cn } from '@/lib/utils';

const AGENT_ID = '01KNTWN6ZA5V094BKKZD1C2Y24';

const SUGGESTIONS = [
  { label: 'Am I eligible?', prompt: 'What are the eligibility requirements for BSC 2026?' },
  { label: 'Prize pools', prompt: 'What are all the prize pools for BSC 2026?' },
  { label: 'Roster rules', prompt: 'Explain roster management and roster lock rules' },
  { label: 'Match format', prompt: 'How do matches work? Explain sets, games, and drafting' },
];

function ActiveChat({ conversationId }: { conversationId: string }) {
  const { sendMessage, messages, isConnected } = useAgentChat(AGENT_ID, conversationId);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Detect when agent finishes responding
  useEffect(() => {
    if (isSending) {
      const lastMsg = messages[messages.length - 1];
      if (lastMsg && lastMsg.role === 'assistant' && lastMsg.content.length > 0) {
        const hasCompleteMessage = !lastMsg.content.endsWith('▊');
        if (hasCompleteMessage) {
          // Small delay to make sure streaming is done
          const timer = setTimeout(() => setIsSending(false), 500);
          return () => clearTimeout(timer);
        }
      }
    }
  }, [messages, isSending]);

  const handleSend = async (text?: string) => {
    const msg = text || input.trim();
    if (!msg || isSending) return;
    setInput('');
    setIsSending(true);
    try {
      await sendMessage(msg);
    } catch {
      setIsSending(false);
    }
  };

  const noMessages = messages.length === 0;

  return (
    <div className="flex flex-col h-full">
      {/* Messages area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Greeting */}
        <div className="flex gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div className="bg-muted/50 rounded-2xl rounded-tl-md p-3 max-w-[85%]">
            <p className="text-sm text-foreground">
              ⚔️ Hey Brawler! I'm your BSC 2026 Guide. Ask me anything about rules, schedules, prizing, or eligibility!
            </p>
          </div>
        </div>

        {/* Suggestion chips */}
        {noMessages && (
          <div className="flex flex-wrap gap-2 pl-11">
            {SUGGESTIONS.map(s => (
              <button
                key={s.label}
                onClick={() => handleSend(s.prompt)}
                className="text-xs px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary hover:bg-primary/10 transition-colors"
              >
                {s.label}
              </button>
            ))}
          </div>
        )}

        {/* Messages */}
        {messages.map(msg => {
          const isUser = msg.role === 'user';
          return (
            <div key={msg.id} className={cn('flex gap-3', isUser && 'justify-end')}>
              {!isUser && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
              )}
              <div className={cn(
                'rounded-2xl p-3 max-w-[85%] text-sm',
                isUser
                  ? 'bg-primary text-primary-foreground rounded-tr-md'
                  : 'bg-muted/50 text-foreground rounded-tl-md'
              )}>
                {isUser ? (
                  <p>{msg.content}</p>
                ) : (
                  <div className="prose prose-sm prose-invert max-w-none [&>p]:mb-2 [&>ul]:mb-2 [&>ol]:mb-2">
                    <ReactMarkdown>{msg.content || '...'}</ReactMarkdown>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Typing indicator */}
        {isSending && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div className="bg-muted/50 rounded-2xl rounded-tl-md p-3">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce [animation-delay:0ms]" />
                <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce [animation-delay:150ms]" />
                <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce [animation-delay:300ms]" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-border p-3">
        <form
          onSubmit={e => { e.preventDefault(); handleSend(); }}
          className="flex items-center gap-2"
        >
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Ask about BSC rules..."
            disabled={isSending}
            className="flex-1 bg-muted/50 border border-border rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/30 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!input.trim() || isSending}
            className="p-2.5 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            {isSending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function ChatPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const handleOpen = async () => {
    setIsOpen(true);
    if (!conversationId) {
      setIsCreating(true);
      try {
        const result = await createConversation(AGENT_ID);
        setConversationId(result.conversationId);
      } catch (err) {
        console.error('Failed to create conversation:', err);
      } finally {
        setIsCreating(false);
      }
    }
  };

  return (
    <>
      {/* Floating button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={handleOpen}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 flex items-center justify-center transition-shadow"
          >
            <MessageCircle className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 w-[380px] h-[520px] max-h-[80vh] max-w-[calc(100vw_-_2rem)] rounded-2xl border border-border bg-background shadow-2xl shadow-black/40 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border bg-card/80">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                  <Sparkles className="w-4.5 h-4.5 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">BSC 2026 Guide</h3>
                  <p className="text-xs text-muted-foreground">AI Rulebook Expert</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ChevronDown className="w-5 h-5" />
              </button>
            </div>

            {/* Chat body */}
            {isCreating ? (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <Loader2 className="w-6 h-6 animate-spin text-primary mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Starting chat...</p>
                </div>
              </div>
            ) : conversationId ? (
              <ActiveChat conversationId={conversationId} />
            ) : (
              <div className="flex-1 flex items-center justify-center p-4">
                <p className="text-sm text-muted-foreground text-center">Unable to start chat. Please try again.</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
