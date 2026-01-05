import { AlertCircle, Calendar, Check, CreditCard, MessageSquare, ShoppingBag, User } from "lucide-react";
import { generatePurchasePDF } from "../../../utils/generatePurchasePDF";
import DeleteButton from "../../DeleteButton";

interface Props {
  orders: any[];
  loading: boolean;
  removeConfirmation: (id: number) => void;
}

export default function BagComponent( { orders, loading, removeConfirmation }: Props ) {
  
  return (
    <>
      {loading ? (
        <div className="w-full h-full flex items-center justify-center">
          <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
            <p>Carregando pedidos...</p>
          </div>
        </div>
      ) : (
        orders.length === 0 ? (
          <div className="w-full h-full flex items-center justify-center">
            <div className="flex flex-col items-center text-center text-gray-500">
              <img src="imgsnull/saco-vazio.png" alt="Histórico de Pedidos" className="w-40 h-40 mb-4" />
              <p>Você ainda não realizou nenhuma compra</p>
            </div>
          </div>

        ) : (
          <div className="space-y-4 flex-1">

            {orders
              .sort((r, a) => a.id - r.id)
              .map((o) => (
                <div key={o.id} className="relative group bg-white border-l-4 border-blue-500 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 ">

                  <div className="absolute top-1/2 -left-2 w-4 h-4 rounded-full border-4 border-white bg-white lg:block hidden "
                  >
                    <div className="w-2 h-2 rounded-full bg-gray-400 group-hover:bg-green-500 group-hover:animate-pulse" />
                  </div>

                  <div className="flex">
                    <div className="flex-1 p-4">
                      <div className="flex items-start gap-4">
                        {/* Conteúdo Principal */}
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <div className="relative">
                                <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-indigo-600 
                          rounded-full flex items-center justify-center">
                                  <ShoppingBag className="w-5 h-5 text-white" />
                                </div>
                                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full 
                          border-2 border-white flex items-center justify-center">
                                  <Check className="w-3 h-3 text-white" />
                                </div>
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <h3 className="font-bold text-gray-900">Pedido Realizado</h3>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                  <User className="w-3.5 h-3.5" />
                                  <span>{o.from}</span>
                                  <span className="text-gray-300">•</span>
                                  <Calendar className="w-3.5 h-3.5" />
                                  <span>{o.date}</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Grid de Produtos */}
                          <h4 className="font-semibold text-gray-900 text-sm mb-2">{o.items.length === 1 ? "Produto Comprado:" : `Produtos Comprados:`}</h4>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                            {o.items.map((i: any) => (
                              <div key={i.img} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                                <img
                                  src={i.img}
                                  alt={i.name}
                                  className="w-10 h-10 rounded object-contain"
                                />
                                <div className="flex-1 min-w-0 space-y-0.5">
                                  <p className="text-sm font-medium text-gray-900 truncate">{i.name}</p>
                                  <p className="text-xs text-gray-500 truncate">{i.flash_description}</p>
                                  <p className="text-xs text-gray-500"> {i.quantity} unidade(s)</p>
                                </div>
                              </div>
                            ))}

                          </div>

                          <div className="bg-blue-50 rounded-lg p-3  mb-4">
                            <div className="flex items-center gap-2 mb-4 ">
                              <AlertCircle className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
                              <h4 className="text-sm text-gray-700 ">Informações de Compra:</h4>
                            </div>
                            <div className="bg-white rounded-lg p-3">
                              <ul className="text-sm text-gray-600">
                                <li>Comprador: <strong>{o.userName}</strong></li>
                                <li>E-mail de Envio: <strong>{o.userEmail}</strong></li>
                                <li>Total de Itens: <strong>{o.items.length}</strong></li>
                                <li>Forma de Pagamento: <strong>{(o.methodOfBuy === "card" ? "Cartão de Crédito" : o.methodOfBuy).toUpperCase()}</strong></li>
                              </ul>
                            </div>
                          </div>


                          {/* Mensagem*/}
                          <div className="flex items-start gap-2 mb-4 p-3 bg-blue-50 rounded-lg">
                            <MessageSquare className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                            <p className="text-sm text-gray-700 line-clamp-2">{o.message}</p>
                          </div>

                          {/* Footer com Ações */}
                          <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                            <div className="flex items-center gap-2">
                              <CreditCard className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-600 text-sm">Total: <strong className="text-base">{o.totalPrice}</strong> </span>
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={() =>
                                  generatePurchasePDF({
                                    from: o.from,
                                    date: o.date,
                                    userName: o.userName,
                                    userEmail: o.userEmail,
                                    items: o.items,
                                    methodOfBuy: (o.methodOfBuy === "card" ? "Cartão de Crédito" : o.methodOfBuy === "boleto" ? "Boleto Bancário" : o.methodOfBuy).toUpperCase(),
                                    message: o.message,
                                    totalPrice: o.totalPrice
                                  })
                                }
                                className="text-blue-600 hover:text-blue-700 text-sm font-medium px-1.5 py-1 cursor-pointer"
                              >
                                Download
                              </button>
                              <span className="text-gray-300 ">|</span>

                              <DeleteButton
                                onClick={() => removeConfirmation(o.id)}
                                title="Excluir Compra"
                                text="Tem certeza de que deseja excluir essa compra?"
                                className="text-red-500 hover:text-red-600 text-sm font-medium px-1.5 py-1 cursor-pointer"
                              >
                               <span>Excluir</span>
                              </DeleteButton>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )

      )}
    </>
  )
}
