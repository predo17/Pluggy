export interface Product {
    id: number;
    name: string;
    title: string;
    price: number;
    oldPrice?: number;
    badge: string;
    img: string | string[];
    imgColor: string | string[];
    star: number;
    cor: string[];
    features: string[];
    description: string;
    guarantee?: string;
    quantity?: number;
    property?: string;
    category?: string;

    // TIPAGEM PRINCIPAL DAS FICHAS TÉCNICAS
    specs?: PcSpecs | LaptopSpecs | ControllerSpecs | HeadphonesSpecs | SmartphoneSpecs;
}

/* ================================================================
   PC / LAPTOP
================================================================ */

interface PcSpecs {
    category: "pc";
    sistema: Sistema;
    especificacoes_tecnicas: EspecificacoesTecnicas;
    recursos_extras: string[];
    observacao_final: string;
}

interface LaptopSpecs {
    category: "laptop";
    sistema: Sistema;
    especificacoes_tecnicas: EspecificacoesTecnicas;
    recursos_extras: string[];
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
    teclado: Teclado;
    bateria: Bateria;

    /* CAMPOS DE CONTROLLER (CASO NAO USE, FICA UNDEFINED) */
    conexaoController?: ConexaoController;
    bateriaController?: BateriaController;
    duracaoController?: DuracaoController;
    vibracao?: Vibracao;
    compatibilidadeController?: CompatibilidadeController;
    pesocontroller?: PesoController;
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
    controle?: string;
}

interface Gabinete {
    modelo: string;
    tamanho: string;
    materiais: string[];
    iluminacao: string;
}

interface Teclado {
    tipo: string;
    switch: string;
    travel: string;
    actuation: string;
    iluminacao: string;
    recursos: string[];
}

interface Bateria {
    capacidade: string;
    tecnologia: string;
    duracao_estimada: string;
    carregamento_rapido: string;
}

/* ================================================================
   CONTROLLER
================================================================ */

interface ControllerSpecs {
    category: "controller";
    especificacoes_tecnicas: EspecificacoesTecnicas;
}

interface ConexaoController {
    tecnologia: string;
    alcance: string;
    latencia: string;
}

interface BateriaController {
    tipo: string;
    capacidade: string;
    carregamento: string;
}

interface DuracaoController {
    tempo_jogo: string;
    tempo_standby: string;
    tempo_recarga: string;
}

interface Vibracao {
    tipo: string;
    intensidade_ajustavel: string;
    recursos: string;
}

interface CompatibilidadeController {
    plataformas: string[];
    observacao: string;
}

interface PesoController {
    valor: string;
    distribuicao: string;
}

/* ================================================================
   HEADPHONES
================================================================ */

export interface HeadphonesSpecs {
    category: "headphones";
    modelo: string;
    especificacoes_tecnicas: {
        tipo: string;
        drivers: {
            tamanho: string;
            tipo: string;
            resposta_frequencia: string;
            impedancia: string;
        };
        cancelamento_ruido: {
            tecnologia: string;
            modos: string[];
            microfones_externos: number;
            reducao_ruido: string;
        };
        microfone: {
            tipo: string;
            cancelamento_ruido_voz: string;
            frequencia_captacao: string;
            formato_gravacao: string;
        };
        bateria: {
            capacidade: string;
            duracao_com_anc: string;
            duracao_sem_anc: string;
            carregamento_rapido: string;
            tempo_recarga_completa: string;
        };
        conectividade: {
            sem_fio: string;
            com_fio: string;
            multi_pairing: string;
            armazenamento: string;
        };
        resistencia_agua: {
            certificacao: string;
            protecao: string;
        };
        peso: {
            valor: string;
            observacao: string;
        };
    };
}


/* ================================================================
   SMARTPHONE  (JSON COMPLETO)
================================================================ */

export interface SmartphoneSpecs {
    category: "smartphone";
    modelo: string;
    especificacoes_tecnicas: EspecificacoesTecnicasSmartphone;
}

export interface EspecificacoesTecnicasSmartphone {
    tela: TelaSmartphone;
    processador: ProcessadorSmartphone;
    ram_rom: RamRomSmartphone;
    chip_sim: ChipSimSmartphone;
    camera: CameraSmartphone;
    bateria: BateriaSmartphone;
    sistema: SistemaSmartphone;
    conectividade: ConectividadeSmartphone;
    resistencia_agua: ResistenciaAguaSmartphone;
}

export interface TelaSmartphone {
    tecnologia: string;
    resolucao: string;
    taxa_atualizacao: string;
    protecao: string;
    brilho_maximo: string;
}

export interface ProcessadorSmartphone {
    modelo: string;
    nucleos: string;
    gpu: string;
    arquitetura: string;
}

export interface RamRomSmartphone {
    ram: string;
    armazenamento: string;
    expansao: string;
}

export interface ChipSimSmartphone {
    suporte: string;
    conectividade: string;
}

export interface CameraSmartphone {
    principal: CameraPrincipalSmartphone;
    frontal: CameraFrontalSmartphone;
    recursos: string[];
}

export interface CameraPrincipalSmartphone {
    sensor_principal: string;
    ultra_wide: string;
    teleobjetiva: string;
    video_principal: string;
}

export interface CameraFrontalSmartphone {
    resolucao: string;
    video_frontal: string;
}

export interface BateriaSmartphone {
    capacidade: string;
    carregamento: CarregamentoSmartphone;
    duracao_estimada: string;
}

export interface CarregamentoSmartphone {
    com_fio: string;
    sem_fio: string;
    reversivel: string;
}

export interface SistemaSmartphone {
    os: string;
    interface: string;
    atualizacoes_garantidas: string;
}

export interface ConectividadeSmartphone {
    wi_fi: string;
    bluetooth: string;
    nfc: string;
    portas: string;
    gps: string;
}

export interface ResistenciaAguaSmartphone {
    certificacao: string;
    profundidade_maxima: string;
}
