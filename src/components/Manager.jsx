import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from "react-toastify"
import { v4 as uuidv4 } from "uuid"

// import "react-toastify/dist/ReactToasty.css"

const Manager = () => {
    const ref = useRef();
    const passwordRef = useRef();
    const [form, setForm] = useState({ site: "", username: "", password: "" });
    const [passwordArray, setPasswordArray] = useState([]);

    useEffect(() => {
        let passwords = localStorage.getItem("passwords")
        let passwordArray;
        if (passwords) {
            setPasswordArray(JSON.parse(passwords))
        }
    }, [])

    const showPassword = () => {
        if (ref.current.src.includes("/icons/eyecross.svg")) {
            ref.current.src = "/icons/eye.svg"
            passwordRef.current.type = "text";
        }
        else {
            ref.current.src = "/icons/eyecross.svg"
            passwordRef.current.type = "password";
        }
    }

    const savePassword = () => {
        setPasswordArray([...passwordArray, {...form, id: uuidv4()}]);
        localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form, id: uuidv4()}]))
        setForm({site: "", username: "", password: ""});
        toast('Password Saved Successfully!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
        // console.log([...passwordArray, form]);
    }

    const deletePassword = (id) => {
        console.log("Deleting password with id: ", id);
        confirm("Do you want to delete this password!!");
        if(confirm){
            setPasswordArray(passwordArray.filter(item=>item.id!==id));
            localStorage.removeItem("passwords", JSON.stringify(passwordArray.filter(item=>item.id!==id)));
            console.log([...passwordArray, form]);
            toast('Password Deleted!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        }
    }

    const editPassword = (id) => {
        console.log("Editing password with id: ", id);
        setForm(passwordArray.filter(item=>item.id===id)[0]);  // Here a password is having 1 id so here is written [0]
        setPasswordArray(passwordArray.filter(item=>item.id!==id));
        // console.log([...passwordArray, form]);
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const copyText = (text) => {
        toast('Copied to Clipboard!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
        navigator.clipboard.writeText(text);
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />

            <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
                <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]">
                </div>
            </div>
            <div className="mycontainer">
                <h1 className='text-4xl font-bold text-center'>
                    <span className='text-green-500'>&lt;</span>
                    Pass
                    <span className='text-green-500'>OP/ &gt;</span>
                </h1>
                <p className='text-center text-green-900 font-semibold'>Your own password manager</p>
                <div className='flex flex-col p-4 gap-8 w-full'>
                    <input value={form.site} onChange={handleChange} placeholder="Enter Website URL" className='bg-white border border-green-600 rounded-full outline-none px-4 py-1 w-full' type="text" name="site" />
                    <div className='flex gap-8 w-full'>
                        <input value={form.username} onChange={handleChange} placeholder="Enter Username" className='bg-white border border-green-600 rounded-full outline-none px-4 py-1 w-full' type="text" name="username" />
                        <div className="relative flex justify-center items-center">
                            <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder="Enter Password" className='bg-white border border-green-600 rounded-full outline-none px-4 py-1 w-full' type="password" name="password" />
                            <span className="absolute right-1 cursor-pointer" onClick={showPassword}><img ref={ref} src="/icons/eyecross.svg" alt="eye" /></span>
                        </div>
                    </div>

                    <button onClick={savePassword} className='bg-green-500 flex justify-center items-center gap-2 px-6 py-2 w-fit m-auto rounded-full hover:bg-green-400 border border-green-900 cursor-pointer'>
                        <lord-icon src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover">
                        </lord-icon>
                        Save Password
                    </button>
                </div>

                <div className="password">
                    <h2 className='font-bold text-2xl py-4'>Your Passwords</h2>

                    {passwordArray.length === 0 && <div>No Passwords to show</div>}
                    {passwordArray.length !== 0 && <table className="table-auto w-full overflow-hidden rounded-md">
                        <thead className='bg-green-800 text-white'>
                            <tr>
                                <th>Site</th>
                                <th>Username</th>
                                <th>Password</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-green-100'>
                            {passwordArray.map((item, index) => {
                                return <tr key={index}>
                                    <td className='text-center w-[400px] py-2 border border-white'>
                                        <div className='flex items-center justify-center gap-5'>
                                        <a href="{item.site}" target="_blank">{item.site}</a>
                                        <lord-icon className="cursor-pointer lordiconcopy" onClick={() => copyText(item.site)} src="https://cdn.lordicon.com/iykgtsbt.json"
                                            trigger="hover"
                                            style={{ "width": "25px", "height": "25px" }}>
                                        </lord-icon>
                                        </div>
                                    </td>
                                    <td className='text-center w-[400px] py-2 border border-white'>
                                        <div className='flex items-center justify-center gap-5'>
                                            <span>{item.username}</span>
                                            <div><lord-icon className="cursor-pointer lordiconcopy" onClick={() => copyText(item.username)} src="https://cdn.lordicon.com/iykgtsbt.json"
                                                trigger="hover"
                                                style={{ "width": "25px", "height": "25px" }}>
                                            </lord-icon></div>
                                        </div>
                                    </td>
                                    <td className='text-center w-[400px] py-2 border border-white'>
                                        <div className='flex items-center justify-center gap-5'>
                                            <span>{item.password}</span>
                                            <div><lord-icon className="cursor-pointer lordiconcopy" onClick={() => copyText(item.password)} src="https://cdn.lordicon.com/iykgtsbt.json"
                                                trigger="hover"
                                                style={{ "width": "25px", "height": "25px" }}>
                                            </lord-icon></div>
                                        </div>
                                    </td>
                                    <td className='text-center w-[400px] py-2 border border-white'>
                                        <div className=' flex gap-4 justify-center items-center'>
                                        <span onClick={() => {editPassword(item.id)}} className='cursor-pointer'>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/gwlusjdu.json"
                                                trigger="hover"
                                                style={{ "width": "25px", "height": "25px" }}>
                                            </lord-icon>
                                        </span>
                                        <span onClick={() => {deletePassword(item.id)}} className='cursor-pointer'>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/skkahier.json"
                                                trigger="hover"
                                                style={{ "width": "25px", "height": "25px" }}>
                                            </lord-icon>
                                        </span>
                                        </div>
                                    </td>
                                </tr>
                            })}


                        </tbody>
                    </table>
                    }
                </div>
            </div >
        </>

    )
}

export default Manager
