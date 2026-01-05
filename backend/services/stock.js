const fs = require("fs");
const path = require("path");

function safeParse(filePath) {
    try {
        return JSON.parse(fs.readFileSync(filePath, "utf8"));
    } catch (err) {
        console.error("Erro ao ler/parsear:", filePath, err);
        return null;
    }
}

function writeJson(filePath, data) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
}

function updateStock(items) {
    const exclusivePath = path.join(__dirname, "..", "..", "src", "data", "exclusiveProducts.json");
    const productsPath = path.join(__dirname, "..", "..", "src", "data", "products.json");

    // Carrega dados
    const exclusiveData = safeParse(exclusivePath);
    const productsData = safeParse(productsPath);

    if (!exclusiveData || !productsData) return;

    let exclusiveChanged = false;
    let productsChanged = false;

    items.forEach((it) => {
        const qty = Number(it.quantity) || 0;
        if (qty <= 0) return;

        if (it.property === "exclusive") {
            const idx = exclusiveData.findIndex(p => p.id === it.id || p.name === it.name);
            if (idx >= 0) {
                const current = Number(exclusiveData[idx].quantity) || 0;
                exclusiveData[idx].quantity = Math.max(0, current - qty);
                exclusiveChanged = true;
            } else {
                console.warn("Produto exclusive não encontrado:", it);
            }
        } else {
            // products.json tem várias categorias (smartphones, templates, ebooks...)
            let found = false;
            for (const key of Object.keys(productsData)) {
                const arr = productsData[key];
                if (!Array.isArray(arr)) continue;
                const idx = arr.findIndex(p => p.id === it.id || p.name === it.name);
                if (idx >= 0) {
                    const current = Number(arr[idx].quantity) || 0;
                    arr[idx].quantity = Math.max(0, current - qty);
                    productsChanged = true;
                    found = true;
                    break;
                }
            }
            if (!found) console.warn("Produto não exclusivo não encontrado em products.json:", it);
        }
    });

    if (exclusiveChanged) writeJson(exclusivePath, exclusiveData);
    if (productsChanged) writeJson(productsPath, productsData);
}

module.exports = { updateStock };