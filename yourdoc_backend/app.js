const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const BASE_ROUTE = '/.netlify/functions/api';

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
const adminRouter = require('./routes/admin');
const uploadRouter = require('./routes/upload');
const prescriptionRouter = require('./routes/prescription');


const app = express();
app.use(cors({ origin: process.env.FE_URL || 'http://localhost:3001', credentials: true, methods: 'GET,PUT,POST,DELETE,OPTIONS', allowedHeaders: 'Content-Type,Authorization' }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(BASE_ROUTE, indexRouter);
app.use(BASE_ROUTE + '/patientlogin', patientLoginRouter);
app.use(BASE_ROUTE + '/doctorlogin', doctorLoginRouter);
app.use(BASE_ROUTE + '/adminlogin', adminLoginRouter);
app.use(BASE_ROUTE + '/user', userRouter);
app.use(BASE_ROUTE + '/doctor', doctorRouter);
app.use(BASE_ROUTE + '/patient', patientRouter);
app.use(BASE_ROUTE + '/appointment', appointmentRouter);
app.use(BASE_ROUTE + '/patientregistration', registrationPatientRouter);
app.use(BASE_ROUTE + '/doctorregistration', registrationDoctorRouter);
app.use(BASE_ROUTE + '/search', searchRouter);
app.use(BASE_ROUTE + '/availability', availabilityRouter);
app.use(BASE_ROUTE + '/admin', adminRouter);
app.use(BASE_ROUTE + '/upload', uploadRouter);
app.use(BASE_ROUTE + '/prescription', prescriptionRouter);

module.exports = app;
