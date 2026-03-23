const Contact = require("../models/contact.models");

async function createContact(req, res) {

  try {

    const { name, email, topic, message } = req.body;
    console.log(name, email, topic, message);
    

    if (!name || !email || !topic || !message) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const newContact = new Contact({
      name,
      email,
      topic,
      message
    });

    const savedContact = await newContact.save();

    res.status(201).json({
      success: true,
      data: savedContact
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

}


module.exports = {
    createContact
}