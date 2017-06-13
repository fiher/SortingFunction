/**
 * Created by Lucifer on 18-Mar-17.
 */
/**
 * Created by Lucifer on 18-Mar-17.
 */
function sortingArrayOfObjects(myArray){
    let properties = Array.prototype.slice.call(arguments,1);
    myArray.sort(sorting);
    //this is our actual sorting function
    function sorting(objectA,objectB) {
        for (let i=0;i<properties.length;i++) {
            let property = properties[i];
            //we check if the property is not an object because if it is its most probably {someProperty:"asc"}
            // because this is what you have to give as parameter in order to sort the objects by given property
            // in ascending order
            if(isObject(property)){
                let actualProperty = Object.keys(property);
                //since by default we sort in descending order we only care if the value is "asc"
                if(property[actualProperty]==="asc"){
                    let whatToDo = checkSort(objectA,objectB,actualProperty);
                    if(whatToDo === "continue"){continue;}
                    let temp = objectA;
                    objectA = objectB;
                    objectB = temp;
                }// since below we work with "property" we give it only the key which is our actual property
                property = actualProperty;
            }
            // now not caring about the code above we continue checking if our objects actually have the property
            let haveProperty = ifObjectsDontHaveProperty(objectA,objectB,property);
            //if they dont then we will get either -1 or 1 and we need to return this
            if(haveProperty !== 0){return haveProperty}
            //else we need to continue checking whether both of the objects don't have the property
            if (!objectA.hasOwnProperty(property) && !objectB.hasOwnProperty(property)) {
                //if they don't we need to create a new cycle for each property after our current property
                for(let y = i+1;y<properties.length;y++){
                     let secondProperty = properties[y];
                    let haveProperty = ifObjectsDontHaveProperty(objectA,objectB,secondProperty);
                    if(haveProperty !== 0){return haveProperty}
                    if(objectA.hasOwnProperty(secondProperty) && objectB.hasOwnProperty(secondProperty)){
                        let whatToDo = checkSort(objectA,objectB,secondProperty);
                        if(whatToDo === "continue"){continue;}
                        return whatToDo;
                    }
                }//if nothing matches our conditions then we return 0 and stop because we already have checked all properties
                return 0;
            }
            //if we haven't entered the if above then we check normally
            let whatToDo = checkSort(objectA,objectB,property);
            //if the objects are equal by the given property then we continue
            if(whatToDo === "continue"){continue;}
            //else we return the result
            return whatToDo;
        }
        //if nothing matches our conditions we return 0 and do nothing
        return 0;
    }
    //this function does the actual checking
    function checkSort(objectA,objectB,property){
        let isEqual = objectA[property] === objectB[property];
        if (isEqual) {
            return "continue";
        }
        if (!(typeof objectA[property] === typeof objectB[property])) {
            return "continue";
        }
        if (typeof objectA[property] === "string") {
            return objectA[property].localeCompare(objectB[property])
        }
        if(Array.isArray(objectA[property])){
            return objectB[property].length - objectA[property].length;
        }
        return objectB[property] - objectA[property];
    }
    //this checks if object A or objectB are missing a certain property
    function ifObjectsDontHaveProperty(objectA,objectB,property){
        if(!objectA.hasOwnProperty(property)&& objectB.hasOwnProperty(property)){return 1;}
        if(!objectB.hasOwnProperty(property) && objectA.hasOwnProperty(property)){return -1;}
        return 0;
    }
    function isObject(obj) {
        return obj === Object(obj);
    }
    return myArray;
}
// if you want to check it out here is an example
class Person{
    constructor(name,age,cool,income){
        this.name = name;
        this.age = age;
        this.cool = cool;
        this.income = income;
    }
}
class Alien{
    constructor(name,age,race,planet){
        this.name = name;
        this.age = age;
        this.race = race;
        this.planet = planet;
    }
}
let people = [];
people.push(new Person("Pesho",223,true,100));
people.push(new Person("Gosho",223,false,120));
people.push(new Alien("Mat",23,"cartian","Mars"));
people.push(new Alien("Mat",23,"bodKnows","noIdea"));
people.push(new Person("Mitko",223,true,103240));
people.push(new Person("Ivo",10,false,4214));
people.push(new Person("Tosho",10,true,3240));
people.push(new Alien("Am",23,"aock","fock"));
people.push(new Person("Ilian",30,true,24000));

console.log(people);
console.log("-----");
people = sortingArrayOfObjects(people,{"cool":"asc"},"income","race");
console.log(people);
people = sortingArrayOfObjects(people,"income","planet","age",{"name":"asc"});
console.log("-----");
console.log(people);