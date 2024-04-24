import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { SpaceDomainModule } from '../domain'
import { SpaceController } from './space.controller'

@Module({
  imports: [AuthenticationDomainModule, SpaceDomainModule],
  controllers: [SpaceController],
  providers: [],
})
export class SpaceApplicationModule {}
