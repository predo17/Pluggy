import { useLoading } from "../context/LoadingContext";

export function useRemoveItem(removeFn: (id: number, property: string) => void) {
  const { startLoading, stopLoading } = useLoading();

  async function removeItem(id: number, property: string) {
    startLoading();

    // Tempo de animação / feedback visual
    await new Promise(res => setTimeout(res, 1000));

    // Executa a remoção real
    removeFn(id, property);

    stopLoading();
  }

  return { removeItem };
}
