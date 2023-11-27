import Loader from '@/components/Loader';
import { all_published_contest } from '@/requests/contests'
import { convertMinutesToHoursAndMinutes, formatDate } from '@/utils/utils';

import React from 'react'
import { CiCalendar, CiClock1 } from "react-icons/ci";

const MyContests = async () => {
	let contests = await all_published_contest();
	return (
		<div>
			<div className="w-full h-[80px] bg-white font-bold text-black text-[26px] flex items-center pl-[100px]">
				Contests
			</div>

			<div
				style={{
					width: "calc(100% - 100px)"
				}}
				className='mt-[40px]'>
				{
					contests.contests.map((item, key) => (
						<a key={key} href={"/contests/" + item.slug}>
							<div key={key} className='bg-white ml-[100px] mb-[20px] h-[100px] border shadowp-[20px] rounded-lg p-[20px]'>
								<h1 className='text-[20px] font-medium'>{item.name}</h1>
								<div className="flex mt-[5px]">
									<div className='flex items-center'><CiCalendar size={20} /><p className='ml-[6px] text-[14px] text-gray-700'>{formatDate(item.date, item.time)}</p></div>
									<div className='flex items-center ml-[10px]'><CiClock1 size={20} /><p className='ml-[6px] text-[14px] text-gray-700'>{convertMinutesToHoursAndMinutes(parseInt(item.len))}</p></div>
								</div>
							</div>
						</a>
					))
				}
			</div>

		</div>
	)
}

export default MyContests