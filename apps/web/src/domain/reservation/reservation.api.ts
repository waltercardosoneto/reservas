import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Reservation } from './reservation.model'

export class ReservationApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Reservation>,
  ): Promise<Reservation[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/reservations${buildOptions}`)
  }

  static findOne(
    reservationId: string,
    queryOptions?: ApiHelper.QueryOptions<Reservation>,
  ): Promise<Reservation> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/reservations/${reservationId}${buildOptions}`,
    )
  }

  static createOne(values: Partial<Reservation>): Promise<Reservation> {
    return HttpService.api.post(`/v1/reservations`, values)
  }

  static updateOne(
    reservationId: string,
    values: Partial<Reservation>,
  ): Promise<Reservation> {
    return HttpService.api.patch(`/v1/reservations/${reservationId}`, values)
  }

  static deleteOne(reservationId: string): Promise<void> {
    return HttpService.api.delete(`/v1/reservations/${reservationId}`)
  }

  static findManyByUserId(
    userId: string,
    queryOptions?: ApiHelper.QueryOptions<Reservation>,
  ): Promise<Reservation[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/users/user/${userId}/reservations${buildOptions}`,
    )
  }

  static createOneByUserId(
    userId: string,
    values: Partial<Reservation>,
  ): Promise<Reservation> {
    return HttpService.api.post(`/v1/users/user/${userId}/reservations`, values)
  }

  static findManyBySpaceId(
    spaceId: string,
    queryOptions?: ApiHelper.QueryOptions<Reservation>,
  ): Promise<Reservation[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/spaces/space/${spaceId}/reservations${buildOptions}`,
    )
  }

  static createOneBySpaceId(
    spaceId: string,
    values: Partial<Reservation>,
  ): Promise<Reservation> {
    return HttpService.api.post(
      `/v1/spaces/space/${spaceId}/reservations`,
      values,
    )
  }
}
