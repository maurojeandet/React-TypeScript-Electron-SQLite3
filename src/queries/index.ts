export const SelectQuery = (table: string, columns: string[] = ['*'], where: string = '', onlyOne: boolean = false) => {
    return `SELECT ${columns.join(', ')}` +
            ` FROM ${table}` +
            `${where ? ` WHERE ${where}` : ''}` +
            `${onlyOne ? ' LIMIT 1' : ''}`
}

export const SelectByIdQuery = (table: string, id: string | number) => {
    return `SELECT *` +
            ` FROM ${table}` +
            ` WHERE id = ${id}` +
            ` LIMIT 1`
}

export const InsertQuery = (table: string, columns: string[], values: any[]) => {
    return `INSERT INTO ${table} (${columns.join(', ')})` +
            ` VALUES (${values.join(', ')})`
}

export const InsertQueryMultipleValues = (table: string, columns: string[], values: any[][]) => {
    const valuesString = values.map(v => `(${v.join(', ')})`).join(',')
    return `INSERT INTO ${table} (${columns.join(', ')})` +
            ` VALUES ${valuesString}`
}

export const UpdateQuery = (table: string, columns: string[], values: any[], where: string) => {
    return `UPDATE ${table}` +
            ` SET ${columns.map((column, index) => `${column} = ${values[index]}`).join(', ')}` +
            ` WHERE ${where}`
}

export const DeleteQuery = (table: string, where: string) => {
    return `DELETE FROM ${table}` +
            ` WHERE ${where}`
}

export const TABLE = {
    DBENTITY: 'db_entity'
}