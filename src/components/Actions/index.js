import { useForm } from "react-hook-form";
import { usePlanes } from "../../hooks/usePlanes";
import { useToast } from "@chakra-ui/react";
import {
  Box,
  Flex,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Button,
  Divider,
} from "@chakra-ui/react";

export const Actions = () => {
  const { register, handleSubmit, reset, formState } = useForm();
  const { createPlane } = usePlanes();
  const toast = useToast();

  const onSubmit = (data) => {
    try {
      createPlane(data);
    } catch (error) {
      toast({
        title: "Ocorreu um erro!",
        description: error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top-right",
      });

      return;
    }

    reset();
  };

  return (
    <Flex direction="column">
      <Accordion defaultIndex={[0]} shadow="md" allowToggle borderRadius={4}>
        <AccordionItem borderTop={0}>
          <h2>
            <AccordionButton h="4rem">
              <Box flex="1" textAlign="left">
                Entrada de Dados
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <FormControl as="form" onSubmit={handleSubmit(onSubmit)}>
              <VStack spacing={4}>
                <Flex gap={4}>
                  <Box>
                    <FormLabel onClick={() => onUpdateFormSubmit()}>
                      X
                    </FormLabel>
                    <Input
                      step=".1"
                      isInvalid={!!formState.errors.plane_x}
                      {...register("plane_x", {
                        required: true,
                      })}
                      type="number"
                    />
                  </Box>

                  <Box>
                    <FormLabel>Y</FormLabel>
                    <Input
                      step=".1"
                      isInvalid={!!formState.errors.plane_y}
                      {...register("plane_y", {
                        required: true,
                      })}
                      type="number"
                    />
                  </Box>
                </Flex>

                <Flex gap={4}>
                  <Box>
                    <FormLabel>Raio</FormLabel>
                    <Input
                      isInvalid={!!formState.errors.plane_radius}
                      {...register("plane_radius", {
                        required: true,
                      })}
                      type="number"
                    />
                  </Box>

                  <Box>
                    <FormLabel>Ângulo</FormLabel>
                    <Input
                      isInvalid={!!formState.errors.plane_angle}
                      {...register("plane_angle", {
                        required: true,
                      })}
                      type="number"
                    />
                  </Box>
                </Flex>

                <Flex gap={4}>
                  <Box>
                    <FormLabel>Velocidade</FormLabel>
                    <Input
                      isInvalid={!!formState.errors.plane_speed}
                      {...register("plane_speed", {
                        required: true,
                      })}
                      type="number"
                    />
                  </Box>

                  <Box>
                    <FormLabel>Direção</FormLabel>
                    <Input
                      isInvalid={!!formState.errors.plane_direction}
                      {...register("plane_direction", {
                        required: true,
                      })}
                      type="number"
                    />
                  </Box>
                </Flex>

                <Button colorScheme="orange" w="100%" type="submit">
                  Inserir
                </Button>
              </VStack>
            </FormControl>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton h="4rem">
              <Box flex="1" textAlign="left">
                Funções de Transformação
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <FormControl>
              <VStack spacing={4}>
                <FormControl>
                  <VStack spacing={4}>
                    <Flex gap={4}>
                      <Box>
                        <FormLabel>X</FormLabel>
                        <Input type="number" />
                      </Box>

                      <Box>
                        <FormLabel>Y</FormLabel>
                        <Input type="number" />
                      </Box>
                    </Flex>

                    <Button colorScheme="blue" w="100%">
                      Translandar
                    </Button>
                  </VStack>
                </FormControl>

                <Divider />

                <FormControl>
                  <VStack spacing={4}>
                    <Flex gap={4}>
                      <Box>
                        <FormLabel>X</FormLabel>
                        <Input type="number" />
                      </Box>

                      <Box>
                        <FormLabel>Y</FormLabel>
                        <Input type="number" />
                      </Box>
                    </Flex>

                    <Button colorScheme="blue" w="100%">
                      Escalonar
                    </Button>
                  </VStack>
                </FormControl>

                <Divider />

                <FormControl>
                  <VStack spacing={4}>
                    <Box w="100%">
                      <FormLabel>Ângulo</FormLabel>
                      <Input type="number" />
                    </Box>

                    <Divider orientation="vertical" />

                    <Box textAlign="left" w="100%" fontWeight="semibold">
                      Centro de Rotação:
                    </Box>

                    <Flex gap={4}>
                      <Box>
                        <FormLabel>X</FormLabel>
                        <Input type="number" />
                      </Box>

                      <Box>
                        <FormLabel>Y</FormLabel>
                        <Input type="number" />
                      </Box>
                    </Flex>

                    <Button colorScheme="blue" w="100%">
                      Rotacionar
                    </Button>
                  </VStack>
                </FormControl>

                <Divider />
              </VStack>
            </FormControl>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton h="4rem">
              <Box flex="1" textAlign="left">
                Funções de Rastreamento
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <FormControl>
              <Flex flexDir="column" gap={2}>
                <Box>
                  <FormLabel>Distância mínima</FormLabel>
                  <Input type="number" />
                </Box>

                <Button colorScheme="red" w="100%">
                  Aviões próximos ao aeroporto
                </Button>
              </Flex>
            </FormControl>

            <Divider marginY={5} />

            <FormControl>
              <Flex flexDir="column" gap={2}>
                <Box>
                  <FormLabel>Distância mínima</FormLabel>
                  <Input type="number" />
                </Box>

                <Button colorScheme="red" w="100%">
                  Aviões próximos
                </Button>
              </Flex>
            </FormControl>

            <Divider marginY={5} />

            <FormControl>
              <Flex flexDir="column" gap={2}>
                <Box>
                  <FormLabel>Tempo mínimo</FormLabel>
                  <Input type="number" />
                </Box>

                <Button colorScheme="red" w="100%">
                  Em rota de colisão
                </Button>
              </Flex>
            </FormControl>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Flex>
  );
};
