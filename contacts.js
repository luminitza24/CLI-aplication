const fs = require("fs").promises;
const path = require("path");
const contactsPath = path.join(__dirname, "db", "contacts.json");
const { v4: uuidv4 } = require("uuid");

function listContacts() {
  fs.readFile(contactsPath)
    .then((resp) => {
      const contacts = JSON.parse(resp);
      console.table(contacts);
    })
    .catch((error) => console.log(error.message));
}
function getContactById(contactId) {
  fs.readFile(contactsPath)
    .then((response) => {
      const contacts = JSON.parse(response);
      const contact = contacts.filter((elem) => elem === contactId);
      console.table(contact);
    })
    .catch((error) => console.log(error.message));
}
function addContact(name, email, phone) {
  fs.readFile(contactsPath)
    .then((resp) => {
      const contacts = JSON.parse(resp);
      const newContact = {
        id: uuidv4(),
        name,
        email,
        phone,
      };
      const newContacts = [...contacts, newContact];
      return fs.writeFile(contactsPath, JSON.stringify(newContacts));
    })
    .then(() => {
      return fs.readFile(contactsPath);
    })
    .then((data) => {
      const contacts = JSON.parse(data);
      console.table(contacts);
    })
    .catch((error) => console.log(error.message));
}
function removeContact(contactId) {
  fs.readFile(contactsPath)
    .then((data) => {
      const contacts = JSON.parse(data);
      const newContacts = contacts.filter(
        (contact) => contact.id !== contactId
      );
      return fs.writeFile(contactsPath, JSON.stringify(newContacts));
    })
    .then(() => {
      return fs.readFile(contactsPath);
    })
    .then((data) => {
      const contacts = JSON.parse(data);
      console.table(contacts);
    })
    .catch((error) => console.log(error.message));
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
