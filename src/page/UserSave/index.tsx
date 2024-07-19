// @ts-nocheck
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  useToast,
  VStack,
  FormErrorMessage,
  useQuery,
  Text,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ParameterServices } from "../Users/services/users_services";

import { User } from "../Users/interfaces/user";
import { PublicRoutes } from "../../models/routes";
import useInputChange from "../../hooks/useInputChange";
import { useSEOHeadData } from "../../hooks/useSEOHeadData";


const UserSave: React.FC = () => {
  const queryClient = useQueryClient();
  const toast = useToast();
  const navigate = useNavigate();
  const { handleInputChange } = useInputChange<User>();
  const { id } = useParams<{ id?: string }>();
  useSEOHeadData({ title: id ? 'Edit User' : 'Create User' });
  const [userState, setUserState] = useState<User>({
    first_name: "",
    second_name: "",
    email: "",
    avatar: "",
  });
  const [errors, setErrors] = useState({
    first_name: "",
    second_name: "",
    email: "",
    avatar: "",
  });


  const getUserByIdMutation = useMutation({
    mutationFn: (id: User['id']) => ParameterServices.getUserById(id),
    onSuccess: (data: User) => {
      setUserState(data);
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: `No se pudo editar el usuario: ${error.message}`,
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    },
  });

  useEffect(() => {
    if (id) {
      getUserByIdMutation.mutate(id);
    }
  }, [id]);


  const validate = () => {
    const newErrors: any = {};
    if (!userState.first_name)
      newErrors.first_name = "First name cannot be empty";
    if (!userState.second_name)
      newErrors.second_name = "Second name cannot be empty";
    if (!userState.email) newErrors.email = "Email cannot be empty";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const addUserMutation = useMutation({
    mutationFn: (data: User) => ParameterServices.addNewUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getUsers'] });
      toast({
        title: "Éxito",
        description: "Usuario agregado con éxito.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      navigate(PublicRoutes.HOME);
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: `No se pudo agregar el usuario: ${error.message}`,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    },
  });

  const editUserMutation = useMutation({
    mutationFn: (data: User) => ParameterServices.editUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getUsers'] });
      toast({
        title: "Éxito",
        description: "Usuario agregado con éxito.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      navigate(PublicRoutes.HOME);
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: `No se pudo agregar el usuario: ${error.message}`,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    },
  });

  const handleSubmit = () => {
    if (validate()) {
      if (!id) {
        addUserMutation.mutate(userState);
      } else {
        editUserMutation.mutate(userState);
      }

    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      height="95vh"
      bg="gray.50"
      padding="4"
    >
      <Text as="h2" fontSize="3xl" fontWeight="bold" textColor="black" m="2rem 6rem">
        {id ? 'Edit User' : 'Create User'}
      </Text>
      <Box
        width={{ base: "90%", md: "60%" }}
        borderRadius="1rem"
        border="1px solid"
        borderColor="gray.300"
        padding="3rem"
        bg="white"
        boxShadow="md"
      >
        <VStack spacing={4}>
          <FormControl isInvalid={!!errors.first_name}>
            <FormLabel>First Name *</FormLabel>
            <Input
              name="first_name"
              value={userState.first_name}
              onChange={(e) => handleInputChange(e, userState, setUserState)}
              borderRadius="25px"
              focusBorderColor="blue.500"
            />
            {errors.first_name && (
              <FormErrorMessage>{errors.first_name}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={!!errors.second_name}>
            <FormLabel>Second Name *</FormLabel>
            <Input
              name="second_name"
              value={userState.second_name}
              onChange={(e) => handleInputChange(e, userState, setUserState)}
              borderRadius="25px"
              focusBorderColor="blue.500"
            />
            {errors.second_name && (
              <FormErrorMessage>{errors.second_name}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={!!errors.email}>
            <FormLabel>Email *</FormLabel>
            <Input
              name="email"
              value={userState.email}
              onChange={(e) => handleInputChange(e, userState, setUserState)}
              borderRadius="25px"
              focusBorderColor="blue.500"
            />
            {errors.email && (
              <FormErrorMessage>{errors.email}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl>
            <FormLabel>Avatar</FormLabel>
            <Input
              type="text"
              name="avatar"
              onChange={(e) => handleInputChange(e, userState, setUserState)}
              borderRadius="25px"
              focusBorderColor="blue.500"
            />
          </FormControl>
        </VStack>
        <Button
          my="3"
          mt={10}
          width="full"
          onClick={handleSubmit}
          backgroundColor="#000"
          color="white"
          borderRadius="25px"
        >
          {id ? "Update User" : "Create User"}
        </Button>
      </Box>
    </Box>
  );
};

export default UserSave;
