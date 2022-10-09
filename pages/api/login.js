import * as fs from "fs";

export default function handler(req, res) {
    if (req.method === "POST") {
        fs.readFile(`DataBase/User.json`, "utf-8", (err, data) => {
            if (err) {
                res.status(500).json("Some error!");
            } else {
                data = JSON.parse(data);
                let cred = req.body;
                console.log(cred.contact)
                if (cred.contact in data) {
                    // console.log(cred.contact)
                    if(data[cred.contact]["name"]){
                        console.log(data[cred.contact])
                        if(cred.password == data[cred.contact]["password"]){
                            res.status(200).json({"token": data[cred.contact]["token"]});
                        }
                        else{
                            res.status(400).json({"error": "Invaild password"});
                        }
                    }
                    else{
                        res.status(404).json({"error": "No such user exist"});
                    }
                } 
                else {
                    res.status(404).json({"error": "No such user exist"});
                }
            }
        });
    } else {
        // Handle any other HTTP method
        res.status(500).json({ name: "Invalid Method for request!" });
    }
}
