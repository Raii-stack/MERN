import {
  Button,
  Container,
  Flex,
  HStack,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue("white", "gray.800");
  const shadow = useColorModeValue(
    "0 0 20px rgba(0,0,0,0.2)",
    "0 0 20px rgba(0,0,0,0.8)"
  );
  return (
    <Container
      maxW={"1140px"}
      px={4}
      borderBottomLeftRadius={10}
      borderBottomRightRadius={10}
      boxShadow={shadow}
      bg={bg}
    >
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDirection={{ base: "column", md: "row" }}
      >
        <Text
          fontSize={{ base: "22", md: "28" }}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          textAlign={{ base: "center" }}
          bgGradient="linear(to-r, cyan.400, blue.500)"
          bgClip="text"
        >
          <Link to={"/"}>Product Store 🛒</Link>
        </Text>
        <HStack spacing={2} alignItems={"center"}>
          <Link to="/create">
            <Button>
              <AddIcon fontSize={20} />
            </Button>
          </Link>
          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <IoMoon /> : <LuSun size={20} />}
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
