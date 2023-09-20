const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      listContacts();
      break;

    case "get":
      if (!id) {
        throw new Error("Please provide contact id!");
      }
      getContactById();
      break;

    case "add":
      if (!name && !email && !phone) {
        throw new Error("Please enter valid name, email and phone number!");
      }
      fs.readFile("./src/db/contacts.json", "utf8", (err, contacts) => {
        const newContacts = JSON.parse(contacts);
        newContacts.push({ id: uuidv4(), name: name, number: number });
        fs.writeFileSync("./src/db/contacts.json", JSON.stringify(newContacts));
      });
      break;

    case "remove":
      if (!id) {
        throw new Error("Please provide contact id!");
      }
      removeContact(id);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
