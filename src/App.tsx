import React, { useState, useRef } from 'react';
import { defaultSignature, SignatureData } from './types';
import { SignatureForm } from './components/SignatureForm';
import { SignaturePreview } from './components/SignaturePreview';
import { Check, Copy, Code, LayoutTemplate } from 'lucide-react';

export default function App() {
  const [data, setData] = useState<SignatureData>(defaultSignature);
  const [copiedRendered, setCopiedRendered] = useState(false);
  const [copiedSource, setCopiedSource] = useState(false);
  
  const signatureRef = useRef<HTMLDivElement>(null);

  const handleChange = (field: keyof SignatureData, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCopyRendered = async () => {
    if (!signatureRef.current) return;
    
    const html = signatureRef.current.innerHTML;
    const text = signatureRef.current.innerText;

    try {
      // Modern approach for copying rich text (works well for pasting into Gmail, Apple Mail, Outlook Web)
      const htmlBlob = new Blob([html], { type: 'text/html' });
      const textBlob = new Blob([text], { type: 'text/plain' });
      
      await navigator.clipboard.write([
        new ClipboardItem({
          'text/html': htmlBlob,
          'text/plain': textBlob
        })
      ]);
      
      setCopiedRendered(true);
      setTimeout(() => setCopiedRendered(false), 2000);
    } catch (err) {
      console.warn('Clipboard API failed, falling back to legacy execCommand', err);
      // Fallback for older browsers
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(signatureRef.current);
      selection?.removeAllRanges();
      selection?.addRange(range);
      try {
        document.execCommand('copy');
        setCopiedRendered(true);
        setTimeout(() => setCopiedRendered(false), 2000);
      } catch (fallbackErr) {
        console.error('Failed to copy', fallbackErr);
      }
      selection?.removeAllRanges();
    }
  };

  const handleCopySource = async () => {
    if (!signatureRef.current) return;
    const html = signatureRef.current.innerHTML;
    try {
      await navigator.clipboard.writeText(html);
      setCopiedSource(true);
      setTimeout(() => setCopiedSource(false), 2000);
    } catch (err) {
      console.error('Failed to copy source', err);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 text-gray-900 font-sans overflow-hidden">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shrink-0 z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center text-white">
            <LayoutTemplate size={20} />
          </div>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">ProSign</h1>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleCopySource}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            {copiedSource ? <Check size={16} className="text-green-500" /> : <Code size={16} />}
            {copiedSource ? 'Código Copiado!' : 'Copiar Código HTML'}
          </button>
          <button
            onClick={handleCopyRendered}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 transition-colors shadow-sm"
          >
            {copiedRendered ? <Check size={16} /> : <Copy size={16} />}
            {copiedRendered ? 'Assinatura Copiada!' : 'Copiar Assinatura'}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Editor */}
        <aside className="w-full max-w-md h-full shrink-0 shadow-lg z-10">
          <SignatureForm data={data} onChange={handleChange} />
        </aside>

        {/* Right Content - Preview */}
        <section className="flex-1 overflow-y-auto p-8 lg:p-12 bg-gray-50 flex flex-col items-center">
          <div className="w-full max-w-3xl flex flex-col gap-6">
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-gray-100 border-b border-gray-200 px-4 py-3 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="ml-4 text-xs font-medium text-gray-500">Nova Mensagem</div>
              </div>
              
              <div className="p-6 md:p-10 min-h-[400px]">
                <div className="text-gray-400 text-sm mb-12">
                  <p>Olá,</p>
                  <br />
                  <p>Segue abaixo a minha nova assinatura de e-mail gerada pelo ProSign.</p>
                  <br />
                  <p>Atenciosamente,</p>
                </div>
                
                {/* The actual signature container that gets copied */}
                <div id="signature-node" ref={signatureRef}>
                  <SignaturePreview data={data} />
                </div>
              </div>
            </div>

            <div className="text-center text-sm text-gray-500 max-w-lg mx-auto">
              Clique em <strong>Copiar Assinatura</strong> para copiá-la para a sua área de transferência, depois cole diretamente nas configurações do seu cliente de e-mail (Gmail, Outlook, Apple Mail).
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
