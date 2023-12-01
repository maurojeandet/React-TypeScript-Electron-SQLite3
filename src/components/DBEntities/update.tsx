import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Box, Button, Flex, FormControl, FormLabel, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, useToast } from "@chakra-ui/react"
import { SelectByIdQuery, TABLE, UpdateQuery } from "@/queries"
import { DBEntity } from "@/entities/DBEntity"

const formStyle = {
    width: '50%',
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '1rem',
    alignSelf: 'center'
}

const UpdateEntity = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const toast = useToast()

    const [entity, setEntity] = useState<DBEntity>()

    const [name, setName] = useState<string>('')
    const [value, setValue] = useState<string>('0')
    const [decimalValue, setDecimalValue] = useState<string>('0.0')
    const [nullableProperty, setNullableProperty] = useState<string | null>(null)

    const [nameDisabled, setNameDisabled] = useState<boolean>(false)
    const [valueDisabled, setValueDisabled] = useState<boolean>(false)
    const [decimalValueDisabled, setDecimalValueDisabled] = useState<boolean>(false)
    const [nullablePropertyDisabled, setNullablePropertyDisabled] = useState<boolean>(false)

    const [disableButtons, setDisableButtons] = useState<boolean>(false)

    useEffect(() => {
        fetchDB()
    }, [])

    const fetchDB = async () => {
        const id = location.pathname.split('/')[2]
        const rows: DBEntity[] = await window.api.db.query(SelectByIdQuery(TABLE.DBENTITY, id))

        if (rows.length === 0) return navigate('/db-entities')

        setEntity(rows[0])
        setName(rows[0].name)
        setValue(rows[0].value.toString())
        setDecimalValue(rows[0].decimal_value)
        setNullableProperty(rows[0].nullable_property)
    }

    const onSubmit = async () => {
        disableAllFields()

        if (validateUpdate()) {
            try {
                const columns = ['name', 'value', 'decimal_value']
                const values = [`'${name}'`, parseInt(value), parseFloat(decimalValue)]

                if (nullableProperty) {
                    columns.push('nullable_property')
                    values.push(`'${nullableProperty}'`)
                }

                const query = UpdateQuery(TABLE.DBENTITY, columns, values, `id = ${entity.id}`)
                await window.api.db.query(query)
    
                toast({
                    title: 'Entity updated',
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
                title: 'Alert',
                description: 'No changes were made.',
                status: 'warning',
                duration: 3000,
                isClosable: true,
            })
        }
    }

    const validateUpdate = (): boolean => {
        return name !== entity.name ||
            value !== entity.value.toString() ||
            decimalValue !== entity.decimal_value ||
            nullableProperty !== entity.nullable_property
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
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        isDisabled={nameDisabled}
                    />
                </FormControl>

                <FormControl>
                    <FormLabel>Value</FormLabel>
                    <NumberInput
                        value={value}
                        onChange={(e) => setValue(e)} 
                        isDisabled={valueDisabled}
                    >
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                </FormControl>

                <FormControl>
                    <FormLabel>Decimal Value</FormLabel>
                    <NumberInput precision={2} step={0.1}
                        value={decimalValue}
                        onChange={(e) => setDecimalValue(e)} 
                        isDisabled={decimalValueDisabled}
                    >
                        <NumberInputField />
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

export default UpdateEntity