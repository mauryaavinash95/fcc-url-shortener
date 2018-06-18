const { URL, Counter } = require('./schema.js');

function insert(original_url){
  console.log("INSERT FUNCTION CALLED");
  return Counter.findByIdAndUpdate({_id: "counterId"}, {$inc: {counter: 1}})
  .then(counter=>{
    console.log("New Counter: ", counter);
  })
}

module.exports = insert;