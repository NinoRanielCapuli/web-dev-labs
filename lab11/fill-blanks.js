let name = "Niño";
let age = 21;

console.log("Hi, my name is " + name + " and I am " + age + " years old.");

document.addEventListener("DOMContentLoaded", function() {
    let paragraph = document.createElement("p");
    paragraph.textContent = `Hi, my name is ${name} and I am ${age} years old.`;
    document.body.appendChild(paragraph);
});
