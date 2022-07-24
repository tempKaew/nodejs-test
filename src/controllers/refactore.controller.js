const axios = require('axios').default;

const getToDoList = async(req, res) => {
  try {
    const re = await axios.get('https://jsonplaceholder.typicode.com/todos/1')
    console.log('response: ', re.data);
    res.json(re.data);
  } catch (error) {
    console.error(error)
    res.json({'status' : 'error'})
  }
}

module.exports = {
  getToDoList
};