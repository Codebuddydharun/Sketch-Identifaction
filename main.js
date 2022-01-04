function preload(){
classifier=ml5.imageClassifier("DoodleNet");
}

function setup(){
    canvas=createCanvas(300,300);
    canvas.center();
    background("white");
    canvas.mouseReleased(classifycanvas);
    synth=window.speechSynthesis;
}

function clearcanvas(){
    background("white");
}

function draw(){
stroke(0);
strokeWeight(13);
if(mouseIsPressed){
    line(pmouseX,pmouseY,mouseX,mouseY);
}
}

function classifycanvas(){
    classifier.classify(canvas,gotresults);
}

function gotresults(error,results){
    if(error){
     console.error(error);
    }

    else{
        console.log(results);
        document.getElementById("label").innerHTML='Label:'+results[0].label;
        document.getElementById("confidence").innerHTML='Conifidence:'+Math.round(results[0].confidence*100)+'%';

        utterthis=new SpeechSynthesisUtterance(results[0].label);
        synth.speak(utterthis);

    }
}