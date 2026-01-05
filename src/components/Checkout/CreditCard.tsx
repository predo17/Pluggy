import { Calendar, CreditCard, Lock, Shield } from "lucide-react";
import { useEffect, useState } from "react";

interface CreditCardProps {
    totalValue: number;
    onValidityChange: (isValid: boolean) => void;
}
export default function CreditCardComponent({ totalValue, onValidityChange }: CreditCardProps) {
    const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
    const [selectedInstallment, setSelectedInstallment] = useState<number | null>(null);

    const [saveCardChecked, setSaveCardChecked] = useState(false);

    const [method] = useState([
        { name: "Visa", icon: "VISA", color: "from-blue-600 to-blue-800" },
        { name: "Mastercard", icon: "MC", color: "from-red-500 to-orange-500" },
        { name: "Elo", icon: "ELO", color: "from-purple-600 to-purple-800" },
        { name: "American Express", icon: "AMEX", color: "from-green-600 to-blue-500" },
    ]);

    const [installments] = useState<Array<number>>([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
    const [expiryError, setExpiryError] = useState("");

    const [cardData, setCardData] = useState({
        number: "",
        name: "",
        expiry: "",
        cvv: "",
        installments: selectedInstallment,
        brand: selectedBrand,
    });

    const isCardValid = () => {
        return (
            cardData.number?.replace(/\s/g, "").length === 16 &&
            cardData.name?.length > 3 &&
            cardData.expiry?.length === 5 &&
            cardData.cvv?.length >= 3 &&
            cardData.installments !== null &&
            cardData.brand !== null
        );
    };

    const handleSaveCardToggle = (checked: boolean) => {
        setSaveCardChecked(checked);

        if (checked) {

            localStorage.setItem("savedCardData", JSON.stringify(cardData));
        } else {

            localStorage.removeItem("savedCardData");
        }
    };

    useEffect(() => {
        const saved = localStorage.getItem("savedCardData");
        if (saved) {
            setCardData(JSON.parse(saved));
            setSaveCardChecked(true);
        }
    }, []);

    useEffect(() => {
        onValidityChange(isCardValid());
    }, [cardData, selectedBrand, selectedInstallment]);

    return (
        <div className="space-y-6 sm:px-2">
            {/* Header do Cartão */}
            <div className="text-center mb-6">
                <div className="inline-flex items-center gap-3 bg-linear-to-r from-blue-50 to-indigo-50 
                    p-4 rounded-2xl mb-4">
                    <CreditCard className="w-8 h-8 text-blue-600" />
                    <h3 className="text-2xl font-bold text-gray-900">Cartão de Crédito</h3>
                </div>
                <p className="text-gray-600">
                    Parcele em até <span className="font-bold text-blue-600">12x sem juros</span>
                </p>
            </div>

            {/* Bandeiras Aceitas */}
            <div className={`bg-gray-50 rounded-xl p-5 mb-6 ${saveCardChecked ? "hidden" : ""}`}>
                <p className="text-sm text-gray-600 mb-3 text-center">Bandeiras aceitas:</p>
                <div className="flex items-center justify-center gap-4">
                    {method.map((m) => (
                        <button
                            key={m.name}
                            onClick={() => {
                                setSelectedBrand(m.name);
                                setCardData({ ...cardData, brand: m.name });
                            }}
                            className={`relative group rounded-lg transition-all cursor-pointer `}
                        >
                            <div
                                className={`
                    w-14 h-10 bg-linear-to-r ${m.color} rounded-lg flex items-center
                    justify-center shadow-sm transition-transform duration-200
                    group-hover:scale-110
                    ${selectedBrand === m.name ? "ring-2 ring-blue-600 scale-110" : ""}
                `}
                            >
                                <span className="text-xs font-bold text-white">
                                    {m.icon}
                                </span>
                            </div>

                            {/* Tooltip */}
                            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 
                bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 
                group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                {m.name}
                            </div>
                        </button>
                    ))}
                </div>

            </div>

            {/* Formulário do Cartão */}
            <div className="space-y-5">
                {/* Preview do Cartão */}
                <div className="relative">
                    <div className="bg-linear-to-r from-blue-700 to-indigo-800 rounded-xl p-6 
                      text-white shadow-lg mb-6">
                        <div className="flex justify-between items-start mb-8">
                            <div>
                                <p className="text-sm text-blue-200 mb-1">Nome no Cartão</p>
                                <p className="font-medium text-lg truncate">
                                    {cardData.name || 'NOME AQUI'}
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm text-blue-200 mb-1">Validade</p>
                                <p className="font-medium text-lg">
                                    {cardData.expiry || 'MM/AA'}
                                </p>
                            </div>
                        </div>
                        <div>
                            <p className="text-sm text-blue-200 mb-1">Número do Cartão</p>
                            <p className="font-mono text-2xl tracking-wider">
                                {cardData.number
                                    ? cardData.number.replace(/(\d{4})/g, '$1 ').trim()
                                    : '•••• •••• •••• ••••'
                                }
                            </p>
                        </div>
                        <div className="flex justify-between items-center mt-6">
                            <div>
                                <p className="text-sm text-blue-200">Bandeira</p>
                                <p className="font-medium">
                                    {cardData.brand ? cardData.brand.toUpperCase() : "Selecione"}
                                </p>
                            </div>

                            <div className="w-12 h-8 bg-linear-to-r from-yellow-400 to-orange-400 
                          rounded flex items-center justify-center">
                                <span className="text-xs font-bold">{cardData.cvv ? cardData.cvv.replace(/(\d{4})/g, '$1 ') : 'CVV'}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Campos do Formulário */}
                <div className={`grid sm:grid-cols-2 gap-4 ${saveCardChecked ? "hidden" : ""}`}>
                    {/* Número do Cartão */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Número do Cartão
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                maxLength={16}
                                placeholder="0000 0000 0000 0000"
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 
                       focus:ring-blue-500 focus:border-blue-500 transition-all"
                                onChange={(e) => {
                                    const value = e.target.value.replace(/\D/g, '');
                                    const formatted = value.replace(/(\d{4})(?=\d)/g, '$1 ');
                                    setCardData({ ...cardData, number: formatted });
                                }}
                            />
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                <CreditCard className="w-5 h-5 text-gray-400" />
                            </div>
                        </div>
                    </div>

                    {/* Nome no Cartão */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Nome Impresso no Cartão
                        </label>
                        <input
                            type="text"
                            maxLength={23}
                            placeholder="Como aparece no cartão"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 
                     focus:ring-blue-500 focus:border-blue-500 transition-all"
                            onChange={(e) => setCardData({ ...cardData, name: e.target.value.toUpperCase() })}
                        />
                    </div>

                    {/* Validade e CVV */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Validade (MM/AA)
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                maxLength={5}
                                placeholder="MM/AA"
                                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 
                transition-all
                ${expiryError ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"}`}
                                onChange={(e) => {
                                    let value = e.target.value.replace(/\D/g, ""); // Apenas números
                                    let error = ""; // Mensagem de erro

                                    const currentYear = new Date().getFullYear() % 100; // Últimos 2 dígitos do ano atual

                                    // --- 🔒 Validação do primeiro dígito (0 ou 1)
                                    if (value.length >= 1) {
                                        if (!["0", "1"].includes(value[0])) {
                                            error = "O primeiro dígito deve ser 0 ou 1.";
                                        }
                                    }

                                    // --- 🔒 Validação do segundo dígito
                                    if (!error && value.length >= 2) {
                                        const first = value[0];
                                        const second = value[1];

                                        if (first === "1" && !["0", "1", "2"].includes(second)) {
                                            error = "Se o mês começa com 1, o segundo dígito só pode ser 0, 1 ou 2.";
                                        }

                                        if (first === "0" && second === "0") {
                                            error = "O mês 00 não existe.";
                                        }

                                        const month = Number(value.slice(0, 2));
                                        if (month < 1 || month > 12) {
                                            error = "Insira um mês válido entre 01 e 12.";
                                        }
                                    }

                                    // --- 🔒 Validação do ano (AA)
                                    if (!error && value.length >= 4) {
                                        const enteredYear = Number(value.slice(2, 4));

                                        if (enteredYear < currentYear) {
                                            error = "O cartão está vencido.";
                                        }
                                    }

                                    // Se existe erro → mostrar e não formatar
                                    if (error) {
                                        setExpiryError(error);
                                        setCardData({ ...cardData, expiry: value }); // mantém o usuário digitando
                                        return;
                                    }

                                    // --- 🔵 Sem erros → formata MM/AA
                                    if (value.length >= 3) {
                                        value = value.slice(0, 2) + "/" + value.slice(2, 4);
                                    }

                                    setExpiryError(""); // limpa erro
                                    setCardData({ ...cardData, expiry: value });
                                }}
                            />

                            <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 
                      w-5 h-5 text-gray-400" />
                        </div>

                        {/* MENSAGEM DE ERRO */}
                        <p className={`text-xs mt-1 ${expiryError ? "text-red-500" : "text-gray-500"}`}>
                            {expiryError || "Insira valores válidos"}
                        </p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Código de Segurança (CVV)
                        </label>
                        <div className="relative">
                            <input
                                type="password"
                                maxLength={4}
                                placeholder="123"
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 
                       focus:ring-blue-500 focus:border-blue-500 transition-all"
                                onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })}
                            />
                            <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 
                           w-5 h-5 text-gray-400" />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                            Os 3 ou 4 dígitos
                        </p>
                    </div>

                    {/* Parcelamento */}
                    <div className="sm:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Parcelamento
                        </label>
                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                            {installments.map((installment) => (
                                <button
                                    key={installment}
                                    onClick={() => {
                                        setSelectedInstallment(installment);
                                        setCardData({ ...cardData, installments: installment });
                                    }}
                                    type="button"
                                    className={`
                py-3 rounded-lg border transition-all text-center
                ${selectedInstallment === installment
                                            ? "bg-blue-50 border-blue-600 text-blue-700 font-bold shadow-sm"
                                            : "border-gray-300 hover:border-blue-400 hover:bg-blue-50"
                                        }
            `}
                                >
                                    <div className="font-medium">{installment}x</div>
                                    <div className="text-sm text-gray-600 max-w-30 truncate px-1">
                                        {(totalValue / installment).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                    </div>
                                </button>
                            ))}
                        </div>

                    </div>
                </div>

                {/* Informações de Segurança */}
                <div className="bg-linear-to-r from-green-50 to-emerald-50 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                        <Shield className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                        <div>
                            <p className="font-medium text-gray-900">Pagamento 100% Seguro</p>
                            <p className="text-sm text-gray-600 mt-1">
                                Seus dados são criptografados e protegidos. Nunca armazenamos informações
                                completas do seu cartão em nossos servidores.
                            </p>
                        </div>
                    </div>
                </div>

            </div>
            {/* Salvar Cartão para Futuras Compras */}
            <div className="flex items-center gap-3 mb-2">
                <input
                    type="checkbox"
                    id="saveCard"
                    checked={saveCardChecked}
                    onChange={(e) => {
                        if (!isCardValid()) {
                            alert("Preencha todos os campos antes de salvar o cartão.");
                            return;
                        }
                        handleSaveCardToggle(e.target.checked);
                    }}
                    disabled={!isCardValid()}   // bloqueia até tudo estar preenchido
                    className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500
             disabled:opacity-40 disabled:cursor-not-allowed"
                />


                <label htmlFor="saveCard" className="text-sm text-gray-700 cursor-pointer">
                    Salvar este cartão para compras futuras
                </label>

                <Lock className="w-4 h-4 text-gray-400 ml-auto" />
            </div>

        </div>
    )
}
