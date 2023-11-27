import client from "@/utils/client";
import { cookies } from "next/headers";

export const hasContestPermission = async (slug: string): Promise<Boolean> => {
    try {
        let ret = await client.post("/contest/checkpermission/" + slug, {}, {
            headers: {
                authorization: cookies().get("token")?.value ?? "",
            }
        })
        if (ret.data.status) return true;
        return false;

    } catch (err) {
        return false;
    }

}