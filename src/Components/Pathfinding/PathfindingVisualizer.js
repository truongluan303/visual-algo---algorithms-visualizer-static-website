import React, { Component, useState, useEffect } from 'react'
import "./PathfindingVisualizer.css";
import {bfs} from '../../algorithms/pathfinding';
import {dfs} from '../../algorithms/pathfinding';
import {djkstra} from '../../algorithms/pathfinding';
import {aStar} from '../../algorithms/pathfinding';


const START_NODE = 'start-node'
const END_NODE = 'end-node'
const BLOCKED_NODE = 'blocked-node'


class PathfindingVisualizer extends React.Component {
    constructor(props) {
        super(props);
    };

    initGrid = (
        rowCount = this.state.ROW_COUNT,
        colCount = this.state.COL_COUNT
    ) => {
        const grid = [];
        for (let row = 0; row < rowCount; row++) {
            const curRow = [];
            for (let col = 0; col < colCount; col++) {
                curRow.push(this.generateNode(row, col));
            }
            grid.push(curRow);
        }
        return grid;
    }

    clearGrid = () => {
        if (this.state.running) {
            return
        }
        const newGrid = this.state.grid.slice();

        for (const row of newGrid) {
            for (const node of row) {
                if (this.isNodeWalkable(node)) {
                    document.getElementById(this.getNodeID(node)).className = 'node';
                    node.isVisited = false;
                    node.distance = Infinity;
                    node.distanceToFinishNode = this.getDistanceToFinishNode(node);
                }
                if (this.isNodeStart(node)) {
                    node.isVisited = false;
                    node.distance = Infinity;
                    node.distanceToFinishNode = this.getDistanceToFinishNode(node)
                }
                if (this.isNodeEnd(node)) {
                    node.isVisited = false;
                    node.distance = Infinity;
                    node.distanceToFinishNode = 0;
                }
            }
        }
    }

    clearBlocks = () => {
        if (this.state.running) {
            return
        }
        const newGrid = this.state.grid.slice();

        for (const row of newGrid) {
            for (const node of row) {
                if (this.isNodeBlocked(node)) {
                    document.getElementById(this.getNodeID(node)).className = 'node';
                    node.isBlocked = false;
                }
            }
        }
    }

    visualize = (algo) => {
        if (this.state.running) {
            return;
        }
        this.clearGrid();
        
        const {grid} = this.state;
        
        const startNode = grid[this.state.START_NODE_ROW][this.state.START_NODE_COL];
        const finishNode = grid[this.state.FINISH_NODE_ROW][this.state.FINISH_NODE_COL];

        let visitedNodesInOrder;
        switch (algo) {
            case 'bfs':
                visitedNodesInOrder = bfs(grid, startNode, finishNode);
                break;
            case 'dfs':
                visitedNodesInOrder = dfs(grid, startNode, finishNode);
                break;
            case 'djkstra':
                visitedNodesInOrder = djkstra(grid, startNode, finishNode);
                break;
            case 'aStar':
                visitedNodesInOrder = aStar(grid, startNode, finishNode);
                break;
            default:
                break;
        }
    }

    generateNode = (row, col) => {
        return {
            row,
            col,
            isStart:
                row === this.state.START_NODE_ROW && col === this.state.START_NODE_COL,
            isFinish:
                row === this.state.FINISH_NODE_ROW && col === this.state.FINISH_NODE_COL,
            distance: Infinity,
            distanceToFinishNode:
                Math.abs(this.state.FINISH_NODE_ROW - row) +
                Math.abs(this.state.FINISH_NODE_COL - col),
            isVisited: false,
            isBlocked: false,
            previousNode: null,
            isNode: true,
        };
    }

    getDistanceToFinishNode = (node) => {
        return (
            Math.abs(this.state.FINISH_NODE_ROW - node.row) +
            Math.abs(this.state.FINISH_NODE_COL - node.col)
        );
    }

    isNodeWalkable = (node) => {
        let nodeClassName = document.getElementById(
            this.getNodeID(node)
        ).className;
        return (
            nodeClassName !== START_NODE &&
            nodeClassName !== END_NODE &&
            nodeClassName !== BLOCKED_NODE
        );
    }

    isNodeBlocked = (node) => {
        let nodeClassName = document.getElementById(
            this.getNodeID(node)
        ).className;
        return nodeClassName === BLOCKED_NODE;
    }

    isNodeStart = (node) => {
        let nodeClassName = document.getElementById(
            this.getNodeID(node)
        ).className;
        return nodeClassName === START_NODE;
    }

    isNodeEnd = (node) => {
        let nodeClassName = document.getElementById(
            this.getNodeID(node)
        ).className;
        return nodeClassName === END_NODE;
    }

    getNodeID = (node) => {
        return `node-${node.row}-${node.col}`;
    }

    render() {
        return (
            <div>
                <h1>Pathfinding Visualizer</h1>
                {this.nodesGrid}
            </div>
        );
    }
}

export default PathfindingVisualizer;
