import { useEffect, useMemo, useState } from "react";
import { useLoading } from "../context/LoadingContext";

interface bagType {
    id: number;
    from: string,
    userName: string;
    userEmail: string;
    date: string;
    items: [
        {
            img: string;
            name: string;
            flash_description: string;
            quantity: number;
        },];
    methodOfBuy: string;
    message: string;
    totalPrice: number;
}

export function useOrders() {
    const [orders, setOrders] = useState<bagType[]>([]);
    const [loading, setLoading] = useState(true);

    const { startLoading, stopLoading } = useLoading();

    // Carrega as compras
    useEffect(() => {
        fetch("http://localhost:3001/api/preview")
            .then(res => res.json())
            .then(data => {
                setOrders(Array.isArray(data.confirmation) ? data.confirmation : []);
            })
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    //  Remove confirmação
    async function removeConfirmation(id: number) {
        startLoading();
        // persiste visualmente
        localStorage.setItem(
            "notifications_removed",
            JSON.stringify([id])
        );
        
        // simula delay (UX)
        await new Promise(res => setTimeout(res, 1000));
        
        // remove da UI imediatamente
        setOrders(prev => prev.filter(o => o.id !== id));

        stopLoading();

        // backend
        await fetch(`http://localhost:3001/api/preview/${id}`, {
            method: "DELETE",
        });
    }

    // Contador de mensagens 
    const ordersCount = useMemo(() => orders.length, [orders]);

    return {
        orders,
        ordersCount,
        loading,
        removeConfirmation,
    };
}
