document.querySelector('header').innerHTML = ` <h1> Text Bar </h1> `;
document.querySelector('style').innerText += `
header
{ background-color: grey;
  text-align: center;
  height: 1.7em;
  width:98%;
  margin:0 1%;
  box-shadow: 0 0 5px 5px white;}
header h1
{ margin:0;
  color: white;
  font-weight: normal;
  font-family: cursive;
  background-color:#333;
  display: inline;
  padding: 3px;
  border-radius: 3vw;
  box-shadow: 0 0 5px 5px white;}
  nav
  { display:grid;
    grid-template-columns: auto auto;
    position:fixed;
    bottom:0;
    width:100%;
    background-color: grey;
    border: solid #333;
    border-radius: 1em 1em 0 0;}
  nav div
  { display: grid;
    text-align: center;
    padding: 1%;
    width: 22vw;
    margin-left: 25%;}
    nav img
    { width: 25%;
      height:7vh;
      margin: auto 37.5%;
      border-radius: 1em;}`;
if (document.querySelector('nav')) {
  document.querySelector('nav').innerHTML = `
  <div onclick="document.location='setting.html'"> 
     <img src="photos/setting.png" >
     <span> Setting </span>
  </div>
  <div onclick="document.location='profile.html'"> 
     <img src="photos/person.png" >
     <span> Profile </span>
  </div>`;
}