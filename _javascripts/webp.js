
const webp=require('webp-converter');
const fs = require('fs');
const files = fs.readdirSync('/Users/destinysetzer/Documents/ZollegeCode/circle-education-local/assets/originalUploads');

//pass input image(.jpeg,.pnp .....) path ,output image(give path where to save and image file name with .webp extension)
//pass option(read  documentation for options)

//cwebp(input,output,option)

for (let i = 0; i < files.length; i++) {
  const file = files[i];
  const newFile = file.replace(/.jpg|.png|.jpeg/g,''); // result: "this is a test"
  const result = webp.cwebp('/Users/destinysetzer/Documents/ZollegeCode/circle-education-local/assets/originalUploads/'+files[i],'/Users/destinysetzer/Documents/ZollegeCode/circle-education-local/assets/uploads/'+newFile + '.webp',"-q 80",logging="-v");
  result.then((response) => {
    console.log(response);
  });
  }