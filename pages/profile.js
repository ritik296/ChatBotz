import React, { useState, useRef, useEffect } from "react";
import { FaRegUser } from 'react-icons/fa';

const profile = () => {
  const [name, setName] = useState("Name");
  const [contact, setContact] = useState("Contact");
  const [email, setEmail] = useState("Email");
  const [company, setCompany] = useState("Company");
  const [role, setRole] = useState("Role");
  const [tags, setTags] = useState("tag-1");
  const [imageUrl, setImageUrl] = useState("");
  const [followerCount, setFollowerCount] = useState(0);
  const [profileState, setProfileState] = useState(false);
  const [editToggle, setEditToggle] = useState(false);

  const [token, setToken] = useState("");
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    fetchUserDetail();
  }, []);

  useEffect(() => {
    getProfile();
  }, [token]);

  async function fetchUserDetail() {
      const token1 =
          localStorage.getItem("token") !== "undefined"
              ? localStorage.getItem("token")
              : localStorage.clear();
      if (!token1) {
          return router.push("Login");
      }
      setToken(token1);
      return token1;
  }

  async function getProfile() {
    let res = await fetch('http://localhost:3000/api/get-your-profile', {
        method: 'POST',
        body: JSON.stringify({
            "your-token": token
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    });
    if(res.status == 300) {
      setProfileData(false);
    }
    else if (res.status == 200){
        let data = await res.json();
        setProfileData(data);
        // console.log(data);
        setName(data.name);
        setContact(data.contact);
        setEmail(data.email);
        setImageUrl(data["image-url"]);
        setFollowerCount(data["follower-count"]);
        setProfileState(data["profile-type"] == "private"? true: false);
        setCompany(data["personal-detail"]["company"] == "" ? "" : data["personal-detail"]["company"]);
        setRole(data["personal-detail"]["role"] == "" ? "" : data["personal-detail"]["role"]);
        setTags(data["personal-detail"]["tags"]);
    }
  }

  return (
    <div>
      
  <link href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="stylesheet"/>



    <div className="bg-gray-100">
    <div className="w-full text-white bg-main-color">
        {/* <!-- End of Navbar --> */}

        <div className="container mx-auto my-5 p-5">
            <div className="md:flex no-wrap md:mx-auto md:-mx-2 ">
                {/* <!-- Left Side --> */}
                <div className="w-full md:w-3/12 md:mx-2">
                    {/* <!-- Profile Card --> */}
                    <div className="bg-white p-3 border-t-4 border-green-400">
                        <div className="image overflow-hidden">
                            <img className="h-auto w-full mx-auto rounded shadow"
                                src={imageUrl == "" ? "avatar.png" : imageUrl}
                                alt=""/>
                        </div>
                        {!editToggle &&
                        <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">{name}</h1>}
                        {editToggle && 
                          <div className="px-4 py-2"><input className="border px-1 rounded text-black" value={imageUrl} type="text" placeholder='Image Url' onChange={(e) => setImageUrl(e.target.value)}></input></div>
                        }
                        <ul
                            className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                            <li className="flex items-center py-3">
                                <span>Profile Type</span>
                                <span className="ml-auto cursor-pointer" onClick={() => !profileState ? setProfileState(true) : setProfileState(false)}><span
                                        className="bg-emerald-600 py-1 px-2 rounded text-white text-sm" style={{background: !profileState ? "#059669" : "#dc2626"}}>{!profileState ? "Public" : "Private"}</span></span>
                            </li>
                            <li className="flex items-center py-3">
                                <span>Follower Count</span>
                                <span className="ml-auto text-red-600">{followerCount}</span>
                            </li>
                        </ul>
                    </div>
                    {/* <!-- End of profile card --> */}
                    <div className="my-4"></div>
                    {/* <!-- End of friends card --> */}
                </div>
                {/* <!-- Right Side --> */}
                <div className=" md:w-9/12 mx-2 h-74">
                    {/* <!-- Profile tab --> */}
                    {/* <!-- About Section --> */}
                    <div className="bg-white p-3 shadow-sm rounded-sm">
                        <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                            <span clas="text-green-500" style={{margin: "13px"}}>
                                <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                      <FaRegUser size={20}/>
                                </svg>
                            </span>
                            <span className="tracking-wide">About</span>
                        </div>
                        <div className="text-gray-700">
                            <div className=" text-sm">
                                <div className="grid grid-cols-2">
                                    <div className="px-4 py-2 font-semibold">Name</div>
                                    {!editToggle && 
                                    <div className="px-4 py-2">{name}</div>}
                                    {editToggle && 
                                    <div className="px-4 py-2"><input className="border px-1 rounded" value={name} type="text" placeholder='Name' onChange={(e) => setName(e.target.value)}></input></div>}
                                </div>
                                <div className="grid grid-cols-2">
                                    <div className="px-4 py-2 font-semibold">Contact No.</div>
                                    {!editToggle && 
                                    <div className="px-4 py-2">{contact}</div>}
                                    {editToggle &&
                                    <div className="px-4 py-2"><input className="border px-1 rounded" value={contact} type="text" placeholder='Contact No.' onChange={(e) => setContact(e.target.value)}></input></div>}
                                </div>
                                <div className="grid grid-cols-2">
                                    <div className="px-4 py-2 font-semibold">Email</div>
                                    {!editToggle &&
                                    <div className="px-4 py-2">{email}</div>}
                                    {editToggle &&
                                    <div className="px-4 py-2"><input className="border px-1 rounded" value={email} type="text" placeholder='Email Address' onChange={(e) => setEmail(e.target.value)}></input></div>}
                                </div>
                                <div className="grid grid-cols-2">
                                    <div className="px-4 py-2 font-semibold">Company</div>
                                    {!editToggle && 
                                    <div className="px-4 py-2">{!company? "Set company": company}</div>}
                                    {editToggle &&
                                    <div className="px-4 py-2"><input className="border px-1 rounded" value={company} type="text" placeholder='Company Name' onChange={(e) => setCompany(e.target.value)}></input></div>}
                                </div>
                                <div className="grid grid-cols-2">
                                    <div className="px-4 py-2 font-semibold">Role</div>
                                    {!editToggle &&
                                    <div className="px-4 py-2">{!role ? "Set role" : role}</div>}
                                    {editToggle &&
                                    <div className="px-4 py-2"><input className="border px-1 rounded" value={role} type="text" placeholder='Role in Company' onChange={(e) => setRole(e.target.value)}></input></div>}
                                </div>
                                <div className="grid grid-cols-2">
                                    <div className="px-4 py-2 font-semibold">Profile Type</div>
                                    <div className="px-4 py-2">{!profileState ? "Public" : "Private"}</div>
                                </div>
                                <div className="grid grid-cols-2 col-start-1 col-end-2">
                                    <div className="px-4 py-2 font-semibold">Tags</div>
                                    {!editToggle &&
                                    <div className="px-4 py-2">
                                      <p className="">{tags}</p>
                                    </div>}
                                    {editToggle &&
                                    <div className="px-4 py-2"><input className="border px-1 rounded" value={tags} type="text" placeholder="Tags with ', ' seperated" onChange={(e) => setTags(e.target.value)}></input></div>}
                                </div>
                            </div>
                        </div>
                        <button className="block w-full text-teal-900 text-sm font-semibold rounded-lg hover:bg-teal-700 hover:text-white focus:outline-none focus:shadow-outline focus:bg-teal-700 hover:shadow-xs p-3 my-4">SAVE DETAIL</button>
                    </div>
                        <button className="block p-5 w-full text-amber-600 text-sm font-semibold rounded-lg hover:bg-amber-600 border-4 hover:text-white focus:outline-none hover:shadow-xs my-4" style={{background : editToggle ? "#d97706" : "white", color : editToggle ? "white" : "#d97706", border: editToggle? "none": "4px solid #e5e7eb"}} onClick={() => !editToggle ? setEditToggle(true) : setEditToggle(false)}>EDIT PROFILE</button>
                    {/* <!-- End of about section --> */}
                </div>
            </div>
        </div>
      </div>
    </div>
</div>
  )
}

export default profile