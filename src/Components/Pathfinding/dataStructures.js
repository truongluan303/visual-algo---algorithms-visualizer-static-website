class LinkedQueue {
    #head;      // the head of the list
    #tail;      // the tail of the list
    #size;      // number of elements in queue

    constructor() {
        this.#initialize();
    }

    /**
     * add a new value to back of the queue
     * @param {*} value the value to be added
     */
    enqueue(value) {
        let newNode = new SinglyLinkedListNode(value);
        if (this.isEmpty) {
            this.#head = newNode;
        }
        else {
            this.#tail.next = newNode;
        }
        this.#tail = newNode;
        this.#size++;
    }

    /**
     * remove and return the value in the front of the queue
     * @returns the removed value in the front
     */
    dequeue() {
        if (this.isEmpty) {
            throw new EmptyCollectionException();
        }
        let value = this.#head.value;
        this.#head = this.#head.next;
        this.#size--;
        return value;
    }

    /**
     * get the value in the front of the queue without any removal
     * @returns the value in the front of the queue
     */
    peek() {
        if (this.isEmpty) {
            throw new EmptyCollectionException();
        }
        return this.#head.value;
    }

    /**
     * clear all values in the queue
     */
    clear() {
        this.#initialize();
    }

    /**
     * remove the first occurence (from front) of the given value
     * @param {*} value the value to be removed
     * @returns true if the given value exists in queue and is removed
     */
    remove(value) {
        if (this.#head == null) {
            throw new EmptyCollectionException();
        }
        if (this.#head.value == value) {
            this.dequeue();
            return true;
        }
        let prev = this.#head;
        let current = this.#head.next;
        while (current != null) {
            if (current.value == value) {
                prev.next = current.next;
                this.#size--;
                return true;
            }
            prev = current;
            current = current.next;
        }
        return true;
    }

    /**
     * check if the queue contains the given value
     * @param {*} value the value to be checked
     * @returns true if the queue contains the given value
     */
    contains(value) {
        let current = this.#head;
        while (current != null) {
            if (current.value == value) {
                return true;
            }
            current = current.next;
        }
        return false;
    }

    get isEmpty() {
        return this.#size == 0;
    }

    get size() {
        return this.#size;
    }

    #initialize() {
        this.#head = null;
        this.#tail = null;
        this.#size = 0;
    }
}


class ArrayStack {
    #arr;       // the array

    constructor() {
        this.#arr = []
    }

    /**
     * add a new value to the end of the stack
     * @param {*} value the value to be added to the stack 
     */
    push(value) {
        this.#arr.push(value);
    }

    /**
     * remove and return the value at the end of the stack
     * @returns the value at the end of the stack
     */
    pop() {
        if (this.isEmpty) {
            throw new EmptyCollectionException();
        }
        return this.#arr.pop();
    }

    /**
     * return without removing the value at the end of the stack
     * @returns the value at the end of the stack
     */
    peek() {
        if (this.isEmpty) {
            throw new EmptyCollectionException();
        }
        return this.#arr[this.size - 1]
    }

    /**
     * check if a value exists inside the stack
     * @param {*} value the value to be searched
     * @returns true if the value exists in the stack
     */
    contains(value) {
        return this.#arr.includes(value);
    }

    get isEmpty() {
        return this.#arr.length == 0;
    }

    get size() {
        return this.#arr.length;
    }
}


class SinglyLinkedListNode {
    #value;     // store the data
    #next;      // link to the next node
    
    constructor(value) {
        this.#value = value;
        this.#next = null;
    }

    get value() {
        return this.#value; 
    }

    get next() {
        return this.#next;
    }

    set value(value) {
        this.#value = value;
    }

    set next(next) {
        this.#next = next;
    }
}


class EmptyCollectionException extends Error {
    constructor() {
        super("Attempted to remove or retreive data from an empty collection!");
    }
}

module.exports = { LinkedQueue, ArrayStack };