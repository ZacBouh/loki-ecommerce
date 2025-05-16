
export type User = {
  _id?: string  // facultatif si l'utilisateur n'est pas encore créé
  name: string
  email: string
  password: string
  isAdmin: boolean
}