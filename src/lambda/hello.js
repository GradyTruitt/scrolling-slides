export function handler(event, context, callback) {
  console.log('called function')
  callback(null, {
    statusCode: 200,
    body: JSON.stringify({ msg: 'Hello, World!' })
  })
}
