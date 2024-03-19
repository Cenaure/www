let cart = JSON.parse(localStorage.getItem("cart")) || []

export function addToLocalStorageCart(deviceId, quantity) {
  let item = cart.find(item => item._id === deviceId)

  if (item) {
    item.quantity += quantity
  } else {
    cart.push({
      _id: deviceId,
      quantity: quantity,
    })
  }
  
  localStorage.setItem("cart", JSON.stringify(cart))
}

export function decreaseLocalStorageCartQuantity(deviceId){
  let item = cart.find(item => item._id === deviceId)
  if(item.quantity === 1) {deleteLocalStorageCartItem(deviceId); return}
  item.quantity -= 1
  localStorage.setItem("cart", JSON.stringify(cart))
}

export function increaseLocalStorageCartQuantity(deviceId){
  let item = cart.find(item => item._id === deviceId)
  item.quantity += 1
  localStorage.setItem("cart", JSON.stringify(cart))
}

export function deleteLocalStorageCartItem(deviceId){
  cart = cart.filter(item => item._id !== deviceId)
  localStorage.setItem("cart", JSON.stringify(cart))
}

export function clearCart() {
  cart = [];
  localStorage.setItem("cart", JSON.stringify(cart));
}