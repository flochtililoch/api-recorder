require('colors');

module.exports.serviceStarted = config => {
  const {log, offline, target, port, directory} = config,
    host = `http://localhost:${port}`;

  let line = [
    host.cyan
  ];

  if (!offline) {
    line.push(target.magenta);
  }

  line.push(directory.yellow);

  if (log !== false) {
    console.log(line.join(' => '));
  }
};
