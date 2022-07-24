let users = [
  {
    name: 'Smochai',
    surname: 'Thomson',
    gender: 'M',
    birthDate: '1/1/1900'
  },
  {
    name: 'Helen',
    surname: 'Yu',
    gender: 'F',
    birthDate: '1/12/1950'
  },
  {
    name: 'Mickey',
    surname: 'Mouse',
    gender: 'M',
    birthDate: '16/1/1928'
  },
  {
    name: 'Apirak',
    surname: 'Manee',
    gender: 'M',
    birthDate: '16/1/1928'
  },
  {
    name: 'Thomson',
    surname: 'Eve',
    gender: 'M',
    birthDate: '16/1/1928'
  }
]

const generate = function(req, res) {
  let name = req.query.name
  let surname = req.query.surname
  let gender = req.query.gender
  let birthDate = req.query.birthDate

  if (
    !name
    && !surname
    && !gender
    && !birthDate
  ) {
    let usersMap = users.map(user => {
      return {
        ...user,
        'generateCode': generateCode(user.name, user.surname, user.gender, user.birthDate)
        ,'generateCode-2': generateCode2(user.name, user.surname, user.gender, user.birthDate)
        ,'source': '--------'
        ,'generateName' : generateName(user.name)
        ,'generateSurname' : generateSurname(user.surname)
        ,'generateCodeDate' : generateCodeDate(user.gender, user.birthDate)
      }
    })
    res.json(usersMap);
  }else{
    let response = {
      name: name,
      surname: surname,
      gender: gender,
      birthDate: birthDate,
      generateCode: generateCode(name, surname, gender, birthDate)
    }
    res.json(response);
  }
}

const generateCode = function(_name, _surname, _gender, _birthDate) {
  let code = generateSurname(_surname) + generateName(_name) + generateCodeDate(_gender, _birthDate)
  return code
}
const generateCode2 = function(_name, _surname, _gender, _birthDate) {
  let code = generateName(_surname) + generateSurname(_name) + generateCodeDate(_gender, _birthDate)
  return code
}

const generateName = function(_name) {
  const limitStr = 3
  const stringX = 'X'
  let stringXAdd = ''
  _name = _name.replace(/[^a-z]/gi,'').toUpperCase()
  if (!_name) {
    for (let index = 0; index < limitStr; index++) {
      stringXAdd = stringXAdd+stringX
    }
    return stringXAdd
  }
  const nameCons = _name.replace(/[aeiou]/gi,'')
  const nameVowel = _name.replace(/[^aeiou]/gi,'')
  if (nameCons.length==limitStr) {
    return nameCons.substring(0, 3);
  }
  return _name
}

const generateSurname = function(_surname) {
  const limitStr = 3
  const stringX = 'X'
  let stringXAdd = ''
  _surname = _surname.replace(/[^a-z]/gi,'').toUpperCase()
  if (!_surname) {
    for (let index = 0; index < limitStr; index++) {
      stringXAdd = stringXAdd+stringX
    }
    return stringXAdd
  }
  const surnameCons = _surname.replace(/[aeiou]/gi,'')
  const surnameVowel = _surname.replace(/[^aeiou]/gi,'')
  if (surnameCons.length>=limitStr) {
    return surnameCons.substring(0, 3);
  }else if(surnameCons.length>0){
    const vowelRequire = limitStr - surnameCons.length
    const srtAdd = vowelRequire - surnameVowel.length
    let stringAdd = ''
    for (let index = 0; index < srtAdd; index++) {
      stringAdd = stringAdd+stringX
    }
    return surnameCons + surnameVowel.substring(0, vowelRequire) + stringAdd
  }
  return stringXAdd
}

const generateCodeDate = function(_gender, _birthDate ) {
  return _gender
}

module.exports = {
  generate
};