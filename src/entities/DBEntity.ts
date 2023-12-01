import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity({ name: 'db_entity' })
export class DBEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({ type: 'integer' })
    value: number

    @Column({ type: 'real' })
    decimal_value: string

    @Column({ nullable: true })
    nullable_property: string
}