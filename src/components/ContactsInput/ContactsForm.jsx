import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { InputLabel } from 'components/ContactsInput/ContactsForm.styled';
import { Button } from 'components/reusableComponents';
import { Title } from 'components/reusableComponents';
import { Box } from 'components/reusableComponents';

const Input = styled(Field)`
  box-sizing: border-box;
  display: block;
  width: 100%;
  margin-bottom: 4px;
`;

const ErrorMsgStyled = styled(ErrorMessage)`
  width: 100%;
  padding: 4px;
  display: block;
  font-size: 12px;
  box-sizing: border-box;
  border: 1px solid red;
`;

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .min(3)
    .max(20)
    .matches(
      /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
      "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
    )
    .required('Please enter contact name'),
  number: yup
    .string()
    .min(3)
    .max(20)
    .matches(
      /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/,
      'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
    )
    .required('Please enter contact number'),
});

export default function ContactsInput({ onFormSubmit }) {
  const initialValues = {
    name: '',
    number: '',
  };

  const onSubmit = (values, actions) => {
    onFormSubmit(values);
    actions.resetForm();
  };

  return (
    <Box>
      <Title>Create contact</Title>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form autoComplete="off">
          <InputLabel>
            Name
            <Input type="text" name="name" />
          </InputLabel>
          <ErrorMsgStyled component="span" name="name" />
          <InputLabel>
            Number
            <Input type="tel" name="number" />
          </InputLabel>
          <ErrorMsgStyled component="span" name="number" />
          <Button type="submit">Add contact</Button>
        </Form>
      </Formik>
    </Box>
  );
}

ContactsInput.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
};
