import buildApp from "./app";

const server = buildApp()

server.listen({port: 3333})
.then((address)=>{console.log(`Server is running: ${address}`)})
.catch(err => {
  console.log(`Error start server: ${err}`)
  process.exit(1)
})