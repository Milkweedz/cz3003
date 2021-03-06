import { theme, CSSReset, Flex, Box, FormControl, FormLabel, Input, Button, Image, Select } from "@chakra-ui/react";
import { ThemeProvider } from "@emotion/react";
import React from "react";
import {Formik, Form} from "formik";
import { toErrorMap } from "../utils/toErrorMap";
import { useRouter } from "next/router";
import { useRegisterMutation, useCreateCharacterMutation } from "../generated/graphql";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { NavBar } from "../components/NavBar";

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
    return (
        
        <ThemeProvider theme={theme}>
            <CSSReset />
            <NavBar />
            <RegisterPage />
        </ThemeProvider>
    );
    }

const RegisterPage = () => {
    return (
        <Flex minHeight='100vh' width='full' align='center' justifyContent='center'>
            <Box borderWidth={1} px={4} width='full' maxWidth='500px' borderRadius={4} textAlign='center' boxShadow='lg'>
                <ThemeProvider theme={theme} />
                <Box p={4}>
                    <RegisterHeader />
                    <RegisterForm />
                </Box>
            </Box>
        </Flex>
    );
}
    
const RegisterHeader = () => {
    return (
        <Box textAlign='center'>
            <Image borderRadius="full" src={"images\\titleScreen.png"} alt="title" id="title" />
        </Box>
    )
}
    
const RegisterForm = () => {
    const router = useRouter();
    const [,register] = useRegisterMutation();
    const [,createCharacter] = useCreateCharacterMutation();
    return (
        <Box my={8} textAlign='left'>
            <Formik
                initialValues={{ email: '',username: '', password: '', password2: '', userType: '' }}
                onSubmit={async (values, {setErrors}) => {
                    const response = await register({email: values.email, username: values.username, password: values.password, password2: values.password2, userType: values.userType});
                    const character_response = await createCharacter({username: values.username, characterId: 3});
                    if(response.data?.register.errors){
                        setErrors(toErrorMap(response.data.register.errors));
                    } else if (response.data?.register.user) {
                        //worked
                        router.push("/");
                    }
                }}
            >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
            }) => (
            <Form onSubmit={handleSubmit}>
            <FormControl mt={4}>
                <FormLabel>Enter Email:</FormLabel>
            <Input
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
            />
            {errors.email && touched.email && errors.email}
            </FormControl>

                <FormControl mt={4}>
                    <FormLabel>Enter Username:</FormLabel>
                    <Input 
                        type="username"
                        name="username"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.username}
                    />
                    {errors.username && touched.username && errors.username}
            </FormControl>
                
            <FormControl mt={4}>
            <FormLabel>Enter Password:</FormLabel>
                <Input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                />
                {errors.password && touched.password && errors.password}
                </FormControl>

                <FormControl mt={4}>
                    <FormLabel>Confirm password:</FormLabel>
                <Input
                    type="password"
                    name="password2"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password2}
                />


                {errors.password2 && touched.password2 && errors.password2}
                </FormControl>

                <FormControl mt={4}>
                    <FormLabel>userType:</FormLabel>
                <Input
                    type="userType"
                    name="userType"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.userType}
                    placeholder='Select UserType'
                />

                </FormControl>
                
                <Button width='full' type="submit" isLoading={isSubmitting} backgroundColor="teal.300" mt={10}
                bgImage="url('/images/sausage.png')" bgPosition='center' bgSize='430px 45px'>
                    Register</Button>
                    
                </Form>
       )}
     </Formik>
            </Box>
        )

    }
    
    export default withUrqlClient(createUrqlClient) (Register);
