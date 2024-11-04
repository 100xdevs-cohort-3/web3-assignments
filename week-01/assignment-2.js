const crypto = require('crypto');

/*

What if I ask you that the input string should start with 100xdevs ? How would the code change?

sample input and output

Input: 100xdevs2274885
Output Hash: 00000b2d1dde70b56f41571855e268d140b304c7661c0ef04a8889bd83a88b06

*/

// Function to find an input string that produces a hash starting with '00000'
const crypto=require("crypto")
function findingHashWithprefix(prefix){
  let input=0
  while(true){
    let hash="100xdevs"+input.toString()
    let hashedValue=crypto.createHash('sha256').update(hash).digest('hex')
    if(hashedValue.startsWith(prefix)){
      return {input:hash, hashedValue:hashedValue}
    }
    input++;
  }
  
}


const result=findingHashWithprefix("00000")
console.log(`Input ${result.input}`)
console.log(`Hash ${result.hashedValue}`)