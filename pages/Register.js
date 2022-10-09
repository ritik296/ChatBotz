import React from 'react'
import { useRouter } from 'next/router';

const Register = () => {
    let router = useRouter();
    async function signUp() {
        let name = document.getElementById("full-name").value;
        let contact = document.getElementById('contact').value;
        let dob = document.getElementById("dob").value;
        let password = document.getElementById("password").value;

        let nameErr = document.getElementById("name-error");
        let contactErr = document.getElementById('contact-error');
        let dobErr = document.getElementById("dob-error");
        let passwordErr = document.getElementById("password-error");

        if (validName(name, nameErr) && validContact(contact, contactErr) && validDob(dob, dobErr) && validPassword(password, passwordErr)) {
            let res = await fetch('http://localhost:3000/api/user', {
                method: 'POST',
                body: JSON.stringify({
                    "name": name,
                    "contact": contact,
                    "dob": dob,
                    "password": password
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                }
            })
            let data = await res.json();
            let token = String(data.token);

            if (data.Login == "User already exist") {
                router.push("Login");
            }
            else if (String(data.token) != "undefined") {
                localStorage.setItem("token", data.token);
                localStorage.setItem("contact", contact);
                router.push("/");
            }
        }
    }

    return (
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
                <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
                    <h1 className="title-font font-medium text-3xl text-gray-900">Slow-carb next level shoindcgoitch ethical authentic, poko scenester</h1>
                    <p className="leading-relaxed mt-4">Poke slow-carb mixtape knausgaard, typewriter street art gentrify hammock starladder roathse. Craies vegan tousled etsy austin.</p>
                </div>
                <div className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 border-solid border-4 border-teal-800 hover:shadow-xl">
                    <h2 className="text-gray-900 text-lg font-medium title-font mb-5">Sign Up</h2>
                    <div className="relative mb-4">
                        <label htmlFor="full-name" className="leading-7 text-sm text-gray-600">Full Name</label>
                        <input type="text" id="full-name" name="full-name" className="w-full bg-white rounded border border-gray-300 focus:border-teal-900 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        <p id='name-error' className='text-xs text-right text-red-600 hidden my-1'>name must have more the 5 length</p>
                    </div>
                    <div className="relative mb-4">
                        <label htmlFor="contact" className="leading-7 text-sm text-gray-600">Phone Number</label>
                        <input type="text" id="contact" name="contact" className="w-full bg-white rounded border border-gray-300 focus:border-teal-900 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        <p id='contact-error' className='text-xs text-right text-red-600 hidden my-1'>Invalid number</p>
                    </div>
                    <div className="relative mb-4">
                        <label htmlFor="dob" className="leading-7 text-sm text-gray-600">Date of Birth</label>
                        <input type="date" id="dob" name="dob" className="w-full bg-white rounded border border-gray-300 focus:border-teal-900 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        <p id='dob-error' className='text-xs text-right text-red-600 hidden my-1'>Enter date of birth</p>
                    </div>
                    <div className="relative mb-4">
                        <label htmlFor="password" className="leading-7 text-sm text-gray-600">Password</label>
                        <input type="password" id="password" name="password" className="w-full bg-white rounded border border-gray-300 focus:border-teal-900 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        <p id='password-error' className='text-xs text-right text-red-600 hidden my-1'>Password must be 8 length contain atleast(1 upper-case, 1 lower-case, 1 spacial character, 1 number)</p>
                    </div>
                    <button className="text-white bg-teal-700 border-4 border-teal-700 hover:bg-white hover:text-teal-900 py-2 px-8 focus:outline-none rounded text-xl" onClick={() => signUp()}>Sign Up</button>
                    <p className="text-xs text-gray-500 mt-3">You will enjoy chatting with your friends</p>
                </div>
            </div>
        </section> 
    )
}

const validName = (name, ele) => {
    if (name.length >= 5) {
        ele.style.display = "none";
        return true;
    } else {
        ele.style.display = "block";
        return false;
    }
};

const validContact = (contact, ele) => {
    if (contact.length == 10) {
        ele.style.display = "none";
        return true;
    } else {
        ele.style.display = "block";
        return false;
    }
};

const validDob = (dob, ele) => {
    if (dob.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/)) {
        ele.style.display = "none";
        return true;
    } else {
        ele.style.display = "block";
        return false;
    }
};

const validPassword = (password, ele) => {
    if (password.match(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)) {
        ele.style.display = "none";
        return true;
    } else {
        ele.style.display = "block";
        return false;
    }
};

export default Register