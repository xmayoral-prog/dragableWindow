<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    

</body>
<script src="draggableWindow.js"></script>
<script>
let window2 = new DraggableWindow();
window2.title = "Hola Caracola";
window2.color = '#0f0';

let window3 = new DraggableWindow({id:'myWindow',title:'Debug',color:'#0aa',container:document.body});
window3.content = " Hola Caracola";
for (let i=0; i<200; i++)
    window3.content += " Hola Caracola";

</script>
</html>