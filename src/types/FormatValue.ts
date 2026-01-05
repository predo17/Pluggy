const AUTO_ACCENT_MAP: Record<string, string> = {
    geracao: "Geração",
    potencia: "Potência",
    eficiencia: "Eficiência",
    iluminacao: "iluminação",
    liquido: "Líquido",
    configuracao: "Configuração",
    velocidade_leitura: "Velocidade de Leitura",
    velocidade_gravacao: "Velocidade de Gravação",
    cobertura_cores: "Cobertura de Cores",
    carregamento_rapido: "Carregamento Rápido",
    distribuicao: "Distribuição",
    observacao: "Observação",
    resolucao: "Resolução",
    cancelamento_ruido_voz: "Cancelamento de Ruido de Voz",
    frequencia_captacao: "Frequência de Captação",
    formato_gravacao: "Formato de Gravação",
    duracao_com_anc: "Duração com ANC",
    duracao_sem_anc: "Duração sem ANC",
    tempo_recarga_completa: "Tempo de Recarga Completa",
    atualizacoes_garantidas: "Atualizações Garantidas",
    carga_rapida: "Carga Rápida",
    duracao_estimada: "Duração Estimada",
    compatibility: "Compatibilidade",
    brilho_maximo: "Brilho Máximo",
    conexao: "Conexão",
    conexoes: "Conexões",
    ajuste_altura: "Ajuste de Altura",
    velocidade_dados: "Velocidade de Dados",
    compatibilidade: "Compatibilidade",
    fixacao: "Fixação",
    rotacao: "Rotação",
    instalacao: "Instalação",
    alimentacao: "Alimentação",
    certificacao: "Certificação",
    protecao: "Proteção",
    expansao: "Expansão",
    taxa_atualizacao: "Taxa de Atualização",
    camera_principal: "Câmera Principal",
    camera_frontal: "Câmera Frontal",
    resistencia: "Resistência",
};

// 📌 FORMATAÇÃO DA LABEL
export function formatLabel(key: string): string {
    const normKey = normalizeKey(key);
    //  Se existir no dicionário, retorna a versão acentuada
    if (AUTO_ACCENT_MAP[normKey]) {
        return AUTO_ACCENT_MAP[normKey];
    }   
    const normalized = key.toLowerCase().replace(/_/g, " ");
    // Caso contrário, apenas capitaliza corretamente
    return normalized.replace(/\b\w/g, (match) => match.toUpperCase());

}
function normalizeKey(key: string) {
    return key
        .normalize("NFD")                    // separa acentos
        .replace(/[\u0300-\u036f]/g, "")     // remove acentos
        .replace(/[^a-z0-9_]/gi, "")         // remove caracteres estranhos
        .toLowerCase();                      // normaliza
}
// 📌 FORMATADOR GERAL — AGORA COMPLETO
export function formatValue(value: any): string {
    if (value === null || value === undefined) return "-";

    if (typeof value === "string" || typeof value === "number") {
        return String(value);
    }

    if (Array.isArray(value)) {
        return value.map(item => formatValue(item)).join(", ");
    }

    if (typeof value === "object") {
        return Object.entries(value)
            .map(([key, val]) => `${formatLabel(key)}: ${formatValue(val)}`)
            .join("\n");
    }

    return String(value);
}
