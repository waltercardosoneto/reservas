export namespace SpaceApplicationEvent {
  export namespace SpaceCreated {
    export const key = 'space.application.space.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
