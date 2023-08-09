import './DeleteConfirm.css'
import TButton from './core/TButton'
import { XCircleIcon } from '@heroicons/react/20/solid'

export default function DeleteConfirm({
    title = "",
    onDelete = () => { },
    onCancel = () => { }
}) {
    return (
        <div className="deleteconfirm">
            <div className="deleteconfirm_content">
                <h1 className="deleteconfirm_title">{title}</h1>
                <div className="deleteconfirm_buttons">
                    <TButton
                        color="delete"
                        onClick={onDelete}
                    >
                        <XCircleIcon className="h-6 w-6 mr-2" />
                        Delete
                    </TButton>
                    <TButton
                        color="edit"
                        onClick={onCancel}
                    >
                        Cancel
                    </TButton>
                </div>
            </div>
        </div>
    )
}
