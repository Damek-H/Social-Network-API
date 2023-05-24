const myExpress = require('express');
const myDB = require('./config/connection');
const myRoutes = require('./routes');
const myCwd = process.cwd();
const myPORT = process.env.PORT || 3001;
const myApp = myExpress();
const myActivity = myCwd.includes('01-Activities')
  ? myCwd.split('/01-Activities/')[1]
  : myCwd;

myApp.use(myExpress.urlencoded({ extended: true }));
myApp.use(myExpress.json());
myApp.use(myRoutes);

myDB.once('open', () => {
  myApp.listen(myPORT, () => {
    console.log(`API server for ${myActivity} running on port ${myPORT}!`);
  });
});
