import { AuthorizationRole as AuthorizationRoleModel } from './authorization/authorization.model'

import { User as UserModel } from './user/user.model'

import { Notification as NotificationModel } from './notification/notification.model'

import { Space as SpaceModel } from './space/space.model'

import { Reservation as ReservationModel } from './reservation/reservation.model'

export namespace Model {
  export class AuthorizationRole extends AuthorizationRoleModel {}

  export class User extends UserModel {}

  export class Notification extends NotificationModel {}

  export class Space extends SpaceModel {}

  export class Reservation extends ReservationModel {}
}
