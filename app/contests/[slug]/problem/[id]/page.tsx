import { redirect } from 'next/navigation';
import React from 'react'

import CopyButton from './CopyButton';
import Submit from './Submit';
import ExtraDetails from './ExtraDetails';
import SolvedVsTried from './SolvedVsTried';
import { get_contest_probem_details } from '@/requests/contests';
const Problem: React.FC<{ params: { slug: string, id: string } }> = async ({ params }) => {
  let problem = await get_contest_probem_details(params.slug as string, parseInt(params.id));
  if (!problem.status) {
    redirect("/")
  }
  const handleCodeSubmit = async (formdata: FormData) => {
    "use server"
    // let submission = await submit_solution_contest(params.slug, parseInt(params.id), problem.problem?.slug ?? "", formdata);
    // if (submission.id) {
    //   redirect("/submission/" + submission.id)
    // }
  }
  return (
    <div className='bg-[#F7FAFC] w-full min-h-[100vh] p-[40px] box-border flex justify-between'>
      <div className='w-[70%]'>
        <div className=" bg-white border border-gray-200 rounded-lg shadowp-[20px] p-[20px]">
          <h1 className='font-bold text-[24px]'>{params.id + ". " + problem.problem?.name}</h1>
          <br /><br />
          <div dangerouslySetInnerHTML={{ __html: problem.problem?.statement ?? "" }} />
          <br /><br />
          <h1 className='font-bold'>Input Format: </h1>
          <br />
          <div dangerouslySetInnerHTML={{ __html: problem.problem?.inputFormat ?? "" }} />

          <br /><br />
          <h1 className='font-bold'>Output Format: </h1>
          <br />
          <div dangerouslySetInnerHTML={{ __html: problem.problem?.outputFormat ?? "" }} />
        </div>
        {problem.test_cases?.map((item, key) => (
          <div key={key}>
            <br />
            <div className=" bg-white border border-gray-200 rounded-lg p-[20px]">
              <h1 className='font-bold'>Sample Input #{key + 1}: </h1>
              <br />
              <div className='flex justify-between items-start flex-col'>
                <div className='overflow-hidden'>
                  <div className='flex items-center'>
                    <h1 className='font-bold mr-[10px]'>Input</h1>
                    <CopyButton item={item.input} />
                  </div>
                  <pre>
                    {item.input}
                  </pre>
                </div>
                <div className='w-[50%] mt-[30px]'>
                  <div className='flex items-center'>
                    <h1 className='font-bold mr-[10px]'>Output</h1>
                    <CopyButton item={item.output} />
                  </div>
                  <pre>
                    {item.output}
                  </pre>
                </div>
              </div>
              <br />
              {
                item.explaination && item.explaination.length > 0 && <>
                  <h1 className='font-bold'>Explaination</h1>
                  <div className='mt-[10px]' dangerouslySetInnerHTML={{
                    __html: item.explaination
                  }} />
                </>
              }
            </div></div>
        ))}
      </div>
      <div className='flex flex-col w-[28%]'>
        <ExtraDetails timelimit={`${problem.problem?.timelimit}s`} memorylimit={`${parseInt(problem.problem?.memorylimit ?? "0") / 1000000}MB`} />
        <Submit submitCode={handleCodeSubmit} slug={params.slug} name={problem.problem?.name ?? ""} />
        <br />
        <SolvedVsTried />
      </div>
    </div>
  )
}

export default Problem