import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button } from "@chakra-ui/react"
import { useRef } from "react"

interface iProps {
    isOpen: boolean
    onClose: () => void
    header: string
    body: string
    callback: () => void
    confirmText: string
    colorScheme?: string
}

// Intended to be used with Disclosure component
const ConfirmAction = ({ isOpen, onClose, header, body, callback, confirmText, colorScheme }: iProps) => {
    const cancelRef = useRef()

    const handleConfirm = () => {
        callback()
        onClose()
    }

    return (
        <>
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>{header}</AlertDialogHeader>
                        <AlertDialogBody>{body}</AlertDialogBody>
                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button colorScheme={colorScheme ?? 'blue'} onClick={handleConfirm} ml={3}>
                                {confirmText}
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    )
}

export default ConfirmAction