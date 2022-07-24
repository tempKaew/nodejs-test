const axios = require('axios').default;

//ไม่ต้องทำการ Refactore function นี้
const User = () => {
  return {
    insert: function (data) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({ message: "saved", data: data });
        }, 1000);
      });
    },
  };
}

const getToDoList = async(req, res) => {
  var tasksId = [1, 3, 5, 7, 9, 11, 13];
  var togoList = [];
  const loopTask = tasksId.map(async(id) => {
    await axios.get('https://jsonplaceholder.typicode.com/todos/'+id)
    .then(async(res) => {
      const insert = await User().insert({
        id: res.data.id,
        userId: res.data.userId,
        title: res.data.title,
        remark: "Title " + res.data.title + "Write by " + res.data.userId,
        status: res.data.completed === true ? 'Complete' : 'Not complete',
      })
      // console.log('success id :',res.data.id)
      togoList.push(insert);
    })
    .catch(function (error) {
      console.log(error);
    })
  });
  await Promise.all(loopTask);
  res.json({'togoList' : togoList})
}

module.exports = {
  getToDoList
};