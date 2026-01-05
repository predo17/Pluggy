import { useAuth } from "../../../context/AuthContext";
import { useEffect } from "react";
import LinkWithLoading from "../../LinkWithLoading";
import toast from "react-hot-toast";
import DeleteButton from "../../DeleteButton";

export default function UserProfileInfo() {
    const { user, deleteAccount } = useAuth();

    useEffect(() => {
        if (!user) return;

        async function loadUser() {
            const res = await fetch(
                `http://localhost:3001/api/user/${user?.id}`
            );
            const data = await res.json();
            console.log(data);
        }

        loadUser();
    }, [user]);

    const handleDelete = () => {
        deleteAccount();
        toast.success("Conta deletada com sucesso!");
    };

    if (!user) {
        return (
            <>
                <div className="w-full h-full flex items-center justify-center">
                    <div className="flex flex-col items-center text-gray-500">
                        <img src="/imgsnull/user.png" alt="Perfil" className="w-45 h-40 mb-4" />
                        <p>Você ainda não fez o login.</p>
                        <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                            <LinkWithLoading to="/Auth">Login</LinkWithLoading>
                        </button>
                    </div>
                </div>

            </>

        );
    }

    const getInitials = (fullName: string) => {
        const prepositions = ["da", "de", "do", "das", "dos"];

        return fullName
            .trim()
            .toLowerCase()
            .split(/\s+/)
            .filter(word => !prepositions.includes(word))
            .slice(0, 2)
            .map(word => word[0].toUpperCase())
            .join("");
    };


    return (
        <div className="flex flex-col sm:flex-row justify-between w-full border-b border-gray-200 pb-4">
            {/* Avatar com Status */}
            <div className="flex max-sm:flex-col gap-4 ">
                <div className="relative w-15 h-15">
                    <div className="w-full h-full bg-linear-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                        {getInitials(user.name)}
                    </div>
                    <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                </div>

                {/* Informações Principais */}
                <div className="text-start">
                    <h3 className="text-lg font-bold text-gray-800">{user.name}</h3>
                    <p className="text-gray-600 text-sm mb-2">{user.email}</p>
                </div>
            </div>

            <div>
                <DeleteButton
                    onClick={handleDelete}
                    title="Deletar Conta"
                    text="Todos os seus dados serão perdidos permanentemente. Tem certeza?"
                    className="w-full bg-red-50 text-red-600 py-2.5 rounded-lg hover:bg-red-100 transition-colors font-medium border border-red-200 px-2 cursor-pointer">
                    <span>Deletar Conta</span>
                </DeleteButton>
            </div>
        </div>
    );
}
