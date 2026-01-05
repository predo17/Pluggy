// src/pages/Auth.tsx
import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Auth() {
    const { login, register } = useAuth();
    const navigate = useNavigate();

    const [mode, setMode] = useState<"login" | "register">("login");
    const [loading, setLoading] = useState(false);

    // Campos gerais
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    function toggleMode() {
        setLoading(true);
        setTimeout(() => {
            setMode(mode === "login" ? "register" : "login");
            setLoading(false);
        }, 1000); // duração da animação
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (mode === "login") {
            const loggedUser = await login(email, password);

            if (loggedUser) {
                toast.success("Login efetuado com sucesso!");
                setTimeout(() => {
                    navigate("/dashboard", { state: { goTo: "profile" }, replace: true });
                    window.location.reload();
                }, 800);
            } else {
                toast.error("Email ou senha incorretos!");
            }
        }

        if (mode === "register") {
            const ok = await register(name, email, password);

            if (ok) {
                toast.success("Conta criada com sucesso!");
                toggleMode();
                setMode("login");
            } else {
                toast.error("Este email já está cadastrado!");
            }
        }

       
    };

    const isPasswordValid = () => {
        return (
            password.length >= 8 &&
            /[A-Z]/.test(password) &&
            /[0-9]/.test(password)
        );
    };


    const validatePassword = () => {
        if (password.length === 0) return '';
        if (!isPasswordValid()) return 'text-red-500';
        return 'text-green-500';
    };

    const passwordStrength = () => {
        let strength = 0;

        if (password.length >= 8) strength += 34;
        if (/[A-Z]/.test(password)) strength += 33;
        if (/[0-9]/.test(password)) strength += 33;

        return strength;
    };


    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 rounded-md">
            <div className="bg-white rounded shadow-2xl w-full max-w-md overflow-hidden">
                {loading ? (
                    // ANIMAÇÃO DE LOADING
                    <div className="px-4 py-50 rounded">
                        <div className="w-10 h-10 mx-auto border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <>
                        {/* Cabeçalho */}
                        <div className="px-8 pt-8 text-center">
                            <h1 className="text-2xl sm:text-3xl font-bold">
                                {mode === "login" ? "Entrar na sua conta" : "Criar uma conta"}
                            </h1>
                            <p className="text-gray-500 tracking-tight">
                                {mode === "login"
                                    ? "Bem-vindo de volta!"
                                    : "Crie sua conta e comece sua jornada"}
                            </p>
                        </div>

                        {/* Formulário */}
                        <form onSubmit={handleSubmit} className="p-8 space-y-6">

                            {/* Campo nome só no cadastro */}
                            {mode === "register" && (
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Nome Completo *</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
                                            <User className="text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="Seu nome"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                            required
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Email */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">E-mail *</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
                                        <Mail className="text-gray-400" />
                                    </div>
                                    <input
                                        type="email"
                                        placeholder="seu@email.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Senha */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Senha *</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
                                        <Lock className="text-gray-400" />
                                    </div>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Digite sua senha"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                        required
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    >
                                        <span className="text-gray-500 hover:text-gray-700 cursor-pointer">
                                            {showPassword ? <EyeOff /> : <Eye />}
                                        </span>
                                    </button>
                                </div>

                                {mode === "register" && (
                                    <>
                                        <div className="mt-2">
                                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full transition-all duration-300 ${passwordStrength() < 50 ? 'bg-red-500' :
                                                        passwordStrength() < 75 ? 'bg-yellow-500' : 'bg-green-500'
                                                        }`}
                                                    style={{ width: `${passwordStrength()}%` }}
                                                ></div>
                                            </div>
                                            <div className={`text-xs mt-1 ${validatePassword()}`}>
                                                {password.length === 0 ? 'Digite uma senha' :
                                                    ` ${isPasswordValid() ? 'Senha forte ✓' : 'Senha não atende todos os requisitos'}`
                                                }
                                            </div>
                                        </div>
                                        {/* Requisitos da senha */}
                                        <div className="text-xs text-gray-600 space-y-1 mt-2">
                                            <div className={`flex items-center ${password.length >= 8 ? 'text-green-500' : 'text-gray-400'}`}>
                                                <span className="mr-1">{password.length >= 8 ? '✓' : '○'}</span>
                                                8 caracteres ou mais
                                            </div>
                                            <div className={`flex items-center ${/[A-Z]/.test(password) ? 'text-green-500' : 'text-gray-400'}`}>
                                                <span className="mr-1">{/[A-Z]/.test(password) ? '✓' : '○'}</span>
                                                Pelo menos uma letra maiúscula
                                            </div>
                                            <div className={`flex items-center ${/[0-9]/.test(password) ? 'text-green-500' : 'text-gray-400'}`}>
                                                <span className="mr-1">{/[0-9]/.test(password) ? '✓' : '○'}</span>
                                                Pelo menos um número
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* Botão principal */}
                            <button
                                type="submit"
                                disabled={!isPasswordValid()}
                                className={`w-full bg-linear-to-r from-orange-500 to-orange-600  cursor-pointer  active:scale-95 text-white py-3 px-4 rounded-lg transition-all duration-200 
                                    ${mode === "login" ? 'hover:scale-105 hover:from-orange-600 hover:to-orange-700' : !isPasswordValid() ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 hover:from-orange-600 hover:to-orange-700'}`}
                            >
                                {mode === "login" ? "Entrar" : "Criar conta"}
                            </button>

                            {/* Alternar entre login/cadastro */}
                            <div className="text-center cursor-default">

                                <p className="text-[13px] text-gray-600">
                                    {mode === "login" ? "Não tem uma conta?" : "Ja possui uma conta?"}{" "}
                                    <button
                                        type="button"
                                        onClick={toggleMode}
                                        className="text-blue-500 hover:underline cursor-pointer"
                                    >
                                        {mode === "login" ? "Criar conta" : mode === "register" ? "Fazer login" : "Voltar ao login"}
                                    </button>
                                </p>

                                <p className="text-xs text-gray-400 mt-2">
                                    Ao continuar, você concorda com nossos{" "}
                                    <span className="text-blue-500">Termos de Serviço</span> e{" "}
                                    <span className="text-blue-500">Política de Privacidade</span>.
                                </p>
                            </div>
                        </form>

                    </>
                )}
            </div>
        </div>
    );
}
