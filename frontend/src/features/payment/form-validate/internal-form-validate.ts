import * as yup from 'yup';

export const InternalFormValidate = yup.object().shape({
    CardSendId: yup.number()
    .max(1000000000000, "Too Long")
    .min(100000000000, "Too Short")
    .required('Required'),

    CardReceiveId: yup.number()
    .max(1000000000000, "Too Long")
    .min(100000000000, "Too Short")
    .required('Required'),

    Amount: yup.number()
    .min(100000, 'Too Short')
    .required('Required'),

    Description: yup.string()
    .min(10, "Too Short")
    .max(150, "Too Long")
    .required('Required'),
    OTP: yup.number()
    .min(100000, 'wrong otp')
    .max(999999, "wrong otp")
    .required('Required'),
})