// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import * as fs from "fs";

export default function handler(req, res) {
    if (req.method === "POST") {
        fs.readFile(`DataBase/User.json`, "utf-8", (err, data) => {
            if (err) {
                res.status(500).json("Some error!");
            } else {
                let cred = req.body;
                data = JSON.parse(data);
                let name = validName(cred.name);
                let contact = validContact(cred.contact);
                let dob = validDob(cred.dob);
                let pass = validPassword(cred.password);
                let token = tokenGenerator();

                if (data[cred.contact]) {
                    if(data[cred.contact]["name"]){
                        console.log("User already exist");
                        res.status(200).json({ Login: "User already exist" });
                    } else if (name && contact && dob && pass && !data[cred.contact]["name"]) {
                        data[cred.contact]["name"] = cred.name;
                        data[cred.contact]["dob"] = cred.dob;
                        data[cred.contact]["password"] = cred.password;

                        let tok = data[cred.contact]["token"];
    
                        let newd = JSON.stringify(data);
    
                        fs.writeFile("DataBase/User.json", newd, (err) => {
                            // Error checking
                            if (err) throw err;
                            console.log("New user added update");
                            fs.readFile("DataBase/ContactList.json", 'utf-8', (err, conList) => {
                                if (err) throw err;
                                else {
                                    conList = JSON.parse(conList);
                                    if(!conList[tok]) {
                                        let obj = {
                                            [tok]: []
                                        };
                                        let z = Object.assign(conList, obj);
                                        let par = JSON.stringify(z);

                                        fs.writeFile("DataBase/ContactList.json", par, (err) => {
                                            if (err) throw err;
                                            else{
                                                console.log("Contact list structure defined");
                                            }
                                        });
                                    }
                                }
                            });

                            fs.readFile("DataBase/Chat.json", 'utf-8', (err, chat) => {
                                if (err) throw err;
                                else {
                                    chat = JSON.parse(chat);
                                    if(!chat[tok]) {
                                        let obj = {
                                            [tok]: {}
                                        };
                                        let z = Object.assign(chat, obj);
                                        let par = JSON.stringify(z);

                                        fs.writeFile("DataBase/Chat.json", par, (err) => {
                                            if (err) throw err;
                                            else{
                                                console.log("Chat list structure defined");
                                            }
                                        });
                                    }
                                }
                            });
                        });
                        // res.status(200).json(obj);
                        res.status(200).json({"token": tok});
                    }
                    // console.log(cred.pp)
                } 
                // else if (name && contact && dob && pass && !data[cred.contact]["name"]) {

                //     data[cred.contact]["name"] = cred.name;
                //     data[cred.contact]["dob"] = cred.dob;
                //     data[cred.contact]["password"] = cred.password;

                //     let newd = JSON.stringify(data);

                //     fs.writeFile("DataBase/User.json", newd, (err) => {
                //         // Error checking
                //         if (err) throw err;
                //         console.log("New User added");
                //     });
                //     // res.status(200).json(obj);
                //     res.status(200).json({"token": data[cred.contact]["token"]});

                // }
                else if(name && contact && dob && pass) {
                    var token1 = tokenGenerator();
                   
                    let obj = {
                        [cred.contact]: {
                            name: cred.name,
                            contact: cred.contact,
                            dob: cred.dob,
                            password: cred.password,
                            token: token1
                        },
                    };

                    console.log(obj);

                    let z = Object.assign(data, obj);

                    let newd = JSON.stringify(z);

                    fs.writeFile("DataBase/User.json", newd, (err) => {
                        // Error checking
                        if (err) throw err;
                        console.log("New User added");
                        fs.readFile("DataBase/ContactList.json", 'utf-8', (err, conList) => {
                            if (err) throw err;
                            else {
                                conList = JSON.parse(conList);
                                if(!conList[token1]) {
                                    let obj = {
                                        [token1]: []
                                    };
                                    let z = Object.assign(conList, obj);
                                    let par = JSON.stringify(z);

                                    fs.writeFile("DataBase/ContactList.json", par, (err) => {
                                        if (err) throw err;
                                        else{
                                            console.log("Contact list structure defined");
                                        }
                                    });
                                }
                            }
                        });

                        fs.readFile("DataBase/Chat.json", 'utf-8', (err, chat) => {
                            if (err) throw err;
                            else {
                                chat = JSON.parse(chat);
                                if(!chat[token1]) {
                                    let obj = {
                                        [token1]: {}
                                    };
                                    let z = Object.assign(chat, obj);
                                    let par = JSON.stringify(z);

                                    fs.writeFile("DataBase/Chat.json", par, (err) => {
                                        if (err) throw err;
                                        else{
                                            console.log("Chat list structure defined");
                                        }
                                    });
                                }
                            }
                        });
                    });
                    // res.status(200).json(obj);
                    res.status(200).json({"token": token1});
                } else {
                    res.status(500).json({
                        error: "Enter valid attribute",
                        contact: "Must be of 10 length",
                        name: "must be more than 5 length",
                        dob: "must be in proper format (YYYY-MM-DD)",
                        password:
                            "min 8 letter password, with at least a symbol, upper and lower case letters and a number",
                    });
                }
            }
        });
    } else {
        // Handle any other HTTP method
        res.status(400).json({ name: "Invalid Method for request!" });
    }
}

const validName = (name) => {
    if (name.length >= 5) {
        return true;
    } else {
        console.log("Invalid Name");
        return false;
    }
};

const validContact = (contact) => {
    if (contact.length == 10) {
        return true;
    } else {
        console.log("Invalid Contact");
        return false;
    }
};

const validDob = (dob) => {
    if (dob.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/)) {
        return true;
    } else {
        console.log("Invalid DOB");
        return false;
    }
};

const validPassword = (password) => {
    if (
        password.match(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)
    ) {
        return true;
    } else {
        console.log("Invalid Password");
        return false;
    }
};

const tokenGenerator = ()=>{
  let token = Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2) + 
                Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
  return token
}

const validToken = ()=>{
  let token = tokenGenerator()
  fs.readFile(`DataBase/GeneratedToken.json`, "utf-8", (err, res)=>{
    if(err){
      console.log("Get error", err)
    }
    else{
      let data = JSON.parse(res)
      if(token in data){
          console.log("token already exist")
          let new_token = validToken();
          return new_token;
      }
      else{
        let today = new Date().toISOString();
        // console.log(today)
        let z = Object.assign(data, {[token]: today});
        
        let newd = JSON.stringify(z);
        
        fs.writeFile("DataBase/GeneratedToken.json", newd, (err) => {
          // Error checking
          if (err) throw err;
          console.log("New token added");
        });
        // console.log(token)
        return token;
      }
    } 
  });
}