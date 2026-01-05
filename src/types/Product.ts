export interface Product {
    id: number;
    property: string;
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
    flash_description: string;
    description: string;
    guarantee?: string;
    quantity?: number;
    category?: string;

    // TIPAGEM PRINCIPAL DAS FICHAS TÉCNICAS
    specs?: PcSpecs | LaptopSpecs | ControllerSpecs | HeadphonesSpecs | SmartphoneSpecs | GenericSpecs;
}

export interface CartItem {
    id: number;
    property: string;
    img: string | string[];
    name: string;
    flash_description: string;
    star: number;
    features: string[];
    quantity: number;
    price: number;
    hidden?: boolean;
}

export interface AppContextType {
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
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
    display: Display;
    memoria_ram: MemoriaRam;
    armazenamento: Armazenamento;
    placa_mae: PlacaMae;
    fonte: Fonte;
    refrigeracao: Refrigeracao;
    gabinete: Gabinete;
    teclado: Teclado;
    bateria: Bateria;
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

interface Display {
    tamanho: string;
    resolucao: string;
    taxa_atualizacao: string;
    brilho_maximo: string;
    protecao: string;
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
    especificacoes_tecnicas: EspecificacoesTecnicasController;
}

interface EspecificacoesTecnicasController {
    conexao: ConexaoController;
    bateria: BateriaController;
    duracao: DuracaoController;
    vibracao: Vibracao;
    compatibilidade: CompatibilidadeController;
    peso: PesoController;
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
    tipo: string;
    especificacoes_tecnicas: {
        drivers: Record<string, string>;
        cancelamento_ruido: {
            tecnologia: string;
            modos: string[];
            microfones_externos: number;
            reducao_ruido: string;
        };
        microfone: Record<string, string>;
        bateria: Record<string, string>;
        conectividade: Record<string, string>;
        resistencia_agua: Record<string, string>;
        peso: Record<string, string>;
    };
}
/* ================================================================
   SMARTPHONE
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

interface GenericSpecs {
    especificacoes_tecnicas: {
        geral: Record<string, any>;
    };
}