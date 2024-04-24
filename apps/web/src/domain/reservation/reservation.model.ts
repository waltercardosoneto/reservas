import { User } from '../user'

import { Space } from '../space'

export class Reservation {
  id: string

  startTime: string

  endTime: string

  status: string

  userId: string

  user?: User

  spaceId: string

  space?: Space

  dateCreated: string

  dateDeleted: string

  dateUpdated: string
}
