import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Space } from './space.model'

export class SpaceApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Space>,
  ): Promise<Space[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/spaces${buildOptions}`)
  }

  static findOne(
    spaceId: string,
    queryOptions?: ApiHelper.QueryOptions<Space>,
  ): Promise<Space> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/spaces/${spaceId}${buildOptions}`)
  }

  static createOne(values: Partial<Space>): Promise<Space> {
    return HttpService.api.post(`/v1/spaces`, values)
  }

  static updateOne(spaceId: string, values: Partial<Space>): Promise<Space> {
    return HttpService.api.patch(`/v1/spaces/${spaceId}`, values)
  }

  static deleteOne(spaceId: string): Promise<void> {
    return HttpService.api.delete(`/v1/spaces/${spaceId}`)
  }
}
