import { useState, useEffect, useRef } from "react";
import axios from "axios";

function Request({ Ref }) {
  const [FKStore, setFKStore] = useState([]);
  const [json, setjson] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/products")
      .then((res) => setjson(res.data));;
  }, []);

  const check = () => {
    const jsonIds = json.map((product) => product.id);

    const newProducts = FKStore.filter(
        (product) => jsonIds.indexOf(product.id) === -1
      );  

  };
  
  const getFKS = () => {
    setFKStore([]);
    axios.get(`https://fakestoreapi.com/products/category/jewelery?limit=${Ref}`)
      .then((res) => (Ref < 0 || Ref == 0 ? 0 : setFKStore(res.data)));
  }
  const deleteProduct = (product) => {
    axios.delete(`http://localhost:3000/products/:${product.id}`);
    Upload()
  };
  const Upload = (products) => {
    products.map((product) =>
      axios.post("http://localhost:3000/products", product).then((res) => {
        setjson((prevJson) => [...prevJson, product]);
      })
    );
  };

  return (
    <>
      <button onClick={getFKS}>pedir</button>
      <p>base de datos</p>
      <ul>
        {/* {json.map((product) => (
          <li key={product.id}>{product.title}</li>
        ))} */}
      </ul>
      <p>pedido</p>
      <ul>
        {FKStore.map(
          (product) => (
            (<li key={product.id}>{product.title}</li>),
            (<button
                value={product.id}
                key={product.id}
                onClick={deleteProduct}>delete</button>)
          )
        )}
      </ul>
    </>
  );
}
export default Request;
