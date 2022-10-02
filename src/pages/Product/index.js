import axios from "axios";
import React, { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";

export default function App({ route }) {
  const { ean } = route.params;
  const [product, setProduct] = useState({});
  const url = "http://192.168.1.16:3001";

  useEffect(() => {
    async function getProduct() {
      const response = await axios.get(`${url}/ean/${ean}`);
      const products = response.data.map((product) => {
        setProduct({
          name: product.productName,
          image: product.items[0].images[0].imageUrl,
        });
      });
    }
    getProduct();
  }, [route]);

  return (
    <View>
      {product ? (
        <>
          <Text style={{ fontSize: 30, fontWeight: "bold", marginBottom: 20 }}>
            {product.name}
          </Text>
          <Image
            source={{ uri: product.image }}
            style={{ width: 200, height: 200 }}
          />
        </>
      ) : (
        <Text>Search Product</Text>
      )}
    </View>
  );
}
