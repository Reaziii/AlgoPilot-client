"use client"
import { trankedString } from '@/utils/utils';
import React, { useContext, useState } from 'react'
import CopyButton from './CopyButton';
import { GrCopy } from "react-icons/gr";
import Status from './Status';
import { LoadingContest } from '@/providers/Loading';
import client from '@/utils/client';

const PCs: React.FC<{ slug: string, oldTokens: (IJudgeServerToken & { id: string })[], handleDelete: (id: string) => Promise<boolean> }> = ({ oldTokens, handleDelete, slug }) => {
  const { setLoading } = useContext(LoadingContest)
  let [newTokens, setNewTokens] = useState<(IJudgeServerToken & { id: string })[]>([...oldTokens]);
  let [newTokenNames, setNewTokenNames] = useState<{ [key: number]: string }>({})
  const addNewRow = () => {
    setNewTokens([...newTokens, {
      token: "",
      slug: "",
      name: "",
      status: false,
      id: ""
    }]);
  }

  const generate = async (id: number) => {
    try {
      setLoading(true);
      let ret = await client.post("/contest/judgeserver/" + slug, {
        pcname: newTokenNames[id]
      });
      setLoading(false)
      let res = ret.data
      if (res === null) return;
      let temp = newTokens;
      temp[id] = res;
      setNewTokens([...temp])
    } catch (err) {
      setLoading(false)
    }
  }

  const _handleDelete = async (id: number) => {
    setLoading(true);
    handleDelete(newTokens[id].id).then(s => {
      setLoading(false);
      console.log("[deleted]", s)
      if (s) {
        let temp = newTokens;
        temp.splice(id, 1);
        setNewTokens([...temp])
      }
    }).catch(() => {
      setLoading(false);
    });
  }


  return (
    <div className='mt-[40px]'>
      <div className="relative overflow-x-auto">
        <div className='flex justify-end items-center mb-[20px]'>
          <button onClick={addNewRow} className="bg-blue-500 text-white px-6 py-2 rounded-lg">Add new row</button>
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-200  ">
            <tr>
              <th scope="col" className="px-6 py-3 w-[40%]">
                Token
              </th>
              <th scope="col" className="px-6 py-3">
                PC name
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {

              newTokens.map((item, key) => (
                <tr key={key} className="bg-white border-b  ">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap w-[4">
                    <CopyButton token={item.token}>
                      <div title="click to copy" className="flex items-center gap-2">
                        <GrCopy color="black" /><p className="text-blue-500 flex"> {trankedString(item.token, 50)}</p>
                      </div>
                    </CopyButton>
                  </th>
                  <td className="px-6 py-4">
                    <input readOnly={item.id.length ? true : false} value={item.id.length ? item.name : newTokenNames[key]} onChange={(e) => setNewTokenNames({ ...newTokenNames, [key]: e.target.value })} className='border h-[35px] border-gray-500 rounded-lg pl-[5px]' placeholder='ex: pc-1' />
                  </td>
                  <td className="px-6 py-4">
                    {
                      item.id.length ? <button onClick={() => _handleDelete(key)} className='border border-red-600 text-red-600 px-4 py-2 rounded-lg bg-red-100'>Delete PC</button> :
                        <button onClick={() => generate(key)} className='border border-green-600 text-green-600 px-4 py-2 rounded-lg bg-green-100'>Save PC</button>
                    }
                  </td>
                  <td className="px-6 py-4">
                    <Status token={item.token} />
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default PCs