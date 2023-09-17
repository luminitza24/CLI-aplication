const fs = require("fs").promises;
const path = require("path");
const contactsPath = require("./src/db.contacts.json");
const { v4: uuidv4 } = require("uuid");
const { program } = require("commander");
program
  .option("-a, --action [type]", "Action to do", "list")
  .option("-f, --filter [type]", "Filter by name", "all")
  .option("-n, --name [type]", "Contact name", false)
  .option("-nu, --number[type]", "Contact number", false)
  .option("-id, --");
program.parse(process.argv);

function listContacts() {
  fs.readFile(contactsPath).then((resp) => {
    const contacts = JSON.parse(resp);
    console.table(contacts);
  });
}
function getContactById(contactId) {
  fs.readFile(contactsPath).then((response) => {
    const contacts = JSON.parse(response);
    const contact = contacts.filter((elem) => elem === contactId);
    console.table(contact);
  });
}
function removeContact(contactId) {}
function addContact(name, email, phone) {}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
