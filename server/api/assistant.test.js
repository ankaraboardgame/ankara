// var ref;
// var people = {
//   ref: function () {
//     if (!ref) ref = new Firebase('htttps://example.firebaseio.com/people');
//     return ref;
//   },
//   greet: function (person) {
//     console.log('hi ' + person.first);
//   },
//   listen: function () {
//     people.ref().on('child_added', function (snapshot) {
//       people.greet(snapshot.val());
//     });
//   }
// };

// var MockFirebase = require('mockfirebase');
// MockFirebase.override();

// people.listen();

// var greeted = [];

// people.greet = function (person) {
//   greeted.push(person);
// };

// ref.push({
//   first: 'Michael'
// });

// ref.push({
//   first: 'Ben'
// });

// ref.flush();
// console.assert(greeted.length === 2, '2 people greeted');
// console.assert(greeted[0].first === 'Michael', 'Michael greeted');
// console.assert(greeted[1].first === 'Ben', 'Ben greeted');
