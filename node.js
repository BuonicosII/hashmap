class Node {
    constructor() {
        this.key = null;
        this.value = null;
        this.next = null;
    }

    set setKey(value) {
        this.key = value;
    }

    set setValue(value) {
        this.value = value;
    }

    set setNext(value) {
        this.next = value;
    }
}

export { Node }