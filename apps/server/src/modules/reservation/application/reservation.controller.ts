import { Request } from 'express'

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common'
import { EventService } from '@server/libraries/event'
import {
  Reservation,
  ReservationDomainFacade,
} from '@server/modules/reservation/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { ReservationApplicationEvent } from './reservation.application.event'
import { ReservationCreateDto, ReservationUpdateDto } from './reservation.dto'

@Controller('/v1/reservations')
export class ReservationController {
  constructor(
    private eventService: EventService,
    private reservationDomainFacade: ReservationDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.reservationDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: ReservationCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.reservationDomainFacade.create(body)

    await this.eventService.emit<ReservationApplicationEvent.ReservationCreated.Payload>(
      ReservationApplicationEvent.ReservationCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:reservationId')
  async findOne(
    @Param('reservationId') reservationId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.reservationDomainFacade.findOneByIdOrFail(
      reservationId,
      queryOptions,
    )

    return item
  }

  @Patch('/:reservationId')
  async update(
    @Param('reservationId') reservationId: string,
    @Body() body: ReservationUpdateDto,
  ) {
    const item =
      await this.reservationDomainFacade.findOneByIdOrFail(reservationId)

    const itemUpdated = await this.reservationDomainFacade.update(
      item,
      body as Partial<Reservation>,
    )
    return itemUpdated
  }

  @Delete('/:reservationId')
  async delete(@Param('reservationId') reservationId: string) {
    const item =
      await this.reservationDomainFacade.findOneByIdOrFail(reservationId)

    await this.reservationDomainFacade.delete(item)

    return item
  }
}
