import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import { Box } from './reusableComponents';
import ContactsInput from './ContactsInput';
import ContactsList from './ContactsList';
import Filter from './Filter';

export class App extends Component {
  state = { contacts: [], filter: '' };

  onFormSubmit = ({ name, number }) => {
    const newContact = {
      name,
      number,
      id: nanoid(),
    };
    if (
      this.state.contacts.some(contact => {
        const existName = contact.name.toLowerCase();
        const newName = name.toLowerCase();
        return existName === newName;
      })
    ) {
      alert(`${name} is already in contacts.`);
      return;
    }
    this.setState(prevState => {
      const currentContacts = prevState.contacts;
      return { contacts: [...currentContacts, newContact] };
    });
  };

  onContactDelete = contactId => {
    this.setState(prevState => {
      const currentContacts = prevState.contacts;
      return {
        contacts: currentContacts.filter(({ id }) => id !== contactId),
      };
    });
  };

  onFilterChange = query => {
    this.setState({ filter: query.toLowerCase() });
  };

  render() {
    const { onFormSubmit, onContactDelete, onFilterChange } = this;
    const filterValue = this.state.filter;
    const contacts = this.state.contacts;
    const filteredContacts = contacts.filter(
      ({ name, number }) =>
        name.toLowerCase().includes(filterValue) ||
        number.toLowerCase().includes(filterValue)
    );
    return (
      <Box border="1px solid black" width="300px" mt="15px" ml="15px" p="4px">
        <h1>Phonebook</h1>
        <ContactsInput onFormSubmit={onFormSubmit} />
        {contacts[0] && (
          <>
            <Filter onFilterChange={onFilterChange} value={filterValue} />
            <ContactsList
              contacts={filteredContacts}
              onContactDelete={onContactDelete}
            />
          </>
        )}
      </Box>
    );
  }
}
