(function(){
  try{
    var API_BASE = "https://brand-api-sxnu.onrender.com"; // Replace if needed
    if(!API_BASE){return;}
    var origFetch = window.fetch;
    if(typeof origFetch === "function"){
      window.fetch = function(input, init){
        try{
          var url = (typeof input === "string") ? input : (input && input.url) || "";
          if(url.indexOf("/api/") === 0){
            var newUrl = API_BASE + url;
            if(typeof input === "string"){
              input = newUrl;
            }else{
              input = new Request(newUrl, input);
            }
          }
        }catch(e){}
        return origFetch(input, init);
      };
    }
  }catch(e){}
})();
