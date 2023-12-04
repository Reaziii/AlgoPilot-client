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

export const checkImAuthor = async (slug: string): Promise<{ status: boolean }> => {
    try {
        let ret = await serverClient.get("/contest/checkiamauthor/" + slug);
        return (ret.data as { status: boolean })

    } catch (err) {
        return { status: false }
    }
}

export const getContestSatus = async (slug: string): Promise<"running" | "finished" | "upcoming" | "error"> => {
    try {
        let ret = await serverClient.get("/contest/conteststatus/" + slug);
        return ret.data;
    }
    catch (err) {
        return "error"
    }
}


export const changePublishMoode = async (slug: string): Promise<Boolean> => {
    try {
        let ret = await serverClient.get("/contest/changepublish/" + slug);
        console.log(ret.data)
        return ret.data as Boolean;

    } catch (err) {
        console.log("failed to update publish mood")
        return false;
    }
}

export const handleDeleteContest = async (slug: string): Promise<Boolean> => {
    try {
        let ret = await serverClient.delete("/contest/" + slug);
        return ret.data as Boolean
    }
    catch (err) {
        return false;
    }
}

export const get_authors = async (slug: string): Promise<IContestAuthors[]> => {
    try {
        let ret = await serverClient.get("/contest/getauthors/" + slug);
        return ret.data
    }
    catch (err) {
        return []
    }
}

export const update_contest = async (slug: string, formdata: FormData): Promise<{ status: boolean, message: string, slug?: string }> => {
    try {
        let req = await serverClient.put("/contest/" + slug, {
            name: formdata.get("contestname"),
            date: formdata.get("date"),
            time: formdata.get("time"),
            length: formdata.get("length"),
            announcement: formdata.get("announcement"),
            description: formdata.get("description"),
            authors: formdata.get("authors")

        });
        return req.data;
    }
    catch (err) {
        console.log(err)
        return { status: false, message: "Unknown error" }
    }
}


export const get_contest_probem_details = async (slug:string, position:number):Promise<{ status: boolean, problem?: IProblem, test_cases?: ITestcase[]  }>=>{
    try{
        let ret = await serverClient.get(`/contest/problemdetails/${slug}/${position}`);
        return ret.data
    }
    catch(err)
    {
        return {status : false}
    }
}