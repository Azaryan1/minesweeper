const db = require('../models');

const Result = db.result;
const User = db.user;

exports.submitResult = async (req, res) => {
  const result = new Result({
    username: req.body.username,
    time: req.body.time,
    level: req.body.level,
    isWin: req.body.isWin,
  });
  if (req.body.isWin) {
    await User.findOne({ username: req.body.username }).then(async (user) => {
      const key = `${req.body.level}Best`;
      if (!user[key] || user[key] > req.body.time) {
        const obj = {}; // updateOne treats key as a "key" key not as a variable
        obj[key] = req.body.time;
        await User.updateOne({ username: req.body.username }, { $set: obj });
      }
    });
  }

  result.save((err) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.send({ message: 'Result was saved successfully!' });
  });
};

exports.top = async (req, res) => {
  const data = [];
  const sort = {};
  sort[`${req.query.level}Best`] = 1;
  await User.find({})
    .sort(sort)
    .limit(10)
    .then((results) => {
      results.forEach((result) => {
        const {
          username,
          firstName,
          lastName,
          easyBest,
          mediumBest,
          hardBest,
        } = result;
        const obj = {
          username,
          firstName,
          lastName,
        };
        switch (`${req.query.level}`) {
          case 'easy':
            obj.best = easyBest;
            break;
          case 'medium':
            obj.best = mediumBest;
            break;
          case 'hard':
            obj.best = hardBest;
            break;
          default:
            obj.best = mediumBest;
            break;
        }
        if (Number.isFinite(obj.best)) {
          data.push(obj);
        }
      });
    });
  // await Result.find({ level: req.query.level, isWin: true })
  //   .sort({ time: 1 })
  //   .limit(250)
  //   .then((results) => {
  //     data = results.map((result) => {
  //       const { username, time, level, createdAt } = result;
  //       return {
  //         username,
  //         time,
  //         level,
  //         createdAt,
  //       };
  //     });
  //   });
  res.json(data);
};

exports.userData = async (req, res) => {
  const nGames = {};
  const nWins = {};
  const bests = {
    easy: +Infinity,
    medium: +Infinity,
    hard: +Infinity,
  };
  const levels = ['easy', 'medium', 'hard'];
  for (let i = 0; i < levels.length; i++) {
    const level = levels[i];
    // eslint-disable-next-line no-await-in-loop
    await Result.find({ username: req.query.name, level }).then((results) => {
      nGames[level] = results.length;
    });
    // eslint-disable-next-line no-await-in-loop
    await Result.find({
      username: req.query.name,
      isWin: true,
      level,
    }).then((results) => {
      nWins[level] = results.length;
    });
    // eslint-disable-next-line no-await-in-loop
    await Result.find({ username: req.query.name, isWin: true, level })
      .sort({ time: 1 })
      .limit(1)
      .then((result) => {
        if (result.length > 0) {
          bests[level] = result[0].time;
        }
      });
  }

  res.json({ nGames, nWins, bests });
};
