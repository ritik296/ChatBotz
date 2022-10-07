import * as fs from "fs"

export default async function handler(req, res) {
    if(req.method === "POST"){
        fs.readFile(`DataBase/ContactList.json`, "utf-8", (err, data)=>{
            if(err){
                res.status(500).json({"err": "Failed to headsheak with database!"}) 
            }
            else{
                let token = req.body.token;
                let pData = JSON.parse(data)

                if(token in pData){
                    // console.log(pData[`${token}`])
                    res.status(200).json({"contacts": pData[`${token}`]})
                }
                else{
                    console.log("Invalid Token")
                    res.status(500).json({"err": "Invalid token"})
                }
            }
        });
    }
    else{
        res.status(400).json({ name: "Invalid Method for request!" });
    }
}