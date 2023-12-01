import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Button, Flex, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr, useDisclosure, useToast } from '@chakra-ui/react'
import { AddIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons'
import DeleteAction from '@components/common/confirm-action'
import { DeleteQuery, SelectQuery, TABLE } from '@/queries'
import { DBEntity } from '@/entities/DBEntity'

const iconStyles = {
    cursor: 'pointer'
}

const DBEntities = () => {
    const navigate = useNavigate()

    const [entities, setEntities] = useState<DBEntity[]>([])
    const [entitySelected, setEntitySelected] = useState<DBEntity | null>(null)

    const toast = useToast()
    const { isOpen, onOpen, onClose } = useDisclosure()

    useEffect(() => {
        fetchDB()
    }, [])

    const fetchDB = async () => {
        const rows: DBEntity[] = await window.api.db.query(SelectQuery(TABLE.DBENTITY))
        setEntities(rows)
    }

    const editEntity = (id: number) => navigate(`/db-entities/${id}/edit`)

    const openDeleteEntity = (id: number) => {
        setEntitySelected(entities.find(e => e.id === id))
        onOpen()
    }

    const deleteEntity = async () => {
        if (!entitySelected) return

        await window.api.db.query(DeleteQuery(TABLE.DBENTITY, `id = ${entitySelected.id}`))
        toast({
            title: `${entitySelected.name} deleted`,
            status: 'success',
            duration: 3000,
            isClosable: true,
        })

        fetchDB()
    }

    return (
        <Box>
            <Flex direction='row' justifyContent='space-between' mb={4} alignItems='center'>
                <Button 
                    colorScheme='blue' 
                    rightIcon={<AddIcon />} 
                    onClick={() => navigate('/db-entities/add')}
                >
                    Add Entity
                </Button>
            </Flex>
            <TableContainer overflowX='scroll' className='entities-table'>
                <Table size='sm' variant='striped' colorScheme='twitter'>
                    <TableCaption placement='top'>DB Entities</TableCaption>
                    <Thead>
                        <Tr>
                            <Th></Th>
                            <Th></Th>
                            <Th>ID</Th>
                            <Th>Name</Th>
                            <Th>Value</Th>
                            <Th>Decimal Value</Th>
                            <Th>Nullable Property</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {
                            entities.length > 0 && entities.map((e, index) => (
                                <Tr key={index} textAlign='center'>
                                    <Td><DeleteIcon onClick={() => openDeleteEntity(e.id)} style={iconStyles}/></Td>
                                    <Td><EditIcon onClick={() => editEntity(e.id)} style={iconStyles}/></Td>
                                    <Td>{e.id}</Td>
                                    <Td>{e.name}</Td>
                                    <Td>{e.value}</Td>
                                    <Td>{e.decimal_value}</Td>
                                    <Td>{e.nullable_property}</Td>
                                </Tr>
                            ))
                        }
                    </Tbody>
                </Table>
            </TableContainer>

            {
                entitySelected && 
                <DeleteAction
                    isOpen={isOpen}
                    onClose={onClose}
                    header='Delete'
                    body={`Are you sure you want to delete ${entitySelected.name}?`}
                    callback={deleteEntity}
                    confirmText='Delete'
                    colorScheme='red'
                />
            }
        </Box>
    )
}

export default DBEntities