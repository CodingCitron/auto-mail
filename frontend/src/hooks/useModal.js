import { useContext } from "react"
import { ModalDispatchContext } from "../context/modal"

export default function useModals() {
    const { open, close } = useContext(ModalDispatchContext)  

    const openModal = (component, props) => {
        open(component, props)
    }
    const closeModal = (component) => {
        close(component)
    }

    return {
        openModal,
        closeModal
    }
}