import client from '@/utils/client'
import React from 'react'
import Single from './Single';

const Standings: React.FC<{ params: { slug: string } }> = async ({ params }) => {
    let data = (await client.get("/contest/standings/" + params.slug)).data;
    let Standings: {
        submissions: { total_submit: number, penalty: number, status: boolean, delay: number }[],
        penalty: number,
        email: string,
        name: string,
        ac: number
    }[] = data.standings;
    let total: number = data.totalProblem;
    return (
        <div className='flex flex-col items-center p-[40px]'>
            <h1 className='text-[26px] font-bold'>Standings</h1>
            <br />
            <br />
            <div className="relative overflow-x-auto w-full bg-white">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
                        <tr>
                            <th scope="col" className="px-6 py-3 w-[20px]">
                                #
                            </th>
                            <th scope="col" className="px-6 py-3 w-[300px]">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3 w-[100px]">

                            </th>
                            {
                                new Array(total).fill(null).map((item, key) => (
                                    <th key={key} scope="col" className="px-6 py-3 w-[100px] text-center">
                                        {key + 1}
                                    </th>
                                ))
                            }
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Standings.map((item, key) => (
                                <tr key={key} className="bg-white border-b  ">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap w-[20px]">
                                        {key + 1}
                                    </th>
                                    <td className="px-6 py-4 w-[300px]">
                                        {item.name}
                                    </td>
                                    <td className="px-6 py-4 w-[100px]">
                                        {
                                            <Single color='#419AD8' up={item.ac} down={item.penalty} />
                                        }
                                    </td>

                                    {
                                        item.submissions.filter((el, key) => (key >= 1 && key <= total)).map((el, key) => (
                                            <td className="px-6 py-4 w-[100px]">
                                                {el.total_submit >= 1 && el.status === true && <Single key={key} color={el.status ? '#32BC7A' : '#F23030'} up={el.total_submit} down={el.penalty} />}
                                                {el.total_submit >= 1 && el.status === false && <Single key={key} color={el.status ? '#32BC7A' : '#F23030'} up={""} down={el.total_submit} />}

                                            </td>
                                        ))
                                    }
                                    <td />
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>





        </div>
    )
}

export default Standings