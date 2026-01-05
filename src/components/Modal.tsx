import { Clock, CreditCard, FileText, HelpCircle, Lock, PackageCheckIcon, Shield, X } from "lucide-react";

interface ModalProps {
    isOpen: boolean;
    type: "envio" | "pagamento" | null;
    loading: boolean;
    onClose: () => void;
}

export default function Modal({
    isOpen,
    type,
    loading,
    onClose
}: ModalProps) {

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
            onClick={onClose}
        >
            <div
                className="bg-white w-11/12 max-w-md rounded-xl p-6"
                onClick={(e) => e.stopPropagation()}
            >
                {loading ? (
                    <div className="flex justify-center p-4">
                        <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
                    </div>
                ) : (
                    <>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-bold">
                                {type === "envio"
                                    ? "Instruções de Retirada"
                                    : "Formas de Pagamento"}
                            </h2>

                            <button onClick={onClose} className="cursor-pointer">
                                <X />
                            </button>
                        </div>

                        {type === "envio" && (
                            <div className="space-y-4">
                                <p className="text-[15px] text-gray-700 tracking-tight">
                                    Ao realizar uma compra, você receberá automaticamente um e-mail de confirmação contendo o link e os detalhes da compra será enviado a você.
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
                        {type === "pagamento" && (
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
                                                        {method.slice(0, 2).toUpperCase()}
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
    );
}
