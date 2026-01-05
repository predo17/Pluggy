import { useEffect, useState } from "react";
import { CreditCard, Mail, Truck, UserCheck2 } from "lucide-react";
import LinkWithLoading from "../LinkWithLoading";
import { useNavigate } from "react-router-dom";
import { useLoading } from "../../context/LoadingContext";
import Modal from "../Modal";

export default function HomepageHighlights() {
    const navigate = useNavigate();
    const { startLoading, stopLoading } = useLoading();

    const [modalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState<"envio" | "pagamento" | null>(null);
    const [loadingModal, setLoadingModal] = useState(false);


    async function handleClick() {
        startLoading();

        await new Promise(res => setTimeout(res, 1000));

        navigate("/dashboard", { state: { goTo: "profile" } });

        stopLoading();

    }

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

        setTimeout(() => {
            setLoadingModal(false);
        }, 1000);
    }

    function closeModal() {
        setModalOpen(false);
        setModalType(null);
    }

    return (
        <div className="max-w-7xl mx-auto px-2 md:px-6 lg:px-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {/* Área do Cliente */}
                <button
                    onClick={handleClick}
                    className="group bg-gray-50 rounded-xl p-5 shadow-sm hover:shadow-md  border-transparent focus-visible:outline-blue-500 focus-visible:outline-offset-2 focus-visible:text-blue-600 transition-colors duration-200 cursor-pointer ">
                    <div className="flex xl:items-center gap-4">
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                            <UserCheck2 className="w-6 h-6" />
                        </div>
                        <div className="flex-1 text-left">
                            <h3 className="text-gray-900 font-semibold text-base transition-colors duration-300 ease-in-out group-hover:text-sky-500">Área do Cliente</h3>
                            <p className="text-gray-600 text-[13px] mt-1">Acesse suas informações e histórico</p>
                        </div>
                    </div>

                </button>

                {/* Envio */}
                <button
                    onClick={() => openModal("envio")}
                    className="group bg-gray-50 rounded-xl p-5 shadow-sm hover:shadow-md  border-transparent focus-visible:outline-blue-500 focus-visible:outline-offset-2 focus-visible:text-blue-600 transition-colors duration-200 text-left cursor-pointer"
                >
                    <div className="flex xl:items-center gap-4">
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                            <Truck className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-gray-900 font-semibold text-base transition-colors duration-300 ease-in-out group-hover:text-sky-500">Forma de Envio</h3>
                            <p className="text-gray-600 text-[13px] mt-1">Ver forma de retirada dos produtos</p>
                        </div>
                    </div>
                </button>

                {/* Pagamento */}
                <button
                    onClick={() => openModal("pagamento")}
                    className="group bg-gray-50 rounded-xl p-5 shadow-sm hover:shadow-md  border-transparent focus-visible:outline-blue-500 focus-visible:outline-offset-2 focus-visible:text-blue-600 transition-colors duration-200 text-left cursor-pointer"
                >
                    <div className="flex xl:items-center gap-4">
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                            <CreditCard className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-gray-900 font-semibold text-base transition-colors duration-300 ease-in-out group-hover:text-sky-500">Pagamento</h3>
                            <p className="text-gray-600 text-[13px] mt-1">Ver forma de pagamento</p>
                        </div>
                    </div>
                </button>

                {/* E-mail */}
                <LinkWithLoading to="/contact"
                    className="group bg-gray-50 rounded-xl p-5 shadow-sm hover:shadow-md  border-transparent focus-visible:outline-blue-500 focus-visible:outline-offset-2 focus-visible:text-blue-600 transition-colors duration-200">
                    <div className="flex xl:items-center gap-4">
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm xl:mt-2.5">
                            <Mail className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-gray-900 font-semibold text-base transition-colors duration-300 ease-in-out group-hover:text-sky-500">E-mail</h3>
                            <p className="text-gray-600 text-[13px] mt-1">Entre em contato conosco</p>
                        </div>
                    </div>
                </LinkWithLoading>

            </div>

            {/* MODAL */}
            <Modal
                isOpen={modalOpen}
                type={modalType}
                loading={loadingModal}
                onClose={closeModal}
            />
        </div>
    );
}
