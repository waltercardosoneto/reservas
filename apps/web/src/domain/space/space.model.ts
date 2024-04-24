import { Reservation } from '../reservation'

export class Space {
  id: string

  name: string

  location: string

  capacity: number

  description?: string

  dateCreated: string

  dateDeleted: string

  dateUpdated: string

  reservations?: Reservation[]
}
