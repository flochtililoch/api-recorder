require('colors');

module.exports.serviceStarted = config => {
  const {log, offline, target, port, directory} = config;
  const lines = [
    '',
    `API Recorder running on port: ${port.toString().cyan}`
  ];

  if (!offline) {
    lines.push(`Proxying to: ${target.cyan}`);
    lines.push(`Recording data to: ${directory.cyan}`);
  } else {
    lines.push(`Reading data from: ${directory.cyan}`);
  }
  lines.push('\n\n');

  if (log !== false) {
    console.log(lines.join('\n  '));
  }
};
