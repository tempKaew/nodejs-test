let users = [
  {
    name: 'Somchai',
    surname: 'Thomson',
    gender: 'M',
    birthDate: '1/1/1900'
  },
  {
    name: 'Thomson',
    surname: 'Somchai',
    gender: 'M',
    birthDate: '1/1/1900'
  },
  {
    name: 'Thomson',
    surname: 'Newman',
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
    surname: 'Ko',
    gender: 'M',
    birthDate: '16/1/1928'
  },
  {
    name: 'Samantha',
    surname: 'Eve',
    gender: 'M',
    birthDate: '16/1/1928'
  },
  {
    name: 'Pop',
    surname: 'Joy',
    gender: 'M',
    birthDate: '16/1/1928'
  },
  {
    name: 'Paula',
    surname: 'Od',
    gender: 'F',
    birthDate: '9/1/1928'
  },
  {
    name: 'Al',
    surname: 'Joy',
    gender: 'M',
    birthDate: '16/1/1928'
  },
  {
    name: 'Mo',
    surname: 'Joy',
    gender: 'F',
    birthDate: '16/1/1928'
  }
]

const monthReplace = ['','A','B','C','D','E','H','L','M','P','R','S','T']

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
        ...user
        ,'info': '---surname-name-gender-birthdate---'
        ,'generateCode': generateCode(user.name, user.surname, user.gender, user.birthDate)
        ,'info2': '---name-surname-gender-birthdate---'
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
  if (nameCons.length>limitStr) {
    return nameCons.substring(0, 1) + nameCons.substring(limitStr-1, limitStr) + nameCons.substring(limitStr, limitStr+1);
  }
  else if (nameCons.length==limitStr) {
    return nameCons.substring(0, limitStr);
  }
  else if(nameCons.length>0){
    const vowelRequire = limitStr - nameCons.length
    const srtAdd = vowelRequire - nameVowel.length
    let stringAdd = ''
    for (let index = 0; index < srtAdd; index++) {
      stringAdd = stringAdd+stringX
    }
    return nameCons + nameVowel.substring(0, vowelRequire) + stringAdd
  }
  return stringXAdd
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
  }
  else if(surnameCons.length>0){
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
  let date = _birthDate.substring(0, _birthDate.indexOf("/"));
  const month = _birthDate.substring(_birthDate.indexOf("/") + 1, _birthDate.lastIndexOf("/"));
  const year = _birthDate.substring(_birthDate.lastIndexOf("/") + 3, _birthDate.length);
  let monthCode = typeof monthReplace[month] !== 'undefined' ? monthReplace[month] : 'error'
  let formattedDate = ("0" + date).slice(-2);
  if (_gender == 'F' && formattedDate) {
    formattedDate = +formattedDate+40
  }
  return year + monthCode + formattedDate
}

module.exports = {
  generate
};