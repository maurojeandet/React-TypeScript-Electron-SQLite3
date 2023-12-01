import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react"

const Quit = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <Button w='100%' h='60px' mt='auto' colorScheme='blue' onClick={onOpen}>
                Quit App
            </Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Quit App</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        Are you sure you want to quit the app?
                    </ModalBody>

                    <ModalFooter>
                        <Button variant='ghost' mr={3} onClick={onClose}>Cancel</Button>
                        <Button colorScheme='blue' onClick={() => window.api.quit()}>
                            Quit
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default Quit