import { Node } from "./node.js"

class LinkedList  {
    constructor (key, value) {
        this.head = key;
        this.value = value;
        this.next = null; 
    }

    set setHead(value) {
        this.head = value;
    }

    set setValue(value) {
        this.value = value;
    }

    set setNext(node) {
        this.next = node;
    }

    append(key, value) {
        const newNode = new Node();
        newNode.setKey = key;
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

    prepend(key, value) {
        //transform the previous head value in a node value and set its succeeding element as the third in the chain
        const previousHead = new Node();
        previousHead.setKey = this.head;
        previousHead.setValue = this.value;
        previousHead.setNext = this.next;
        
        //rewrite head value and set the next key to the previous head value
        this.head = key;
        this.value = value;
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
        return this;
    }

    lastNode() {

        if (this.next === null) {
            return this
        } else {

            let nextNode = this.next;

            while (nextNode.next !== null) {
                nextNode = nextNode.next;
            }

            return nextNode
        }

    };

    at(num) {

        if (num >= this.size()) {
            return "Not found"
        } else if (num === 0) {
            return this
        } else {
            let count = 1; 
            let node = this.next; 

            while (num !== count) {
                count += 1;
                node = node.next;
            }
            
            return node;
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

    containsKey(lookfor) {
        function lookForValue(node) {
            if (node.key === lookfor) {
                return true;
            } else if (node.next !== null) {
                return lookForValue(node.next)
            } else {
                return false;
            }
        }

        if (this.head === lookfor) {
            return true;
        } else if (this.next === null) {
            return false
        } else {
            return lookForValue(this.next)
        }
    }

    containsValue(lookfor) {
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

    findKey(lookfor) {

        if (this.next === null && this.head !== lookfor) {
            return "Not found";
        } else if (this.head === lookfor){
            return this;
        } else {
            let node = this.next;

            while (node.key !== lookfor && node.next !== null) {
                node = node.next;
            }

            if (node.next === null && node.key !== lookfor) {
                return "Not found";
            } else {
                return node;
            }
        }
    };

    findValue(lookfor) {

        if (this.next === null && this.head !== lookfor) {
            return "Not found";
        } else if (this.head === lookfor){
            return this;
        } else {

            let node = this.next;

            while (node.value !== lookfor && node.next !== null) {
                node = node.next;
            }

            if (node.next === null && node.value !== lookfor) {
                return "Not found";
            } else {
                return node;
            }
        }
    };

    getKeyPosition(lookfor) {

        if (this.next === null && this.head !== lookfor) {
            return "Not found";
        } else if (this.head === lookfor){
            return 0;
        } else {
            let count = 1;
            let node = this.next;

            while (node.key !== lookfor && node.next !== null) {
                node = node.next;
                count += 1;
            }

            if (node.next === null && node.key !== lookfor) {
                return "Not found";
            } else {
                return count;
            }
        }
    };

    toString() {
            let output = `( [ ${this.head}, ${this.value} ] ) -> `;
            let node = this.next;

            while (node !== null ) {
                output += `( [ ${node.key}, ${node.value}  ]) -> `
                node = node.next
            }

            return output + null;
    }

    insertAt(key, value, index) {
        if (index === 0) {
            this.prepend(key, value);
        } else if (index >= this.size()) {
            this.append(key, value)
        } else {
            let count = 1; 
            let node = this.next; 

            while (index !== count) {
                count += 1;
                node = node.next;
            }

            let newNode = new Node();
            newNode.setKey = key;
            newNode.setValue = value;
            newNode.setNext = node.next;
            node.next = newNode;
        }
    }

    removeAt(index) {
        if (index === 0) {
            this.head = this.next.key;
            this.value = this.next.value;
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