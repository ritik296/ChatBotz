import React from 'react'
import { useRouter } from 'next/router';

const Login = () => {
    let router = useRouter();
    
    async function signIn() {
        // console.log(login);
        let contact = document.getElementById('contact').value;
        let password = document.getElementById("password").value;

        let contactErr = document.getElementById('contact-error');
        let passwordErr = document.getElementById("password-error");

        let res = await fetch('/api/login', {
            method: 'POST',
            body: JSON.stringify({
                "contact": contact,
                "password": password
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
        let data = await res.json();
        if(data.error == "Invaild password"){
            contactErr.style.display = "none";
            passwordErr.style.display = "block";
        }
        else if(data.error == "No such user exist"){
            console.log("No user exist");
            contactErr.style.display = "block";
            router.push('/Register');
        }
        else if(String(data.token) != "undefined"){
            contactErr.style.display = "none";
            passwordErr.style.display = "none";
            localStorage.setItem("token", data.token);
            localStorage.setItem("contact", contact);
            router.push("/");
        }
    }

    return (
        <div>
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
                    <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
                        <h1 className="title-font font-medium text-3xl text-gray-900">Slow-carb next level shoindcgoitch ethical authentic, poko scenester</h1>
                        <p className="leading-relaxed mt-4">Poke slow-carb mixtape knausgaard, typewriter street art gentrify hammock starladder roathse. Craies vegan tousled etsy austin.</p>
                    </div>
                    <div className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 border-solid border-4 border-teal-800 hover:shadow-xl">
                        <h2 className="text-gray-900 text-lg font-medium title-font mb-5">Sign In</h2>
                        <div className="relative mb-4">
                            <label htmlFor="contact" className="leading-7 text-sm text-gray-600">Phone Number</label>
                            <input type="text" id="contact" name="contact" className="w-full bg-white rounded border border-gray-300 focus:border-teal-900 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                            <p id='contact-error' className='text-xs text-right text-red-600 hidden my-1'>You don&apos;t have account</p>
                        </div>
                        <div className="relative mb-4">
                            <label htmlFor="password" className="leading-7 text-sm text-gray-600">Password</label>
                            <input type="password" id="password" name="password" className="w-full bg-white rounded border border-gray-300 focus:border-teal-900 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                            <p id='password-error' className='text-xs text-right text-red-600 hidden my-1'>Invaild password</p>
                        </div>
                        <button className="text-white bg-teal-700 border-4 border-teal-700 hover:bg-white hover:text-teal-900 py-2 px-8 focus:outline-none rounded text-xl" onClick={() => signIn()}>Sign In</button>
                        <p className="text-xs text-gray-500 mt-3">You will enjoy chatting with your friends</p>
                    </div>
                </div>
            </section>
            {/* <iframe id="iframe-embed" src="https://rapid-cloud.co/embed-6/QcYzKwYtxRsV?vast=1&amp;autoPlay=1&amp;oa=0&amp;asi=1" frameborder="0" referrerpolicy="strict-origin" allow="autoplay; fullscreen" allowfullscreen="" webkitallowfullscreen="" mozallowfullscreen="" style=""></iframe> */}
        </div>
    )
}

export default Login