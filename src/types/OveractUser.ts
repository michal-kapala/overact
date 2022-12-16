import { User } from "next-auth"

/**
 * Extension of NextAuth's user data returned to the client.
 */
export interface OveractUser extends User {
	role: string
}
