function test(){
  const data = { username: 'exampleUser', id: 123 };

fetch('https://backend-presence-l1z5.onrender.com/session', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
})
.then(response => response.json())
.then(result => console.log(result));
}
test()