// ========================================
// API 請求函式
// ========================================

const axios = require('axios');
const { API_PATH, BASE_URL, ADMIN_TOKEN } = require('./config');

const CUSTOMER_URL = `${BASE_URL}/api/livejs/v1/customer/${API_PATH}`;
const ADMIN_URL = `${BASE_URL}/api/livejs/v1/admin/${API_PATH}`;

// ========== 客戶端 API ==========

/**
 * 取得產品列表
 * @returns {Promise<Array>}
 */
async function fetchProducts() {
  const response = await axios.get(`${CUSTOMER_URL}/products`);
  return response.data.products;
}

/**
 * 取得購物車
 * @returns {Promise<Object>} - 回傳 { carts: [...], total: 數字, finalTotal: 數字 }
 */
async function fetchCart() {
  const response = await axios.get(`${CUSTOMER_URL}/carts`);
  return response.data;
}

/**
 * 加入購物車
 * @param {string} productId - 產品 ID
 * @param {number} quantity - 數量
 * @returns {Promise<Object>} - 回傳購物車資料
 */
async function addToCart(productId, quantity) {
  const response = await axios.post(`${CUSTOMER_URL}/carts`, {
    data: { productId, quantity }
  });
  return response.data;
}

/**
 * 更新購物車商品數量
 * @param {string} cartId - 購物車項目 ID
 * @param {number} quantity - 新數量
 * @returns {Promise<Object>} - 回傳購物車資料
 */
async function updateCartItem(cartId, quantity) {
  const response = await axios.patch(`${CUSTOMER_URL}/carts`, {
    data: { id: cartId, quantity }
  });
  return response.data;
}

/**
 * 刪除購物車商品
 * @param {string} cartId - 購物車項目 ID
 * @returns {Promise<Object>} - 回傳購物車資料
 */
async function deleteCartItem(cartId) {
  const response = await axios.delete(`${CUSTOMER_URL}/carts/${cartId}`);
  return response.data;
}

/**
 * 清空購物車
 * @returns {Promise<Object>} - 回傳購物車資料
 */
async function clearCart() {
  const response = await axios.delete(`${CUSTOMER_URL}/carts`);
  return response.data;
}

/**
 * 建立訂單
 * @param {Object} userInfo - 使用者資料
 * @returns {Promise<Object>}
 */
async function createOrder(userInfo) {
  const response = await axios.post(`${CUSTOMER_URL}/orders`, {
    data: { user: userInfo }
  });
  return response.data;
}

// ========== 管理員 API ==========

/**
 * 管理員 API 需加上認證
 * 提示：
    headers: {
      authorization: ADMIN_TOKEN
    }
 */

/**
 * 取得訂單列表
 * @returns {Promise<Array>}
 */
async function fetchOrders() {
  const response = await axios.get(`${ADMIN_URL}/orders`, {
    headers: { authorization: ADMIN_TOKEN }
  });
  return response.data.orders;
}

/**
 * 更新訂單狀態
 * @param {string} orderId - 訂單 ID
 * @param {boolean} isPaid - 是否已付款
 * @returns {Promise<Object>}
 */
async function updateOrderStatus(orderId, isPaid) {
  const response = await axios.put(
    `${ADMIN_URL}/orders`,
    { data: { id: orderId, paid: isPaid } },
    { headers: { authorization: ADMIN_TOKEN } }
  );
  return response.data;
}

/**
 * 刪除訂單
 * @param {string} orderId - 訂單 ID
 * @returns {Promise<Object>}
 */
async function deleteOrder(orderId) {
  const response = await axios.delete(
    `${ADMIN_URL}/orders/${orderId}`,
    { headers: { authorization: ADMIN_TOKEN } }
  );
  return response.data;
}

module.exports = {
  fetchProducts,
  fetchCart,
  addToCart,
  updateCartItem,
  deleteCartItem,
  clearCart,
  createOrder,
  fetchOrders,
  updateOrderStatus,
  deleteOrder
};
