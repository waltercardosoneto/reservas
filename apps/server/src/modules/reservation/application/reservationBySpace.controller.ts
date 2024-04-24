import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { ReservationDomainFacade } from '@server/modules/reservation/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { ReservationApplicationEvent } from './reservation.application.event'
import { ReservationCreateDto } from './reservation.dto'

import { SpaceDomainFacade } from '../../space/domain'

@Controller('/v1/spaces')
export class ReservationBySpaceController {
  constructor(
    private spaceDomainFacade: SpaceDomainFacade,

    private reservationDomainFacade: ReservationDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/space/:spaceId/reservations')
  async findManySpaceId(
    @Param('spaceId') spaceId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.spaceDomainFacade.findOneByIdOrFail(spaceId)

    const items = await this.reservationDomainFacade.findManyBySpace(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/space/:spaceId/reservations')
  async createBySpaceId(
    @Param('spaceId') spaceId: string,
    @Body() body: ReservationCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, spaceId }

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
