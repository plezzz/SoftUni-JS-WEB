module.exports=(data=null)=>{
  return {
      db: 'Connected to database successfully!',
      app: `Server is ready, listening on port: ${data}...`
  }
};
