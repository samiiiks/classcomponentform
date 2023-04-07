import React, { Component } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const signupSchema = Yup.object().shape({
    Name: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    Email: Yup.string()
        .email('Invalid email')
        .required('Required'),
    Password: Yup.string()
        .required('Required')
        .min(6, 'Must be at least 6 characters')
})

export class SignupForm extends Component {
    constructor(props) {
        super(props);
        this.state = { Name: '', Email: '', Password: '', data: [], values: [] };
    }
    
    render() {
        console.log(this.state.values)
        return (
            <div>
                <h1>Please fill this form</h1>
                <Formik
                    initialValues={{
                        Name: '',
                        Email: '',
                        Password: '',
                    }}
                    validationSchema={signupSchema}
                    onSubmit={values => {
                        this.setState({ ...this.state, values: [...this.state.values, values] })
                        console.log(this.state.values);
                    }}
                >
                    {({ errors, touched }) => (
                        <Form>
                            <label>
                                Name:
                                <Field name='Name' />
                                {errors.Name && touched.Name && <div>{errors.Name}</div>}
                            </label>
                            <label>
                                Email:
                                <Field name="Email" />
                                {errors.Email && touched.Email && <div>{errors.Email}</div>}
                            </label>
                            <label>
                                Password:
                                <Field name='Password' type="password" />
                                {errors.Password && touched.Password && <div>{errors.Password}</div>}
                            </label>
                            <button type='submit' >Submit</button>
                        </Form>
                    )}
                </Formik>
                {this.state.values.map((i) =>
                    <div key={i.Name}>
                        <p>Name : {i.Name}</p>
                        <p>Email : {i.Email}</p>
                        <p>Password : {i.Password}</p>
                    </div>
                )}
            </div>
        )
    }
}

export default SignupForm;

