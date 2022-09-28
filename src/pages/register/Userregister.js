import { useFormik } from 'formik'
import * as yup from 'yup';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./UserRegister.css"
import { useNavigate } from 'react-router-dom';
import { API } from '../../App';
import axios from "axios";

const validateFormSchema = yup.object({
    username: yup.string().required('Please fill the Username'),
    email: yup.string().min(5,"need a longer email address").required('plz fill email address'),
    password: yup.string().min(5, "need a longer password").max(12, "too much password").required("fill password!!")
})

const UserRegister = () => {

    const navigate = useNavigate();

    const {handleBlur, handleChange, handleSubmit, errors, values, touched} = useFormik(
        {
            initialValues:{username:"",email:"",password:"",role:"user"},
            validationSchema: validateFormSchema,
            onSubmit: (values) => {
                console.log(values);

                 registerUser(values)
            }
        }
    )

    const registerUser = async (values) => {
      const res = await  axios.post(`${API}/user/register`,values);
      if(res.data) {
navigate("/login")
      }

    }

  return (
    <section className="userRegister-section">
      <div className="container userRegister-wrapper">
        <Card className="form-card">
          <CardContent className="form-cardContent">
            <h3>Create account</h3>
            <form className="form-wrapper" onSubmit={handleSubmit}>
              <div className="form-control">
                <TextField
                  className="userInput"
                  label="Username"
                  placeholder="Enter Username"
                  id="username"
                  name="username"
                  type="text"
                  value={values.username}
                  error={errors.username && touched.username}
                  helperText={
                    errors.username && touched.username && errors.username
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                  multiline
                  variant="standard"
                />
              </div>
              <div className="form-control">
                <TextField
                  className="userInput"
                  label="Email Address"
                  placeholder="Enter Email Address"
                  id="email"
                  name="email"
                  type="email"
                  value={values.email}
                  error={errors.email && touched.email}
                  helperText={errors.email && touched.email && errors.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  multiline
                  variant="standard"
                />
              </div>
              <div className="form-control">
                <TextField
                  className="userInput"
                  label="Password"
                  placeholder="Enter Password"
                  type="password"
                  id="password"
                  name="password"
                  value={values.password}
                  error={errors.password && touched.password}
                  helperText={
                    errors.password && touched.password && errors.password
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                  multiline
                  variant="standard"
                />
              </div>
              <div className="form-control">
                <TextField
                  className="userInput"
                  disabled
                  id="role"
                  name="role"
                  value={values.role}
                  label="Role (Default)"
                  variant="standard"
                />
              </div>
              <Button
                className="submitBtn"
                variant="contained"
                size="medium"
                type="submit"
              >
                Create User
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

export default UserRegister