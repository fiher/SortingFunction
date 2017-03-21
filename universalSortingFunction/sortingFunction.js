/**
 * Created by Lucifer on 18-Mar-17.
 */
/**
 * Created by Lucifer on 18-Mar-17.
 */
function sortingArrayOfObjects(myArray){
    // first of all we take out the properties as an array since arguments is not an array (but it is)
    let properties = Array.prototype.slice.call(arguments,1);
    // we call the build in function .sort in order not to worry about the algorithm for sorting.
    myArray.sort(sorting);
    //this is our actual sorting function
    function sorting(objectA,objectB) {
        //first we need to create a cycle to check every property
        for (let i=0;i<properties.length;i++) {
            let property = properties[i];
            //we check if the property is not an object because if it is its most probably {"property":"asc"}
            // because this is what you have to give as parameter in order to sort the objects by given property
            // in ascending order
            if(isObject(property)){
                //if it is we get the key which is our actual property we want to sort our objects on
                let actualProperty = Object.keys(property);
                //since by default we sort in descending order we only care if the value is "asc"
                if(property[actualProperty]=="asc"){
                    //if it is we check whether the two objects are equal because if they are
                    // i need to stop checking this property and continue on the next one
                    let whatToDo = checkSort(objectA,objectB,actualProperty);
                    if(whatToDo == "continue"){continue;}
                    //if they are not then i switch their places so the code below will work normally but sort in ascending order
                    let temp = objectA;
                    objectA = objectB;
                    objectB = temp;
                }// since below we work with "property" we give it only the key which is our actual property
                property = actualProperty;
            }
            // now not caring about the code above we continue checking if our objects actually have the property
            let haveProperty = ifObjectsDontHaveProperties(objectA,objectB,property);
            //if they dont then we will get either -1 or 1 and we need to return this
            if(haveProperty != 0){return haveProperty}
            //else we need to continue checking whether both of the objects don't have the property
            if (!objectA.hasOwnProperty(property) && !objectB.hasOwnProperty(property)) {
                //if they don't we need to create a new cycle for each property after our current property
                for(let y = i+1;y<properties.length;y++){
                     let secondProperty = properties[y];
                     //we check again if they match
                    let haveProperty = ifObjectsDontHaveProperties(objectA,objectB,secondProperty);
                    if(haveProperty != 0){return haveProperty}
                    //if everything is okay and they both have the property we check which one is bigger
                    if(objectA.hasOwnProperty(secondProperty) && objectB.hasOwnProperty(secondProperty)){
                        let whatToDo = checkSort(objectA,objectB,secondProperty);
                        //if none is and they are equal we continue
                        if(whatToDo == "continue"){continue;}
                        //else we return the result
                        return whatToDo;
                    }
                }//if nothing matches our conditions then we return 0 and stop because we already have checked all properties
                return 0;
            }
            //if we havent entered the if above then we check normally
            let whatToDo = checkSort(objectA,objectB,property);
            //if the objects are equal by the given property then we continue
            if(whatToDo == "continue"){continue;}
            //else we return the result
            return whatToDo;
        }
        //if nothing matches our conditions we return 0 and do nothing
        return 0;
    }
    function checkSort(objectA,objectB,property){
        //first we check if the objects are equal
        let isEqual = objectA[property] == objectB[property];
        //if they are then we continue
        if (isEqual) {
            return "continue";
        }
        //if the types of the properties are different we are not sure how to sort them so we continue
        if (!(typeof objectA[property] == typeof objectB[property])) {
            return "continue";
        }
        //if it is a string we sort them alphabetically
        if (typeof objectA[property] == "string") {
            return objectA[property].localeCompare(objectB[property])
        }
        //if it is an array we dont know what it has as values so we simply sort by length
        if(Array.isArray(objectA[property])){
            return objectB[property].length - objectA[property].length;
        }
        //if it doesnot enter any of the if's above then simply check which one is bigger
        return objectB[property] - objectA[property];
    }
    function ifObjectsDontHaveProperties(objectA,objectB,property){
        //if objectA doesnot have the property but objectB has, then objectB is before objectA
        if(!objectA.hasOwnProperty(property)&& objectB.hasOwnProperty(property)){return 1;}
        //and the opposite
        if(!objectB.hasOwnProperty(property) && objectA.hasOwnProperty(property)){return -1;}
        //if neither of the above are true then simply return 0;
        return 0;
    }
    function isObject(obj) {
        //check if given property is actually an object
        return obj === Object(obj);
    }
    //after everything we either return the sorted array or if 0 properties are given to us - the array we were given
    return myArray;
}
// if you want to check it out here are some examples
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