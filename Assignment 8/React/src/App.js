import logo from './logo.svg';
import './App.css';

import axios from "axios";
import React from "react";

function App() {
  const [contacts, setContacts] = React.useState(null);

  React.useEffect(() => {
    axios.get("http://localhost:3000/contact").then((response) => setContacts(response.data));
  }, []);

  if (!contacts) return null;

  return (
    <div>
      <h1>Contacts</h1>
      <ul>
        {contacts.map(contact => {
          return (
            <li>{contact.firstname} {contact.lastname}<br/>{contact.email}</li>
          )
        })}
      </ul>
    </div>
  );
}

export default App;
