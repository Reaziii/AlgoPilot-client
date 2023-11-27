import React from 'react'
import Problems from './Problems'
import { getContestDetails, get_problems, add_problem } from '@/requests/contests'
import { redirect } from 'next/navigation'
import { hasContestPermission } from '@/lib/user'
const AddProblems: React.FC<{ params: { slug: string } }> = async ({ params }) => {
    let isAuthor = await hasContestPermission(params.slug)
    if (!isAuthor) return redirect("/")
    let details = await getContestDetails(params.slug);
    if (!details.status) return redirect("/")
    let problems: IProblem[] = (await get_problems(params.slug)).problems;
    const handleSubmit = async (problems: { slug: string, position: number }[]) => {
        "use server";
        await add_problem(params.slug, problems);
        return redirect("/addproblems/" + params.slug)
    }
    return (
        <div className='flex justify-between'>
            <div className="p-[20px] w-full">
                <div className='w-full min-h-[90vh] bg-white border border-gray-200 shadowp-[20px] p-[20px] rounded-lg'>
                    {
                        !details.status || !isAuthor ? <div className='flex items-center justify-center h-[60vh] w-full'><h1 className='font-bold text-[24px]'>Contest Not found!</h1></div> :
                            <Problems handleSubmit={handleSubmit} _problems={problems.map(item => ({ name: item.name, slug: item.slug, position: item.position }))} />
                    }
                </div>
            </div>
        </div >
    )
}

export default AddProblems