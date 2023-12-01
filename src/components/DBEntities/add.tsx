import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Box, Button, Flex, FormControl, FormLabel, Input, InputGroup, InputLeftElement, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, useToast } from "@chakra-ui/react"
import { InsertQuery, TABLE } from "@/queries"

const formStyle = {
    width: '50%',
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '1rem',
    alignSelf: 'center'
}

const AddEntity = () => {
    const navigate = useNavigate()
    const toast = useToast()

    const [name, setName] = useState<string>('')
    const [value, setValue] = useState<string>('0')
    const [decimalValue, setDecimalValue] = useState<string>('0.0')
    const [nullableProperty, setNullableProperty] = useState<string | null>(null)

    const [nameDisabled, setNameDisabled] = useState<boolean>(false)
    const [valueDisabled, setValueDisabled] = useState<boolean>(false)
    const [decimalValueDisabled, setDecimalValueDisabled] = useState<boolean>(false)
    const [nullablePropertyDisabled, setNullablePropertyDisabled] = useState<boolean>(false)

    const [disableButtons, setDisableButtons] = useState<boolean>(false)

    const onSubmit = async () => {
        disableAllFields()

        if (validateInsert()) {
            try {
                const columns = ['name', 'value', 'decimal_value']
                const values = [`'${name}'`, parseInt(value), parseFloat(decimalValue)]

                if (nullableProperty) {
                    columns.push('nullable_property')
                    values.push(`'${nullableProperty}'`)
                }

                const query = InsertQuery(TABLE.DBENTITY, columns, values)
                await window.api.db.query(query)
    
                toast({
                    title: 'Entity added',
                    status: 'success',
                    duration: 1500,
                    isClosable: true,
                    onCloseComplete: () => navigate('/db-entities')
                })
            } catch (error) {
                console.log(error)

                toast({
                    title: 'Error',
                    description: 'Ooops! Something went wrong. Please try again later.',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                })
            }
        } else {
            enableAllFields()

            toast({
                title: 'Error',
                description: 'Required fields are missing.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
        }
    }

    const validateInsert = (): boolean => {
        return name && !!value && !!decimalValue
    }

    const disableAllFields = () => {
        setNameDisabled(true)
        setValueDisabled(true)
        setDecimalValueDisabled(true)
        setNullablePropertyDisabled(true)
        setDisableButtons(true)
    }

    const enableAllFields = () => {
        setNameDisabled(false)
        setValueDisabled(false)
        setDecimalValueDisabled(false)
        setNullablePropertyDisabled(false)
        setDisableButtons(false)
    }

    const goBack = () => navigate('/db-entities')

    return (
        <Flex justifyContent='center'>
            <Flex direction='column' gap={4} style={formStyle}>
                <FormControl>
                    <FormLabel>Name</FormLabel>
                    <Input placeholder='Name'
                        onChange={(e: any) => setName(e.target.value)}
                        isDisabled={nameDisabled}
                    />
                </FormControl>

                <FormControl>
                    <FormLabel>Value</FormLabel>
                    <NumberInput>
                        <NumberInputField value={value} onChange={(e) => setValue(e.target.value)} disabled={valueDisabled} />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                </FormControl>

                <FormControl>
                    <FormLabel>Decimal Value</FormLabel>
                    <NumberInput precision={2} step={0.1}>
                        <NumberInputField 
                            value={decimalValue} 
                            onChange={(e) => setDecimalValue(e.target.value)}
                            disabled={decimalValueDisabled} 
                        />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                </FormControl>

                <FormControl>
                    <FormLabel>Nullable Property</FormLabel>
                    <Input placeholder='Nullable Property'
                        onChange={(e: any) => setNullableProperty(e.target.value)}
                        isDisabled={nullablePropertyDisabled}
                    />
                </FormControl>

                <Box w='100%'>
                    <Flex direction='row' justifyContent='center' gap={4}>
                        <Button onClick={goBack} mt={4} isDisabled={disableButtons}>Cancelar</Button>
                        <Button onClick={onSubmit} colorScheme='blue' mt={4} isDisabled={disableButtons}>Guardar</Button>
                    </Flex>
                </Box>
            </Flex>
        </Flex>
    )
}

export default AddEntity