import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { ReservationDomainModule } from '../domain'
import { ReservationController } from './reservation.controller'

import { UserDomainModule } from '../../../modules/user/domain'

import { ReservationByUserController } from './reservationByUser.controller'

import { SpaceDomainModule } from '../../../modules/space/domain'

import { ReservationBySpaceController } from './reservationBySpace.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    ReservationDomainModule,

    UserDomainModule,

    SpaceDomainModule,
  ],
  controllers: [
    ReservationController,

    ReservationByUserController,

    ReservationBySpaceController,
  ],
  providers: [],
})
export class ReservationApplicationModule {}
