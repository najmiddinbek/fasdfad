"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image"
import { toast } from "react-toastify";




export default function EditTopicForm({ id, date, time, telefon, isChecked }) {
    const [newDate, setNewDate] = useState(date);
    const [newTime, setNewTime] = useState(time);
    const [newTelefon, setNewTelefon] = useState(telefon);
    const [telefonUpdated, setTelefonUpdated] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [generatedNumber, setGeneratedNumber] = useState("9860123456781234");


    const router = useRouter();

    const handleCopyClick = async (e) => {
        e.preventDefault();

        const copiedText = `${generatedNumber}`;
        try {
            await navigator.clipboard.writeText(copiedText);
            toast.success('Karta raqami qurilma xotirasiga saqlandi', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } catch (error) {
            console.error('Failed to copy text: ', error);
            toast.error('Copy failed. Please try again.');
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();



        try {
            if (formSubmitted) {
                console.log("Form has already been submitted");
                return;
            }
            if (telefonUpdated) {
                console.log("Telefon has already been updated");
                return;
            }

            const res = await fetch(`/api/topics/${id}`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ newDate, newTime, newTelefon }),
            });

            if (!res.ok) {
                throw new Error("Failed to update topic");
            }

            setTelefonUpdated(true);
            setFormSubmitted(true);

            router.refresh();
            router.push("/");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 min-h-screen">
            <p className="text-white">Siz {newDate} kuni soat {newTime} ga stadionni band qilmoqchimisiz? Telefon raqamingizni yozib qoldiring!!!</p>
            <input type="number" className="py-2 text-white px-2 border-2 bg-[#1111] rounded-md" placeholder="Telefon raqamingizni yozing..." onChange={(e) => setNewTelefon(e.target.value)} value={newTelefon} />

            <div>
                <h6 className='mt-3 text-white'>Pastdagi karta raqamga <span className='text-red-600'>
                    150,000 so`m</span> to`lov qilishingiz kerak bo`ladi,hamda to`lov skrinshotini yuboring.</h6>
                <div className='flex justify-between mt-3'>
                    <h1 className="text-2xl mt-2 mb-3 lg:text-4xl font-bold text-white">{generatedNumber}</h1>
                    <button className='text-xl lg:text-5xl  cursor-pointer text-white' onClick={handleCopyClick}>Nusxa</button>
                </div>
            </div>


            <button className="green">Buyurtma berish</button>
        </form>

    );
}

