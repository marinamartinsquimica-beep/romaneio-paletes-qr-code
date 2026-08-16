(function (globalScope) {
    "use strict";

    function dataISOValida(valor) {
        const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(valor);
        if (!match) return false;

        const ano = Number(match[1]);
        const mes = Number(match[2]);
        const dia = Number(match[3]);
        const data = new Date(ano, mes - 1, dia);

        return data.getFullYear() === ano &&
            data.getMonth() === mes - 1 &&
            data.getDate() === dia;
    }

    function parseQrPalete(texto) {
        if (typeof texto !== "string" || !texto.trim()) {
            throw new Error("QR vazio.");
        }

        const campos = {};
        const partes = texto.split(";");

        for (const parte of partes) {
            const separador = parte.indexOf("=");
            if (separador <= 0) throw new Error("Formato de QR inválido.");

            const chave = parte.slice(0, separador).trim().toUpperCase();
            const valor = parte.slice(separador + 1).trim();

            if (!chave || !valor || campos[chave] !== undefined) {
                throw new Error("Formato de QR inválido.");
            }
            campos[chave] = valor;
        }

        const chavesPermitidas = ["SKU", "LOTE", "POSTURA"];
        if (Object.keys(campos).some((chave) => !chavesPermitidas.includes(chave)) ||
            chavesPermitidas.some((chave) => !campos[chave])) {
            throw new Error("O QR deve conter SKU, LOTE e POSTURA.");
        }

        if (!/^[A-Za-z0-9._\/-]{1,50}$/.test(campos.SKU)) {
            throw new Error("SKU inválido.");
        }

        const loteMatch = /^L?(\d{2}\.\d{2})$/i.exec(campos.LOTE);
        if (!loteMatch) throw new Error("Lote inválido. Use o formato 25.06.");

        if (!dataISOValida(campos.POSTURA)) {
            throw new Error("Data de postura inválida. Use AAAA-MM-DD.");
        }

        const [ano, mes, dia] = campos.POSTURA.split("-");
        return {
            sku: campos.SKU,
            lote: `L${loteMatch[1]}`,
            postura: `.${dia}.${mes}.${ano.slice(-2)}`,
            posturaISO: campos.POSTURA
        };
    }

    globalScope.qrPaleteParser = { parse: parseQrPalete };

    if (typeof module !== "undefined" && module.exports) {
        module.exports = { parseQrPalete };
    }
})(typeof window !== "undefined" ? window : globalThis);
