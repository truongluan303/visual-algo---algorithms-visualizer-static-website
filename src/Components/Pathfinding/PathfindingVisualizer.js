import React, { Component, useState, useEffect } from 'react'
import Node from './Node';
import "./PathfindingVisualizer.css";

const colCount = 10;
const rowCount = 10;


const PathfindingVisualizer = () => {

    const [grid, setGrid] = useState([]);

    useEffect(() => {
        initGrid();
    }, []);

    function Point(y, x) {

    }

    const initGrid = () => {
        // initialize a 2-dimentional array
        const grid = new Array(colCount);
        for (let i = 0; i < colCount; i++) {
            grid[i] = new Array(rowCount);
        }
        // create a new point for each element in the grid
        for (let i = 0; i < colCount; i++) {
            for (let j = 0; j < rowCount; j++) {
                grid[i][j] = new Point(i, j);
            }
        }
        setGrid(grid);
    }

    const nodesGrid = (
        <div>
            {grid.map((row, rowIndex) => {
                return (
                    <div key={rowIndex}>
                        {row.map((col, colIndex) => {
                            return <Node key={colIndex}/>
                        })}
                    </div>
                );
            })}
        </div>
    );

    return (
        <div>
            <h1>Pathfinding Visualizer</h1>
            {nodesGrid}
        </div> 
    )
}

export default PathfindingVisualizer;