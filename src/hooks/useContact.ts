import { useState } from "react";

function formatPhone(value: string) {
    value = value.replace(/\D/g, "");
    if (value.length > 11) value = value.slice(0, 11);

    if (value.length <= 2) return `(${value}`;
    if (value.length <= 6) return `(${value.slice(0, 2)}) ${value.slice(2)}`;
    return `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
}

export function useContact() {
    const [phone, setPhone] = useState("");

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setPhone(formatPhone(e.target.value));
    }

    return { phone, setPhone, handleChange };
}
