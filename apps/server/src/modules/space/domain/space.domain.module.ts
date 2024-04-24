import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { SpaceDomainFacade } from './space.domain.facade'
import { Space } from './space.model'

@Module({
  imports: [TypeOrmModule.forFeature([Space]), DatabaseHelperModule],
  providers: [SpaceDomainFacade, SpaceDomainFacade],
  exports: [SpaceDomainFacade],
})
export class SpaceDomainModule {}
