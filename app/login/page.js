'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import 'aos/dist/aos.css';
import AOS from 'aos';

export default function Page() {
    const [inputValue, setInputValue] = useState('');
    const history = useRouter();

    const handleChange = (e) => {
        setInputValue(e.target.value);
    };

    useEffect(() => {
        AOS.init()
    }, [])

    const handleSubmit = () => {
        if (inputValue.toLowerCase() === 'chortoq') {
            history.push('/admin');
        } else {
            history.push('/');
        }
    };

    return (
        <div className='flex min-h-screen items-start'>
            <div data-aos-duration="1000" data-aos="zoom-in" className='w-full text-center'>
                <input className='bg-[#1111] text-white w-full border py-4 px-4' placeholder='Admin parolingizni yozing...' type="text" value={inputValue} onChange={handleChange} />
                <button className='border-2 border-white py-2 text-white rounded-md mt-3 px-5' onClick={handleSubmit}>Kirish</button>
            </div>
        </div>
    );
}
