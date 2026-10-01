const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { createClient } = require('@supabase/supabase-js');
const { HubConnectionBuilder, LogLevel } = require('@microsoft/signalr');

async function main() {
  const config = JSON.parse(fs.readFileSync(path.join(__dirname, '../../ChatApp.server/appsettings.json'), 'utf8')).Supabase;
  const clients = [];
  const connections = [];
  const hubUrl = process.env.CONVO_TEST_HUB_URL || 'http://localhost:5180/hub';
  try {
    for (const suffix of ['A', 'B', 'C']) {
      const email = process.env['CONVO_TEST_EMAIL_' + suffix];
      const password = process.env['CONVO_TEST_PASSWORD_' + suffix];
      assert.ok(email && password, 'Configure the three CONVO_TEST_EMAIL_* and CONVO_TEST_PASSWORD_* variables.');
      const client = createClient(config.Url, config.PublishableKey, { auth: { persistSession: false, autoRefreshToken: false } });
      const { data, error } = await client.auth.signInWithPassword({ email, password });
      assert.ifError(error);
      const { error: profileError } = await client.from('profiles').upsert({
        id: data.user.id, display_name: data.user.user_metadata.display_name || 'Test user'
      }, { onConflict: 'id', ignoreDuplicates: true });
      assert.ifError(profileError);
      clients.push({ client, user: data.user, token: data.session.access_token });
    }
    const received = [[], [], []];
    for (let index = 0; index < clients.length; index++) {
      const connection = new HubConnectionBuilder()
        .withUrl(hubUrl, { accessTokenFactory: () => clients[index].token })
        .configureLogging(LogLevel.None).build();
      connection.on('messageReceived', row => received[index].push(row));
      connections.push(connection);
      await connection.start();
    }
    const body = 'SignalR integration test ' + Date.now();
    const row = await connections[0].invoke('SendMessage', clients[1].user.id, body);
    assert.equal(row.sender_id, clients[0].user.id);
    assert.equal(row.recipient_id, clients[1].user.id);
    assert.equal(row.body, body);
    const deadline = Date.now() + 10000;
    while (Date.now() < deadline && (!received[0].some(message => message.id === row.id) || !received[1].some(message => message.id === row.id)))
      await new Promise(resolve => setTimeout(resolve, 50));
    assert.ok(received[0].some(message => message.id === row.id), 'Sender did not receive live event.');
    assert.ok(received[1].some(message => message.id === row.id), 'Recipient did not receive live event.');
    assert.equal(received[2].length, 0, 'Outsider received a private event.');
    const visible = await clients[1].client.from('messages').select('*').eq('id', row.id);
    assert.ifError(visible.error);
    assert.equal(visible.data.length, 1, 'Recipient cannot reload saved history.');
    const hidden = await clients[2].client.from('messages').select('*').eq('id', row.id);
    assert.ifError(hidden.error);
    assert.equal(hidden.data.length, 0, 'Outsider can read saved history.');
    await assert.rejects(() => connections[0].invoke('SendMessage', clients[0].user.id, 'Self'));
    await assert.rejects(() => connections[0].invoke('SendMessage', clients[1].user.id, '   '));
    await assert.rejects(() => connections[0].invoke('SendMessage', clients[1].user.id, 'x'.repeat(4001)));
    const anonymous = await fetch(hubUrl + '/negotiate?negotiateVersion=1', { method: 'POST' });
    assert.equal(anonymous.status, 401);
    console.log('PASS: real Supabase Auth, SignalR live delivery, persisted history, outsider isolation, input validation, anonymous denial.');
  } finally {
    await Promise.allSettled(connections.map(connection => connection.stop()));
    await Promise.allSettled(clients.map(({ client }) => client.auth.signOut()));
  }
}
main().catch(error => { console.error(error.message); process.exitCode = 1; });
