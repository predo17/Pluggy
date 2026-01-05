import { CreditCard as CardIcon, QrCode, Smartphone as PhoneIcon, Receipt, Check } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "../../context/CartContext";
import CreditCardComponent from "./CreditCard";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

export default function Checkout() {
  const [activeTab, setActiveTab] = useState('pix');
  const [processing, setProcessing] = useState(false);
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);
  const [isCardValid, setIsCardValid] = useState(false);


  const navigate = useNavigate();

  const { cart, cartCount, removeFromCart, toggleHideItem } = useCart();
  const { user } = useAuth();

  const value = cart
    .filter(item => !item.hidden)
    .map(item => ({
      id: item.id,
      property: item?.property,
      img: item.img[0],
      name: item.name,
      flash_description: item.flash_description,
      quantity: item.quantity
    }));

  async function saveOrder(finalTotal: number) {
    if (!user) return;

    const body = {
      userId: user.id,
      userName: user.name,
      userEmail: user.email,
      items: value,
      totalPrice: finalTotal.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }),
      methodOfBuy: activeTab,
      date: new Date().toLocaleString().split(",")[0],
    };
    const response = await fetch("http://localhost:3001/api/confirm-purchase", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });


    if (!response.ok) {
      throw new Error("Erro ao confirmar compra");
    }

    const data = await response.json();

    if (data.success) {
      setPurchaseSuccess(true);
    }
  }

  useEffect(() => {
    if (purchaseSuccess) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [purchaseSuccess]);


  async function handlePayment() {
    setProcessing(true);

    const finalTotal = getFinalTotal();

    if (cart === undefined || cart.length === 0 || cart.filter(item => !item.hidden).length === 0) {
      setProcessing(false);
      return;
    }

    await new Promise(res => setTimeout(res, 3000));

    saveOrder(finalTotal);

    setPurchaseSuccess(true);

    // limpa o carrinho
    cart
      .filter(item => !item.hidden)
      .forEach(item => removeFromCart(item.id, item.property,));

    setProcessing(false);
  }

  function handlePaymentInfo() {
    if (activeTab === "pix") return handlePayment();
    if (activeTab === "card") {
      if (!isCardValid) {
        toast.error("Preencha todos os dados do cartão corretamente.")
        return;
      }

      return handlePayment();
    };

    if (activeTab === "boleto") return handlePayment();
  }
  function getFinalTotal() {
    const totalValue = cart
      .filter(item => !item.hidden)
      .reduce((acc, item) => acc + item.price * item.quantity, 0);

    if (activeTab === "pix") {
      const discount = totalValue * 0.10;
      return totalValue - discount;
    }

    return totalValue;
  }


  const totalValuee = cart
    .filter(item => !item.hidden)
    .reduce((acc, item) => acc + item.price * item.quantity, 0);

  const discount = totalValuee * 0.10;
  const totalWithDiscount = totalValuee - discount;

  const totalFormatted = totalWithDiscount.toLocaleString('pt-BR', {
    style: 'currency', currency: 'BRL'
  });
  const totalValueFormatted = totalValuee.toLocaleString('pt-BR', {
    style: 'currency', currency: 'BRL'
  });

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50 py-8 sm:rounded-2xl">
      <div className="max-w-7xl mx-auto sm:px-4">

        {purchaseSuccess && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Overlay com blur */}
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            />

            {/* Modal principal com animação */}
            <div className="relative bg-linear-to-br from-white to-gray-50 rounded-2xl 
                   shadow-2xl w-full max-w-md animate-scaleIn overflow-hidden">

              {/* Decoração de canto */}
              <div className="absolute top-0 right-0 w-24 h-24">
                <div className="absolute top-0 right-0 w-24 h-24 bg-linear-to-br 
                      from-cyan-400 to-blue-600 rounded-full transform 
                      translate-x-12 -translate-y-12" />
              </div>

              <div className="p-8 relative z-10">
                {/* Ícone animado */}
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <div className="w-20 h-20 bg-linear-to-r from-cyan-400 to-blue-500 
                          rounded-full flex items-center justify-center shadow-lg
                          animate-pulse-slow">
                      <Check className="w-10 h-10 text-white" />
                    </div>
                    {/* Anéis decorativos */}
                    <div className="absolute inset-0 border-4 border-sky-300 rounded-full 
                          animate-ping opacity-20" />
                  </div>
                </div>

                {/* Texto principal */}
                <div className="text-center mb-6">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    Compra Confirmada!
                  </h2>
                  <p className="text-gray-600">
                    Seus produtos já estão disponíveis para acesso
                  </p>
                </div>


                <button
                  onClick={() => { navigate("/dashboard", { state: { goTo: "orders" }, replace: true }); window.location.reload(); }}
                  className="block w-full bg-linear-to-r from-blue-500 to-cyan-600 
                     hover:from-blue-600 hover:to-cyan-700 text-white font-semibold 
                     py-3 rounded-xl text-center transition-all transform hover:scale-[1.02] 
                     shadow-lg hover:shadow-xl cursor-pointer"
                >

                  Acessar Meus Produtos
                </button>


                <p className="text-center text-xs text-gray-500 mt-4">
                  Um e-mail de confirmação foi enviado para você
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8">

          {/* Preview dos Produtos */}
          <div className="lg:w-3xl lg:max-h-[800px]">
            <div className="bg-white sm:rounded-2xl shadow-xl p-6 sticky top-20 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Seus Produtos</h2>
                <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                  {`${cartCount - cart.filter(item => item.hidden).length} itens`}
                </span>
              </div>

              {/* Container de produtos com scroll */}
              <div className="space-y-4 max-h-[380px] overflow-y-auto pr-2">
                {cart.map((item) => (
                  <div key={item.id} className="relative">
                    <div
                      className={`group bg-white rounded-xl p-4 border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all duration-300 ease-in-out ${item.hidden ? 'opacity-40 pointer-events-none' : ''}`}
                    >
                      <div className="flex items-start gap-4 transition-opacity duration-300 ease-in-out ">
                        {/* Imagem */}
                        <img
                          src={Array.isArray(item.img) ? item.img[0] : item.img}
                          alt={item.name}
                          className="w-16 h-16 rounded-lg object-contain"
                        />

                        {/* Informações */}
                        <div className="flex-1 overflow-hidden">
                          <div className="flex items-start justify-between">
                            <div className="min-w-0">
                              <h3 className="font-semibold text-gray-900 truncate">{item.name}</h3>
                              <p className="text-gray-500 text-sm mt-1">
                                Unitário:  {item.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                              </p>
                            </div>
                            <span className="hidden sm:block text-lg font-bold text-gray-900">
                              {(item.price * item.quantity).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                            </span>
                          </div>

                          <span className="text-gray-500 text-sm">Qtd: {item.quantity}</span>

                        </div>
                      </div>
                    </div>
                    <div className="absolute bottom-4 right-4">
                      <button
                        onClick={() => toggleHideItem(item.id)}
                        className=" text-red-500 hover:text-red-600 text-sm font-medium cursor-pointer">
                        {item.hidden ? "Desfazer" : "Remover"}
                      </button>
                    </div>
                  </div>
                ))}
                {cart.length === 0 && (
                  <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
                    <img src="/imgsnull/carrinho-vazio.png" alt="Carrinho Vazio" className="w-45 h-40 mb-4" />
                    <p className="text-center">Carrinho de compras vazio, não há o que comprar.</p>
                  </div>
                )}
              </div>

              {/* Total */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="space-y-3">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>
                      {totalValueFormatted}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Desconto no PIX</span>
                    <span className="text-emerald-500">{totalFormatted}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-gray-900 pt-3 border-t">
                    <span>Total</span>
                    <span className="text-2xl">
                      {totalValueFormatted}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Área de Pagamento com Tabs */}
          <div className="lg:w-lg lg:max-h-[800px]">
            <div className="bg-white rounded-xl shadow-xl sm:overflow-hidden h-full">

              {/* Header do Checkout */}
              <div className="bg-linear-to-r from-blue-600 to-indigo-600 p-6 text-white">
                <h1 className="text-2xl font-bold">Finalizar Compra</h1>
                <p className="text-blue-100">Último passo para acessar seus produtos</p>
              </div>

              {/* Tabs de Pagamento */}
              <div className="border-b border-gray-200">
                <div className="flex">
                  {[
                    { id: 'pix', icon: <QrCode className="w-5 h-5" />, label: 'PIX' },
                    { id: 'card', icon: <CardIcon className="w-5 h-5" />, label: 'Cartão' },
                    { id: 'boleto', icon: <Receipt className="w-5 h-5" />, label: 'Boleto' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-1 flex items-center justify-center gap-2 py-4 font-medium transition-colors cursor-pointer
                        ${activeTab === tab.id
                          ? 'text-blue-600 border-b-2 border-blue-600'
                          : 'text-gray-500 hover:text-gray-700'
                        }`}
                    >
                      {tab.icon}
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Conteúdo das Tabs */}
              <div className=" max-[480px]:px-1 max-[480px]:py-6 sm:p-6">
                {activeTab === 'pix' && (
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="inline-block p-4 bg-gray-100 rounded-xl mb-4">
                        <PhoneIcon className="w-12 h-12 text-emerald-500" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">
                        PIX com Desconto
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Pagamento instantâneo com <span className="font-bold text-emerald-500">10% OFF</span>
                      </p>
                      <div className="bg-gray-50 rounded-xl p-4 text-center">
                        <div className="text-sm text-gray-500">Valor com desconto</div>
                        <div className="text-4xl font-bold text-gray-900 mt-2">{totalFormatted}</div>
                      </div>
                    </div>
                  </div>
                )}
                {activeTab === 'card' && (
                  <div className="max-h-80 overflow-y-auto">
                    <CreditCardComponent
                      totalValue={totalValuee}
                      onValidityChange={setIsCardValid} />
                  </div>
                )}

                {activeTab === 'boleto' && (
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="inline-block p-4 bg-gray-100 rounded-xl mb-4">
                        <Receipt className="w-12 h-12 text-emerald-500" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">
                        Boleto Bancário
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Pague em qualquer agência ou internet banking
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Área de Ação */}
              <div className="bg-gray-50 p-4 sm:p-6 border-t border-gray-200">
                <button
                  onClick={() => handlePaymentInfo()}
                  className="w-full bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 
                                   hover:to-indigo-700 text-white font-bold py-3 px-8 mb-4 rounded-xl 
                                   transition-all shadow-lg hover:shadow-xl cursor-pointer">
                  {processing ? "Processando..." : "Confirmar Pagamento"}
                </button>

                {/* Benefícios em Accordion */}
                <p className="text-center text-gray-500 text-xs mt-1 tracking-tight">
                  Ao confirmar, você concorda com os nossos Termos de Uso
                </p>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

