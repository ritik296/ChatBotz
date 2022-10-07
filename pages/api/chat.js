import * as fs from "fs"
// var date = new Date();

export default async function handler(req, res) {
    if(req.method == 'POST'){
        fs.readFile("./DataBase/Chat.json", "utf-8", async (err, data)=>{
            if(err){
              res.status(500).json({ "error": err})
            }
            else{
              let pdata = JSON.parse(data)
              
              let senderToken = req.body.senderToken;
              let reciverToken = req.body.reciverToken;
              let accessType = req.body.accessType;
        
              if(accessType == 'read'){
                let limit = req.body.limit;
                let page = req.body.page;
                let intial = limit*(page - 1)
                let final = limit*(page)
                if(pdata[senderToken][reciverToken]["total"] < final){
                  final = pdata[senderToken][reciverToken]["total"]%limit;
                }

                res.status(200).json(pdata[senderToken][reciverToken]["messages"].slice(intial, final).reverse())
              }
              else if(accessType == 'write'){
                let text = req.body.text;
                let time = new Date();
                
                // console.log(text, " ", time)

                pdata[senderToken][reciverToken]["messages"].splice(0, 0, {"text": text, "time": time, "type": "sender"})
                pdata[reciverToken][senderToken]["messages"].splice(0, 0, {"text": text, "time": time, "type": "reciver"})
                pdata[senderToken][reciverToken]["total"]++;
                pdata[reciverToken][senderToken]["total"]++;

                let newData = JSON.stringify(pdata);
                fs.writeFile("DataBase/Chat.json", newData, (err) => {
                    // Error checking
                    if (err) throw err;
                    console.log("Message sended");
                });
                // let senderData = pdata[senderToken]
                // console.log(senderData)
                res.status(200).json({"text": text, "time": time, "type": "sender"});
              }
            }
          })
    }
    else{
        res.status(500).json({"error": "Invalid request method"})
    }
}

const sendMessage = () =>{

}


// Body for a fetch messages 
// {
//     "senderToken": "rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr",
//     "reciverToken": "kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk",
//     "accessType": "read",
//     "limit": 20,
//     "page":1
// }