const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');

const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const doctorRouter = require('./routes/doctor');
const appointmentRouter = require('./routes/appointment');
const availabilityRouter = require('./routes/availability');
const patientRouter = require('./routes/patient');
const patientLoginRouter = require('./routes/patient_login');
const doctorLoginRouter = require('./routes/doctorlogin');
const adminLoginRouter = require('./routes/adminlogin');
const registrationPatientRouter = require('./routes/patientRegistration');
const registrationDoctorRouter = require('./routes/doctorRegistration');
const searchRouter = require('./routes/search');
const authenticateUserRouter = require('./authenticateUser');
const adminRouter = require('./routes/admin');

dotenv.config();

const app = express();
// app.use(authenticateUserRouter);
app.use(cors({ origin: 'http://localhost:3001', credentials: true, methods: 'GET,PUT,POST,DELETE,OPTIONS', allowedHeaders: 'Content-Type,Authorization' }))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/patientlogin', patientLoginRouter);
app.use('/doctorlogin', doctorLoginRouter);
app.use('/adminlogin', adminLoginRouter);
app.use('/user', userRouter);
app.use('/doctor', doctorRouter);
app.use('/patient', patientRouter);
app.use('/appointment', appointmentRouter);
app.use('/patientregistration', registrationPatientRouter);
app.use('/doctorregistration', registrationDoctorRouter);
app.use('/search', searchRouter);
app.use('/availability', availabilityRouter);
app.use('/admin', adminRouter);
app.use('/search', searchRouter);

module.exports = app;
