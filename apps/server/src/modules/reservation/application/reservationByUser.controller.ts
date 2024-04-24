import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { ReservationDomainFacade } from '@server/modules/reservation/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { ReservationApplicationEvent } from './reservation.application.event'
import { ReservationCreateDto } from './reservation.dto'

import { UserDomainFacade } from '../../user/domain'

@Controller('/v1/users')
export class ReservationByUserController {
  constructor(
    private userDomainFacade: UserDomainFacade,

    private reservationDomainFacade: ReservationDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/user/:userId/reservations')
  async findManyUserId(
    @Param('userId') userId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.userDomainFacade.findOneByIdOrFail(userId)

    const items = await this.reservationDomainFacade.findManyByUser(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/user/:userId/reservations')
  async createByUserId(
    @Param('userId') userId: string,
    @Body() body: ReservationCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, userId }

    const item = await this.reservationDomainFacade.create(valuesUpdated)

    await this.eventService.emit<ReservationApplicationEvent.ReservationCreated.Payload>(
      ReservationApplicationEvent.ReservationCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
