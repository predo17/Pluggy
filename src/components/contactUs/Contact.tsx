import { Clock, Mail, MessagesSquare, Phone, Send } from "lucide-react";
import { useContact } from "../../hooks/useContact";
import { useRef, useState } from "react";

export default function Contact() {
  const form = useRef<HTMLFormElement>(null);
  const { phone, handleChange} = useContact();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [name, setName] = useState("");

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    const cleaned = value.replace(/[^A-Za-zÀ-ÿ\s]/g, "");
    setName(cleaned);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setEmailError("");

    // validação nome
    if (!name.trim()) {
      setEmailError("Digite seu nome.");
      return;
    }

    // validação email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("E-mail inválido!");
      setTimeout(() => setEmailError(""), 4000);
      return;
    }

    // loading
    setLoading(true);
    setTimeout(() => setLoading(false), 1200);

    console.log("Enviado com sucesso!", handleSubmit);
  }


  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-blue-50/50">
      {/* Hero */}
      <div className="relative bg-white py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-6xl font-bold mb-6 tracking-wide">Fique por Dentro das Novidades</h1>
          <p className="text-sm md:text-xl text-gray-600 md:max-w-3xl mx-auto tracking-wide">
            Receba em primeira mão nossos lançamentos, promoções exclusivas e dicas valiosas sobre produtos digitais.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Formulário */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-xl border border-gray-200 p-6 md:p-8">
              <div className="flex md:items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <span className="text-2xl text-blue-600">💬</span>
                </div>
                <div>
                  <h2 className="text-lg md:text-2xl font-bold text-gray-900 tracking-tight">Envie sua Mensagem</h2>
                  <p className="text-gray-600 ">Responderemos em até 24 horas</p>
                </div>
              </div>

              <form className="space-y-6" ref={form} onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Nome *</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl 
               focus:outline-none focus:ring-2 focus:ring-blue-500 
               focus:border-transparent transition-all duration-200"
                      placeholder="Seu nome completo"
                      required
                      value={name}
                      onChange={handleNameChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">E-mail *</label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl 
               focus:outline-none focus:ring-2 focus:ring-blue-500 
               focus:border-transparent transition-all duration-200"
                      placeholder="seu@email.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />

                    {emailError && (
                      <p className="text-red-600 text-sm">{emailError}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">WhatsApp *</label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="(86) 99999-9999"
                    required
                    value={phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Mensagem *</label>
                  <textarea
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                    placeholder="Como podemos ajudá-lo?"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-5 h-5" />
                  {loading ? "Enviando..." : "Enviar Mensagem"}
                </button>
              </form>
            </div>
          </div>

          {/* Sidebar com Imagem */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
              <div className="w-24 h-24 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <MessagesSquare className="w-10 h-10 fill-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Vamos Conversar!</h3>
              <p className="text-gray-600 leading-relaxed tracking-tight">
                Estamos à disposição para responder às suas perguntas ou avaliar suas sugestões sobre nossos produtos.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h4 className="font-bold text-gray-900 mb-4">Contato Rápido</h4>
              <div className="space-y-4">
                {[
                  { icon: Phone, label: "Telefone", value: "(86) 99999-9999" },
                  { icon: Mail, label: "E-mail", value: "contato@pluggy.com" },
                  { icon: Clock, label: "Horário de Atendimento", value: "24h" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-4">
                    <item.icon />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{item.label}</p>
                      <p className="text-sm text-gray-600">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // return (
  //   <div className="min-h-screen bg-gray-50">
  //     {/* Header */}
  //     <div className="bg-white py-20">
  //       <div className="max-w-lg mx-auto text-center px-4">
  //         <h1 className="text-3xl font-normal text-gray-900 mb-3">Entre em Contato</h1>
  //         <div className="w-16 h-0.5 bg-gray-300 mx-auto"></div>
  //       </div>
  //     </div>

  //     {/* Conteúdo Principal */}
  //     <div className="max-w-lg mx-auto px-4 -mt-12">
  //       <div className="bg-white rounded-none shadow-sm border border-gray-200">
  //         {/* Formulário */}
  //         <div className="p-8">
  //           <form className="space-y-6">
  //             <div className="space-y-1">
  //               <label className="text-sm text-gray-600">Nome</label>
  //               <input
  //                 type="text"
  //                 className="w-full px-0 py-3 border-0 border-b border-gray-200 focus:outline-none focus:border-gray-900 transition-colors duration-300 bg-transparent"
  //                 placeholder="Seu nome completo"
  //                 required
  //               />
  //             </div>

  //             <div className="space-y-1">
  //               <label className="text-sm text-gray-600">E-mail</label>
  //               <input
  //                 type="email"
  //                 className="w-full px-0 py-3 border-0 border-b border-gray-200 focus:outline-none focus:border-gray-900 transition-colors duration-300 bg-transparent"
  //                 placeholder="seu@email.com"
  //                 required
  //               />
  //             </div>

  //             <div className="space-y-1">
  //               <label className="text-sm text-gray-600">WhatsApp</label>
  //               <input
  //                 type="tel"
  //                 className="w-full px-0 py-3 border-0 border-b border-gray-200 focus:outline-none focus:border-gray-900 transition-colors duration-300 bg-transparent"
  //                 placeholder="(11) 99999-9999"
  //                 required
  //               />
  //             </div>

  //             <div className="space-y-1">
  //               <label className="text-sm text-gray-600">Mensagem</label>
  //               <textarea
  //                 rows={4}
  //                 className="w-full px-0 py-3 border-0 border-b border-gray-200 focus:outline-none focus:border-gray-900 transition-colors duration-300 bg-transparent resize-none"
  //                 placeholder="Como podemos ajudar?"
  //                 required
  //               ></textarea>
  //             </div>

  //             <button
  //               type="submit"
  //               className="w-full bg-blue-500 text-white py-4 font-normal hover:bg-blue-700 transition-colors duration-200 cursor-pointer"
  //             >
  //               Enviar Mensagem
  //             </button>
  //           </form>
  //         </div>

  //         {/* Footer do Form */}
  //         <div className="border-t border-gray-200 p-6 bg-gray-50">
  //           <div className="text-center text-sm text-gray-500 space-y-1">
  //             <p>contato@pluggy.com</p>
  //             <p>+55 (11) 99999-9999</p>
  //             <p>Atendimento: Segunda a domingo</p>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
}
