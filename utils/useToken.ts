"use server"
import { cookies } from "next/headers"
import client from "./client";
interface IToken {
    isLoogedIn: boolean;
    name: string;
    email: string;
    token: string;
    permissions: IPermission
}
const useToken = async (): Promise<IToken> => {
    try {
        const token = cookies().get("token")?.value;
        const user = await client.post("/user/check", { token })
        return user.data as IToken
    }
    catch (err) {
        return { isLoogedIn: false, name: "", email: "", token: "", permissions: { admin: false, create_contest: false, create_problem: false } }
    }
}

export default useToken