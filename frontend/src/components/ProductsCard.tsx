import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Image,
  Heading,
  Text,
  HStack,
  IconButton,
  useColorModeValue,
  useToast,
  Modal,
  useDisclosure,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  Input,
  VStack,
  FormLabel,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import { useProductStore } from "../store/product";
import { useState } from "react";

interface Product {
  image: string;
  name: string;
  price: number;
  _id?: string;
}

interface ProductsCardProps {
  product: Product;
}

const ProductsCard: React.FC<ProductsCardProps> = ({ product }) => {
  const textColor = useColorModeValue("gray.600", "white");
  const bg = useColorModeValue("white", "gray.800");
  const shadow = useColorModeValue(
    "7px 7px 7px  rgba(0,0,0,0.2)",
    "7px 7px 7px  rgba(0,0,0,0.8)"
  );

  const toast = useToast();
  const { deleteProduct, updateProduct } = useProductStore();
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Local state for editing product in modal
  const [editProduct, setEditProduct] = useState<{
    name: string;
    price: string;
    image: string;
    _id?: string;
  }>({
    ...product,
    price: product.price.toString(),
  });

  const handleDeleteProduct = async (pid?: string) => {
    if (!pid) {
      toast({
        title: "Error",
        description: "Product ID is missing.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    const { success, message } = await deleteProduct(pid);
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
        description: "Product deleted successfully!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleUpdateProduct = async () => {
    if (!editProduct._id) {
      toast({
        title: "Error",
        description: "Product ID is missing.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    const { success, message } = await updateProduct(editProduct._id, {
      ...editProduct,
      price: String(editProduct.price),
    });
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
        description: "Product updated successfully!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onClose();
    }
  };

  // Sync modal state with product prop when opening
  const handleOpen = () => {
    setEditProduct({
      ...product,
      price: product.price.toString(),
    });
    onOpen();
  };

  return (
    <Box
      shadow={shadow}
      rounded={"lg"}
      overflow={"hidden"}
      transition={"all 0.3s"}
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bg={bg}
    >
      <Image
        src={product.image}
        alt={product.name}
        h={48}
        w={"full"}
        objectFit={"cover"}
      />
      <Heading as={"h3"} size="md" ml={2} mt={2}>
        {product.name}
      </Heading>
      <Text fontWeight={"bold"} fontSize={"xl"} color={textColor} ml={2} mb={1}>
        ${product.price.toFixed(2)}
      </Text>
      <HStack spacing={2} ml={2} mb={2}>
        <IconButton
          aria-label="Edit product"
          icon={<EditIcon />}
          colorScheme="blue"
          onClick={handleOpen}
        />
        <IconButton
          aria-label="Delete product"
          icon={<DeleteIcon />}
          colorScheme="red"
          onClick={() => handleDeleteProduct(product._id)}
        />
      </HStack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input
                  placeholder="Enter product name"
                  name="name"
                  value={editProduct.name}
                  onChange={(e) =>
                    setEditProduct({ ...editProduct, name: e.target.value })
                  }
                />
              </FormControl>
              <FormControl>
                <FormLabel>Price</FormLabel>
                <Input
                  placeholder="Enter product price"
                  name="price"
                  type="number"
                  value={editProduct.price}
                  onChange={(e) =>
                    setEditProduct({
                      ...editProduct,
                      price: e.target.value,
                    })
                  }
                />
              </FormControl>
              <FormControl>
                <FormLabel>Image URL</FormLabel>
                <Input
                  placeholder="Enter product image URL"
                  name="image"
                  value={editProduct.image}
                  onChange={(e) =>
                    setEditProduct({ ...editProduct, image: e.target.value })
                  }
                />
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleUpdateProduct}>
              Update
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProductsCard;
