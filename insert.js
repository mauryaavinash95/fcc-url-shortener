const { URL, Counter } = require('./schema.js');

function insert(original_url){
  console.log("INSERT FUNCTION CALLED");
  return Counter.findByIdAndUpdate({_id: "counterId"}, {$inc: {counter: 1}}, { upsert: true })
  .then(counter=>{
    console.log("New Counter: ", counter);
    let u = {
      short
    }
  })
  .catch(err=>{
    console.log("Error: ", err);
  })
}

module.exports = insert;