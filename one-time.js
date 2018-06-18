var { Counter } = require('./schema');

let c = {
  _id: "",
  counter: 0
};

c.save()
.then(res=>{
  console.log("Res: ", res);
})
.catch(err=>{
  console.log("Err: ", err);
})