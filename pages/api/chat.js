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
                const resetCount = async() =>{
                  fs.readFile("DataBase/ContactList.json", 'utf-8', (err, conData) => {
                    if(err){
                      res.status(500).json({ "error": err})
                    }
                    else{
                      conData = JSON.parse(conData);

                      for(let i = 0; i < conData[senderToken].length; i++){
                        if (conData[senderToken][i]["token"] == reciverToken){
                          conData[senderToken][i]["count"] = 0;
                          break;
                        }
                      }

                      let parsedConData = JSON.stringify(conData);

                      fs.writeFile("DataBase/ContactList.json", parsedConData, (err) => {
                        if(err) throw err;
                        console.log("Cotact List Updated");
                      })
                    }
                  })
                }

                resetCount();

                res.status(200).json(pdata[senderToken][reciverToken]["messages"].slice(intial, final))
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

                    async function updateContactListDetail(){  
                      fs.readFile("DataBase/ContactList.json", 'utf-8', (err, conData) => {
                        if(err){
                          res.status(500).json({ "error": err})
                        }
                        else{
                          conData = JSON.parse(conData);

                          for(let i = 0; i < conData[senderToken].length; i++){
                            if (conData[senderToken][i]["token"] == reciverToken){
                              conData[senderToken][i]["message"] = text;
                              conData[senderToken][i]["time"] = time;
                              // conData[senderToken][i]["count"] = String(parseInt(conData[senderToken][i]["count"]) + 1);
                              break;
                            }
                          }

                          for(let i = 0; i < conData[reciverToken].length; i++){
                            if (conData[reciverToken][i]["token"] == senderToken){
                              conData[reciverToken][i]["message"] = text;
                              conData[reciverToken][i]["time"] = time;
                              conData[reciverToken][i]["count"] ++;
                              break;
                            }
                          }

                          let parsedConData = JSON.stringify(conData);

                          fs.writeFile("DataBase/ContactList.json", parsedConData, (err) => {
                            if(err) throw err;
                            console.log("Cotact List Updated");
                          })
                        }
                      })
                    }

                    updateContactListDetail();
                });
                // let senderData = pdata[senderToken]
                // console.log(senderData)
                res.status(200).json({"text": text, "time": time, "type": "sender"});
              }
            }
          })
    }
    else{
        res.status(500).json({"error": "Invalid request method"});
    }
}




// Body for a fetch messages 
// {
//     "senderToken": "rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr",
//     "reciverToken": "kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk",
//     "accessType": "read",
//     "limit": 20,
//     "page":1
// }