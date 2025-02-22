import React, { Component } from "react";

export default class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }

  allProducts = () => {
    fetch("http://127.0.0.1:5000/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        this.setState({ products: data });
      })
      .catch((error) => {
        this.setState({ error: error.message });
        console.error("Fetch error:", error);
      });
  };

  componentDidMount() {
    this.allProducts();
  }

  render() {
    const { products, error } = this.state;

    return (
      <div>
        <div>
          {error && <p style={{ color: "red" }}>Error: {error}</p>}
          <table border="1">
            <thead>
              <tr>
                <th>Ürün Adı</th>
                <th>Fiyat</th>
              </tr>
            </thead>
            <tbody>
              {this.state.products.length === 0 ? (
                <tr>
                  <td colSpan="3">No products available</td>
                </tr>
              ) : (
                products.map((product, index) => (
                  <tr key={index}>
                    <td>{product["product-name"]}</td>
                    <td>{product.fiyat}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
