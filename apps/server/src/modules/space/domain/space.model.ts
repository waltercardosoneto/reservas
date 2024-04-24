import { ColumnNumeric } from '@server/core/database'
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import { Reservation } from '../../../modules/reservation/domain'

@Entity()
export class Space {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({})
  name: string

  @Column({})
  location: string

  @ColumnNumeric({ type: 'numeric' })
  capacity: number

  @Column({ nullable: true })
  description?: string

  @OneToMany(() => Reservation, child => child.space)
  reservations?: Reservation[]

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
