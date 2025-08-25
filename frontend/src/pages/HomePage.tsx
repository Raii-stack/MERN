import { Container, VStack, Text, SimpleGrid } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/product";
import { useEffect } from "react";
import ProductCard from "../components/ProductsCard";

const HomePage: React.FC = () => {
  const { fetchProducts, products } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <Container maxW={"container.xl"} py={12}>
      <VStack spacing={8}>
        <Text
          fontSize={{ base: "20", md: "26" }}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          textAlign={{ base: "center" }}
          bgGradient="linear(to-r, cyan.400, blue.500)"
          bgClip="text"
        >
          Current Products
        </Text>

        {products.length === 0 ? (
          <Text
            fontSize={"xl"}
            textAlign={"center"}
            fontWeight={"bold"}
            color={"gray.500"}
          >
            No products available.{"  "}
            <Link to="/create">
              <Text
                as={"span"}
                color={"blue.500"}
                _hover={{ textDecoration: "underline" }}
              >
                Add a new product
              </Text>
            </Link>
          </Text>
        ) : (
          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 3 }}
            spacing={7}
            w={"full"}
          >
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={{
                  ...product,
                  price: typeof product.price === "number" ? product.price : Number(product.price)
                }}
              />
            ))}
          </SimpleGrid>
        )}
      </VStack>
    </Container>
  );
};

export default HomePage;
