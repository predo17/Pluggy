import { ChevronRight, Mail } from "lucide-react";
import { useRemoveItem } from "../../hooks/useRemoveItem";
import { useNotifications } from "../../hooks/useNotifications";

export function Notification() {
    const { notifications, loadingNotifications } = useNotifications();
    const { removeItem } = useRemoveItem(useNotifications().removeNotification);

    return (
        <div className="space-y-4 overflow-y-auto flex-1 pr-2">
            {loadingNotifications ? (
                <div className="w-full h-full flex items-center justify-center">
                    <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
                        <p>Carregando notificações...</p>
                    </div>
                </div>) : (

                notifications.length === 0 ? (
                    <div className="w-full h-full flex items-center justify-center">
                        <div className="flex flex-col items-center text-gray-500">
                            <img src="imgsnull/no-notifications.png" alt="Notificações" className="w-40 h-40 mb-4" />
                            <p>Nenhuma notificação disponível</p>
                        </div>
                    </div>
                ) : (
                    notifications.map((n) => (
                        <div
                            key={n.id}
                            className="group p-4 rounded-xl bg-white border-l-4 border-blue-500 shadow-md hover:shadow-lg transition-all duration-300 hover:translate-x-1 relative"
                        >
                            {/* Indicador de status */}
                            <div className="absolute top-1/2 -left-2 w-4 h-4 rounded-full border-4 border-white bg-white "
                            >
                                <div className="w-2 h-2 rounded-full bg-gray-400 group-hover:bg-green-500 group-hover:animate-pulse" />
                            </div>

                            <div className="flex items-start gap-3">
                                {/* Ícone */}
                                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                                    <Mail className="w-4 h-4 text-blue-500" />
                                </div>

                                {/* Conteúdo */}
                                <div className="flex-1 min-w-0">
                                    {/* Header */}
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="font-bold text-gray-900 text-sm">{n.de}</span>
                                        <ChevronRight className="w-3 h-3 text-gray-500 shrink-0" />
                                        <span className="text-gray-600 text-sm truncate flex-1">{n.to}</span>
                                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                                            {n.date}
                                        </span>
                                    </div>

                                    {/* Mensagem */}
                                    <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line mb-3">
                                        {n.text}
                                    </p>

                                    <button
                                        onClick={() => removeItem(n.id, "notification")}
                                        className="text-red-500 hover:text-red-600 text-xs font-medium transition-colors p-1 cursor-pointer ">
                                        Excluir
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )
            )}

        </div>
    )
}
