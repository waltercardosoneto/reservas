import { Module } from '@nestjs/common'
import { SocketModule } from '@server/libraries/socket'
import { AuthorizationDomainModule } from '@server/modules/authorization/domain'
import { NotificationDomainModule } from '../domain'

import { NotificationSpaceSubscriber } from './subscribers/notification.space.subscriber'

import { NotificationReservationSubscriber } from './subscribers/notification.reservation.subscriber'

@Module({
  imports: [AuthorizationDomainModule, NotificationDomainModule, SocketModule],
  providers: [NotificationSpaceSubscriber, NotificationReservationSubscriber],
  exports: [],
})
export class NotificationInfrastructureModule {}
