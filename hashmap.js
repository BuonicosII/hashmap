import { Node } from "./node.js";
import { LinkedList } from "./linkedlist.js"

class HashMap {
    constructor () {
        this.buckets = new Array(16).fill(null);
        this.growthFactor = 0.75;
    }

    hash(string) {
        let hashCode = 0;

        const primeNumber = 31;
        for (let i = 0; i < string.length; i++) {
          hashCode = primeNumber * hashCode + string.charCodeAt(i);
        }
      
        return hashCode;
    }

    checkCapacity() {

        let fullBuckets = 0;
        for (const bucket of this.buckets) {
            if (bucket !== null) {
                fullBuckets += 1;
            } 
        }

        if (fullBuckets / this.buckets.length >= this.growthFactor) {
            return true;
        } else {
            return false 
        }

    }

    increaseBuckets() {
        const oldBuckets = this.buckets;
        this.buckets = new Array(oldBuckets.length * 1.5).fill(null);
        for (const node of oldBuckets) {
            if (node !== null) {
                this.set(node.key, node.value)
            }
        }
    }

    set(key, value) {

        if (this.checkCapacity()) {
            this.increaseBuckets()
        }

        //check if key already exists 
        const index = this.hash(key) % this.buckets.length; 

        if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bound");
        } else if (this.buckets[index] !== null && this.buckets[index].head === key) { //In case the key exists and is the head of a linked list
            this.buckets[index].setValue = value; 
        } else if (this.buckets[index] !== null && this.buckets[index].head !== key) { //In case the bucket is full

            if (this.buckets[index].containsKey(key)) { //if the linked list has other nodes look for the key among them and update it
                let nodeToUpdate = this.buckets[index].findKey(key);
                nodeToUpdate.setValue = value;
            } else { // if not, append a new node
                this.buckets[index].append(key, value)
            }
        } else { //if the bucket is empty
            const newNode = new LinkedList(key, value);
            this.buckets[index] = newNode;
        }

    }

    get(key) {
        const index = this.hash(key) % this.buckets.length; 

        if (this.buckets[index] === null || index < 0 || index >= this.buckets.length) {
            return null
        } else {
            return this.buckets[index].findKey(key)
        }
    }

    has(key) {
        const index = this.hash(key) % this.buckets.length; 

        if (this.buckets[index] === null || index < 0 || index >= this.buckets.length) {
            return false
        } else if (this.buckets[index] !== null ) {
            return this.buckets[index].containsKey(key)
        }
    }

    remove(key) {
        const index = this.hash(key) % this.buckets.length; 

        if ( index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bound");
        } else if (this.buckets[index] === null || !this.buckets[index].containsKey(key)) {
            throw new Error("Key not found");
        } else {
            let keyIndex = this.buckets[index].getKeyPosition(key);
            this.buckets[index].removeAt(keyIndex)
        }
    }

    length() {
        let fullBuckets = 0;
        for (const bucket of this.buckets) {
            if (bucket !== null) {
                fullBuckets += bucket.size();
            } 
        }

        return fullBuckets
    }

    clear() {
        this.buckets.fill(null)
    }

    keys() {
        let keysArray = new Array()
        for (const bucket of this.buckets) {
            if (bucket !== null) {
                keysArray.push(bucket.head)
                for (let i = 1; i < bucket.size(); i++)
                keysArray.push(bucket.at(i).key)
            } 
        }
        return keysArray
    }

    values() {
        let valuesArray = new Array()
        for (const bucket of this.buckets) {
            if (bucket !== null) {
                for (let i = 0; i < bucket.size(); i++)
                valuesArray.push(bucket.at(i).value)
            } 
        }
        return valuesArray
    }

    entries() {
        let entriesArray = new Array()
        for (const bucket of this.buckets) {
            if (bucket !== null) {
                entriesArray.push([bucket.head, bucket.value])
                for (let i = 1; i < bucket.size(); i++)
                entriesArray.push([bucket.at(i).key, bucket.at(i).value])
            } 
        }
        return entriesArray
    }
}

export { HashMap }