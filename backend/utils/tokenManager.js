// // In-memory store for refresh tokens (can be replaced with Redis or DB)
// let refreshTokens = [];

// // Add a new refresh token
// const addToken = (token) => {
//   if (!refreshTokens.includes(token)) {
//     refreshTokens.push(token);
//   }
// };

// // Check if a refresh token is valid
// const isValid = (token) => {
//   return refreshTokens.includes(token);
// };

// // Remove a refresh token (e.g. on logout)
// const removeToken = (token) => {
//   refreshTokens = refreshTokens.filter((t) => t !== token);
// };

// module.exports = { addToken, isValid, removeToken };














// In-memory store for refresh tokens (can be replaced with Redis or DB)
let refreshTokens = [];

// ✅ Add a new refresh token
const addToken = (token) => {
  if (!refreshTokens.includes(token)) {
    refreshTokens.push(token);
    console.log("Refresh token added:", token);
  }
};

// ✅ Check if a refresh token is valid
const isValid = (token) => {
  return refreshTokens.includes(token);
};

// ✅ Remove a refresh token (e.g. on logout)
const removeToken = (token) => {
  refreshTokens = refreshTokens.filter((t) => t !== token);
  console.log("Refresh token removed:", token);
};

module.exports = { addToken, isValid, removeToken };