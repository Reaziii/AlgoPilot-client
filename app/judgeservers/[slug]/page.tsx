import React from 'react'
import PCs from './PCs';
import serverClient from '@/utils/serverClient';
const AddServer: React.FC<{ params: { slug: string } }> = async ({ params }) => {


  const handleDeleteOne = async (id: string): Promise<boolean> => {
    "use server"
    return (await serverClient.delete(`/contest/judgeserver/${params.slug}/${id}`)).data
  }

  let tokens: (IJudgeServerToken & { id: string })[] = (await serverClient.get("/contest/judgeserver/" + params.slug)).data
  let v = tokens.map(item => ({ id: String(item.id), name: item.name, slug: item.slug, token: item.token, status: item.status }))
  return (
    <div className='w-full h-[90vh] p-[40px]'>
      <h1 className='font-bold'>Click to copy the Token</h1>
      <p className='mt-[4px]'>Use this token to login from the judge server</p>
      {/* <CopyButton token={token}>
        <a
          className='max-w-[80%] flex flex-wrap h-[100px] text-green-500'
        >{trankedString(token, 50)}</a>
      </CopyButton> */}

      <PCs slug={params.slug} oldTokens={v} handleDelete={handleDeleteOne} />
    </div>
  )
}

export default AddServer