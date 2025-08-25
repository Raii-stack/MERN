import {
  Container,
  VStack,
  Heading,
  Box,
  useColorModeValue,
  Input,
  Button,
  FormLabel,
  FormControl,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useProductStore } from "../store/product";

type NewProduct = {
  name: string;
  price: string;
  image: string;
};

const CreatePage = () => {
  const toast = useToast();
  const [newProduct, setNewProduct] = useState<NewProduct>({
    name: "",
    price: "",
    image: "",
  });

  const { createProduct } = useProductStore();

  const handleAddProduct = async () => {
    const { success, message }: { success: boolean; message: string } =
      await createProduct(newProduct);
    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Success",
        description: "Product added successfully!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setNewProduct({ name: "", price: "", image: "" }); // Reset form after successful addition
    }
  };

  return (
    <Container maxW={"container.sm"}>
      <VStack>
        <Heading as={"h1"} size="xl" text-align={"center"} mb={8}>
          Add new Product
        </Heading>
        <Box
          w={"full"}
          bg={useColorModeValue("white", "gray.800")}
          p={6}
          rounded={"lg"}
          boxShadow="md"
        >
          <VStack spacing={4}>
            <FormControl>
              <FormLabel>Product Name:</FormLabel>
              <Input
                name="name"
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, name: e.target.value })
                }
              />
            </FormControl>
            <FormControl>
              <FormLabel>Price:</FormLabel>
              <Input
                name="price"
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, price: e.target.value })
                }
              />
            </FormControl>
            <FormControl>
              <FormLabel>Product Image URL:</FormLabel>
              <Input
                name="image"
                value={newProduct.image}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, image: e.target.value })
                }
              />
            </FormControl>
            <Button colorScheme="blue" onClick={handleAddProduct} w={"full"}>
              Add Product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;
