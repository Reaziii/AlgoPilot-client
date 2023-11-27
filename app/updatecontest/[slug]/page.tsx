import { getContestDetails, get_authors, update_contest } from '@/requests/contests';
import AddAuthors from './AddAuthors';
import { redirect } from 'next/navigation';
import Description from './Description';
import Form from '@/components/Form';
const UpdateContest: React.FC<{ params: { slug: string } }> = async ({ params }) => {
    const handleSubmit = async (formdata: FormData) => {
        "use server"
        await update_contest(params.slug, formdata)
    }
    let details = await getContestDetails(params.slug);
    if (!details) {
        return redirect("/")
    }
    let authors = await get_authors(params.slug);
    return (
        <div className='flex justify-between'>
            <div className='p-[40px] box-border w-full'>
                <Form action={handleSubmit} className='w-full bg-white border border-gray-200 shadowp-[20px] p-[20px] rounded-lg'>
                    <h1 className='font-bold text-[20px]'>Create New Contest</h1>
                    <br />
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900">Contest Name</label>
                        <input defaultValue={details.details?.name} name='contestname' type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  " placeholder="Contest name ex:ACM ICPC Regional 2023" required />
                    </div>
                    <br />
                    <div className="flex justify-between">
                        <div className='w-[48%]'>
                            <label className="block mb-2 text-sm font-medium text-gray-900">Contest Start Date:</label>
                            <input defaultValue={details.details?.date} name='date' type="date" id="first_name" className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                        </div>
                        <div className='w-[48%]'>
                            <label className="block mb-2 text-sm font-medium text-gray-900">Contest Start Time:</label>
                            <input defaultValue={details.details?.time} name='time' type="time" id="first_name" className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                        </div>
                    </div>
                    <br />

                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900">Contest Length in minutes:</label>
                        <input defaultValue={details.details?.len} name='length' type="number" id="first_name" className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[48%] p-2.5" placeholder='Enter Contest length in minutes' required />
                    </div>
                    <br />

                    <br />
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900">Description:</label>
                        <Description description={details.details?.description ?? ""} />
                    </div>
                    <br />
                    <AddAuthors authors__={authors.map(item => item.email).join(",")} />
                    <br />
                    <div className="flex justify-end">
                        <button type="submit" className="text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-green-600 w-[150px]">Save</button>
                    </div>

                </Form>
            </div>
        </div>
    )
}

export default UpdateContest