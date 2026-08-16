(function (globalScope) {
    function parseDataBR(dataBR) {
        if (!dataBR) return null;

        const partes = String(dataBR).trim().split("/");
        if (partes.length !== 3) return null;

        const [dia, mes, ano] = partes.map((parte) => Number(parte));
        if (!Number.isInteger(dia) || !Number.isInteger(mes) || !Number.isInteger(ano)) {
            return null;
        }

        const data = new Date(ano, mes - 1, dia);
        if (Number.isNaN(data.getTime())) return null;

        return data;
    }

    function dataBRParaExcel(dataBR) {
        const data = parseDataBR(dataBR);
        if (!data) return null;

        const excelEpoch = new Date(1899, 11, 30);
        const diffEmDias = Math.round((data - excelEpoch) / (1000 * 60 * 60 * 24));
        return diffEmDias;
    }

    function montarDadosParaExcel(tabela) {
        const cabecalho = Array.from(tabela.querySelectorAll("thead th"))
            .slice(0, -1)
            .map((th) => th.innerText.trim());
        const dados = Array.from(tabela.querySelectorAll("tbody tr")).map((linha) =>
            Array.from(linha.cells)
                .slice(0, -1)
                .map((celula) => celula.innerText.trim())
        );

        return { cabecalho, dados };
    }

    globalScope.exportUtils = {
        parseDataBR,
        dataBRParaExcel,
        montarDadosParaExcel
    };

    if (typeof module !== "undefined" && module.exports) {
        module.exports = {
            parseDataBR,
            dataBRParaExcel,
            montarDadosParaExcel
        };
    }
})(typeof window !== "undefined" ? window : globalThis);
