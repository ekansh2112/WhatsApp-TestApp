const { db } = require('../models/contact');
const Contact = require('../models/contact');
const { sendTemplate } = require('./message');

// GET ../api/contacts/all
exports.contact_list = async(req, res) =>{
    try{
    const contacts = await Contact.find({"user_wabaID" : "107654008661174"},{"address" : 0});
    //FILTER CONTACTS OF INDIVIDUAL BY THEIR WABA ID
        res.send(contacts);
    }
    catch(err){
        console.log(err)
        return res.json({
            stat: "error",
            message: err
        });    }
}

// POST ../api/contacts/create
exports.create_contact = async(req, res) =>{
    const user_wabaID = "107654008661174";//GET THE WABA ID of Business User
    const phoneNumber = "91"+req.body.phoneNumber;
    
    try {
        const check = await Contact.find({"phoneNumber": phoneNumber, "user_wabaID": user_wabaID}).count();

        if(check == 0){
            const contact = new Contact({
                user_wabaID: user_wabaID, 
                fname: req.body.fname,
                lname: req.body.lname,
                phoneNumber: "91"+req.body.phoneNumber,  
                dob : req.body.dob,          
                email: req.body.email,
                address: req.body.address
            })
            try{
                await contact.save();
                sendTemplate(req,phoneNumber,()=>{
                    return res.json({
						stat: "success",
						message: "Contact created successfully",
					});
                });
                return res.json({
                    stat: "success",
                    message: "Contact created successfully"
                });               
            }

            catch (err){
                return res.status(500).json({
                    stat: "error",
                    message: err
                });
            }
        }
        else{
            return res.json({
                stat: "error",
                message: "Contact already exists"
            });        }
    } catch (error) {
        console.log(error); 
        
        return res.json({
            stat: "error",
            message: error
        });    }
}


// UPDATE ../api/contacts/:id/update -  - Search by Contact Number
exports.update_contact = async(req, res) =>{
    const phone = "91"+req.params.id;
    const user_wabaID = "107654008661174";//GET THE WABA ID of Business User

    try {
        const check = await Contact.find({"phoneNumber": phone, "user_wabaID": user_wabaID}).count();
        if(check == 0){
            return res.json({
                stat: "error",
                message: "Contact doesn't exist"
            });        }
        else{
            try{
                const details = {
                    user_wabaID: "107654008661174", //GET THE WABA ID of Business User
                    fname: req.body.fname,
                    lname: req.body.lname,
                    phoneNumber: "91"+req.body.phoneNumber,
                    email: req.body.email,
                    address: req.body.address
                };
                const contacts = await Contact.updateOne({"user_wabaID" : "107654008661174", "phoneNumber": phone},details);
                //FILTER CONTACTS OF INDIVIDUAL BY THEIR WABA ID

                if(contacts.matchedCount < 1)  
                    return res.json({
                        stat: "error",
                        message: "Contact not found"
                    });
                else if (contacts.modifiedCount >= 1) 
                    //res.send(contacts);
                    return res.json({
                        stat: "success",
                        message: "Contact updated successfully"
                    });          

            }
                catch(err){
                    console.log(err)
                    res.status(500).send(err);
                }
            
        }

    } catch (error) {
        console.log(error)
    }
}


// DELETE ../api/contacts/:id/delete - Search by Contact Number
exports.delete_contact = async(req, res) =>{
    console.log(req.body,"abc");
    try{
        const phone = "91"+req.params.id;
        const contacts = await Contact.deleteOne({ user_wabaID: "107654008661174", phoneNumber: "917290941111" });
        //FILTER CONTACTS OF INDIVIDUAL BY THEIR WABA ID
        console.log(contacts);
        if(contacts.acknowledged == true && contacts.deletedCount == 1)
            return res.json({
                stat: "success",
                message: phone + " is deleted from Contacts List"
            });
    }
    catch(err){
        return res.status(500).json({
            stat: "error",
            message: err
        });
    }}


// GET ../api/contacts/:id/search -  - Search by Contact Number
exports.search_contact = async(req, res) =>{

    try{
        const phone = "91"+req.params.id

        const contacts = await Contact.find({"user_wabaID" : "107654008661174", "phoneNumber": phone},{"address" : 0});
        //FILTER CONTACTS OF INDIVIDUAL BY THEIR WABA ID
        
        res.send(contacts);
    }
    catch(err){
        return res.status(500).json({
            stat: "error",
            message: err
        });    }
    
}