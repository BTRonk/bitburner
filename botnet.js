/*
  botnet.script

  executes the main botnet.
  starts by hacking foodnstuff manually
  copyPayload is the manual version of hackAll scripts
*/

nuke('foodnstuff');

run('copyPayload.script', 1, 'foodnstuff');

// rent script gets the hacknodes running
if (!scriptRunning('rent.script', 'home')) {
  exec('rent.script', 'home');
}

if (!scriptRunning('playerServers.script', 'home')) {
  exec('playerServers.script', 'home');
}

if (!scriptRunning('spider.script', 'home')) {
  exec('spider.script', 'home');
}

tprint('Botnet up and running. Keep monitoring the progress.');
