import { createElement, createContext, useContext, useState, useEffect } from "react";

interface NotificationType {
    id: number;
    de: string;
    to: string;
    text: string;
    date: string;
}

interface NotificationContextType {
    notifications: NotificationType[];
    removeNotification: (id: number) => void;
    totalCount: number;
    loadingNotifications: boolean
}

const NotificationContext = createContext<NotificationContextType | null>(null);

export function NotificationsProvider({ children }: { children: React.ReactNode }) {
    const [notifications, setNotifications] = useState<NotificationType[]>([]);
    const [loadingNotifications, setLoadingNotifications] = useState(true);

    // Carregar notificações do backend
    useEffect(() => {
        async function fetchNotifications() {

            setLoadingNotifications(true);
            try {
                const res = await fetch("http://localhost:3001/api/notifications");
                const data = await res.json();
                setNotifications(data);
            } catch (error) {
                console.error("Erro ao carregar notificações:", error);
            } finally {
                setLoadingNotifications(false);
            }
        }
        fetchNotifications();
    }, []);

    // Remover uma notificação
    async function removeNotification(id: number) {
        // remove imediatamente da UI
        setNotifications(prev => prev.filter(n => n.id !== id));

        // atualiza localStorage para persistir a exclusão visual
        localStorage.setItem("notifications_removed", JSON.stringify([id]));

        // agora remove no backend
        await fetch(`http://localhost:3001/api/notifications/${id}`, {
            method: "DELETE"
        });
    }

    // criar automaticamente o count da notificação
    const totalCount = notifications.length;

    return createElement(
        NotificationContext.Provider,
        { value: { notifications, removeNotification, totalCount, loadingNotifications } },
        children
    );
}

export function useNotifications() {
    const ctx = useContext(NotificationContext);
    if (!ctx) throw new Error("useNotifications deve ser usado dentro de NotificationsProvider");
    return ctx;
}
