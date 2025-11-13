import { Cpu, HardDrive, MemoryStick, Monitor, Settings, ThermometerSun } from "lucide-react";


interface Informacoes {
    sistema: Sistema;
    especificacoes_tecnicas: EspecificacoesTecnicas;
    recursos_extras: string[];
    observacao_final: string;
}

interface Sistema {
    nome: string;
    geracao: string;
    lema: string;
    status: string;
}

interface EspecificacoesTecnicas {
    processador: Processador;
    placa_de_video: PlacaDeVideo;
    memoria_ram: MemoriaRam;
    armazenamento: Armazenamento;
    placa_mae: PlacaMae;
    fonte: Fonte;
    refrigeracao: Refrigeracao;
    gabinete: Gabinete;
}

interface Processador {
    modelo: string;
    nucleos: number;
    threads: number;
    clock_base: string;
    clock_turbo: string;
}

interface PlacaDeVideo {
    modelo: string;
    vram: string;
    clock: string;
    recursos: string[];
}

interface MemoriaRam {
    capacidade: string;
    tipo: string;
    velocidade: string;
    iluminacao: string;
}

interface Armazenamento {
    primario: {
        tipo: string;
        capacidade: string;
        velocidade_leitura: string;
        velocidade_gravacao: string;
    };
    secundario: {
        tipo: string;
        capacidade: string;
        observacao: string;
    };
}

interface PlacaMae {
    modelo: string;
    soquete: string;
    chipset: string;
    recursos: string[];
}

interface Fonte {
    modelo: string;
    potencia: string;
    eficiencia: string;
    recursos: string[];
}

interface Refrigeracao {
    sistema: string;
    detalhes: {
        radiadores: string;
        fans: string;
        liquido: string;
    };
}

interface Gabinete {
    modelo: string;
    tamanho: string;
    materiais: string[];
    iluminacao: string;
}

interface Props {
    product: any;
    informacoes: Informacoes[];
}

export default function ProductFichaTecnica({ product }: Props) {
    const info = product.informacoes?.[0];


    const specIcons = {
        "Sistema": Settings,
        "Processador": Cpu,
        "Placa de Vídeo": Monitor,
        "Memória RAM": MemoryStick,
        "Armazenamento Primário": HardDrive,
        "Armazenamento Secundário": HardDrive,
        "Placa Mãe": Monitor,
        "Fonte": Monitor,
        "Refrigeração": ThermometerSun,
        "Gabinete": Monitor
    };

    if (!info) {
        return <p className="text-gray-500">Nenhuma informação disponível.</p>;
    }

    const renderSecao = (titulo: string, dados: Record<string, any>) => {
         const IconComponent = specIcons[titulo as keyof typeof specIcons] || Monitor;
        return (
            <div className="rounded p-4 shadow-sm transition">
                <IconComponent className="w-6 h-6 mb-1 text-indigo-600" />
                <h3 className="text-lg font-semibold text-gray-700 mb-3">{titulo}</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                    {Object.entries(dados).map(([key, value], i) => (
                        <li
                            key={i}
                            className="flex justify-between border-b pb-1 border-gray-300"
                        >
                            <span className="font-medium capitalize">{key.replaceAll("_", " ")}</span>
                            <span className="text-right">
                                {typeof value === "object" ? JSON.stringify(value) : value}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        )
    };

    return (
        <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
