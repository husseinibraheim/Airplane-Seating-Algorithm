function fullPlan(params) {
    const fullSides = []
    for (let i = 0; i < params.length; i++) {
        const coloumns = []
        for (let j = 0; j < params[i][0]; j++) {
            coloumns.push(null)
        }
        const rows = []
        for (let k = 0; k < params[i][1]; k++) {
            rows.push([].concat(coloumns))
        }
        fullSides.push(rows)
    }
    console.log(fullSides)
    return fullSides

}

const isLeftBlock = (blockIndex) => blockIndex === 0
const isLeftCol = (colIndex) => colIndex === 0
const isRightBlock = (blocksLength, blockIndex) => blockIndex === blocksLength - 1
const isRightCol = (colLength, colIndex) => colIndex === colLength - 1
const isMiddleBlock = (isLeftBlock, isRightBlock) => !isLeftBlock && !isRightBlock

const windowSeats = ({ blockIndex, colIndex, blocksLength, colLength }) => (isLeftBlock(blockIndex) && isLeftCol(colIndex)) || (isRightBlock(blocksLength, blockIndex) && isRightCol(colLength, colIndex))

const isleSeats = ({ blockIndex, colIndex, blocksLength, colLength }) => {
    const rightCol = isRightCol(colLength, colIndex)
    const leftBlock = isLeftBlock(blockIndex)
    const rightBlock = isRightBlock(blocksLength, blockIndex)
    const leftCol = isLeftCol(colIndex)
    const middleBlock = isMiddleBlock(leftBlock, rightBlock)
    return (leftBlock && rightCol) || (rightBlock && leftCol) || (middleBlock) && (leftCol || rightCol)
}


const isMiddleSeat = (params) => !windowSeats(params) && !isleSeats(params)


const arrangeSeat = (blocks, arrangeFunction, currentCount, largestRowCount, passengers) => {
    const blocksLength = blocks.length
    let count = currentCount;
    let arranged = false
    for (let rowIndex = 0; rowIndex < largestRowCount && !arranged; rowIndex++) {
        for (let blockIndex = 0; blockIndex < blocksLength && !arranged; blockIndex++) {
            if (!blocks[blockIndex][rowIndex]) continue
            const colLength = blocks[blockIndex][rowIndex].length
            for (let colIndex = 0; colIndex < colLength && !arranged; colIndex++) {
                if (arrangeFunction({ blockIndex, colIndex, blocksLength, colLength })) {
                    if (count <= passengers) {
                        blocks[blockIndex][rowIndex][colIndex] = ++count
                    } else {
                        arranged = true
                    }
                }
            }
        }
    }
    return count
}

function arrangePassengers(blocks, passengers) {
    let count = 0;
    const rowCounts = blocks.map(rows => rows.length)
    const largestRowCount = Math.max(...rowCounts)
    count = arrangeSeat(blocks, isleSeats, count, largestRowCount, passengers)
    count = arrangeSeat(blocks, windowSeats, count, largestRowCount, passengers)
    count = arrangeSeat(blocks, isMiddleSeat, count, largestRowCount, passengers)
    console.log(blocks)
}

const testPlan = [[3, 2], [4, 3], [2, 3], [3, 4]]
arrangePassengers(fullPlan(testPlan), 30)

