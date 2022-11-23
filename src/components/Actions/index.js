import { useForm } from "react-hook-form";
import { usePlanes } from "../../hooks/usePlanes";
import { useTrackingStats } from "../../hooks/useTrackingStats";
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
  const { createPlane, translatePlanes, scalePlanes, rotatePlanes } =
    usePlanes();
  const {
    setStatValue,
    minimumDistanceAirport,
    minimumDistanceAirplanes,
    minimumTimeColisions,
  } = useTrackingStats();
  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: {
      plane_x: "",
      plane_y: "",
      plane_radius: "",
      plane_angle: "",
    },
  });
  const {
    register: translateRegister,
    handleSubmit: translateHandleSubmit,
    reset: translateReset,
  } = useForm({
    defaultValues: {
      x: 0,
      y: 0,
    },
  });
  const {
    register: scaleRegister,
    handleSubmit: scaleHandleSubmit,
    reset: scaleReset,
  } = useForm({
    defaultValues: {
      x: 0,
      y: 0,
    },
  });
  const {
    register: rotateRegister,
    handleSubmit: rotateHandleSubmit,
    reset: rotateReset,
  } = useForm({
    defaultValues: {
      angle: 0,
      x: 0,
      y: 0,
    },
  });
  const {
    register: statRegister,
    handleSubmit: statHandleSubmit,
    reset: statReset,
  } = useForm({
    defaultValues: {
      minimumDistanceAirport: minimumDistanceAirport,
      minimumDistanceAirplanes: minimumDistanceAirplanes,
      minimumTimeColisions: minimumTimeColisions,
    },
  });
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

  const onSubmitTranslate = ({ x, y }) => {
    try {
      translatePlanes(x, y);
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

    translateReset();
  };

  const onSubmitScale = ({ x, y }) => {
    try {
      scalePlanes(x, y);
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

    scaleReset();
  };

  const onSubmitRotate = ({ x, y, angle }) => {
    try {
      rotatePlanes(x, y, angle);
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

    rotateReset();
  };

  const onSubmitAirportDistance = ({ minimumDistanceAirport }) => {
    try {
      setStatValue("minimumDistanceAirport", minimumDistanceAirport);
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
    } finally {
      statReset();
    }
  };

  const onSubmitAirplanesDistance = ({ minimumDistanceAirplanes }) => {
    try {
      setStatValue("minimumDistanceAirplanes", minimumDistanceAirplanes);
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
    } finally {
      statReset();
    }
  };

  const onSubmitColisionsTime = ({ minimumTimeColisions }) => {
    try {
      setStatValue("minimumTimeColisions", minimumTimeColisions);
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
    } finally {
      statReset();
    }
  };

  const is_first_line_dirty =
    !!formState.dirtyFields["plane_x"] || !!formState.dirtyFields["plane_y"];
  const is_second_line_dirty =
    !!formState.dirtyFields["plane_angle"] ||
    !!formState.dirtyFields["plane_radius"];

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
                    <FormLabel>X</FormLabel>
                    <Input
                      step=".1"
                      isInvalid={!!formState.errors.plane_x}
                      {...register("plane_x", {
                        required: !is_second_line_dirty,
                        disabled: is_second_line_dirty,
                      })}
                      _disabled={{ bgColor: "gray.300", cursor: "not-allowed" }}
                      type="number"
                    />
                  </Box>

                  <Box>
                    <FormLabel>Y</FormLabel>
                    <Input
                      step=".1"
                      isInvalid={!!formState.errors.plane_y}
                      {...register("plane_y", {
                        required: !is_second_line_dirty,
                        disabled: is_second_line_dirty,
                      })}
                      _disabled={{ bgColor: "gray.300", cursor: "not-allowed" }}
                      type="number"
                    />
                  </Box>
                </Flex>

                <Flex gap={4}>
                  <Box>
                    <FormLabel>Raio</FormLabel>
                    <Input
                      step=".1"
                      isInvalid={!!formState.errors.plane_radius}
                      {...register("plane_radius", {
                        required: !is_first_line_dirty,
                        disabled: is_first_line_dirty,
                      })}
                      _disabled={{ bgColor: "gray.300", cursor: "not-allowed" }}
                      type="number"
                    />
                  </Box>

                  <Box>
                    <FormLabel>Ângulo</FormLabel>
                    <Input
                      step=".1"
                      isInvalid={!!formState.errors.plane_angle}
                      {...register("plane_angle", {
                        required: !is_first_line_dirty,
                        disabled: is_first_line_dirty,
                      })}
                      _disabled={{ bgColor: "gray.300", cursor: "not-allowed" }}
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
                <FormControl
                  as="form"
                  onSubmit={translateHandleSubmit(onSubmitTranslate)}
                >
                  <VStack spacing={4}>
                    <Flex gap={4}>
                      <Box>
                        <FormLabel>X</FormLabel>
                        <Input
                          step=".1"
                          {...translateRegister("x")}
                          type="number"
                        />
                      </Box>

                      <Box>
                        <FormLabel>Y</FormLabel>
                        <Input
                          step=".1"
                          {...translateRegister("y")}
                          type="number"
                        />
                      </Box>
                    </Flex>

                    <Button colorScheme="blue" w="100%" type="submit">
                      Translandar
                    </Button>
                  </VStack>
                </FormControl>

                <Divider />

                <FormControl
                  as="form"
                  onSubmit={scaleHandleSubmit(onSubmitScale)}
                >
                  <VStack spacing={4}>
                    <Flex gap={4}>
                      <Box>
                        <FormLabel>X</FormLabel>
                        <Input
                          step=".1"
                          {...scaleRegister("x")}
                          type="number"
                        />
                      </Box>

                      <Box>
                        <FormLabel>Y</FormLabel>
                        <Input
                          step=".1"
                          {...scaleRegister("y")}
                          type="number"
                        />
                      </Box>
                    </Flex>

                    <Button colorScheme="blue" w="100%" type="submit">
                      Escalonar
                    </Button>
                  </VStack>
                </FormControl>

                <Divider />

                <FormControl
                  as="form"
                  onSubmit={rotateHandleSubmit(onSubmitRotate)}
                >
                  <VStack spacing={4}>
                    <Box w="100%">
                      <FormLabel>Ângulo</FormLabel>
                      <Input
                        step=".1"
                        {...rotateRegister("angle")}
                        type="number"
                      />
                    </Box>

                    <Divider orientation="vertical" />

                    <Box textAlign="left" w="100%" fontWeight="semibold">
                      Centro de Rotação:
                    </Box>

                    <Flex gap={4}>
                      <Box>
                        <FormLabel>X</FormLabel>
                        <Input
                          step=".1"
                          {...rotateRegister("x")}
                          type="number"
                        />
                      </Box>

                      <Box>
                        <FormLabel>Y</FormLabel>
                        <Input
                          step=".1"
                          {...rotateRegister("y")}
                          type="number"
                        />
                      </Box>
                    </Flex>

                    <Button colorScheme="blue" w="100%" type="submit">
                      Rotacionar
                    </Button>
                  </VStack>
                </FormControl>
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
            <FormControl
              as="form"
              onSubmit={statHandleSubmit(onSubmitAirportDistance)}
            >
              <Flex flexDir="column" gap={2}>
                <Box>
                  <FormLabel>Distância mínima</FormLabel>
                  <Input
                    {...statRegister("minimumDistanceAirport")}
                    type="number"
                  />
                </Box>

                <Button colorScheme="red" w="100%" type="submit">
                  Aviões próximos ao aeroporto
                </Button>
              </Flex>
            </FormControl>

            <Divider marginY={5} />

            <FormControl
              as="form"
              onSubmit={statHandleSubmit(onSubmitAirplanesDistance)}
            >
              <Flex flexDir="column" gap={2}>
                <Box>
                  <FormLabel>Distância mínima</FormLabel>
                  <Input
                    {...statRegister("minimumDistanceAirplanes")}
                    type="number"
                  />
                </Box>

                <Button colorScheme="red" w="100%" type="submit">
                  Aviões próximos
                </Button>
              </Flex>
            </FormControl>

            <Divider marginY={5} />

            <FormControl
              as="form"
              onSubmit={statHandleSubmit(onSubmitColisionsTime)}
            >
              <Flex flexDir="column" gap={2}>
                <Box>
                  <FormLabel>Tempo mínimo</FormLabel>
                  <Input
                    {...statRegister("minimumTimeColisions")}
                    type="number"
                  />
                </Box>

                <Button colorScheme="red" w="100%" type="submit">
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
