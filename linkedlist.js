import { Node } from "./node.js"

class LinkedList  {
    constructor (value) {
        this.head = value;
        this.next = null; 
    }

    set setNext(value) {
        this.next = value;
    }

    append(value) {
        const newNode = new Node();
        newNode.setValue = value;

        if (this.size() === 1) {
            this.next = newNode;
        } else {
            let nextNode = this.next;

            while (nextNode.next !== null) {
                nextNode = nextNode.next;
            }

            nextNode.next = newNode;
        }

    };

    prepend(value) {
        //transform the previous head value in a node value and set its succeeding element as the third in the chain
        const previousHead = new Node();
        previousHead.setValue = this.head;
        previousHead.setNext = this.next;
        
        //rewrite head value and set the next key to the previous head value
        this.head = value;
        this.next = previousHead;
    };

    size() {
        //iterative approach
        /* 
        let current = this.next;
        let count = 1;
        while (current !== null) {
            count++;
            current = current.next;
        }
        return count;
        */

        //recursive approach
        function getSize(node) {
            if (node.next === null) {
                return 1;
            } else {
                return 1 + getSize(node.next);
            }
        }
        return getSize(this);
    }

    firstNode() {
        return this.head;
    }

    lastNode() {

        if (this.next === null) {
            return this.head
        } else {

            let nextNode = this.next;

            while (nextNode.next !== null) {
                nextNode = nextNode.next;
            }

            return nextNode.value
        }

    };

    at(num) {

        if (num >= this.size()) {
            return "Not found"
        } else if (num === 0) {
            return this.head
        } else {
            let count = 1; 
            let node = this.next; 

            while (num !== count) {
                count += 1;
                node = node.next;
            }
            
            return node.value;
        }
    }

    pop() {
        if (this.next !== null) {
            if (this.next.next === null) {
                this.next = null;
            } else {
                let checkEnd = this.next;

                while (checkEnd.next.next !== null) {
                    checkEnd = checkEnd.next;
                }
    
                checkEnd.next = null;
            }
        }
    }

    contains(lookfor) {
        function lookForValue(node) {
            if (node.value === lookfor) {
                return true;
            } else if (node.next !== null) {
                return lookForValue(node.next)
            } else {
                return false;
            }
        }

        if (this.head === lookfor) {
            return true;
        } else {
            return lookForValue(this.next)
        }
    }

    find(lookfor) {

        if (this.next === null && this.head !== lookfor) {
            return "Not found";
        } else if (this.head === lookfor){
            return 0;
        } else {
            let count = 1;
            let node = this.next;

            while (node.value !== lookfor && node.next !== null) {
                node = node.next;
                count += 1;
            }

            if (node.next === null && node.value !== lookfor) {
                return "Not found";
            } else {
                return count;
            }
        }
    };

    toString() {
            let output = `( ${this.head} ) -> `;
            let node = this.next;

            while (node !== null ) {
                output += `( ${node.value} ) -> `
                node = node.next
            }

            return output + null;
    }

    insertAt(value, index) {
        if (index === 0) {
            this.prepend(value);
        } else if (index >= this.size()) {
            this.append(value)
        } else {
            let count = 1; 
            let node = this.next; 

            while (index !== count) {
                count += 1;
                node = node.next;
            }

            let newNode = new Node();
            newNode.setValue = value;
            newNode.setNext = node.next;
            node.next = newNode;
        }
    }

    removeAt(index) {
        if (index === 0) {
            this.head = this.next.value;
            this.next = this.next.next;
        } else if (index === 1) {
            this.next = this.next.next;
        } else if (index >= this.size()) {
            return
        } else {
            let count = 2; 
            let node = this.next; 

            while (index !== count) {
                count += 1;
                node = node.next;
            }
            node.next = node.next.next;
        }
    }
}

export { LinkedList }