import { jsPDF } from "jspdf";

interface BagType {
    from: string;
    userName: string;
    userEmail: string;
    date: string;
    items: {
        name: string;
        quantity: number;
    }[];
    methodOfBuy: string;
    message: string;
    totalPrice: number;
}

export function generatePurchasePDF(bag: BagType) {
    const doc = new jsPDF();

    let y = 15;

    // Cabeçalho
    doc.setFontSize(18);
    doc.text(bag.from, 14, y);
    y += 10;

    doc.setFontSize(12);
    doc.text(`Data da compra: ${bag.date}`, 14, y);
    y += 8;

    doc.text(`Cliente: ${bag.userName}`, 14, y);
    y += 6;

    doc.text(`Email: ${bag.userEmail}`, 14, y);
    y += 10;

    // Produtos
    doc.setFontSize(14);
    doc.text("Produtos comprados:", 14, y);
    y += 8;

    doc.setFontSize(12);
    bag.items.forEach((item, index) => {
        doc.text(
            `${index + 1}. ${item.name} — Unidade(s): ${item.quantity}`,
            16,
            y
        );
        y += 6;
    });

    y += 6;

    // Pagamento
    doc.text(`Método de pagamento: ${bag.methodOfBuy}`, 14, y);
    y += 8;

    doc.text(`Total pago: ${bag.totalPrice}`, 14, y);
    y += 10;

    // Mensagem final
    doc.setFontSize(11);
    doc.text(bag.message, 14, y);

    // Download
    doc.save(`compra-${bag.date}.pdf`);
}
