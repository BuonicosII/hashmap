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

        //check if key already exists 
        const index = this.hash(key) % this.buckets.length; 

        if (this.buckets[index] !== null) {
            this.buckets[index].value = value;
            console.log(this.buckets[index]);
        } else if (index < 0 || index >= this.buckets.length) {
            throw new Error("Trying to access index out of bound");
        } else {
            const newNode = new Node();
            newNode.setKey = key;
            newNode.setValue = value;
            this.buckets[index] = newNode;
            console.log(this.buckets[index]);
        }



    }
}

export { HashMap }