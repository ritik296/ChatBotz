import * as fs from "fs"

export default async function handler(req, res) {
    if(req.method == 'POST'){
        fs.readFile("DataBase/Profile.json", "utf-8", (err, data) => {
            if (err) {
                res.status(500).json({"error": "Unable to handshake with server"});
            }
            else {
                data = JSON.parse(data);
                let cred = req.body
                let token = cred.token;

                if(data[token]){
                    data[token]["name"] = cred.name;
                    data[token]["email"] = cred.email;
                    data[token]["contact"] = cred.contact;
                    data[token]["image-url"] = cred["image-url"];
                    data[token]["profile-type"] = cred["profile-type"];
                    data[token]["personal-detail"]["company"] = cred.company;
                    data[token]["personal-detail"]["role"] = cred.role;
                    data[token]["personal-detail"]["tags"] = cred.tags;

                    let parseData = JSON.stringify(data);

                    fs.writeFile("DataBase/Profile.json", parseData, (err) => {
                        if (err) throw err;
                        console.log("Profile updated");
                        res.status(300).json({"ok": "Profile updated", "profile": data[token]});
                    })

                    // res.status(300).json({"error": "profile already exist"});
                }
                else {
                    let obj = {
                        [token]: {
                            name : cred.name,
                            email : cred.email[0],
                            contact : cred.contact[0],
                            "image-url" : cred["image-url"],
                            "follower-count" : 0,
                            "follower-list" : [],
                            "follow-request": [],
                            "profile-type" : cred["profile-type"],
                            "personal-detail" : {
                                company : cred.company,
                                role : cred.role,
                                phone : cred.contact,
                                email : cred.email,
                                tags : cred.tags
                            },
                            comments : {
                                total : 0,
                                "comment-list" : []
                            }
                        }
                    }

                    let newData = Object.assign(data, obj);

                    let parseData = JSON.stringify(newData);

                    fs.writeFile("DataBase/Profile.json", parseData, (err) => {
                        if (err) throw err;
                        console.log("Profile created");
                        res.status(200).json({"ok": "Profile created", "profile": data[token]});
                    })
                }
            }
        })
    }
    else {
        res.status(500).json({"error": "Invalid request method"});
    }
}


// {
//     "sender-token": "kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk",
//     "reciver-token": "rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr",
//     "time": "time",
//     "text": "jui"
// }