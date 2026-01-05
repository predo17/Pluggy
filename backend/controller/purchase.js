const { saveConfirmation } = require("../services/confirmation");
const { sendPurchaseEmail } = require("../services/email");
const { updateStock } = require("../services/stock");

async function confirmPurchase(req, res) {
    const {
        userId,
        userName,
        userEmail,
        items,
        totalPrice,
        methodOfBuy,
        date
    } = req.body;

    const confirmation = {
        id: Date.now(),
        from: "Pluggy Support",
        date,
        userId,
        userName,
        userEmail,
        items,
        totalPrice,
        methodOfBuy,
        message: "Obrigado por comprar na Pluggy!"
    };

    // responde primeiro
    res.status(200).json({
        success: true,
        confirmation
    });

    // envia email
    sendPurchaseEmail({
        userName,
        userEmail,
        items,
        totalPrice,
        date
    }).catch(err =>
        console.log("Erro ao enviar email:", err)
    );
    
    saveConfirmation(confirmation);
    updateStock(items);
}

module.exports = { confirmPurchase };
