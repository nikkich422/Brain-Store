import React from "react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import MenuIcon from "@mui/icons-material/Menu";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import StoreMallDirectoryIcon from "@mui/icons-material/StoreMallDirectory";

export default function DrawerNav() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const cartData = useSelector((store) => store.cart.cartItems);
  const userLogged = useSelector((store) => store.data.userLogin);

  return (
    <>
      <button ref={btnRef} onClick={onOpen}>
        <span className="my-2 mx-4">
          {" "}
          <MenuIcon />
        </span>
      </button>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton className="mt-2" />
          <DrawerHeader className="font-bold flex justify-center items-center gap-3 border-b-2">
            <span className="flex">
              <StoreMallDirectoryIcon />
            </span>
            Brain Store Menu
          </DrawerHeader>

          <DrawerBody>
            <ul className="flex flex-col mt-7 items-center w-full py-5">
              <Link
                to="/"
                onClick={onClose}
                className="w-full text-center py-2 border-b-[1px] border-gray-100 border-t-[1px] hover:bg-gray-100"
              >
                <li className="font-bold text-xl hover:text-blue-500">Home</li>
              </Link>
              <Link
                to="contact"
                onClick={onClose}
                className="w-full text-center py-2 border-b-[1px] border-gray-100 hover:bg-gray-100"
              >
                <li className="font-bold text-xl hover:text-blue-500">
                  Contact
                </li>
              </Link>
              <Link
                to="/about"
                onClick={onClose}
                className="w-full text-center py-2 border-b-[1px] border-gray-100 hover:bg-gray-100 "
              >
                <li className="font-bold text-xl hover:text-blue-500">About</li>
              </Link>
              <Link
                to="/cart"
                onClick={onClose}
                className="w-full text-center py-2 border-b-[1px] border-gray-100 hover:bg-gray-100"
              >
                <li className="font-bold text-xl hover:text-blue-500">
                  Cart {cartData.length > 0 && <span>({cartData.length})</span>}
                </li>
              </Link>
            </ul>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
