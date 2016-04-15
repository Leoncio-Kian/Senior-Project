/**
 * Created by leonc on 4/2/2016.
 */
import './login.css';
import './login.view.html';


Template.login.events({
  "submit .login-form": function (event) {
    event.preventDefault();

    var email = event.target.Email.value;
    var password = event.target.Password.value;

    Meteor.loginWithPassword(email, password);
  }
});

Template.register.events({
  "submit .register-form": function (event) {
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
    Accounts.createUser(newUser, function (error) {
      if(error) {
        console.log('error', error);
      }
      else{
        Route.go('/');
      }
    });
    console.log('Form submitted');
  }
});