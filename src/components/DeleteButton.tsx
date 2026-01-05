import Swal from "sweetalert2"
import 'sweetalert2/themes/bulma.css'

interface Props {
    title?: string
    text?: string
    className?: string
    onClick?: () => void
    children?: React.ReactNode
}

export default function DeleteButton({ title ,text, className, onClick, children }: Props) {


    const onClickDelete = () => {
        Swal.fire({
            theme: 'bulma-light',
            title: `${title}`,
            text: `${text}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, deletar!',
        }).then((result) => {
            if (result.isConfirmed) {
                onClick?.();
            }
        })
    }


    return (

        <button
            onClick={onClickDelete}
            className={className}
        >
            {children}
        </button>
    )
}
