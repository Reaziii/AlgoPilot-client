interface IProblem {
    name: string;
    statement: string;
    outputFormat: string;
    inputFormat: string;
    createdBy: string;
    slug: string;
    customChecker: string;
    enableCustomChecker: boolean;
    timelimit: string;
    memorylimit: string;
    position: number;
}



interface ITestcase {
    slug: string;
    input: string;
    output: string;
    isSample: boolean;
    explaination: string;
}

interface IContest {
    name: string;
    slug: string;
    date: string;
    time: string;
    len: string;
    announcement: string;
    description: string;
    createdBy: string;
    published: boolean;
};

interface IContestAuthors {
    slug: string;
    email: string;
}

interface IProblemAuthors {
    slug: string;
    email: string;
}


interface IPermission {
    admin: boolean;
    create_contest: boolean;
    create_problem: boolean;
}

interface IUser {
    name: string;
    email: string;
    password: string;
    permission: IPermission
}

interface IContestProblem {
    problemSlug: string;
    contestSlug: string;
    position: number;
}

interface IClarification {
    comment: string;
    parent: string;
    user: string;

}

interface ISubmission {
    code: string;
    language: string;
    submission_time: Date;
    user: string;
    problemSlug: string;
    status: { status: number, color: string, text: string };
}

interface IContestSubmission {
    contsetSlug: string;
    submission_id: string;
    position: number;
    user: string;
}
interface SubmissionStatus {
    status: number, color: string, text: string
}

interface IJudgeServerToken {
    token: string;
    name: string;
    slug: string;
    status: boolean;
}
