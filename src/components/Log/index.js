import { List, ListItem, ListIcon } from "@chakra-ui/react";
import { MdCheckCircle } from "@chakra-ui/icons";

export const Log = () => {
  return (
    <List
      spacing={5}
      maxH="480px"
      minH="480px"
      overflowY="scroll"
      p="16px"
      border="1px solid #c7c7c7"
      borderRadius="lg"
    >
      <ListItem>
        <ListIcon as={MdCheckCircle} color="red.500" />
        Lorem ipsum dolor sit amet, consectetur adipisicing elit
      </ListItem>
    </List>
  );
};
