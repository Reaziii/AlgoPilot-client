"use client"
import client from '@/utils/client';
import React, { useEffect, useRef, useState } from 'react'

const AddAuthors = () => {
    const [authors, setAuthors] = useState<string>("");
    const [finalAuthors, setFinalAuthors] = useState<{ name: string; email: string; found: boolean }[]>([]);
    const [_authors, _setAuthors] = useState("");
    let ref = useRef<AbortController>();
    const checkAuthors = async () => {

        ref.current?.abort();
        ref.current = new AbortController();
        if (authors.length === 0) {
            setFinalAuthors([])
            return
        }
        client.post("/user/checkforauthors", {
            authors
        }, {
            signal: ref.current?.signal
        }).then(res => {
            if (res.data.status) {
                setFinalAuthors([...res.data.result])
                let str: string[] = [];
                finalAuthors.forEach(item => {
                    if (item.found) {
                        str.push(item.email)
                    }
                })
                _setAuthors(str.join(","));
            }
        }).catch(err => {

        })

        return 0;
    };
    useEffect(() => {
        checkAuthors();
    }, [authors])
    return (
        <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">Authors:</label>
            <input  name='authors' value={authors} onChange={e => setAuthors(e.target.value)} id="first_name" className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder='authors ex: author1@gmail.com, author2@gmail.com' />
            <br />
            <div className='flex flex-wrap gap-2'>
                {
                    finalAuthors.map((item, key) => (<p key={key} style={{
                        color: item.found ? "#4CAF50" : "#FF69B4"
                    }}>{item.found ? item.name : item.email}</p>))
                }
            </div>
        </div>
    )
}

export default AddAuthors