Router.configure({
  layoutTemplate: 'Vlass-Layout'
});


Router.route('/', function (){
  this.render('landing', {to: 'aside'});
});
Router.route('/login', function () {
  this.render('login', {to: 'aside'});
});
Router.route('/register', function () {
  this.render('register', {to: 'aside'});
});