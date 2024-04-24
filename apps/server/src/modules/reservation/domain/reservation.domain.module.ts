import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { ReservationDomainFacade } from './reservation.domain.facade'
import { Reservation } from './reservation.model'

@Module({
  imports: [TypeOrmModule.forFeature([Reservation]), DatabaseHelperModule],
  providers: [ReservationDomainFacade, ReservationDomainFacade],
  exports: [ReservationDomainFacade],
})
export class ReservationDomainModule {}
