import serverClient from "@/utils/serverClient"

export const getContestDetails = async (slug: string): Promise<{ status: boolean, details?: IContest }> => {
    try {

        let ret = await serverClient.get("/contest/getdetails/" + slug);
        if (!ret.data.status) {
            return { status: false }
        }
        return { status: true, details: ret.data.details }

    }
    catch (err) {
        return { status: false }
    }
}

export const get_problems = async (slug: string): Promise<{ problems: IProblem[] }> => {
    try {
        let ret = await serverClient.get("/contest/getproblems/" + slug);
        return ret.data;
    }
    catch (err) {
        console.log(err)
        return { problems: [] }
    }
}


export const add_problem = async (slug: string, problems: { slug: string, position: number }[]): Promise<Boolean> => {
    console.log('started')
    try {
        let ret = await serverClient.post("/contest/addproblems/" + slug, {
            problems
        });
        return ret.data.status;
    } catch (err) {
        return false;
    }
}

export const all_published_contest = async (): Promise<{ contests: IContest[] }> => {
    try {

        let ret = await serverClient.get("/contest/published");
        let contest: IContest[] = ret.data.contests
        return { contests: contest }
    } catch (err) {
        return { contests: [] };
    }
}

export const my_contests = async (email: string): Promise<{ contests: IContest[] }> => {
    try {
        let ret = await serverClient.get("/contest/my");
        let contest: IContest[] = ret.data.contests
        return { contests: contest }
    } catch (err) {
        console.log(err);
        return { contests: [] };
    }
}