import { LQueue } from "./dataStructures";
import { AStack } from "./dataStructures";


export function bfs(grid, startNode, endNode) {
    const visitedNodesInOrder = [];

    let queue = new LQueue();
    queue.enqueue(startNode);

    while (!queue.isEmpty()) {
        const currentNode = queue.dequeue();

        if (currentNode == endNode) {
            return visitedNodesInOrder;
        }
        currentNode.isVisited = true;
        visitedNodesInOrder.push(currentNode);
        
        let neighbors = getNeighbors(grid, currentNode);
        for (let neighbor of neighbors) {
            if (!neighbor.isVisited) {
                neighbor.previousNode = currentNode;
                queue.enqueue(neighbor);
            }
        }
    }
    return visitedNodesInOrder;
}


export function dfs(grid, startNode, endNode) {
    const visitedNodesInOrder = [];

    let stack = new AStack();
    stack.push(startNode);

    while (!stack.isEmpty()) {
        const currentNode = stack.dequeue();

        if (currentNode == endNode) {
            return visitedNodesInOrder;
        }
        currentNode.isVisited = true;
        visitedNodesInOrder.push(currentNode);
        
        let neighbors = getNeighbors(grid, currentNode);
        for (let neighbor of neighbors) {
            if (!neighbor.isVisited) {
                neighbor.previousNode = currentNode;
                stack.enqueue(neighbor);
            }
        }
    }
    return visitedNodesInOrder;
}


export function djkstra(grid, startNode, endNode) {

}


export function aStar(grid, startNode, endNode) {

}


function getNeighbors(grid, currentNode) {
    const {col, row} = currentNode;
    let neighbors = [];
    
    // check north neighbor
    if (col > 0 && !grid[row][col - 1].isBlocked) {
        neighbors.push(grid[row][col - 1]);
    }
    // check west neighbor
    if (row > 0 && !grid[row - 1][col].isBlocked) {
        neighbors.push(grid[row - 1][col]);
    }
    // check south neighbor
    if (col < grid[0].length - 1 && !grid[row][col + 1].isBlocked) {
        neighbors.push(grid[row][col + 1]);
    }
    // check east neighbor
    if (row < grid.length - 1 && grid[row + 1][col].isBlocked) {
        neighbors.push(grid[row + 1][col]);
    }
    return neighbors;
}
