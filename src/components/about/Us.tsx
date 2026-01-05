export default function Us() {
    return (
        <div className="bg-gray-50 text-gray-800">

            {/* HERO */}
            <section className="relative w-full h-[60vh]">
                <img
                    src="https://images.unsplash.com/photo-1525182008055-f88b95ff7980?q=80&w=1500"
                    alt="Tecnologia Pluggy"
                    className="w-full h-full object-cover brightness-75"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                    <h1 className="text-4xl sm:text-5xl font-bold text-white drop-shadow-lg">
                        Sobre a Pluggy
                    </h1>
                </div>
            </section>

            {/* INTRO */}
            <section className="max-w-6xl mx-auto p-2 sm:p-12">
                <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-4">
                    Quem Somos
                </h2>
                <p className="text-gray-700 leading-relaxed text-lg">
                    A <strong>Pluggy</strong> nasceu com o propósito de transformar a maneira como
                    pessoas e negócios consomem produtos digitais. Aqui unimos tecnologia,
                    criatividade e simplicidade para entregar ferramentas que realmente fazem
                    diferença no dia a dia: rápidas, modernas e acessíveis.
                    <br /><br />
                    Somos apaixonados por inovação e dedicados a criar soluções que tornam
                    a vida digital mais prática e profissional para todos.
                </p>
            </section>

            {/* MISSÃO - VISÃO - VALORES */}
            <section className="bg-white py-12">
                <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 p-2 sm:p-6">

                    <div className="bg-gray-50 rounded-xl shadow-sm p-6 text-center hover:shadow-md transition">
                        <img
                            src="https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=800"
                            alt="Missão Pluggy"
                            className="w-full h-40 object-cover rounded-lg mb-4"
                        />
                        <h3 className="text-xl font-bold">Nossa Missão</h3>
                        <p className="text-gray-600 mt-2">
                            Fornecer produtos digitais modernos, funcionais e acessíveis,
                            ajudando nossos clientes a aumentar a produtividade e elevar
                            seus resultados no mundo digital.
                        </p>
                    </div>

                    <div className="bg-gray-50 rounded-xl shadow-sm p-6 text-center hover:shadow-md transition">
                        <img
                            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=800"
                            alt="Visão Pluggy"
                            className="w-full h-40 object-cover rounded-lg mb-4"
                        />
                        <h3 className="text-xl font-bold">Nossa Visão</h3>
                        <p className="text-gray-600 mt-2">
                            Tornar a Pluggy a principal referência em produtos digitais
                            inovadores, oferecendo a melhor experiência e suporte do mercado.
                        </p>
                    </div>

                    <div className="bg-gray-50 rounded-xl shadow-sm p-6 text-center hover:shadow-md transition">
                        <img
                            src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=800"
                            alt="Valores Pluggy"
                            className="w-full h-40 object-cover rounded-lg mb-4"
                        />
                        <h3 className="text-xl font-bold">Nossos Valores</h3>
                        <p className="text-gray-600 mt-2">
                            Ética, transparência, qualidade, inovação e respeito ao cliente
                            são pilares que sustentam todo o nosso trabalho.
                        </p>
                    </div>

                </div>
            </section>

            {/* HISTÓRIA */}
            <section className="max-w-6xl mx-auto py-6 sm:py-12 px-2 sm:px-6">
                <div className="grid md:grid-cols-2 gap-10 items-center">

                    <img
                        src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1500"
                        alt="História da Pluggy"
                        className="rounded-xl shadow-md"
                    />

                    <div>
                        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-4">
                            Nossa História
                        </h2>
                        <p className="text-gray-700 leading-relaxed text-lg">
                            A Pluggy começou como um pequeno projeto entre amigos apaixonados
                            por tecnologia e design, que desejavam criar uma loja digital
                            diferente: simples, confiável e com produtos realmente úteis.
                            <br /><br />
                            Com dedicação e foco total na experiência do usuário, evoluímos
                            para um ecossistema digital completo, oferecendo produtos
                            profissionais que atendem criadores, empreendedores e empresas
                            em todo o Brasil.
                        </p>
                    </div>

                </div>
            </section>
            {/* FOOTER */}
            <footer className="py-10 text-center text-gray-500 text-sm">
                © {new Date().getFullYear()} Pluggy — E tudo mentira.
            </footer>
        </div>
    );
}
