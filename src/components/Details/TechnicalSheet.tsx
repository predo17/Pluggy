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
    // 🔧 Função genérica para renderizar seções
    const renderSecao = (titulo: string, dados: Record<string, any>) => {
        if (!dados) return null;

        return (

            <div className="rounded p-4 transition border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-700 mb-3">{titulo}</h3>

                <ul className="space-y-2 text-gray-800 rounded overflow-hidden">
                    {Object.entries(dados).map(([key, value], i) => (
                        <li
                            key={i}
                            className="flex justify-between p-3 text-sm"
                            style={{ backgroundColor: i % 2 === 0 ? "#e5e7ed" : "#ffffff" }}
                        >
                            <span className="font-semibold ">
                                {formatLabel(key)}
                            </span>

                            <span className="text-right">
                                {formatValue(value)}
                            </span>

                        </li>
                    ))}
                </ul>
            </div>
        );
    };
    // 📌 PC
    if (info.category === "pc") {
        return (
            <section className="grid md:grid-cols-2 gap-3">
                {renderSecao("Sistema", info.sistema)}
                {renderSecao("Processador", info.especificacoes_tecnicas.processador)}
                {renderSecao("Placa de Vídeo", info.especificacoes_tecnicas.placa_de_video)}
                {renderSecao("Memória RAM", info.especificacoes_tecnicas.memoria_ram)}

                {renderSecao(
                    "Armazenamento Primário",
                    info.especificacoes_tecnicas.armazenamento.primario
                )}

                {renderSecao(
                    "Armazenamento Secundário",
                    info.especificacoes_tecnicas.armazenamento.secundario
                )}

                {renderSecao("Placa Mãe", info.especificacoes_tecnicas.placa_mae)}
                {renderSecao("Fonte", info.especificacoes_tecnicas.fonte)}

                {renderSecao(
                    "Refrigeração",
                    info.especificacoes_tecnicas.refrigeracao.detalhes
                )}

                {renderSecao("Gabinete", info.especificacoes_tecnicas.gabinete)}
            </section>
        );
    }
    // 📌 Laptop
    if (info.category === "laptop") {
        return (
            <section className="grid md:grid-cols-2 gap-3">
                {renderSecao("Sistema", info.sistema)}
                {renderSecao("Processador", info.especificacoes_tecnicas.processador)}
                {renderSecao("Placa de Vídeo", info.especificacoes_tecnicas.placa_de_video)}
                {renderSecao("Display", info.especificacoes_tecnicas.display)}
                {renderSecao("Memória RAM", info.especificacoes_tecnicas.memoria_ram)}

                {renderSecao("Armazenamento", info.especificacoes_tecnicas.armazenamento
                )}
                {renderSecao("Placa Mãe", info.especificacoes_tecnicas.placa_mae)}
                {renderSecao("Fonte", info.especificacoes_tecnicas.fonte)}

                {renderSecao("Refrigeração", info.especificacoes_tecnicas?.refrigeracao
                )}
                {renderSecao("Teclado", info.especificacoes_tecnicas?.teclado
                )}
                {renderSecao("Bateria", info.especificacoes_tecnicas?.bateria
                )}
            </section>
        );
    }
    // 📌 CONTROLLER
    if (info.category === "controller") {
        const spec = info.especificacoes_tecnicas;

        return (
            <section className="grid md:grid-cols-2 gap-3">
                {renderSecao("Conexão", spec.conexao)}
                {renderSecao("Bateria", spec.bateria)}
                {renderSecao("Duração", spec.duracao)}
                {renderSecao("Vibração", spec.vibracao)}
                {renderSecao("Compatibilidade", spec.compatibilidade)}
                {renderSecao("Peso", spec.peso)}

            </section>
        );
    }

    // 📌 HEADPHONES
    if (info.category === "headphones") {
        const spec = info.especificacoes_tecnicas;

        return (
            <section className="grid md:grid-cols-2 gap-3">
                {renderSecao("Drivers", spec.drivers)}
                {renderSecao("Cancelamento de Ruido", spec.cancelamento_ruido)}
                {renderSecao("Bateria", spec.bateria)}
                {renderSecao("Conectividade", spec.conectividade)}
                {renderSecao("Microfone", spec.microfone)}
                {renderSecao("Resistencia à Água", spec.resistencia_agua)}
                {renderSecao("Peso", spec.peso)}
            </section>
        );
    }

    // 📌 SMARTPHONE
    if (info.category === "smartphone") {
        const spec = info.especificacoes_tecnicas;

        return (
            <section className="grid md:grid-cols-2 gap-3">
                {renderSecao("Sistema", spec.sistema)}
                {renderSecao("Processador", spec.processador)}
                {renderSecao("Tela", spec.tela)}
                {renderSecao("Memória", {
                    RAM: spec.ram_rom?.ram,
                    Armazenamento: spec.ram_rom?.armazenamento,
                    Expansão: spec.ram_rom?.expansao,
                })}
                {renderSecao("Câmeras", {
                    Principal: spec.camera.principal,
                    Frontal: spec.camera.frontal,
                    Recursos: spec.camera.recursos?.join(", "),
                })}
                {renderSecao("Bateria", {
                    Capacidade: spec.bateria.capacidade,
                    Carregamento: spec.bateria.carregamento,
                    "Duração Estimada": spec.bateria.duracao_estimada,
                })}
                {renderSecao("Conectividade", spec.conectividade)}
                {renderSecao("Chipe SIM", spec.chip_sim)}
                {renderSecao("Resistência à Água", spec.resistencia_agua)}
            </section>
        );
    }


    return <p className="text-gray-900">Ficha técnica não disponível.</p>;
}
