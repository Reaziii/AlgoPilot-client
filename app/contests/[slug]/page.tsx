import { changePublishMoode, checkImAuthor, getContestDetails, getContestSatus, get_problems, handleDeleteContest } from '@/requests/contests'
import { redirect } from 'next/navigation'
import React from 'react'
import Timer from './Timer'
import { addDateAndTime } from '@/utils/utils'
import { CiCalendar, CiClock1 } from "react-icons/ci";
import { convertMinutesToHoursAndMinutes, formatDate } from '@/utils/utils';
import RunningTimer from './RunningTimer'
import ContestNav from './Nav'
import ContestNotes from './Notes'
const Contest: React.FC<{ params: { slug: string } }> = async ({ params }) => {
	let isAuthor = (await checkImAuthor(params.slug)).status
	let details = await getContestDetails(params.slug)
	if (!details.details) return redirect("/")
	const handleChangePublishMode = async () => {
		"use server"
		let res = await changePublishMoode(params.slug);
		if (res)
			redirect("/contests/" + params.slug)
	}

	const handleDelete = async () => {
		"use server"
		let res = await handleDeleteContest(params.slug);
		if (res)
			redirect("/contests/" + params.slug)
	}
	let problems = (await get_problems(params.slug)).problems;
	let dist = addDateAndTime(details.details.date, details.details.time).getTime() - new Date(Date.now()).getTime();
	if (dist <= 0) dist = 0;
	if (dist !== 0) problems = [];
	let contestStatus = await getContestSatus(params.slug)
	console.log(contestStatus)
	if (contestStatus === "error") {
		return redirect("/")
	}
	problems = problems.sort((a: IProblem, b: IProblem) => {
		if (a.position > b.position) return 1;
		return -1;
	})
	return (
		<div className='px-[50px] box-border'>
			{
				isAuthor && <div className='w-[100%] mt-[10px] h-[50px] bg-white mb-[10px] border shadowp-[20px] rounded-md flex justify-end items-center gap-1 pr-[2px] '>
					<a target='_blank' className='border px-3 py-2 rounded-sm hover:bg-[#F7FAFC]' href={`/addproblems/${params.slug}`}>
						Problems
					</a>
					<a href={`/updatecontest/${params.slug}`} className='border px-3 py-2 rounded-sm hover:bg-[#F7FAFC]'>
						Update
					</a>
					<a href={`/contest/judgeservers/${params.slug}`} className='border px-3 py-2 rounded-sm hover:bg-[#F7FAFC]'>
						Judge Servers
					</a>
					<form action={handleDelete}>
						<button type='submit' className='border px-3 py-2 rounded-sm hover:bg-[#F7FAFC]'>
							Delete
						</button>
					</form>
					<form action={handleChangePublishMode}>
						<button type='submit' className='border px-3 py-2 rounded-sm hover:bg-[#F7FAFC]' >
							{!details.details?.published ? "Publish Contest" : "Unpublish Contest"}
						</button>
					</form>
				</div>
			}



			{
				contestStatus === "upcoming" ? <>
					<Timer name={details.details?.name ?? ""} currentDate={details.details?.date ?? ""} currentTime={details.details?.time ?? ""} />
					<div>
						<ContestNotes description={details.details?.description} />
					</div>
				</> :
					<>
						<ContestNav slug={details.details.slug} />
						<div className='flex justify-between'>
							<ShowProblems problems={[...problems]} slug={params.slug} />
							<div className='flex flex-col w-[33%]'>
								<div className='bg-white mb-[10px] min-h-[100px] border shadowp-[20px] rounded-lg p-[20px] mt-2'>
									<h1 className='text-[20px] font-medium'>{details.details.name}</h1>
									<div className="flex mt-[5px]">
										<div className='flex items-center'><CiCalendar size={20} /><p className='ml-[6px] text-[14px] text-gray-700'>{formatDate(details.details.date, details.details.time)}</p></div>
										<div className='flex items-center ml-[10px]'><CiClock1 size={20} /><p className='ml-[6px] text-[14px] text-gray-700'>{convertMinutesToHoursAndMinutes(parseInt(details.details.len))}</p></div>
									</div>
								</div>
								<RunningTimer date={details.details.date} time={details.details.time} length={details.details.len} className="bg-white border shadowp-[20px] h-[120px] w-full rounded-lg flex justify-center items-center" />
							</div>
						</div>
					</>
			}
		</div>
	)
}

const ShowProblems: React.FC<{ problems: IProblem[], slug: string }> = ({ problems, slug }) => {
	return <div className='w-[65%] '>
		{
			problems.map((item, key) => (<a target='_blank' href={`/contests/${slug}/problem/${item.position}`} key={key} className='h-[80px] w-[100%] bg-white border shadowp-[20px] rounded-lg flex items-center border-r-4 border-r-green-400 mt-2'>
				<h1 className='ml-[20px] font-bold font-code text-[24px]'>{item.position}</h1>
				<h1 className='ml-[20px] font-bold text-[20px]'>{item.name}</h1>
			</a>))
		}
	</div>
}





export default Contest