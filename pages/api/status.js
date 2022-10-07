import * as fs from "fs";

export default function handler(req, res) {
    if (req.method === "POST") {
        const token = req.body.token;
        fs.readFile("DataBase/Status.json", "utf-8", (err, data) => {
            if (err) res.status(500).json("Some error!");
            else{
                data = JSON.parse(data);
                data[token] = data[token] === 0? 1 : 0;

                let newData = JSON.stringify(data);
                fs.writeFile("DataBase/Status.json", newData, (err)=>{
                    if (err) throw err;
                    console.log("status updated");
                });

                res.status(200).json({"status": data[token]});
            }
        });
    }
    else {

    }
}