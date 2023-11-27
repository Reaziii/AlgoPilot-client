import React from 'react'
import ContestNotes from '../Notes'
import { getContestDetails } from '@/lib/contest'

const Notes: React.FC<{ params: { slug: string } }> = async ({ params }) => {
    let description = await getContestDetails(params.slug);
    return (
        <div className='p-[40px]'>
            <ContestNotes description={description.details?.description ?? ""} />
        </div>
    )
}

export default Notes