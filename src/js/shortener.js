// shortener validation
// let form = document.querySelector('.form');

// form.reset();

// const validation = new JustValidate('#form', {
//   errorFieldCssClass: 'error--field',
//   errorLabelCssClass: 'error--label',
//   focusInvalidField: false,
//   lockForm: true,
// });

// validation
//   .addField('#name', [
//     {
//       rule: 'minLength',
//       value: 3,
//       // errorMessage: '',
//     },
//     {
//       rule: 'maxLength',
//       value: 30,
//     },
//   ])
//   .addField('#email', [
//     {
//       rule: 'required',
//       errorMessage: 'Field is required',
//     },
//     {
//       rule: 'email',
//       errorMessage: 'Email is invalid!',
//     },
//   ])
//   .addField('#password', [
//   {
//     rule: 'customRegexp',
//     value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/,
//   },
//   ])
//   validation.addField('#repeat-password', [
//   {
//     validator: (value, fields) => {
//       if (fields['#password'] && fields['#password'].elem) {
//         const repeatPasswordValue = fields['#password'].elem.value;

//         return value === repeatPasswordValue;
//       }

//       return true;
//     },
//     errorMessage: 'Passwords should be the same',
//   },
//   ])
//   .addField('#message', [
//     {
//       rule: 'required',
//       errorMessage: 'Field is required',
//     },
//   ])
//   .addField('#consent_checkbox', [
//     {
//       rule: 'required',
//       // errorMessage: '',
//     },
//   ])

//   .onSuccess((event) => {
//     alert("Супер!");
//     console.log('Validation passes and form submitted', event);
//   });
