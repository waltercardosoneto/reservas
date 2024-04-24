export namespace ReservationApplicationEvent {
  export namespace ReservationCreated {
    export const key = 'reservation.application.reservation.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
