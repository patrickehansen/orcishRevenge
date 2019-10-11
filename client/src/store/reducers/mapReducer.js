import config from '../../../config';

// Determines how many columns and rows of tiles to generate
// const columns = 21;
// const rows = 20;

// // This is a placeholder tile generator to figure out how to handle map tiles
// function GenerateTiles() {
//   // Hold an array of all cells generated
//   const cells = [];

//   // Hold a lookup array so we can look up tiles later
//   const map = [];

//   // Build up our tiles 
//   for (let i = 0; i < columns; i++) {
//     const col = [];
//     for (let j = 0; j < rows; j++) {
//       // Base tile object with coordinates
//       const tile = {
//         coordinates : {x: i, y: j}
//       }

//       col[j] = tile;
      
//       cells.push(tile);
//     }

//     map[i] = col;
//   }

//   // Find the neighbors
//   cells.forEach(v => {
//     const {x, y} = v.coordinates;

//     // Pull the left, center and right columns
//     v.neighbors = [x > 0 ? x - 1 : undefined, x, x < columns ? x + 1 : undefined].reduce((a, c, i) => {
//       // If we are out of bounds, we previously defined the element as undefined
//       if (c === undefined) return a;

//       if (i === 1) {
//         // For the cells column, pull the one above it
//         a.push(map[c][y-1])
//       }else{
//         // For the others, we want the same row as the cell
//         a.push(map[c][y])
//       }

//       // Always pull the one below
//       a.push(map[c][y+1])
      
//       return a;
//     },[])
//   })

//   return cells;
// }

const defaultAuthenticationState = {
  tiles : [],//GenerateTiles(),
}
  
const mapReducer = (state = defaultAuthenticationState, action) => {
    switch (action.type) {

      default:
        return state;
  }
}
  
export default mapReducer;