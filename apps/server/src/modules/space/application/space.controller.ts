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
import { Space, SpaceDomainFacade } from '@server/modules/space/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { SpaceApplicationEvent } from './space.application.event'
import { SpaceCreateDto, SpaceUpdateDto } from './space.dto'

@Controller('/v1/spaces')
export class SpaceController {
  constructor(
    private eventService: EventService,
    private spaceDomainFacade: SpaceDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.spaceDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: SpaceCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.spaceDomainFacade.create(body)

    await this.eventService.emit<SpaceApplicationEvent.SpaceCreated.Payload>(
      SpaceApplicationEvent.SpaceCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:spaceId')
  async findOne(@Param('spaceId') spaceId: string, @Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.spaceDomainFacade.findOneByIdOrFail(
      spaceId,
      queryOptions,
    )

    return item
  }

  @Patch('/:spaceId')
  async update(
    @Param('spaceId') spaceId: string,
    @Body() body: SpaceUpdateDto,
  ) {
    const item = await this.spaceDomainFacade.findOneByIdOrFail(spaceId)

    const itemUpdated = await this.spaceDomainFacade.update(
      item,
      body as Partial<Space>,
    )
    return itemUpdated
  }

  @Delete('/:spaceId')
  async delete(@Param('spaceId') spaceId: string) {
    const item = await this.spaceDomainFacade.findOneByIdOrFail(spaceId)

    await this.spaceDomainFacade.delete(item)

    return item
  }
}
