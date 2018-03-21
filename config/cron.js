const cron = require('node-cron');

function Job () {
  cron.schedule('*/3 * * * * *', function(){
    console.log(new Date(), 'runing');
  });

  cron.schedule('*/2 * * * * *', function(){
    console.log(new Date(), 'runing 2');
  });
  return cron;
}


module.exports = Job
