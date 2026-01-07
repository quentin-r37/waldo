import React, { useState } from 'react';
import { MessageSquare, Send, Loader } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

export const ChatSupport: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'bot',
      content: 'Bonjour! Je suis votre assistant support. Comment puis-je vous aider aujourd\'hui?',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const suggestedQuestions = [
    'Comment réserver un bureau?',
    'Où est mon collègue Jean?',
    'Combien de parkings disponibles?',
    'Comment fonctionne Magic Teammates?',
    'Je n\'arrive pas à réserver',
  ];

  const handleSendMessage = (text?: string) => {
    const messageText = text || input;
    if (!messageText.trim()) return;

    // Add user message
    const newMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: messageText,
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'bot',
        content: getBotResponse(messageText),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsLoading(false);
    }, 1000);
  };

  const getBotResponse = (query: string): string => {
    const responses: { [key: string]: string } = {
      réserver: 'Pour réserver un bureau, rendez-vous dans l\'onglet "Réservations" et sélectionnez la date et l\'heure souhaitées. Vous verrez tous les bureaux disponibles sur la carte interactive.',
      collègue: 'Vous pouvez trouver vos collègues dans l\'onglet "Magic Teammates". Tapez leur nom et vous verrez leur localisation en temps réel si ils sont au bureau.',
      parking: 'Il y a actuellement 28 places disponibles au parking. Vous pouvez les réserver dans l\'onglet "Réservations" en sélectionnant "Parking".',
      magic: 'Magic Teammates est notre IA intégrée qui vous permet de localiser vos collègues au bureau, de voir leur statut (présent/télétravail) et de les contacter directement.',
      problème: 'Je suis désolé d\'apprendre que vous rencontrez des difficultés. Pourriez-vous me donner plus de détails? Je peux vous aider ou vous escalader vers notre équipe support.',
    };

    const lowercaseQuery = query.toLowerCase();
    for (const [key, response] of Object.entries(responses)) {
      if (lowercaseQuery.includes(key)) {
        return response;
      }
    }

    return 'Je vous remercie pour votre question. Je n\'ai pas trouvé une réponse directe. Pourriez-vous être plus spécifique ou contacter l\'équipe support via un email à support@workspace.hub?';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-slate-700 flex items-center gap-3">
          <MessageSquare size={32} />
          Support
        </h1>
        <p className="text-slate-600">Chatbot IA pour répondre à vos questions</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chat Area */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 flex flex-col" style={{ height: '600px' }}>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-4 py-3 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-orange-600 text-white rounded-br-none'
                      : 'bg-slate-100 text-slate-700 rounded-bl-none'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className={`text-xs mt-1 ${message.role === 'user' ? 'text-orange-100' : 'text-slate-500'}`}>
                    {message.timestamp.toLocaleTimeString('fr-FR', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-100 text-slate-700 px-4 py-3 rounded-lg rounded-bl-none flex items-center gap-2">
                  <Loader size={16} className="animate-spin" />
                  <span className="text-sm">Le bot écrit...</span>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="border-t border-slate-200 p-4">
            <div className="flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Posez votre question..."
                className="flex-1 px-4 py-2 rounded-lg border border-slate-300 bg-white text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-600"
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={!input.trim() || isLoading}
                className="bg-orange-600 hover:bg-orange-700 disabled:bg-slate-300 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center gap-2"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Suggested Questions */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4 h-fit">
          <h2 className="font-bold text-slate-700">Questions fréquentes</h2>
          <div className="space-y-2">
            {suggestedQuestions.map((question, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(question)}
                className="w-full text-left px-4 py-3 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 text-sm font-medium transition-colors border border-slate-200 hover:border-slate-300"
              >
                {question}
              </button>
            ))}
          </div>

          <div className="border-t border-slate-200 pt-4">
            <button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-sm">
              Contacter un agent
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};