const { db } = require('../models/contact');
const Contact = require('../models/contact')


// GET ../api/contacts/all
exports.contact_list = async(req, res) =>{
    try{
    const contacts = await Contact.find({"user_wabaID" : "107654008661174"},{"address" : 0});
    //FILTER CONTACTS OF INDIVIDUAL BY THEIR WABA ID
        res.send(contacts);
    }
    catch(err){
        console.log(err)
        res.status(500).send(err);
    }
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
                email: req.body.email,
                address: req.body.address
            })
            try{
                await contact.save();
                res.send(contact);}
            catch (err){
                res.status(500).send(err);
            }
        }
        else{
            res.send("Contact Already Exists")
        }
    } catch (error) {
        console.log(error); res.send(error);
    }
}


// UPDATE ../api/contacts/:id/update -  - Search by Contact Number
exports.update_contact = async(req, res) =>{
    const phone = "91"+req.params.id;
    const user_wabaID = "107654008661174";//GET THE WABA ID of Business User

    try {
        const check = await Contact.find({"phoneNumber": phone, "user_wabaID": user_wabaID}).count();
        if(check == 0){
            res.send("Contact doesn't exist");
        }
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
                    res.send("Contact Not Found");

                else if (contacts.modifiedCount >= 1) 
                    //res.send(contacts);
                    return res.json({"message": "Contact updated Successfully"})
            

                else{
                    return res.json({
                        "message": "Contact information is up to date."
                    })
                }
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

    try{
        const phone = "91"+req.params.id;
        const contacts = await Contact.deleteOne({"user_wabaID" : "107654008661174", "phoneNumber": phone});
        //FILTER CONTACTS OF INDIVIDUAL BY THEIR WABA ID

        if(contacts.acknowledged == true && contacts.deletedCount == 1)
            res.send(phone + " is deleted from Contacts List");
    }
    catch(err){
        res.status(500).send(err);
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
        res.status(500).send(err);
    }
    
}