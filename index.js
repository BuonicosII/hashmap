import { HashMap } from "./hashmap.js"

const someHashMap = new HashMap();

someHashMap.set("Name", "Enrico");
console.log(someHashMap.buckets);

someHashMap.set("asdafff", "Enggggrico");

someHashMap.set("Surname", "Viola");
console.log(someHashMap.entries());
