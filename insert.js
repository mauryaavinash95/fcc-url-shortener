const { URL, Counter } = require('./schema.js');

function insert(original_url){
  return new Promise((resolve, reject)=>{
   Counter.findByIdAndUpdate({_id: "counterId"}, {$inc: {counter: 1}}, { upsert: true })
  .then(counter=>{
    let u = new URL({
      short_url: counter.counter,
      original_url
    });
    return u.save()
  })
  .then(res=>{
    console.log("New URL: ", res);
    resolve(res);
  })
  .catch(err=>{
    console.log("Error: ", err);
  })
  })
}

module.exports = insert;