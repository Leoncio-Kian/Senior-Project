/**
 * Created by leonc on 4/2/2016.
 */
import './login.view.html';

//Template.login.onCreated();
//Template.login.onRendered();
//Template.login.helpers();
Template.login.events({
  "submit .login": function (event) {
    event.preventDefault();

    var email = event.target.Email.value;
    var password = event.target.Password.value;

    Meteor.loginWithPassword(email, password);
  }
});

//Template.register.onCreated();
//Template.register.onRendered();
//Template.register.helpers();
Template.register.events({
  "submit .newUser": function (event) {
    event.preventDefault();
    var username = event.target.Username.value;
    var password = event.target.Password.value;
    var FirstName = event.target.FirstName.value;
    var LastName = event.target.LastName.value;
    var email = event.target.Email.value;
    var birthday = event.target.Birthday.value;
    var Gender = event.target.Gender.value;
    var country = event.target.Country.value;

    var newUser = {
      username: username,
      email: email,
      profile: {
        firstName: FirstName,
        lastName: LastName,
        birthday: birthday,
        gender: Gender,
        country: country
      },
      password: password
    };
    Accounts.createUser(newUser, function (error, response) {
      console.log('error', error, 'response', response);
    });
    console.log('Form submitted');
  }
});