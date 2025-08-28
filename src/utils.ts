// This file has intentional violations for testing

export function processData(data) {  // ❌ Missing type annotations
  return data.map(item => {
    return item.value;  // ❌ No type checking
  });
}

export let mutableConfig = {  // ❌ Should use const
  apiUrl: 'https://api.example.com',
  timeout: 5000
};

// ❌ Using any type
export function handleResponse(response: any) {
  console.log(response);
  return response.data;
}

// ❌ Missing JSDoc comment for public function
export function calculateTotal(items) {
  let total = 0;  // ❌ Could use const with reduce
  for (let item of items) {
    total += item.price;
  }
  return total;
}
