// get_problem_slug_from_submission_id, submissionDetails

import serverClient from "@/utils/serverClient"

export const get_problem_slug_from_submission_id = async (id: string): Promise<{ position: number, slug: string } | null> => {
    try {
        let ret = await serverClient.get("/submission/getproblem/" + id);
        return ret.data
    } catch (err) {
        return null;
    }
}

export const submissionDetails = async (id: string) => {
    try {
        let ret = await serverClient.get("/submission/details/" + id);
        return ret.data
    } catch (err) {
        return null;
    }
}