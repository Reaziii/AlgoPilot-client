import { get_problem_slug_from_submission_id, submissionDetails } from '@/requests/submission'
import useToken from '@/utils/useToken';
import { timeAgo, trankedString } from '@/utils/utils';
import { redirect } from 'next/navigation'
import React from 'react'
import Verdict from './Verdict';
import Download from './download';
import TestCases from './TestCases';

const Submission: React.FC<{ params: { id: string } }> = async ({ params }) => {
    let details = await submissionDetails(params.id);
    console.log(details)
    let token = await useToken();
    if (!details || !details?.status) redirect("/")
    let problemlink = await get_problem_slug_from_submission_id(params.id);
    return (
        <div className='p-[40px]'>
            <div className="border bg-white h-[60px] rounded-lg flex justify-between items-center px-[20px]">
                <Download text={trankedString(params.id, 10)} data={details?.submission?.code ?? ""} filetype='c++' />
                <p>{timeAgo(details?.submission?.submission_time ?? new Date())}</p>
                <p>{token.name}</p>
                <a target='_blank' href={problemlink ? `/contests/${problemlink.slug}/problem/${problemlink.position}` : ""} className="text-blue-500">{details?.problem?.name}</a>
                <p>{details?.submission?.language}</p>
                <Verdict _status={details?.submission.status} submission_id={params.id} />
                <p>{(details.submission.status.time/1000).toFixed(2)??0}s</p>
                <p>{(details.submission.status.memory/1000).toFixed(2)??0}MB</p>

            </div>
            <TestCases _testcases={details?.submission.testcases ?? []} submission_id={params.id} />
        </div>
    )
}

export default Submission