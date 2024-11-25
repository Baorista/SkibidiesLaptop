// Lấy giá trị productId từ URL
function getProductIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('productId');
}

// Fetch chi tiết sản phẩm theo productId
async function fetchProductDetails(productId) {
    try {
        const response = await fetch(`http://localhost:9193/api/v1/products/product/${productId}/product`);
        const data = await response.json();
        if (data.data) {
            displayProductDetails(data.data);
        } else {
            console.error("Không tìm thấy chi tiết sản phẩm.");
        }
    } catch (error) {
        console.error("Lỗi khi lấy chi tiết sản phẩm:", error);
    }
}

// Hiển thị chi tiết sản phẩm trong các div tương ứng
function displayProductDetails(product) {
    // Hiển thị chi tiết sản phẩm trong #productDetails
    const productDetails = document.getElementById("productDetails");
    productDetails.innerHTML = `
        <div class="product-images">
            <img src="${
                product.image[0]?.downloadUrl
                    ? `http://localhost:9193${product.image[0].downloadUrl}`
                    : '/front/assets/image/gf66.png'
            }" alt="${product.name}">
        </div>
        <div class="product-info">
            <h1>${product.name}</h1>
            <p>Category: ${product.category.name}</p>
            <p>Brand: ${product.brand}</p>
            <p>Price: ${product.price}</p>
            <p>Quantity: ${product.quantity}</p>
        </div>
    `;

    // Hiển thị bảng thuộc tính trong #attributes
    const attributesDiv = document.getElementById("attributes");
    if (product.attributes.length > 0) {
        attributesDiv.innerHTML = `
            <h2>Specifications</h2>
            <table>
                <thead>
                    <tr>
                        <th>Attribute</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    ${product.attributes
                        .map(
                            attr => `
                        <tr>
                            <td>${attr.attributeName}</td>
                            <td>${attr.value}</td>
                        </tr>
                    `
                        )
                        .join('')}
                </tbody>
            </table>
        `;
    } else {
        attributesDiv.innerHTML = "<p>No specifications available.</p>";
    }
}

// Lấy productId từ URL và hiển thị sản phẩm
const productId = getProductIdFromUrl();
if (productId) {
    fetchProductDetails(productId);
} else {
    console.error("Không có productId được cung cấp.");
}
