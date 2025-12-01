import { useEffect, useState } from "react";
import { Clock, CreditCard, FileText, HelpCircle, Lock, Mail, PackageCheckIcon, Shield, Truck, UserCheck2, X } from "lucide-react";
import LinkWithLoading from "../LinkWithLoading";

export default function HomepageHighlights() {

    // CONTROLA SE O MODAL ESTÁ ABERTO
    const [modalOpen, setModalOpen] = useState(false);

    // QUAL MODAL FOI CLICADO
    const [modalType, setModalType] = useState<"envio" | "pagamento" | null>(null);

    // LOADING ANTES DE EXIBIR CONTEÚDO DO MODAL
    const [loadingModal, setLoadingModal] = useState(false);

    // BLOQUEAR SCROLL QUANDO O MODAL ABRIR
    useEffect(() => {
        if (modalOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
    }, [modalOpen]);

    function openModal(type: "envio" | "pagamento") {
        setModalType(type);
        setLoadingModal(true);
        setModalOpen(true);

        // Simula carregamento de dados
        setTimeout(() => {
            setLoadingModal(false);
        }, 1000); // 1s de carregamento
    }

    function closeModal() {
        setModalOpen(false);
        setModalType(null);
    }

    return (
        <div className="max-w-7xl mx-auto mt-8 px-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">

                {/* Área do Cliente */}
                <LinkWithLoading to="/profile"
                    className="bg-gray-50 rounded-xl p-5 shadow-sm hover:shadow-md transition-all z-10">
                    <div className="block">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                                <UserCheck2 className="w-6 h-6 text-blue-600" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-gray-900 font-semibold text-base">Área do Cliente</h3>
                                <p className="text-blue-600 text-[13px] mt-1">Acesse suas informações e histórico</p>
                            </div>
                        </div>
                    </div>
                </LinkWithLoading>

                {/* Envio */}
                <button
                    onClick={() => openModal("envio")}
                    className="bg-gray-50 rounded-xl p-5 shadow-sm hover:shadow-md transition-all text-left"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                            <Truck className="w-6 h-6 text-green-600" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-gray-900 font-semibold text-base">Forma de Envio</h3>
                            <p className="text-green-600 text-[13px] mt-1">Ver forma de retirada dos produtos</p>
                        </div>
                    </div>
                </button>

                {/* Pagamento */}
                <button
                    onClick={() => openModal("pagamento")}
                    className="bg-gray-50 rounded-xl p-5 shadow-sm hover:shadow-md transition-all text-left"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                            <CreditCard className="w-6 h-6 text-purple-600" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-gray-900 font-semibold text-base">Pagamento</h3>
                            <p className="text-purple-600 text-[13px] mt-1">Ver forma de pagamento</p>
                        </div>
                    </div>
                </button>

                {/* E-mail */}
                <LinkWithLoading to="/contact"
                    className="bg-gray-50 rounded-xl p-5 shadow-sm hover:shadow-md transition-all z-10">
                    <div className="block">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                                <Mail className="w-6 h-6 text-red-600" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-gray-900 font-semibold text-base">E-mail</h3>
                                <p className="text-red-600 text-[13px] mt-1">Entre em contato conosco</p>
                            </div>
                        </div>
                    </div>
                </LinkWithLoading>

            </div>

            {/* MODAL */}
            {modalOpen && (
                <div
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-999"
                    onClick={closeModal}
                >
                    <div
                        className="bg-white w-11/12 max-w-md rounded-xl p-6 shadow-lg animate-fadeIn max-h-[90vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* LOADING */}
                        {loadingModal ? (
                            <div className="p-4">
                                <div className="w-8 h-8 mx-auto border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
                            </div>
                        ) : (
                            <>
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-bold text-gray-900">
                                        {modalType === "envio" ? "Instruções de Retirada" : "Formas de Pagamento"}
                                    </h2>
                                    <button
                                        onClick={closeModal}
                                        className="p-1 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
                                    >
                                        <X className="w-6 h-6 text-gray-600" />
                                    </button>
                                </div>

                                {modalType === "envio" && (
                                    <div className="space-y-4">
                                        <p className="text-gray-700 tracking-tight">
                                            Ao realizar uma compra, você receberá automaticamente um link para download assim que o pagamento for confirmado.
                                            Um e-mail de confirmação contendo o link e os detalhes da compra será enviado a você.
                                        </p>
                                        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                                            <h3 className="flex items-center gap-2 font-semibold text-blue-800 mb-2">
                                                <PackageCheckIcon />Entrega Imediata
                                            </h3>
                                            <p className="text-sm text-blue-700">
                                                O acesso ao produto é liberado automaticamente após a confirmação do pagamento.
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {modalType === "pagamento" && (
                                    <div className="space-y-6">
                                        {/* Métodos Principais */}
                                        <div>
                                            <h3 className="font-semibold text-gray-900 mb-3">Escolha sua forma de pagamento:</h3>

                                            {/* Cartões de Crédito */}
                                            <div className="mb-4">
                                                <div className="flex items-center gap-2 mb-3">
                                                    <CreditCard className="w-5 h-5 text-gray-600" />
                                                    <h4 className="font-medium text-gray-800">Cartão de Crédito</h4>
                                                </div>
                                                <div className="flex gap-3 mb-3">
                                                    {["visa", "mastercard", "amex", "elo"].map((method) => (
                                                        <div
                                                            key={method}
                                                            className="w-10 h-7 bg-gray-100 rounded flex items-center justify-center border border-gray-200"
                                                            title={method.charAt(0).toUpperCase() + method.slice(1)}
                                                        >
                                                            <span className="text-xs font-bold text-gray-600">
                                                                {method === "pix" ? "PIX" : method.slice(0, 2).toUpperCase()}
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                                <p className="text-sm text-gray-600">
                                                    Parcele em até <span className="font-semibold">12x</span> com juros ou à vista sem acréscimo.
                                                </p>
                                            </div>

                                            {/* PIX */}
                                            <div className="mb-4 p-4 bg-green-50 border border-green-100 rounded-lg">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                                                        <span className="text-white font-bold text-sm">PIX</span>
                                                    </div>
                                                    <span className="ml-auto bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded">
                                                        -10% OFF
                                                    </span>
                                                </div>
                                                <p className="text-sm text-gray-700 mb-2">
                                                    <span className="font-semibold">Pagamento instantâneo</span> com 10% de desconto.
                                                </p>
                                                <p className="text-xs text-gray-600">
                                                    Chave PIX: CNPJ • Confirmação em até 5 minutos
                                                </p>
                                            </div>

                                            {/* Boleto Bancário */}
                                            <div className="mb-4">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <FileText className="w-5 h-5 text-gray-600" />
                                                    <h4 className="font-medium text-gray-800">Boleto Bancário</h4>
                                                </div>
                                                <p className="text-sm text-gray-700 mb-1">
                                                    Vencimento em 3 dias úteis.
                                                </p>
                                                <p className="text-xs text-gray-600">
                                                    Liberação do produto após compensação (1-2 dias úteis).
                                                </p>
                                            </div>
                                        </div>

                                        {/* Informações Importantes */}
                                        <div className="pt-4 border-t border-gray-200">
                                            <h4 className="font-medium text-gray-800 mb-3">Informações importantes:</h4>
                                            <ul className="space-y-2 text-sm text-gray-600">
                                                <li className="flex items-start gap-2">
                                                    <Shield className="w-4 h-4 text-green-600 mt-0.5" />
                                                    <span>Ambiente 100% seguro com criptografia SSL 256-bit</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <Lock className="w-4 h-4 text-blue-600 mt-0.5" />
                                                    <span>Seus dados são protegidos e não compartilhados</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <Clock className="w-4 h-4 text-amber-600 mt-0.5" />
                                                    <span>Pagamentos por boleto podem levar até 2 dias úteis para confirmar</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <HelpCircle className="w-4 h-4 text-gray-500 mt-0.5" />
                                                    <span>Problemas com pagamento? Entre em contato com nosso suporte</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
