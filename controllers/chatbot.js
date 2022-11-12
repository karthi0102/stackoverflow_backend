import SerpApi from 'google-search-results-nodejs';
const search = new SerpApi.GoogleSearch("d0e587064caee895a4d1ff9031907fd35e1f345886066627676835943d853a9b");
export const getAnswer = async(req,res)=>{
  const {message} = req.body
  const params = {
    q: `${message}`,
    location: "India",
    google_domain: "google.com",
    hl: "en",
    gl: "us"
  };
  try{
  const callback = function(data) {
    res.status(200).json(data)
  };
  
  // Show result as JSON
  search.json(params, callback);
  // console.log(ansData);
  // res.status(200).json(ansData)
  
}catch(err){
  res.status(500).json({message:err.message})
}
}
