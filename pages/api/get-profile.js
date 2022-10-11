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
                let yourToken = cred["yourToken"];
                let otherToken = cred["otherToken"];

                if(!data[otherToken]){
                    res.status(404).json({"error": "Person didn't created his profile"});
                }
                else {
                    let commentList = [];
                    let comments = data[otherToken]["comments"]["comment-list"];
                    
                    for(let i=0; i<data[otherToken]["comments"]["total"]; i++){
                        if (comments[i]["protection"] == "private"){
                            if (comments[i]["sender-token"] == yourToken){
                                commentList.push(comments[i]);
                            }
                        }
                        else {
                            commentList.push(comments[i]);
                        }
                    }

                    data = data[otherToken];

                    res.status(200).json({
                        "name": data.name,
                        "email": data.email,
                        "contact": data.contact,
                        "image-url": data["image-url"],
                        "personal-detail": data["personal-detail"],
                        "comments": {
                            "total": commentList.length,
                            "comment-list": commentList
                        }
                    });
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
// }