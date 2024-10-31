export interface User {
  uid: string
  email: string | undefined
  displayName: string | undefined
  photoURL: string | undefined
}

export interface UserResponse {
  message: string
  user: User
}
