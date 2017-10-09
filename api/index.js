const Api = () =>
{
  const obj = { PREFIX: 'Pref' };

  function randomInteger(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
  }

  function fetchUser(tm = randomInteger(1, 4) * 1000)
  {
    return new Promise((res, rej) => {
      console.log(obj.PREFIX, 'in fetch promise', tm);
      let num = randomInteger(1, 20);
      setTimeout(() => { res({ num }); }, tm);
    });
  }

  return {
    fetchUser: fetchUser
  }
};

module.exports = Api();