'use client';
import React, { useState } from 'react'

function RegisterLogin() {
    let data;
    const [signature, setsignature] = useState('');
    async function upload(event) {
        event.preventDefault();
        try {
            const targets = event.currentTarget;
            const uploaddata = new FormData();
            uploaddata.append("clgid", targets.id.value);
            // uploaddata.append("logo", targets.logo.files[0]);
            console.log(uploaddata.get("clgid"))
            // console.log(uploaddata.get("logo"))
            const response = await fetch('http://localhost:8000/login', {
                method: 'POST',
                body: uploaddata,

            })

            if (!response.ok) {
                throw new Error('Failed to submit the data. Please try again.')
            }

            // Handle response if necessary
            data = await response.json()
            console.log(data);
            sessionStorage.setItem("id", data.id)
            window.location.reload();
        } catch (error) {
            console.log(error);

        }

    }

    async function register(event) {
        event.preventDefault();
        try {
            // working            
            const targets = event.currentTarget;
            // // console.log(targets.logo.files[0].name);
            // const formData = {
            //     name: targets.name.value,
            //     phone: targets.phone.value,
            //     email: targets.email.value,
            //     signatory: targets.signatory.value,
            //     address: targets.address.value,

            // }

            // logo: targets.logo.files[0] // not this
            // const json = JSON.stringify(formData);

            const formData = new FormData();
            formData.append("logo", targets.logo.files[0], targets.logo.files[0].name);
            console.log(formData.get('logo'))
            formData.append("name", targets.name.value);
            formData.append("address", targets.address.value);
            formData.append("email", targets.email.value);
            formData.append("phone", targets.phone.value);
            formData.append("signature_style",targets.signature.value);
            formData.append("signatory", targets.signatory.value);
            // formData.append("logo",targets.logo.files[0], targets.logo.files[0].name);



            // const json = JSON.stringify(formData);
            // 'Content-Type':'multipart/form-data; charset=UTF-8; boundary=12345;',
            const response = await fetch('http://localhost:8000/register', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',

                },

                body: formData,

            })

            if (!response.ok) {
                throw new Error('Failed to submit the data. Please try again.')
            }

            // Handle response if necessary
            const data = await response.json()
            alert(data.message);


        } catch (error) {

            console.error(error)
        }
    }
    return (
        <>
            <h1 className="font-bold text-center">MoU Generator</h1>
            <section>
                <div className="rounded-lg bg-white p-8  lg:col-span-3 lg:p-12">
                    <form onSubmit={upload} className="space-y-4" encType='multipart/form-data'>
                        <div>
                            <label className="sr-only" htmlFor="id">College ID</label>
                            <input
                                className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                placeholder="College ID"
                                type="text"
                                id="id"
                            />
                        </div>
                        {/* <div>
                            <label className="sr-only" htmlFor="logo">College Logo</label>
                            <input
                                className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                placeholder="College Logo"
                                type="file"
                                id="logo"
                                accept='.jpeg, .png, .jpg'
                            />
                        </div> */}
                        <div className="mt-4">
                            <button
                                type="submit"
                                className="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"
                            >
                                Login
                            </button>
                        </div>
                    </form>
                </div>
                <p className="text-center">OR</p>
                <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
                    <form onSubmit={register} className="space-y-4" id="register-form" encType='multipart/form-data'>
                        <div>
                            <label className="sr-only" htmlFor="name">Name</label>
                            <input
                                className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                placeholder="Name"
                                type="text"
                                id="name"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                                <label className="sr-only" htmlFor="email">Email</label>
                                <input
                                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                    placeholder="Email address"
                                    type="email"
                                    id="email"
                                    required
                                />
                            </div>

                            <div>
                                <label className="sr-only" htmlFor="phone" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}">Phone</label>
                                <input
                                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                    placeholder="Phone Number"
                                    type="phone"
                                    id="phone"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="sr-only" htmlFor="signatory">Signatory</label>
                            <input
                                className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                placeholder="Signatory"
                                type="text"
                                id="signatory"
                                onChange={(e)=>{setsignature(e.target.value)}}
                                required
                            />
                        </div>


                        {/* Checkbox for signature to select */}
                        <p>Choose your preferred signature for MoU from below</p>
                        <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                            <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                                <div className="flex items-center ps-3">
                                    <input id="edwardian-scipt-itc-radio" name="signature" type="radio" value="Edwardian Script ITC" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                    <label style={{fontFamily: 'Edwardian Script ITC'}} for="edwardian-scipt-itc-radio" className="w-full py-3 ms-2 text-2xl font-medium text-gray-900 dark:text-gray-300 ">{signature}</label>
                                </div>
                            </li>
                            <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                                <div className="flex items-center ps-3">
                                    <input id="blackadder-itc-radio" name="signature" type="radio" value="Blackadder ITC" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                    <label style={{fontFamily: 'Blackadder ITC'}} for="blackadder-itc-radio" className="w-full py-3 ms-2 text-2xl font-medium text-gray-900 dark:text-gray-300">{signature}</label>
                                </div>
                            </li>
                            <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                                <div className="flex items-center ps-3">
                                    <input id="brush-script-mt-radio" name="signature" type="radio" value="Brush Script MT" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                    <label style={{fontFamily: 'Brush Script MT'}} for="brush-script-mt-radio" className="w-full py-3 ms-2 text-2xl font-medium text-gray-900 dark:text-gray-300">{signature}</label>
                                </div>
                            </li>
                            <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                                <div className="flex items-center ps-3">
                                    <input id="freestyle-script-radio" name="signature" type="radio" value="Freestyle Script" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                    <label style={{fontFamily: 'Freestyle Script'}} for="freestyle-script-radio" className="w-full py-3 ms-2 text-2xl font-medium text-gray-900 dark:text-gray-300">{signature}</label>
                                </div>
                            </li>
                            <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                                <div className="flex items-center ps-3">
                                    <input id="kunstler-script-radio" name="signature" type="radio" value="Kunstler Script" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                    <label style={{fontFamily: 'Kunstler Script'}} for="kunstler-script-radio" className="w-full py-3 ms-2 text-2xl font-medium text-gray-900 dark:text-gray-300">{signature}</label>
                                </div>
                            </li>
                            <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                                <div className="flex items-center ps-3">
                                    <input id="vladimir-script-radio" name="signature" type="radio" value="Vladimir Script" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                    <label style={{fontFamily: 'Vladimir Script'}} for="vladimir-script-radio" className="w-full py-3 ms-2 text-2xl font-medium text-gray-900 dark:text-gray-300">{signature}</label>
                                </div>
                            </li>
                        </ul>
                        {/* End of checkbox */}

                        <div>
                            <label className="sr-only" htmlFor="logo">College Logo</label>
                            <input
                                className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                placeholder="College Logo"
                                type="file"
                                id="logo"
                                accept='.jpeg, .png, .jpg'
                                required
                            />
                        </div>



                        <div>
                            <label className="sr-only" htmlFor="address">Address</label>

                            <textarea
                                className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                placeholder="Address"
                                rows="8"
                                id="address"
                                required
                            ></textarea>
                        </div>

                        <div className="mt-4">
                            <button
                                type="submit"
                                className="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"

                            >
                                Register
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </>
    )
}

export default RegisterLogin