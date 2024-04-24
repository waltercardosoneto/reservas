import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from './authentication/domain'
import { AuthorizationDomainModule } from './authorization/domain'

import { UserDomainModule } from './user/domain'

import { NotificationDomainModule } from './notification/domain'

import { SpaceDomainModule } from './space/domain'

import { ReservationDomainModule } from './reservation/domain'

@Module({
  imports: [
    AuthenticationDomainModule,
    AuthorizationDomainModule,
    UserDomainModule,
    NotificationDomainModule,

    SpaceDomainModule,

    ReservationDomainModule,
  ],
  controllers: [],
  providers: [],
})
export class AppDomainModule {}
