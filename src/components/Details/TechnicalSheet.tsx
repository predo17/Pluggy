import { formatValue, formatLabel } from "../../types/FormatValue";
import type { Product } from "../../types/Product";

interface Props {
    product: Product;
}

export default function ProductFichaTecnica({ product }: Props) {
    const info = product.specs;

    if (!info) {
        return <p className="text-gray-500">Nenhuma informação disponível.</p>;
    }

    const SectionCard = ({ titulo, dados }: { titulo: string; dados?: Record<string, any> }) => {
        if (!dados) return null;
        return (
            <div className=" rounded p-4 transition border border-gray-200 mb-3">
                <h3 className="text-lg font-semibold text-gray-700 mb-3">{titulo}</h3>
                <ul className="space-y-2 text-gray-800 rounded overflow-hidden">
                    {Object.entries(dados).map(([key, value], i) => (
                        <li
                            key={i}
                            className="flex justify-between p-3 text-sm"
                            style={{ backgroundColor: i % 2 === 0 ? "#e5e7ed" : "#ffffff" }}
                        >
                            <span className="font-semibold ">{formatLabel(key)}</span>
                            <span className="text-right">{formatValue(value)}</span>
                        </li>
                    ))}
                </ul>
            </div>
        );
    };

    const getSections = (info: any): [string, any][] => {
        const e = info.especificacoes_tecnicas;

        switch (info?.category) {
            case "pc":
                return [
                    ["Sistema", info.sistema],
                    ["Processador", e?.processador],
                    ["Placa de Vídeo", e?.placa_de_video],
                    ["Memória RAM", e?.memoria_ram],
                    ["Armazenamento Primário", e?.armazenamento?.primario],
                    ["Armazenamento Secundário", e?.armazenamento?.secundario],
                    ["Placa Mãe", e?.placa_mae],
                    ["Fonte", e?.fonte],
                    ["Refrigeração", e?.refrigeracao?.detalhes],
                    ["Gabinete", e?.gabinete],
                ];

            case "laptop":
                return [
                    ["Sistema", info.sistema],
                    ["Processador", e?.processador],
                    ["Placa de Vídeo", e?.placa_de_video],
                    ["Display", e?.display],
                    ["Memória RAM", e?.memoria_ram],
                    ["Armazenamento", e?.armazenamento],
                    ["Placa Mãe", e?.placa_mae],
                    ["Fonte", e?.fonte],
                    ["Refrigeração", e?.refrigeracao],
                    ["Teclado", e?.teclado],
                    ["Bateria", e?.bateria],
                ];

            case "controller":
                return [
                    ["Conexão", e?.conexao],
                    ["Bateria", e?.bateria],
                    ["Duração", e?.duracao],
                    ["Vibração", e?.vibracao],
                    ["Compatibilidade", e?.compatibilidade],
                    ["Peso", e?.peso],
                ];

            case "headphones":
                return [
                    ["Drivers", e?.drivers],
                    ["Cancelamento de Ruido", e?.cancelamento_ruido],
                    ["Bateria", e?.bateria],
                    ["Conectividade", e?.conectividade],
                    ["Microfone", e?.microfone],
                    ["Resistência à Água", e?.resistencia_agua],
                    ["Peso", e?.peso],
                ];

            case "smartphone":
                return [
                    ["Sistema", e?.sistema],
                    ["Processador", e?.processador],
                    ["Tela", e?.tela],
                    [
                        "Memória",
                        {
                            RAM: e?.ram_rom?.ram,
                            Armazenamento: e?.ram_rom?.armazenamento,
                            Expansão: e?.ram_rom?.expansao,
                        },
                    ],
                    [
                        "Câmeras",
                        {
                            Principal: e?.camera?.principal,
                            Frontal: e?.camera?.frontal,
                            Recursos: e?.camera?.recursos?.join?.(", "),
                        },
                    ],
                    [
                        "Bateria",
                        {
                            Capacidade: e?.bateria?.capacidade,
                            Carregamento: e?.bateria?.carregamento,
                            duracao_estimada: e?.bateria?.duracao_estimada,
                        },
                    ],
                    ["Conectividade", e?.conectividade],
                    ["Chip SIM", e?.chip_sim],
                    ["Resistência à Água", e?.resistencia_agua],
                ];

            default:
                // fallback genérico para 'geral'
                const geral = (info as any)?.especificacoes_tecnicas?.geral;
                if (geral) return [["Geral", geral]];
                return [];
        }
    };

    const sections = getSections(info);

    return (
        <section className="relative max-w-7xl mx-auto">
            {/* Container para telas grandes */}
            <div className="hidden md:flex gap-2 lg:gap-4">
                {/* Primeira coluna - itens ímpares */}
                <div className="w-6/12 lg:w-1/2 lg:space-y-8">
                    {sections
                        .filter((_, index) => index % 2 === 0) // Índices pares (0, 2, 4...) = 1º, 3º, 5º itens
                        .map(([titulo, dados], i) => (
                            <SectionCard key={titulo + i} titulo={titulo} dados={dados} />
                        ))}
                </div>

                {/* Segunda coluna - itens pares */}
                <div className="w-6/12 lg:w-1/2 lg:space-y-8">
                    {sections
                        .filter((_, index) => index % 2 === 1) // Índices ímpares (1, 3, 5...) = 2º, 4º, 6º itens
                        .map(([titulo, dados], i) => (
                            <SectionCard key={titulo + i} titulo={titulo} dados={dados} />
                        ))}
                </div>
            </div>

            {/* Container para telas menores */}
            <div className="md:hidden space-y-6">
                {sections.map(([titulo, dados], i) => (
                    <SectionCard key={titulo + i} titulo={titulo} dados={dados} />
                ))}
            </div>
        </section>
    );
}