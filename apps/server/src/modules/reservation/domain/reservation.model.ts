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

import { User } from '../../../modules/user/domain'

import { Space } from '../../../modules/space/domain'

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({})
  startTime: string

  @Column({})
  endTime: string

  @Column({})
  status: string

  @Column({})
  userId: string

  @ManyToOne(() => User, parent => parent.reservations)
  @JoinColumn({ name: 'userId' })
  user?: User

  @Column({})
  spaceId: string

  @ManyToOne(() => Space, parent => parent.reservations)
  @JoinColumn({ name: 'spaceId' })
  space?: Space

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}
