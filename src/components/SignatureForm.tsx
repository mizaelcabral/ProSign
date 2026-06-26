import React from 'react';
import { SignatureData } from '../types';

interface InputFieldProps {
  label: string;
  field: keyof SignatureData;
  data: SignatureData;
  onChange: (field: keyof SignatureData, value: string) => void;
  placeholder?: string;
}

const InputField = ({ label, field, data, onChange, placeholder }: InputFieldProps) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      type="text"
      value={data[field]}
      onChange={(e) => onChange(field, e.target.value)}
      placeholder={placeholder}
      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
    />
  </div>
);

interface SignatureFormProps {
  data: SignatureData;
  onChange: (field: keyof SignatureData, value: string) => void;
}

export function SignatureForm({ data, onChange }: SignatureFormProps) {
  const [activeTab, setActiveTab] = React.useState<'general' | 'contact' | 'images' | 'social' | 'design'>('general');

  const tabs = [
    { id: 'general', label: 'Geral' },
    { id: 'contact', label: 'Contato' },
    { id: 'images', label: 'Imagens' },
    { id: 'social', label: 'Social' },
    { id: 'design', label: 'Design' },
  ] as const;

  return (
    <div className="flex flex-col h-full bg-white border-r border-gray-200">
      <div className="flex border-b border-gray-200 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-3 px-4 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
              activeTab === tab.id
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        {activeTab === 'general' && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <InputField data={data} onChange={onChange} label="Nome Completo" field="name" placeholder="Ex: João da Silva" />
            <InputField data={data} onChange={onChange} label="Cargo" field="title" placeholder="Ex: Diretor de Vendas" />
            <InputField data={data} onChange={onChange} label="Empresa" field="company" placeholder="Ex: TechCorp" />
            <InputField data={data} onChange={onChange} label="Departamento" field="department" placeholder="Ex: Vendas" />
            <InputField data={data} onChange={onChange} label="Email" field="email" placeholder="joao@exemplo.com" />
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <InputField data={data} onChange={onChange} label="Telefone Fixo" field="phone" placeholder="+55 11 3333-4444" />
            <InputField data={data} onChange={onChange} label="Celular" field="mobile" placeholder="+55 11 99999-8888" />
            <InputField data={data} onChange={onChange} label="Website" field="website" placeholder="www.exemplo.com" />
            <InputField data={data} onChange={onChange} label="Endereço" field="address" placeholder="Av. Paulista, 1000 - SP" />
          </div>
        )}

        {activeTab === 'images' && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">URL da Foto de Perfil</label>
              <input
                type="text"
                value={data.profilePic}
                onChange={(e) => onChange('profilePic', e.target.value)}
                placeholder="https://..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="mt-1 text-xs text-gray-500">Cole a URL de uma imagem hospedada publicamente.</p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">URL do Logotipo</label>
              <input
                type="text"
                value={data.logoUrl}
                onChange={(e) => onChange('logoUrl', e.target.value)}
                placeholder="https://..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 rounded-md border border-blue-100 text-sm text-blue-800">
              <h4 className="font-semibold mb-2">Como adicionar minhas imagens?</h4>
              <p className="mb-2">Para que a imagem apareça corretamente na assinatura, ela precisa estar hospedada na internet.</p>
              <ol className="list-decimal pl-4 space-y-1">
                <li>Acesse o site <a href="https://imguser.free.nf/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-700 font-medium">https://imguser.free.nf/</a></li>
                <li>Faça o upload da sua foto ou logotipo</li>
                <li>Copie o link direto da imagem gerado pelo site</li>
                <li>Cole o link nos campos acima</li>
              </ol>
            </div>
          </div>
        )}

        {activeTab === 'social' && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <InputField data={data} onChange={onChange} label="LinkedIn URL" field="linkedin" placeholder="linkedin.com/in/usuario" />
            <InputField data={data} onChange={onChange} label="Instagram URL" field="instagram" placeholder="instagram.com/usuario" />
            <InputField data={data} onChange={onChange} label="Twitter URL" field="twitter" placeholder="twitter.com/usuario" />
            <InputField data={data} onChange={onChange} label="Facebook URL" field="facebook" placeholder="facebook.com/usuario" />
            <InputField data={data} onChange={onChange} label="YouTube URL" field="youtube" placeholder="youtube.com/c/canal" />
          </div>
        )}

        {activeTab === 'design' && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Cor do Tema</label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={data.themeColor}
                  onChange={(e) => onChange('themeColor', e.target.value)}
                  className="w-10 h-10 p-0 border-0 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={data.themeColor}
                  onChange={(e) => onChange('themeColor', e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md font-mono text-sm"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Fonte da Assinatura</label>
              <select
                value={data.fontFamily}
                onChange={(e) => onChange('fontFamily', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Arial, Helvetica, sans-serif">Arial</option>
                <option value="'Times New Roman', Times, serif">Times New Roman</option>
                <option value="'Courier New', Courier, monospace">Courier New</option>
                <option value="Georgia, serif">Georgia</option>
                <option value="'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif">Trebuchet MS</option>
                <option value="Verdana, Geneva, sans-serif">Verdana</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
