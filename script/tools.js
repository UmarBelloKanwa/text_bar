document.getElementById('tools').innerHTML = ` 
<div id="navs" >
   <span> Text </span>
   <span> View </span>
   <span> File </span>
</div>
<div title="Text" >
   <div>
      <span> Text Color </span>
      <input type="color" name="color" > 
   </div>
   <div>
      <span> Font Family </span>
      <select name="Fonts" >
         <option> Arial </option> <option> Courier New </option>
         <option> Tahoma </option> <option> Verdana </option>
         <option> Cursive </option> <option> Fantasy </option>
         <option> Monospace </option> <option> Sans-serif </option>
         <option > Serif </option> 
      </select>
   </div>
   <div>
      <span> Font Size </span>
      <input type="range" name="fontSize" min="16" max="50" >
   </div>
   <div>
      <span> Text Align </span>
      <select name="Aligns" >
         <option> Left </option>
         <option> Center </option>
         <option> Right </option>
      </select>
   </div>
   <div>
      <span> Font Style </span>
      <input type="checkbox" name="Style" >
   </div>
   <div>
      <span> Font Variant </span>
      <input type="checkbox" name="Variant" >
   </div>
   <div>
      <span> Font Weight </span>
      <input type="checkbox" name="Weight"  >
   </div>
   <div>
      <span> Font Shadow </span>
      <input type="checkbox" name="Shadow" >
   </div>
</div> 
<div title="view" style="display: none;">
   <div style="margin:.5em;" >
      <span> Choose Background Image </span>
      <div class="background-imgs" > 
         <img src="photos/a.jpg" > <img src="photos/b.png" > <img src="photos/c.jpg" >
         <img src="photos/d.jpg" > <img src="photos/e.jpg" > <img src="photos/f.jpg" >
         <img src="photos/g.png" > <img src="photos/h.jpg" > <img src="photos/i.jpg" >
         <img src="photos/j.jpg" > <img src="photos/k.jpg" > <img src="photos/l.jpg" >
         <img src="photos/m.jpg" > <img src="photos/n.jpg" > <img src="photos/o.jpg" >
         <img src="photos/p.jpg" > <img src="photos/q.jpg" > <img src="photos/r.jpg" >
         <img src="photos/s.jpg" > <img src="photos/t.jpg" > <img src="photos/u.jpg" >
         <img src="photos/v.jpg" > <img src="photos/w.jpg" > <img src="photos/s.jpg" >
         <img src="photos/y.jpg" > <img src="photos/z.jpg" > <img src="photos/aa.png" >
         <img src="photos/ab.jpg" > <img src="photos/ac.jpg" > <img src="photos/ad.jpg" >
         <img src="photos/af.png" > <img src="photos/ag.png" >
      </div>
   </div>  
   <div style="margin:.5em;" >
      <span> Upload a Background Image <input type="file" accept="image/*" name="backgroundUpload"> </span>
      <div class="background-imgs" id="upload-imgs" > </div>
   </div>
   <div id="bg-color" >
      <span> Choose Background Color </span>
      <input type="color" style="background:#6a6a6a;" >
   </div>
   <div>
      <span> Light mode </span>
      <input type="checkbox" name="light-mode" >
   </div>
</div>
<div title="file" style="display: none;">
   <div id="picture" >
      <span> Picture </span>
      <input type="file" accept="image/*" name="pictureUpload" multiple="multiple" >
   </div>
   <div>
      <span id="input-date" > Put date </span> 
   </div>
   <div>
      <span id="saveButton" > Save </span>
   </div>
   <div>
      <span id="print" > Print as PDF </span>
   </div>
   <div>
      <span id="print-as-img" > Save as Image </span>
   </div>
   <div>
      <span id="save-as-txt"> Save as Text File </span>
   </div>
   <div>
      <span id="save-as-audio"> Save as Audio File </span>
   </div>
   <div>
      <span id="delete" > Delete note </span>
   </div>
   <div>
      <span id="file-inf" > Note Information </span>
   </div>
   <div>
      <span id="quit" > Exit </span>
   </div>
</div>  `;	