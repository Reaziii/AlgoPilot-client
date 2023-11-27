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
    let token = await useToken();

    if (!details.status) redirect("/")
    let problemlink = await get_problem_slug_from_submission_id(params.id);
    const download = () => {
        "use client"
    }
    return (
        <div className='p-[40px]'>
            <div className="border bg-white h-[60px] rounded-lg flex justify-between items-center px-[20px]">
                <Download text={trankedString(params.id, 10)} data={details.submission?.code ?? ""} filetype='c++' />
                <p>{timeAgo(details.submission?.submission_time ?? new Date())}</p>
                <p>{token.name}</p>
                <a target='_blank' href={problemlink?`/contests/${problemlink.slug}/problem/${problemlink.position}` :""} className="text-blue-500">{details.problem?.name}</a>
                <p>{details.submission?.language}</p>
                <Verdict submission_id={params.id} />
                <p>0.00s</p>
                <p>0.00MB</p>

            </div>
            <TestCases submission_id={params.id} />
        </div>
    )
}

export default Submission